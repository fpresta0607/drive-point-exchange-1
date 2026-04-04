'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import Navigation from './Navigation';
import Footer from './Footer';

interface ServiceLayoutProps {
  title: string;
  description: string | string[];
  features: string[];
  imageSrc: string;
}

export default function ServiceLayout({ title, description, features, imageSrc }: ServiceLayoutProps) {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = prefersReducedMotion
    ? { initial: {}, animate: {}, transition: { duration: 0 } }
    : { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

  const staggerChildren = prefersReducedMotion
    ? { animate: {} }
    : { animate: { transition: { staggerChildren: 0.1 } } };

  return (
    <div className="min-h-screen bg-dpe-bg">
      <Navigation overlay />
      
      {/* Hero Header */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-dpe-navy-deep/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-dpe-bg via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial="initial" animate="animate" variants={staggerChildren}>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-saira">
              {title}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 -mt-32 relative z-20 border border-gray-100"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-900 mb-6 font-saira">
              Overview
            </motion.h2>
            {Array.isArray(description) ? (
              description.map((paragraph, idx) => (
                <motion.p key={idx} variants={fadeInUp} className="text-lg text-gray-600 leading-relaxed mb-6">
                  {paragraph}
                </motion.p>
              ))
            ) : (
              <motion.p variants={fadeInUp} className="text-lg text-gray-600 leading-relaxed mb-10">
                {description}
              </motion.p>
            )}
            
            <motion.h3 variants={fadeInUp} className="text-2xl font-bold text-gray-900 mb-6 font-saira">
              Key Benefits
            </motion.h3>
            <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-dpe-green/20 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-dpe-green"></span>
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-gray-100">
               <Link
                href="/calculator"
                className="bg-dpe-blue hover:bg-[#4A6FE0] text-white font-semibold py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all text-center"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/contact"
                className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-4 px-8 rounded-lg transition-all text-center"
              >
                Contact an Expert
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
