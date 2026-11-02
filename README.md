# StoryVoice Optimized

Static Vercel project. Upload the contents of this folder to the GitHub repository.

## Changes in this build
- Kokoro ONNX Q4 quantization on WASM to reduce model memory/download footprint compared with Q8.
- Larger sentence-aware chunks (about 420 characters) to reduce repeated inference-call overhead.
- WAV assembly writes samples directly into the final WAV buffer, avoiding an extra full-size Float32Array copy.
- Supports up to 12,000 characters, though long scripts will still take time and use memory.

## Important
This remains on-device TTS. It cannot guarantee fast synthesis on every Android phone. For consistently fast long-form generation, move inference to a server or use a hosted TTS API; that requires server resources and may not be free.

Deploy on Vercel as a static project with Output Directory `public` and no build command.
