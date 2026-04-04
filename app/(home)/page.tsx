'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Navigation from '../../components/Navigation';
import { AutoLoanRefinanceCalculator } from '../../components/ui/auto-loan-refinance-calculator';
import Footer from '../../components/Footer';
import { useI18n } from '../../lib/i18n/context';
import TrustpilotReviews from '../../components/TrustpilotReviews';
import SocialFeed from '../../components/SocialFeed';
import { HyperText } from '../../components/ui/hyper-text';

export default function Home() {
  const { ts } = useI18n();
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = prefersReducedMotion
    ? { initial: {}, animate: {}, transition: { duration: 0 } }
    : { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { type: "spring", stiffness: 100, damping: 15 } };

  const fadeInRight = prefersReducedMotion
    ? { initial: {}, animate: {}, transition: { duration: 0 } }
    : { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 }, transition: { type: "spring", stiffness: 100, damping: 15 } };

  const staggerChildren = prefersReducedMotion
    ? { animate: {} }
    : { animate: { transition: { staggerChildren: 0.12 } } };

  const services = [
    {
      title: ts('home.services.autoRefinance.title'),
      description: ts('home.services.autoRefinance.description'),
      image: "/auto/svc-auto-refinance.jpg",
      href: "/services",
      category: "Auto Refinance",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      title: ts('home.services.vehicleCoverage.title'),
      description: ts('home.services.vehicleCoverage.description'),
      image: "/auto/svc-vehicle-coverage.jpg",
      href: "/services",
      category: "Coverage & Protection",
      span: "md:row-span-2",
    },
    {
      title: ts('home.services.homeRefinance.title'),
      description: ts('home.services.homeRefinance.description'),
      image: "/auto/svc-home-refinance.jpg",
      href: "/services",
      category: "Home Loans",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      title: ts('home.services.insuranceConsultation.title'),
      description: ts('home.services.insuranceConsultation.description'),
      image: "/auto/svc-auto-insurance.jpg",
      href: "/services",
      category: "Consulting",
      span: "md:row-span-2",
    },
    {
      title: ts('home.services.lifeInsurance.title'),
      description: ts('home.services.lifeInsurance.description'),
      image: "/auto/svc-life-insurance.jpg",
      href: "/services",
      category: "Consulting",
      span: "",
    },
    {
      title: ts('home.services.creditSavings.title'),
      description: ts('home.services.creditSavings.description'),
      image: "/auto/svc-credit-consultations.jpg",
      href: "/services",
      category: "Financial",
      span: "md:col-span-2",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navigation overlay />

      {/* ─── HERO ─── full viewport, nav overlays */}
      <section className="relative min-h-[100svh] w-full flex flex-col justify-center overflow-hidden pt-20 pb-40">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 bg-slate-900 pointer-events-none">
          <motion.div
            animate={{
              scale: [1.02, 1.12, 1.02],
              x: ["0%", "-1%", "0%"],
              y: ["0%", "1%", "0%"],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image 
              src="/auto/final-hero.png" 
              alt="Garage Background" 
              fill 
              sizes="100vw" 
              className="object-cover opacity-100" 
              priority 
              unoptimized
            />
          </motion.div>
          {/* Base tint matching DPE's dark identity - Lightened */}
          <div className="absolute inset-0 bg-slate-950/40" />
          
          {/* Rich gradient overlay to ensure text pops without hiding the image */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/80" />
          
          {/* Mountain-like geometric overlay for subtle texture */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
          
          {/* Dynamic lighting effect to enhance modern feel */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-dpe-green/20 rounded-full blur-[150px] opacity-60 mix-blend-screen translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Removed foreground lighting component to make the page cleaner. */}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full flex flex-col gap-8 lg:gap-12 items-center">
          {/* Top — Text */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            className="space-y-4 lg:space-y-6 w-full max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <p className="text-xs tracking-[0.25em] uppercase text-gray-300 font-medium mb-3 lg:mb-4">
                Nationwide Coverage
              </p>
              <h1 className="font-saira !text-5xl md:!text-6xl lg:!text-7xl font-bold text-white tracking-tight leading-[1.1]">
                {ts('home.hero.title')}
              </h1>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-6 sm:gap-10 mt-6 lg:mt-8 max-w-4xl mx-auto border-t border-white/10 pt-6 lg:pt-8">
              <div className="flex-1 text-center sm:text-left">
                <p className="!text-2xl md:!text-3xl text-white leading-relaxed font-saira font-semibold mb-2">
                  Your journey to financial freedom starts here.
                </p>
                <p className="!text-sm md:!text-base text-gray-300 leading-relaxed max-w-lg mx-auto sm:mx-0">
                  Take control of your auto loan today. We offer nationwide coverage, flexible terms, and expert guidance every step of the way.
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full sm:w-56 shrink-0">
                <Link
                  href="/contact"
                  className="bg-dpe-green hover:bg-green-600 text-white font-semibold py-3 lg:py-4 px-6 rounded-xl font-saira tracking-wide transition-all duration-200 text-center shadow-lg shadow-green-900/30 w-full hover:-translate-y-1"
                >
                  Get Started
                </Link>
                <Link
                  href="/services"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-3 lg:py-4 px-6 rounded-xl font-saira tracking-wide transition-all duration-200 text-center border border-white/15 w-full hover:-translate-y-1"
                >
                  {ts('home.hero.learnMore')}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── CALCULATOR BODY ─── (Pulled over the hero section fold) */}
      <section className="relative z-20 w-full max-w-6xl mx-auto px-4 -mt-[112px] md:-mt-[128px] pb-24">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="relative w-full"
        >
          <AutoLoanRefinanceCalculator />
        </motion.div>
      </section>

      {/* ─── SERVICES BENTO GRID ─── */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 border border-dpe-green/20 bg-dpe-green/5 rounded-full px-4 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-dpe-green" />
              <span className="text-sm font-medium text-dpe-green">Our Services</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="font-saira text-3xl sm:text-4xl font-bold text-gray-900">
              {ts('home.services.title')}
            </motion.h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] md:auto-rows-[240px] gap-3"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`relative overflow-hidden rounded-xl group cursor-pointer ${service.span}`}
              >
                <Link href={service.href} className="absolute inset-0 z-10" aria-label={service.title} />
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes={service.span.includes('md:col-span-2') ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
                  className="object-cover transition-all duration-500"
                />
                {/* Hover glow ring */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ring-1 ring-inset ring-white/20 shadow-[inset_0_0_30px_rgba(59,130,246,0.15)]" />
                {/* Darken overlay on hover for text contrast */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500" />
                {/* Bottom gradient for text readability */}
                <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-dpe-green mb-1">
                    {service.category}
                  </span>
                  <h3 className="font-saira text-sm md:text-base lg:text-lg font-bold text-white uppercase tracking-wide mb-0.5">
                    {service.title}
                  </h3>
                  <p className="text-white/90 text-xs leading-relaxed line-clamp-1 max-w-sm mb-2">
                    {service.description}
                  </p>
                  <div className="border-t border-white/15 pt-2">
                    <span className="text-dpe-green font-semibold text-xs inline-flex items-center gap-1.5 uppercase tracking-wider group-hover:gap-2.5 transition-all duration-200">
                      {ts('home.services.learnMore')}
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── TRUST ─── */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 border border-slate-200 bg-slate-50 rounded-full px-4 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-dpe-blue" />
              <span className="text-sm font-medium text-dpe-slate">Trusted Nationwide</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="font-saira text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {ts('home.trust.title')}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-500">
              {ts('home.trust.subtitle')}
            </motion.p>
          </motion.div>

          {/* Trustpilot Reviews */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12"
          >
            <TrustpilotReviews />
          </motion.div>

          {/* Forbes Recognition */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center px-4 sm:px-6"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
              <Image
                src="/auto/forbes.png"
                alt="As seen in Forbes"
                width={500}
                height={150}
                className="opacity-70 hover:opacity-100 transition-opacity duration-300 w-full max-w-[250px] md:max-w-lg md:flex-1"
              />
              <Image
                src="/auto/Forbes-Logo-1999-present.png"
                alt="Featured in Forbes"
                width={500}
                height={150}
                className="opacity-70 hover:opacity-100 transition-opacity duration-300 w-full max-w-[250px] md:max-w-lg md:flex-1"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <SocialFeed />

      {/* ─── CTA ─── */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 border border-dpe-green/20 bg-dpe-green/5 rounded-full px-4 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-dpe-green animate-pulse" />
              <span className="text-sm font-medium text-dpe-green">Get Started Today</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="font-saira text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {ts('home.cta.title')}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
              {ts('home.cta.subtitle')}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/contact"
                className="text-center bg-dpe-green hover:bg-green-600 text-white font-semibold py-3.5 px-8 rounded-xl shadow-lg shadow-green-900/15 transition-all duration-200"
              >
                {ts('home.cta.getStarted')}
              </Link>
              <Link
                href="/services"
                className="text-center bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3.5 px-8 rounded-xl transition-all duration-200"
              >
                {ts('home.cta.learnMore')}
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 bg-[#f8fafc] border border-gray-100 rounded-2xl px-8 py-6"
            >
              <div className="text-center sm:text-left">
                <p className="text-sm text-gray-400 mb-1">Main Office</p>
                <a href="tel:+18889907112" className="text-xl font-bold text-gray-900 hover:text-dpe-green transition-colors">
                  (888) 990-7112
                </a>
              </div>
              <div className="hidden sm:block w-px h-10 bg-gray-200" />
              <div className="text-center sm:text-left">
                <p className="text-sm text-gray-400 mb-1">Customer Support — 24/7</p>
                <a href="tel:+17737821005" className="text-xl font-bold text-gray-900 hover:text-dpe-green transition-colors">
                  (773) 782-1005
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
