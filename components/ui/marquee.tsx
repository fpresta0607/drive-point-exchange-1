'use client';

import { cn } from '@/lib/utils';
import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';

interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  reverse?: boolean;
  pauseOnHover?: boolean;
  repeat?: number;
  duration?: string;
  gap?: string;
  children: ReactNode;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  repeat = 4,
  duration = '40s',
  gap = '2rem',
  children,
  ...props
}: MarqueeProps) {
  const style = { '--duration': duration, '--gap': gap } as CSSProperties;

  return (
    <div
      {...props}
      style={{ ...style, ...(props.style ?? {}) }}
      className={cn('marquee-container group flex overflow-hidden [gap:var(--gap)]', className)}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 ? true : undefined}
          className={cn(
            'flex shrink-0 items-center justify-around [gap:var(--gap)]',
            reverse ? 'animate-marquee-reverse' : 'animate-marquee',
            pauseOnHover && 'marquee-pause-on-hover'
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
