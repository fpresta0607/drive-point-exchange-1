'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { useI18n } from '../../lib/i18n/context';
import { LightningBg } from '../../components/ui/lightning-bg';

export default function ServicesHub() {
  const { ts } = useI18n();
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = prefersReducedMotion
    ? { initial: {}, animate: {}, transition: { duration: 0 } }
    : { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { type: "spring", stiffness: 100, damping: 15 } };

  const staggerChildren = prefersReducedMotion
    ? { animate: {} }
    : { animate: { transition: { staggerChildren: 0.12 } } };
  
  const servicesList = [
    {
      title: ts('home.services.autoRefinance.title'),
      description: ts('home.services.autoRefinance.description'),
      image: "/auto/svc-auto-refinance.jpg",
      href: "/services/auto-refinance",
      category: "Auto Refinance"
    },
    {
      title: ts('home.services.vehicleCoverage.title'),
      description: ts('home.services.vehicleCoverage.description'),
      image: "/auto/svc-vehicle-coverage.jpg",
      href: "/services/vehicle-coverage",
      category: "Coverage & Protection"
    },
    {
      title: ts('home.services.homeRefinance.title'),
      description: ts('home.services.homeRefinance.description'),
      image: "/auto/svc-home-refinance.jpg",
      href: "/services/home-refinance",
      category: "Home Loans"
    },
    {
      title: ts('home.services.insuranceConsultation.title'),
      description: ts('home.services.insuranceConsultation.description'),
      image: "/auto/svc-auto-insurance.jpg",
      href: "/services/auto-insurance",
      category: "Consulting"
    },
    {
      title: ts('home.services.lifeInsurance.title'),
      description: ts('home.services.lifeInsurance.description'),
      image: "/auto/svc-life-insurance.jpg",
      href: "/services/life-insurance",
      category: "Consulting"
    },
    {
      title: ts('home.services.creditSavings.title'),
      description: ts('home.services.creditSavings.description'),
      image: "/auto/svc-credit-consultations.jpg",
      href: "/services/credit-consultations",
      category: "Financial"
    }
  ];

  return (
    <div className="min-h-screen bg-dpe-bg">
      <Navigation overlay />
      
      {/* ─── ENHANCED HERO HUB ─── */}
      <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Deep Navy/Gradient Background matching Home Page aesthetic */}
        <div className="absolute inset-0 bg-dpe-navy-deep">
          {/* Subtle image blend */}
          <div className="absolute inset-0 opacity-30 mix-blend-screen">
             <Image src="/auto/car.jpg" alt="Drive Point Exchange Services" fill className="object-cover" priority />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-dpe-bg via-transparent to-transparent z-10" />
        </div>
        
        {/* DPE Green & Blue Ambient Lightning */}
        <div className="absolute top-0 left-0 w-full z-[4] mix-blend-screen pointer-events-none opacity-80 animate-lightning-blue">
          <LightningBg hue={230} xOffset={0.2} intensity={0.6} speed={0.4} size={4} />
        </div>
        <div className="absolute bottom-0 right-0 w-full z-[5] mix-blend-screen pointer-events-none opacity-40 animate-lightning-red">
           <LightningBg hue={140} xOffset={0.8} intensity={0.3} speed={0.3} size={2.5} />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center mt-10">
          <motion.div initial="initial" animate="animate" variants={staggerChildren}>
            <motion.p variants={fadeInUp} className="text-dpe-green font-semibold tracking-[0.2em] uppercase mb-4 text-sm md:text-base">
              Comprehensive Financial Solutions
            </motion.p>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 font-saira leading-tight">
              {ts('services.hero.title')}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
               {ts('services.hero.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Grid Hub Section */}
      <section className="py-24 bg-dpe-bg relative z-30 -mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {servicesList.map((service, index) => (
              <Link href={service.href} key={index} className="block group">
                <motion.div
                  variants={fadeInUp}
                  className="bg-white rounded-2xl overflow-hidden shadow-dpe border border-gray-100 hover:shadow-dpe-lg hover:-translate-y-2 transition-all duration-300 h-full flex flex-col"
                >
                  <div className="relative h-60 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-dpe-green mb-2 block">
                        {service.category}
                      </span>
                      <h3 className="text-2xl font-bold text-white font-saira">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <p className="text-gray-600 line-clamp-3 mb-6">
                      {service.description}
                    </p>
                    <div className="flex items-center text-dpe-blue font-semibold group-hover:text-dpe-blue-light transition-colors">
                      Learn More
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dpe-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <h2 className="text-4xl font-bold text-white mb-6 font-saira">
              {ts('services.cta.title')}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Contact us today to learn more about our services and how we can help you achieve your financial goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-dpe-green hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all text-center"
              >
                {ts('services.cta.contactUs')}
              </Link>
            </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}