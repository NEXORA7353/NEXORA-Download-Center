export function renderSkeletonLoader() {
  return `
    <div class="release-grid">
      <div class="content-card" style="height: 380px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div class="skeleton-box" style="height: 24px; width: 120px; margin-bottom: 16px;"></div>
          <div class="skeleton-box" style="height: 32px; width: 220px; margin-bottom: 12px;"></div>
          <div class="skeleton-box" style="height: 16px; width: 160px; margin-bottom: 24px;"></div>
          <div class="skeleton-box" style="height: 100px; width: 100%; border-radius: 12px;"></div>
        </div>
        <div class="skeleton-box" style="height: 44px; width: 100%; border-radius: 9999px;"></div>
      </div>
      <div class="content-card" style="height: 380px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div class="skeleton-box" style="height: 24px; width: 120px; margin-bottom: 16px;"></div>
          <div class="skeleton-box" style="height: 32px; width: 220px; margin-bottom: 12px;"></div>
          <div class="skeleton-box" style="height: 16px; width: 160px; margin-bottom: 24px;"></div>
          <div class="skeleton-box" style="height: 100px; width: 100%; border-radius: 12px;"></div>
        </div>
        <div class="skeleton-box" style="height: 44px; width: 100%; border-radius: 9999px;"></div>
      </div>
    </div>
  `;
}
