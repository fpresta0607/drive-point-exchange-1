import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable trailing slashes for better SEO
  trailingSlash: false,
  
  // Image optimization settings
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'https', hostname: '**.cdninstagram.com' },
      { protocol: 'https', hostname: '**.fbcdn.net' },
      { protocol: 'https', hostname: '**.tiktokcdn.com' },
      { protocol: 'https', hostname: 'widget.trustpilot.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
  
  // Headers for SEO and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '0',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://widget.trustpilot.com https://www.googletagmanager.com https://tagassistant.google.com https://www.google.com https://www.redditstatic.com https://www.instagram.com https://www.tiktok.com https://*.tiktokcdn-us.com https://connect.facebook.net https://va.vercel-scripts.com https://vitals.vercel-insights.com; style-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://fonts.googleapis.com; img-src 'self' data: blob: https://*.cdninstagram.com https://*.fbcdn.net https://*.tiktokcdn.com https://*.tiktokcdn-us.com https://widget.trustpilot.com https://*.google.com https://*.googleapis.com https://*.google-analytics.com https://*.googletagmanager.com https://*.gstatic.com https://alb.reddit.com https://images.unsplash.com https://plus.unsplash.com; font-src 'self' https://fonts.gstatic.com; frame-src https://www.google.com https://tagassistant.google.com https://www.googletagmanager.com https://www.tiktok.com https://*.tiktokcdn-us.com https://www.youtube-nocookie.com https://www.youtube.com https://widget.trustpilot.com; connect-src 'self' https://widget.trustpilot.com https://www.googletagmanager.com https://tagassistant.google.com https://www.google.com https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://va.vercel-scripts.com https://vitals.vercel-insights.com https://alb.reddit.com https://pixel-config.reddit.com https://www.redditstatic.com https://*.tiktokcdn-us.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'",
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
    ];
  },
  
  // Redirects for SEO (if needed)
  async redirects() {
    return [
      // Redirect non-www to www
      {
        source: '/(.*)',
        has: [
          {
            type: 'host',
            value: 'drivepointexchange.com',
          },
        ],
        destination: 'https://www.drivepointexchange.com/:path*',
        permanent: true,
      },
    ];
  },
  
  // Compression
  compress: true,
  
  // Power by header removal
  poweredByHeader: false,
  
  // React strict mode
  reactStrictMode: true,
  
  // Turbopack configuration - explicitly set root to this project
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
