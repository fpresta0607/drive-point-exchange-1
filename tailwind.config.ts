import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Drive Point Exchange brand colors
        dpe: {
          // Blue from car silhouette / DPE primary (#1934B5)
          blue: {
            50: '#eef1fd',
            100: '#e0e6fb',
            200: '#c7d2f8',
            300: '#a3b5f3',
            400: '#7890ec',
            500: '#536ae2',
            600: '#3b4bd4',
            700: '#2e36b8',
            800: '#1934b5', // Anchor DPE Blue
            900: '#182570',
          },
          // Green from Upward Arrows / DPE accent (#2DB843)
          green: {
            50: '#edfcf0',
            100: '#d4f8db',
            200: '#aeefbc',
            300: '#78df92',
            400: '#46c666',
            500: '#2db843', // Anchor DPE Green
            600: '#1c942f',
            700: '#187528',
            800: '#165d23',
            900: '#134d1f',
          },
          // Dark gray for text
          gray: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151', // Main text color
            800: '#1f2937',
            900: '#111827',
          }
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        "color-1": "hsl(var(--color-1))",
        "color-2": "hsl(var(--color-2))",
        "color-3": "hsl(var(--color-3))",
        "color-4": "hsl(var(--color-4))",
        "color-5": "hsl(var(--color-5))",
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'Outfit', 'system-ui', 'sans-serif'],
        saira: ['var(--font-saira)', 'Saira', 'system-ui', 'sans-serif'],
        display: ['var(--font-saira)', 'Saira', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/hero-bg.jpg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'dpe': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'dpe-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 10px 30px -10px rgba(16,24,40,.12)',
      },
      borderRadius: {
        'dpe': '12px',
      },
      animation: {
        rainbow: "rainbow var(--speed, 2s) infinite linear",
      },
      keyframes: {
        rainbow: {
          "0%": { "background-position": "0%" },
          "100%": { "background-position": "200%" },
        },
      },
    },
  },
  plugins: [],
}

export default config
