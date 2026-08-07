import { fetchDownloadConfig, verifyDownloadToken, trackDownloadEvent } from '../api/downloadApi.js';
import { storage } from '../utilities/storage.js';

export async function getLiveDownloadConfig() {
  const response = await fetchDownloadConfig();
  if (response && response.success) {
    return response.data;
  }
  throw new Error('Failed to retrieve live download settings');
}

export async function executeSecureDownload(platform, releaseInfo, studentId) {
  // 1. Generate/verify secure download token from server
  const tokenRes = await verifyDownloadToken({
    platform,
    version: releaseInfo.version,
    studentId
  });

  if (!tokenRes || !tokenRes.success) {
    throw new Error('Failed to issue secure download authorization token');
  }

  // 2. Track download telemetry
  await trackDownloadEvent({
    platform,
    version: releaseInfo.version,
    studentId
  }).catch(() => {});

  // 3. Log into local download history
  const historyItem = {
    id: tokenRes.token,
    platform,
    version: releaseInfo.version,
    fileSize: releaseInfo.fileSize,
    downloadUrl: releaseInfo.downloadUrl,
    timestamp: new Date().toISOString(),
    status: 'COMPLETED'
  };
  storage.addDownloadHistory(historyItem);

  // 4. Trigger direct file download
  if (releaseInfo.downloadUrl) {
    const link = document.createElement('a');
    link.href = releaseInfo.downloadUrl;
    link.target = '_blank';
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return historyItem;
}
