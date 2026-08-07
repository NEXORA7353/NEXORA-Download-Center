/**
 * Formatting helpers for dates, sizes, and strings
 */

export function formatDate(dateString) {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (e) {
    return dateString;
  }
}

export function formatDateTime(dateString) {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return dateString;
  }
}

export function truncateHash(hashStr, length = 16) {
  if (!hashStr) return 'N/A';
  if (hashStr.length <= length) return hashStr;
  return `${hashStr.substring(0, length / 2)}...${hashStr.substring(hashStr.length - length / 2)}`;
}
