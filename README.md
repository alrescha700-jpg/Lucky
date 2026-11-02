# StoryVoice — Vercel-ready website

A static, responsive browser-based text-to-speech prototype. The frontend is served from `public/index.html`; audio generation runs in the visitor's browser using the Kokoro JS package and model files fetched from their CDN/model host.

## Deploy to Vercel

### Option A — GitHub (recommended)
1. Create a new GitHub repository named `storyvoice`.
2. Upload the contents of this folder (the `public` folder, `vercel.json`, `package.json`, and this README).
3. In Vercel, choose **Add New → Project** and import the GitHub repository.
4. Framework Preset: **Other**. Build Command: leave empty. Output Directory: `public`.
5. Click **Deploy**. Vercel will provide a public `*.vercel.app` URL.

### Option B — Vercel CLI
1. Install Node.js and Vercel CLI (`npm i -g vercel`).
2. In this folder run `vercel` and follow the prompts.
3. Run `vercel --prod` for production deployment.

## Important
- This repository is a deployable frontend project; it has not been published to a Vercel account.
- First use needs an internet connection to fetch the JS package/model.
- No API key is configured and the app does not provide a paid hosted inference service.
- Model download, device RAM, browser support, and CDN/model availability affect performance.
- Verify Kokoro runtime compatibility in the target browser before sharing the public URL widely.
