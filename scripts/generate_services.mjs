import fs from 'fs';
import path from 'path';

const services = [
  {
    slug: 'auto-refinance',
    title: 'Auto Loan Refinance',
    description: [
      "Refinancing your auto loan with Drive Point Exchange can be one of the most effective ways to lower your monthly expenses and improve your financial standing. Our auto refinance solutions are designed to help you secure a better interest rate, reduce your monthly payments, or adjust your loan term to better fit your current lifestyle and budget.",
      "Whether your credit score has improved since you first purchased your vehicle, or general market interest rates have dropped, you shouldn't be stuck paying more than you have to. We work closely with a nationwide network of top-rated lenders to find the most competitive rates available for your specific profile.",
      "The process is fast, transparent, and completely hassle-free. We handle the heavy lifting, from paying off your old lender to transferring the title. Experience the peace of mind that comes with knowing you're getting the best possible deal on your automotive financing."
    ],
    features: ['Significantly lower monthly payments', 'Reduced interest rates based on updated credit', 'Flexible terms ranging from 12 to 84 months', 'No hidden penalties for early payoff', 'Seamless transition from your previous lender', 'Skip up to two payments during the transition'],
    image: '/auto/svc-auto-refinance.jpg'
  },
  {
    slug: 'vehicle-coverage',
    title: 'Vehicle Coverage & Certifications',
    description: [
      "In today's unpredictable automotive market, true peace of mind comes from knowing your vehicle is comprehensively protected against the unexpected. Since the post-COVID dealership inventory changes, many drivers are paying for certified coverage through third-party providers without their vehicle actually being verified on the dealer's paperwork. This loop-hole leaves you dangerously under-protected.",
      "At Drive Point Exchange, we specialize in authentic Vehicle Coverage and Certifications. We conduct a thorough audit of your current coverage to expose any hidden gaps or invalid protections. We then provide you with genuine, iron-clad extended warranty options that pick up exactly where your manufacturer warranty leaves off, ensuring you are never blindsided by exorbitant repair bills.",
      "From major engine block faults to electrical system failures and advanced driver-assistance systems (ADAS) calibrations, our premier protection plans cover the critical components that modern vehicles rely on."
    ],
    features: ['Comprehensive roadside assistance (24/7)', 'Zero-deductible options available on major repairs', 'Rental car reimbursement up to $50/day', 'Trip interruption overnight stipends', 'Nationwide repair facility acceptance', 'Coverage for high-tech electrical systems'],
    image: '/auto/svc-vehicle-coverage.jpg'
  },
  {
    slug: 'home-refinance',
    title: 'Home Refinance',
    description: [
      "Your home is likely your most valuable asset. Drive Point Exchange offers tailored Home Refinancing programs designed to help you tap into your home's equity, consolidate high-interest debts, or simply lower your monthly mortgage payments in an evolving economic landscape.",
      "Are you paying for expensive Private Mortgage Insurance (PMI)? If your home has appreciated in value, a home refinance can strip that unnecessary cost entirely. Looking to remodel, pay for a child's education, or consolidate credit cards? Cash-out refinancing gives you access to a lump sum of capital using the equity you've built over time.",
      "Our dedicated mortgage specialists review your current housing situation and long-term financial goals to structure a loan that saves you the maximum amount of money over the life of your mortgage, streamlining the application and appraisal processes to close faster than big-box banks."
    ],
    features: ['Drop Private Mortgage Insurance (PMI)', 'Cash-out refinancing for major life expenses', 'Transition from an Adjustable Rate (ARM) to Fixed-Rate', 'Streamlined credit and appraisal processes', 'Debt consolidation at lower interest rates', 'Flexible 15, 20, and 30-year fixed terms'],
    image: '/auto/svc-home-refinance.jpg'
  },
  {
    slug: 'auto-insurance',
    title: 'Auto Insurance Consulting',
    description: [
      "Navigating the complexities of auto insurance can feel overwhelming, with countless carriers offering policies that are often laden with confusing jargon and hidden exclusions. Drive Point Exchange acts as your dedicated advocate, analyzing your current policy line-by-line to ensure you hold the right coverage at the best possible price.",
      "We don't sell direct-to-consumer cookie-cutter policies. Instead, we consult and connect you with bespoke insurance frameworks tailored to your driving habits, vehicle type, and risk profile. By identifying overlapping coverage areas and optimizing your deductibles, we consistently help our clients save hundreds of dollars annually without sacrificing protection.",
      "Whether you're insuring a daily-commuter sedan, a high-value sports car, or setting up a multi-vehicle family policy, our consulting guarantees you remain compliant, fully protected against uninsured motorists, and financially shielded from catastrophic liability claims."
    ],
    features: ['In-depth policy audit and overlap identification', 'Uninsured/Underinsured motorist safeguards', 'Comprehensive and collision optimization', 'Multi-policy discount leveraging', 'Teen driver cost mitigation strategies', 'Direct connections to top-tier underwriters'],
    image: '/auto/svc-auto-insurance.jpg'
  },
  {
    slug: 'life-insurance',
    title: 'Life Insurance Solutions',
    description: [
      "Protecting your loved ones against life's uncertainties is the foundation of true financial planning. Drive Point Exchange offers bespoke life insurance consulting designed to safeguard your family's future, ensuring that your financial obligations—from mortgage payouts to childhood education—are completely secured in the event of tragedy.",
      "We help you decode the complexities of Term Life, Whole Life, and Universal Life policies. By analyzing your long-term liabilities, current assets, and dependent timeline, we calculate the exact death benefit required to keep your family comfortable, mitigating the risk of being under-insured or over-paying for unnecessary riders.",
      "Beyond basic death benefits, we explore cash-value accumulation strategies and living benefits, enabling your life insurance policy to function as a dynamic tax-advantaged asset within your broader financial portfolio."
    ],
    features: ['Term life policies customized (10, 20, 30 years)', 'Whole life guidance for permanent protection', 'Living benefit riders for critical illnesses', 'Tax-advantaged cash value accumulation', 'No-medical-exam approval options', 'Coverage calculation against major debts (mortgages)'],
    image: '/auto/svc-life-insurance.jpg'
  },
  {
    slug: 'credit-consultations',
    title: 'Credit Consultations',
    description: [
      "Your credit score is the foundational metric that dictates your borrowing power, interest rates, and overall financial mobility. At Drive Point Exchange, our expert Credit Consultation service empowers you to take control of your financial narrative by systematically identifying and disputing inaccuracies, while building a roadmap toward prime credit tiers.",
      "We perform an exhaustive tri-bureau analysis to pinpoint exactly what is pulling your score down. From late payment negations to high credit utilization ratios, our experienced advisors walk you through aggressive yet verified tactics to rapidly boost your FICO scores. We don't just tell you what's wrong; we help you fix it.",
      "Ultimately, a higher credit score saves you tens of thousands of dollars over your lifetime in reduced interest margins on vehicles, mortgages, and personal loans. Let us give you the strategic playbook to achieve elite credit standing."
    ],
    features: ['Tri-bureau (Equifax, Experian, TransUnion) analysis', 'Aggressive dispute of inaccuracies and collections', 'Credit utilization optimization strategies', 'Debt-to-income (DTI) ratio improvement plans', 'Negotiation assistance for outstanding debts', 'Long-term wealth building roadmaps'],
    image: '/auto/svc-credit-consultations.jpg'
  }
];

const template = (service) => `'use client';

import React from 'react';
import ServiceLayout from '../../../components/ServiceLayout';

export default function Page() {
  return (
    <ServiceLayout
      title={\`${service.title}\`}
      description={[
        ${service.description.map(desc => `\`${desc}\``).join(',\n        ')}
      ]}
      features={[
        ${service.features.map(f => `\`${f}\``).join(',\n        ')}
      ]}
      imageSrc="${service.image}"
    />
  );
}
`;

for (const service of services) {
  const dirPath = path.join(process.cwd(), 'app', 'services', service.slug);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), template(service), 'utf8');
}

console.log('Regenerated all service pages with robust extended copy.');
