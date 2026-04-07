import { GoogleGenAI } from '@google/genai';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public', 'auto');

const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!API_KEY) {
  console.error('Missing GOOGLE_GENERATIVE_AI_API_KEY in environment');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const STYLE_SUFFIX = 'Professional photography, high resolution, clean modern aesthetic, warm natural lighting, commercial quality. Do NOT include any text, logos, watermarks, labels, or branding overlays in the image.';

const images = [
  // Service images
  {
    filename: 'svc-auto-refinance.jpg',
    prompt: `A sleek modern sedan parked inside a bright, luxurious car dealership showroom. Polished floors reflecting the car. Clean, aspirational setting suggesting auto financing and refinancing. ${STYLE_SUFFIX}`,
  },
  {
    filename: 'svc-vehicle-coverage.jpg',
    prompt: `A luxury SUV being inspected by a professional technician in a modern, well-lit auto service bay. Diagnostic equipment visible. Clean environment conveying vehicle protection and coverage. ${STYLE_SUFFIX}`,
  },
  {
    filename: 'svc-home-refinance.jpg',
    prompt: `A beautiful modern two-story home with a manicured lawn at golden hour. Warm ambient lighting from windows. Welcoming and aspirational real estate photography suggesting home refinancing. ${STYLE_SUFFIX}`,
  },
  {
    filename: 'svc-auto-insurance.jpg',
    prompt: `A professional meeting in a modern office — an advisor presenting auto insurance options to a client. Clean desk, documents, and a laptop visible. Friendly, trustworthy atmosphere. ${STYLE_SUFFIX}`,
  },
  {
    filename: 'svc-life-insurance.jpg',
    prompt: `A happy family (parents and two children) walking together in a beautiful park at golden hour. Warm, protective, secure feeling. Life insurance and family protection concept. ${STYLE_SUFFIX}`,
  },
  {
    filename: 'svc-credit-consultations.jpg',
    prompt: `A financial advisor reviewing credit documents and charts with a client in a sleek modern office. Professional setting with warm lighting. Credit consultation and financial planning concept. ${STYLE_SUFFIX}`,
  },

  // Benefit images
  {
    filename: 'benefit-roadside.jpg',
    prompt: `A professional roadside assistance tow truck arriving to help a car on the side of a highway. Daytime, clear weather. Helpful, reliable service concept. ${STYLE_SUFFIX}`,
  },
  {
    filename: 'benefit-road-hazard.jpg',
    prompt: `Close-up of a car tire on a wet asphalt road. Focus on the tire tread with water droplets. Road hazard tire protection concept. Dramatic shallow depth of field. ${STYLE_SUFFIX}`,
  },
  {
    filename: 'benefit-rental.jpg',
    prompt: `A person receiving keys for a clean, modern rental car at a rental agency counter. Bright, professional setting. Rental car reimbursement benefit concept. ${STYLE_SUFFIX}`,
  },
  {
    filename: 'benefit-trip.jpg',
    prompt: `A scenic highway stretching into the distance through beautiful mountains at sunset. A car driving toward the horizon. Trip interruption coverage and road travel concept. ${STYLE_SUFFIX}`,
  },
  {
    filename: 'benefit-maintenance.jpg',
    prompt: `An auto technician performing routine maintenance on a car in a clean, modern service shop. Oil change or brake inspection in progress. Scheduled maintenance benefit concept. ${STYLE_SUFFIX}`,
  },
  {
    filename: 'benefit-extended.jpg',
    prompt: `A professional mechanic using advanced diagnostic tools to inspect a car engine in a modern auto shop. Extended warranty and vehicle protection concept. ${STYLE_SUFFIX}`,
  },

  // Page hero images
  {
    filename: 'car-loan3.jpg',
    prompt: `A car key fob resting on financial documents next to a calculator on a modern desk. Auto loan and financing calculation concept. Clean, professional overhead shot. ${STYLE_SUFFIX}`,
  },
  {
    filename: 'loan3.jpg',
    prompt: `A modern, bright office space with floor-to-ceiling windows overlooking a city skyline. A consultation table with chairs. Professional financial services atmosphere. ${STYLE_SUFFIX}`,
  },
  {
    filename: 'car-loan4.jpg',
    prompt: `A diverse professional business team in a modern conference room having a productive meeting. Corporate setting with glass walls and city view. Teamwork and expertise concept. ${STYLE_SUFFIX}`,
  },

  // Other marketing images
  {
    filename: 'car-hero.jpg',
    prompt: `A premium luxury sedan photographed in dramatic studio lighting with a dark background. Reflections on the polished body. Hero-style automotive photography. ${STYLE_SUFFIX}`,
  },
  {
    filename: 'car.jpg',
    prompt: `A luxury sports car photographed in a high-end studio with dramatic side lighting. Sleek lines and reflections. Premium automotive photography. ${STYLE_SUFFIX}`,
  },
  {
    filename: 'hero-garage.png',
    prompt: `Interior of a modern luxury car garage with dramatic moody lighting. Multiple premium vehicles visible. Dark tones with accent lighting highlighting the cars. ${STYLE_SUFFIX}`,
  },
  {
    filename: 'porsche-garage.jpg',
    prompt: `A premium sports car parked in an upscale private garage with polished concrete floors and modern architecture. Ambient warm lighting. Luxury lifestyle concept. ${STYLE_SUFFIX}`,
  },
  {
    filename: 'car-loan.jpg',
    prompt: `Car keys and a signed auto loan agreement on a wooden desk with a pen. Clean, professional flat lay composition suggesting auto financing approval. ${STYLE_SUFFIX}`,
  },
];

const DELAY_MS = 3000;
const MAX_RETRIES = 2;

async function generateImage(config) {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`  Generating: ${config.filename} (attempt ${attempt + 1})...`);

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: config.prompt,
        config: {
          responseModalities: ['IMAGE', 'TEXT'],
        },
      });

      // Extract image from response parts
      const parts = response?.candidates?.[0]?.content?.parts;
      if (!parts) {
        throw new Error('No parts in response');
      }

      for (const part of parts) {
        if (part.inlineData?.mimeType?.startsWith('image/')) {
          const imageBytes = Buffer.from(part.inlineData.data, 'base64');
          const outputPath = path.join(PUBLIC_DIR, config.filename);

          // Crop to 16:9 center crop and resize to 1792x1008
          const cropped = await sharp(imageBytes)
            .resize(1792, 1008, { fit: 'cover', position: 'centre' })
            .jpeg({ quality: 90 })
            .toBuffer();

          fs.writeFileSync(outputPath, cropped);
          const sizeKB = Math.round(cropped.length / 1024);
          console.log(`  Saved: ${config.filename} (${sizeKB} KB, 1792x1008 16:9)`);
          return true;
        }
      }

      throw new Error('No image data in response');
    } catch (error) {
      console.error(`  Error on ${config.filename}: ${error.message}`);
      if (attempt < MAX_RETRIES) {
        console.log(`  Retrying in ${DELAY_MS}ms...`);
        await new Promise((r) => setTimeout(r, DELAY_MS));
      } else {
        console.error(`  FAILED after ${MAX_RETRIES + 1} attempts: ${config.filename}`);
        return false;
      }
    }
  }
  return false;
}

async function main() {
  // Allow filtering by --only=filename
  const onlyArg = process.argv.find((a) => a.startsWith('--only='));
  const onlyFile = onlyArg?.split('=')[1];

  const toGenerate = onlyFile
    ? images.filter((img) => img.filename === onlyFile)
    : images;

  if (toGenerate.length === 0) {
    console.error(`No matching image found for: ${onlyFile}`);
    process.exit(1);
  }

  console.log(`\nGenerating ${toGenerate.length} image(s)...\n`);

  let succeeded = 0;
  let failed = 0;

  for (const img of toGenerate) {
    const ok = await generateImage(img);
    if (ok) succeeded++;
    else failed++;

    // Rate limit between images
    if (toGenerate.indexOf(img) < toGenerate.length - 1) {
      await new Promise((r) => setTimeout(r, DELAY_MS));
    }
  }

  console.log(`\nDone: ${succeeded} succeeded, ${failed} failed out of ${toGenerate.length} total.\n`);
  if (failed > 0) process.exit(1);
}

main();
