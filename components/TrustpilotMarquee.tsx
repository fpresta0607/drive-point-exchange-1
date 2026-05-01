'use client';

import React from 'react';
import { Marquee } from '@/components/ui/marquee';

const StarIcon = ({ className = 'w-4 h-4 text-white' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const StarsRow = () => (
  <span className="flex items-center gap-0.5" aria-hidden>
    {[0, 1, 2, 3, 4].map(i => (
      <span key={i} className="flex items-center justify-center w-6 h-6 bg-dpe-green-500">
        <StarIcon />
      </span>
    ))}
  </span>
);

const Sep = () => (
  <span aria-hidden className="block w-1 h-1 rounded-full bg-white/25" />
);

const Item = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 whitespace-nowrap text-sm">{children}</div>
);

function TrustTrack() {
  return (
    <div className="flex items-center gap-8 whitespace-nowrap">
      <Item>
        <StarsRow />
        <span className="text-white font-semibold tracking-wide">Excellent</span>
      </Item>

      <Sep />

      <Item>
        <span className="text-white font-bold text-base">4.9</span>
        <span className="text-white/45">out of 5</span>
      </Item>

      <Sep />

      <Item>
        <span className="text-white/45">Based on</span>
        <span className="text-white font-medium">1,200+ verified reviews</span>
      </Item>

      <Sep />

      <Item>
        <StarIcon className="w-3.5 h-3.5 text-dpe-green-500" />
        <span className="text-white font-medium">
          &ldquo;Saved $180/mo on my auto loan.&rdquo;
        </span>
        <span className="text-white/45">— David K., Texas</span>
      </Item>

      <Sep />

      <Item>
        <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-white/45">
          Nationwide
        </span>
        <span className="text-white font-medium">Auto financing in all 50 states</span>
      </Item>

      <Sep />

      <Item>
        <StarIcon className="w-3.5 h-3.5 text-dpe-green-500" />
        <span className="text-white font-medium">
          &ldquo;Refinance closed in under a week.&rdquo;
        </span>
        <span className="text-white/45">— Marisol R., Arizona</span>
      </Item>

      <Sep />

      <Item>
        <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-white/45">
          No fees
        </span>
        <span className="text-white font-medium">No obligations, no surprises</span>
      </Item>

      <Sep />

      <Item>
        <StarIcon className="w-3.5 h-3.5 text-dpe-green-500" />
        <span className="text-white font-medium">
          &ldquo;Lowest rate I could find anywhere.&rdquo;
        </span>
        <span className="text-white/45">— James P., Florida</span>
      </Item>

      <Sep />

      <Item>
        <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-white/45">
          On
        </span>
        <span className="inline-flex items-center gap-1.5 text-white font-semibold">
          <StarIcon className="w-4 h-4 text-dpe-green-500" />
          Trustpilot
        </span>
        <svg
          className="w-4 h-4 text-white/55 transition-transform group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </Item>
    </div>
  );
}

export default function TrustpilotMarquee() {
  return (
    <a
      href="https://www.trustpilot.com/review/drivepointexchange.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View Drive Point Exchange reviews on Trustpilot"
      className="block w-full bg-slate-950 border-t border-b border-white/[0.08] py-6 group"
    >
      <Marquee duration="80s" gap="2.5rem" pauseOnHover repeat={2}>
        <TrustTrack />
      </Marquee>
    </a>
  );
}
