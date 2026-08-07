# NEXORA Download Center (Standalone Deployment Guide)

The **NEXORA Download Center** is an independent, separate software distribution application dedicated exclusively to software downloads (Android APK & Windows Setup EXE). It operates without access to the main NEXORA learning portals or launchers.

---

## 🚀 Separate Deployment (Vercel & Netlify)

### Option A: Deploy on Vercel
1. Push this repository to GitHub/GitLab.
2. In Vercel, click **New Project** and select the repository.
3. Set the **Root Directory** to: `nexora-download-center`
4. Click **Deploy**. Vercel will automatically use `vercel.json`.

### Option B: Deploy on Netlify
1. Create a new site from your Git repository on Netlify.
2. Set the **Base Directory** to: `nexora-download-center`
3. Set the **Publish Directory** to: `public`
4. Click **Deploy Site**. Netlify will automatically apply `netlify.toml`.

---

## 🔗 Connecting to Admin Panel Backend

When hosted on a separate URL (e.g. `https://downloads.nexora.edu` or `https://nexora-dl.vercel.app`), configure the backend API URL where your NEXORA Admin Console server runs.

You can specify the backend URL in 3 simple ways:

1. **Window Config (In `index.html`)**:
   Add this script tag inside `index.html` before app initialization:
   ```html
   <script>
     window.NEXORA_BACKEND_URL = "https://your-main-nexora-backend.netlify.app";
   </script>
   ```

2. **Browser Storage**:
   Open browser Developer Console on your Download Center site and execute:
   ```javascript
   localStorage.setItem('nexora_backend_url', 'https://your-main-nexora-backend.netlify.app');
   ```

3. **Same Domain Proxy**:
   If hosted under a proxy or reverse-proxy, leave default `/api/downloads`.
