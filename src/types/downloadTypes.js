/**
 * NEXORA Download Center Type Definitions & Schemas
 */

export const PlatformType = {
  ANDROID: 'android',
  WINDOWS: 'windows'
};

export const DownloadStatus = {
  IDLE: 'IDLE',
  VERIFYING_TOKEN: 'VERIFYING_TOKEN',
  PREPARING: 'PREPARING',
  DOWNLOADING: 'DOWNLOADING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export const MaintenanceState = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export const DefaultReleaseInfo = {
  version: '1.0.0',
  minVersion: '1.0.0',
  downloadUrl: '',
  fileSize: '0 MB',
  checksum: '',
  releaseDate: new Date().toISOString(),
  maintenance: false,
  forceUpdate: false,
  releaseNotes: []
};
