# StoryVoice Azure Direct (Vercel)

Users enter their own Azure Speech key and region in the page. The key is stored only in sessionStorage for the current browser session and is not committed to GitHub or stored in Vercel.

## Deploy
1. Upload the contents of this project to the root of your GitHub repository.
2. Import/redeploy in Vercel. Framework preset: Other; Output Directory: `public`; no build command.
3. Open the deployed site. Enter Azure Speech Key 1 and the resource region (for example `southeastasia`) in the app, then choose Save in this session.

## Security
Direct browser mode sends the key from the browser directly to Azure Speech. The key can be inspected by the person using that browser/device. Do not hard-code a personal key into HTML or use a shared/public device. sessionStorage is temporary, not a secure vault. For a public app where visitors should not see the owner's key, use a server-side proxy and Vercel Environment Variables instead.

## Limits
The app splits long text into sequential chunks. 50,000 characters is an app input limit, not a guarantee that every Azure account/region/voice can process it in one sitting. Check current Azure Speech pricing and quotas. MP3 and WAV are separate generation runs and each consumes character quota.
