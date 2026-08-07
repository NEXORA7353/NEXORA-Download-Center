/**
 * Version comparison and student validation helpers
 */

// Compare semver strings e.g. "2.4.1" vs "2.0.0".
// Returns -1 if v1 < v2, 1 if v1 > v2, 0 if equal
export function compareSemver(v1, v2) {
  if (!v1 || !v2) return 0;
  const p1 = String(v1).replace(/^v/, '').split('.').map(Number);
  const p2 = String(v2).replace(/^v/, '').split('.').map(Number);

  const len = Math.max(p1.length, p2.length);
  for (let i = 0; i < len; i++) {
    const num1 = p1[i] || 0;
    const num2 = p2[i] || 0;
    if (num1 < num2) return -1;
    if (num1 > num2) return 1;
  }
  return 0;
}

export function isForceUpdateRequired(currentVersion, minSupportedVersion, forceUpdateFlag) {
  if (forceUpdateFlag) return true;
  if (!currentVersion || !minSupportedVersion) return false;
  return compareSemver(currentVersion, minSupportedVersion) < 0;
}

export function isValidStudentId(id) {
  if (!id || typeof id !== 'string') return false;
  const cleaned = id.trim();
  return cleaned.length >= 3;
}
