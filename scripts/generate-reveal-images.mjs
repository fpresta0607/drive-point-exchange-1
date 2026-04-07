import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, '..', 'public', 'reveal-text');

const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!API_KEY) {
  console.error('Missing GOOGLE_GENERATIVE_AI_API_KEY in environment');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const STYLE_SUFFIX =
  'Photorealistic, high detail, cinematic lighting, dramatic atmosphere, 1:1 square aspect ratio, ultra high resolution.';

const letters = [
  {
    letter: 'D',
    filename: 'D.png',
    prompt: `Aerial cinematic view of a luxury sports car driving on a winding coastal highway at golden hour. Deep navy ocean (#0D1B4A) below, dramatic cliff edges, motion blur on the road. Rich saturated colors with green (#2DB843) vegetation accents. ${STYLE_SUFFIX}`,
  },
  {
    letter: 'R',
    filename: 'R.png',
    prompt: `Close-up of a polished chrome alloy car wheel rim with green ambient LED underglow (#2DB843) reflecting off wet asphalt. Dark moody garage background (#0D1B4A). Water droplets on the chrome surface catching light. ${STYLE_SUFFIX}`,
  },
  {
    letter: 'I',
    filename: 'I.png',
    prompt: `Modern luxury car interior cockpit at night. Glowing blue (#1934B5) and green (#2DB843) ambient instrument panel lights. Leather steering wheel in foreground, city lights visible through the windshield. Premium automotive photography. ${STYLE_SUFFIX}`,
  },
  {
    letter: 'V',
    filename: 'V.png',
    prompt: `A dramatic close-up of a car speedometer with the needle at high speed. Blue (#1934B5) illuminated dial markings and green (#2DB843) accent lighting. Motion blur streaks in the background suggesting velocity. Dark cockpit setting. ${STYLE_SUFFIX}`,
  },
  {
    letter: 'E',
    filename: 'E.png',
    prompt: `A high-performance car engine bay with polished chrome and carbon fiber details. Dramatic side lighting with green (#2DB843) rim light accents and deep blue (#1934B5) reflections. Dark background, studio-quality automotive photography. ${STYLE_SUFFIX}`,
  },
];

const DELAY_MS = 3000;
const MAX_RETRIES = 2;

async function generateImage(config) {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(
        `  Generating: ${config.filename} (${config.letter}) — attempt ${attempt + 1}...`
      );

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: config.prompt,
        config: {
          responseModalities: ['IMAGE', 'TEXT'],
        },
      });

      const parts = response?.candidates?.[0]?.content?.parts;
      if (!parts) {
        throw new Error('No parts in response');
      }

      for (const part of parts) {
        if (part.inlineData?.mimeType?.startsWith('image/')) {
          const imageBytes = Buffer.from(part.inlineData.data, 'base64');
          const outputPath = path.join(OUTPUT_DIR, config.filename);
          fs.writeFileSync(outputPath, imageBytes);
          const sizeKB = Math.round(imageBytes.length / 1024);
          console.log(`  ✓ Saved: ${config.filename} (${sizeKB} KB)`);
          return true;
        }
      }

      throw new Error('No image data in response');
    } catch (error) {
      console.error(`  ✗ Error on ${config.filename}: ${error.message}`);
      if (attempt < MAX_RETRIES) {
        console.log(`  Retrying in ${DELAY_MS}ms...`);
        await new Promise((r) => setTimeout(r, DELAY_MS));
      } else {
        console.error(
          `  FAILED after ${MAX_RETRIES + 1} attempts: ${config.filename}`
        );
        return false;
      }
    }
  }
  return false;
}

async function main() {
  const onlyArg = process.argv.find((a) => a.startsWith('--only='));
  const onlyLetter = onlyArg?.split('=')[1]?.toUpperCase();

  const toGenerate = onlyLetter
    ? letters.filter((l) => l.letter === onlyLetter)
    : letters;

  if (toGenerate.length === 0) {
    console.error(`No matching letter found for: ${onlyLetter}`);
    process.exit(1);
  }

  console.log(
    `\nGenerating ${toGenerate.length} reveal-text image(s) for "DRIVE"...\n`
  );

  let succeeded = 0;
  let failed = 0;

  for (const img of toGenerate) {
    const ok = await generateImage(img);
    if (ok) succeeded++;
    else failed++;

    if (toGenerate.indexOf(img) < toGenerate.length - 1) {
      await new Promise((r) => setTimeout(r, DELAY_MS));
    }
  }

  console.log(
    `\nDone: ${succeeded} succeeded, ${failed} failed out of ${toGenerate.length} total.\n`
  );
  if (failed > 0) process.exit(1);
}

main();
