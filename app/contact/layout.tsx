import type { Metadata } from "next";
import { getFAQSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Contact Drive Point Exchange - Chicago Auto Financing Experts",
  description: "Contact Drive Point Exchange for personalized auto financing assistance. Located in Chicago, IL. Call (888) 990-7112 or email support@drivepointexchange.com for expert advice.",
  keywords: [
    "contact drive point exchange",
    "Chicago auto financing",
    "auto loan consultation",
    "Chicago auto loans",
    "Illinois car financing",
    "auto financing experts",
    "auto loan help",
    "Chicago financial services"
  ],
  openGraph: {
    title: "Contact Drive Point Exchange - Chicago Auto Financing Experts",
    description: "Contact Drive Point Exchange for personalized auto financing assistance. Located in Chicago, IL. Call (888) 990-7112 for expert advice.",
    images: [
      {
        url: "/auto/car-loan3.jpg",
        width: 1200,
        height: 630,
        alt: "Contact us for auto financing",
      },
    ],
  },
  twitter: {
    title: "Contact Drive Point Exchange - Chicago Auto Financing Experts",
    description: "Contact Drive Point Exchange for personalized auto financing assistance. Located in Chicago, IL.",
  },
  alternates: {
    canonical: "https://www.drivepointexchange.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faqSchema = getFAQSchema([
    {
      question: "How quickly can I get approved for auto refinancing?",
      answer:
        "Most auto refinance applications are reviewed and approved within 24-48 hours. Once approved, the transition from your old lender is handled entirely by our team.",
    },
    {
      question: "Will refinancing affect my credit score?",
      answer:
        "A soft credit inquiry is used for initial pre-qualification, which does not affect your score. A hard inquiry is only performed once you choose to proceed with a specific offer.",
    },
    {
      question: "What documents do I need to apply?",
      answer:
        "You'll typically need a valid driver's license, proof of income (recent pay stubs or tax returns), your current loan statement, and vehicle registration.",
    },
    {
      question: "Do you serve customers outside of Illinois?",
      answer:
        "Yes, Drive Point Exchange serves customers nationwide across all 50 states. Our lending network and insurance partnerships have nationwide coverage.",
    },
    {
      question: "Is there a fee for your consultation services?",
      answer:
        "Initial consultations for all our services — auto refinancing, vehicle coverage, home refinance, insurance, and credit — are completely free with no obligation.",
    },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
