import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Loan Calculator & Home Loan Calculator - Free Tools",
  description: "Free auto loan calculator and home loan calculator tools. Calculate monthly payments, interest rates, and loan terms. Get instant estimates for auto and home financing.",
  keywords: [
    "auto loan calculator",
    "home loan calculator",
    "car loan calculator",
    "mortgage calculator",
    "loan payment calculator",
    "auto financing calculator",
    "home financing calculator",
    "loan calculator tool"
  ],
  openGraph: {
    title: "Auto Loan Calculator & Home Loan Calculator - Free Tools",
    description: "Free auto loan calculator and home loan calculator tools. Calculate monthly payments, interest rates, and loan terms.",
    images: [
      {
        url: "/auto/loan3.jpg",
        width: 1200,
        height: 630,
        alt: "Financial calculator tools",
      },
    ],
  },
  twitter: {
    title: "Auto Loan Calculator & Home Loan Calculator - Free Tools",
    description: "Free auto loan calculator and home loan calculator tools. Calculate monthly payments, interest rates, and loan terms.",
  },
  alternates: {
    canonical: "https://www.drivepointexchange.com/calculator",
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
