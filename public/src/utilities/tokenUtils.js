/**
 * Secure Token utilities for download verification
 */

export function generateLocalToken(platform, studentId) {
  const rand = Math.random().toString(36).substring(2, 10).toUpperCase();
  const ts = Date.now().toString(36).toUpperCase();
  return `NEX-${platform.toUpperCase()}-${ts}-${rand}`;
}
