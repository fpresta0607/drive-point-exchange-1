import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Refinance Protect Benefits - Comprehensive Vehicle Coverage",
  description: "Comprehensive auto protection benefits including roadside assistance, road hazard coverage, rental car reimbursement, trip interruption, and maintenance benefits.",
  keywords: [
    "auto refinance protect",
    "vehicle coverage benefits",
    "roadside assistance",
    "road hazard coverage",
    "rental car reimbursement",
    "trip interruption coverage",
    "maintenance benefits",
    "extended vehicle protection"
  ],
  openGraph: {
    title: "Auto Refinance Protect Benefits - Comprehensive Vehicle Coverage",
    description: "Comprehensive auto protection benefits including roadside assistance, road hazard coverage, rental car reimbursement, and maintenance benefits.",
    images: [
      {
        url: "/auto/benefits-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Auto protection benefits",
      },
    ],
  },
  twitter: {
    title: "Auto Refinance Protect Benefits - Comprehensive Vehicle Coverage",
    description: "Comprehensive auto protection benefits including roadside assistance, road hazard coverage, and maintenance benefits.",
  },
  alternates: {
    canonical: "https://www.drivepointexchange.com/benefits",
  },
};

export default function BenefitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
