"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: React.ElementType;
  href?: string;
  [key: string]: unknown;
}

export function RainbowButton({
  children,
  className,
  as: Component = "button",
  ...props
}: RainbowButtonProps) {
  return (
    <Component
      className={cn(
        "group relative inline-flex animate-rainbow cursor-pointer items-center justify-center rounded-xl border-0 bg-[length:200%] px-8 py-4 font-semibold tracking-wide text-white transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-dpe-blue disabled:pointer-events-none disabled:opacity-50",

        // before styles - animated glow underneath
        "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]",

        // Apex navy background with brand gradient border
        "bg-[linear-gradient(#1A2158,#1A2158),linear-gradient(#1A2158_50%,rgba(26,33,88,0.6)_80%,rgba(26,33,88,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",

        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
