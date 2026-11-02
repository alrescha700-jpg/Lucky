export default function handler(req, res) {
  const configured = Boolean(process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION);
  res.setHeader('Cache-Control','no-store');
  return res.status(200).json({ ok: true, provider: 'Azure Speech', configured });
}
