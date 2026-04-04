import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions - Drive Point Exchange Legal Terms",
  description: "Terms and conditions for Drive Point Exchange auto financing services. Read our legal terms, disclaimers, and service agreements.",
  keywords: [
    "terms and conditions",
    "legal terms",
    "service agreement",
    "auto financing terms",
    "loan terms",
    "legal disclaimer",
    "terms of service",
    "user agreement"
  ],
  openGraph: {
    title: "Terms and Conditions - Drive Point Exchange Legal Terms",
    description: "Terms and conditions for Drive Point Exchange auto financing services. Read our legal terms and service agreements.",
  },
  twitter: {
    title: "Terms and Conditions - Drive Point Exchange Legal Terms",
    description: "Terms and conditions for Drive Point Exchange auto financing services.",
  },
  alternates: {
    canonical: "https://www.drivepointexchange.com/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
