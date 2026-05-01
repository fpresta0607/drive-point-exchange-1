'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionKicker } from './ui/section-kicker';

interface ServiceCTAProps {
  kicker: string;
  title: string;
  subtitle: string;
}

export default function ServiceCTA({ kicker, title, subtitle }: ServiceCTAProps) {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = prefersReducedMotion
    ? { initial: {}, animate: {}, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { type: 'spring' as const, stiffness: 260, damping: 20 },
      };

  const staggerChildren = prefersReducedMotion
    ? { animate: {} }
    : { animate: { transition: { staggerChildren: 0.05 } } };

  return (
    <section className="py-28 bg-white border-t border-slate-200/70">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerChildren}
          className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-end"
        >
          <div>
            <motion.div variants={fadeInUp}>
              <SectionKicker align="left" tone="green">
                {kicker}
              </SectionKicker>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl text-slate-950 mb-6 tracking-[-0.025em] leading-[1.02]"
            >
              {title}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-500 font-light leading-relaxed mb-9 max-w-xl"
            >
              {subtitle}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-slate-950 text-white text-sm font-semibold tracking-wide hover:bg-slate-800 transition-colors"
              >
                Start your application
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>

          <motion.div
            variants={fadeInUp}
            className="border-l border-slate-200 pl-8 py-2 lg:py-6"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 mb-2">
              Main office
            </p>
            <a
              href="tel:+18883510782"
              className="text-3xl lg:text-4xl font-bold text-slate-950 hover:text-dpe-green transition-colors tracking-[-0.02em]"
            >
              (888) 351-0782
            </a>
            <p className="text-sm text-slate-500 font-light mt-3 leading-relaxed">
              Speak with a financing specialist — no obligations, no fees.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
