const VOICES = new Set([
  'en-US-JennyNeural','en-US-AriaNeural','en-US-GuyNeural','en-US-ChristopherNeural',
  'en-GB-SoniaNeural','en-GB-RyanNeural','id-ID-GadisNeural','id-ID-ArdiNeural'
]);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const key = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION;
  if (!key || !region) return res.status(503).json({ error: 'Azure belum dikonfigurasi. Tambahkan AZURE_SPEECH_KEY dan AZURE_SPEECH_REGION di Vercel Environment Variables.' });
  try {
    const { text, voice, format } = req.body || {};
    if (typeof text !== 'string' || !text.trim() || text.length > 2000) return res.status(400).json({ error: 'Setiap bagian harus berisi 1–2.000 karakter.' });
    if (!VOICES.has(voice)) return res.status(400).json({ error: 'Voice tidak diizinkan.' });
    if (!['mp3','wav'].includes(format)) return res.status(400).json({ error: 'Format harus mp3 atau wav.' });
    const lang = voice.startsWith('id-ID') ? 'id-ID' : voice.startsWith('en-GB') ? 'en-GB' : 'en-US';
    const safeText = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const ssml = `<speak version="1.0" xml:lang="${lang}"><voice name="${voice}">${safeText}</voice></speak>`;
    const endpoint = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
    const output = format === 'mp3' ? 'audio-24khz-160kbitrate-mono-mp3' : 'riff-24khz-16bit-mono-pcm';
    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': output,
        'User-Agent': 'StoryVoice'
      },
      body: ssml
    });
    if (!upstream.ok) {
      const detail = (await upstream.text()).slice(0, 700);
      return res.status(upstream.status === 429 ? 429 : 502).json({ error: upstream.status === 429 ? 'Batas permintaan Azure tercapai. Tunggu sebentar lalu coba lagi.' : `Azure TTS error ${upstream.status}: ${detail}` });
    }
    const audio = Buffer.from(await upstream.arrayBuffer());
    res.setHeader('Content-Type', format === 'mp3' ? 'audio/mpeg' : 'audio/wav');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.status(200).send(audio);
  } catch (e) {
    return res.status(500).json({ error: 'Kesalahan server saat membuat audio: ' + (e?.message || 'unknown') });
  }
}
