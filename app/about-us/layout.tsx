import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Drive Point Exchange - Trusted Auto Financing Since 2012",
  description: "Learn about Drive Point Exchange, a trusted auto financing company serving customers nationwide since 2012. Featured in Forbes with 10,000+ satisfied customers.",
  keywords: [
    "about drive point exchange",
    "auto financing company",
    "Detroit auto loans",
    "trusted auto lender",
    "Forbes featured",
    "auto financing history",
    "customer testimonials",
    "auto loan company"
  ],
  openGraph: {
    title: "About Drive Point Exchange - Trusted Auto Financing Since 2012",
    description: "Learn about Drive Point Exchange, a trusted auto financing company serving customers nationwide since 2012. Featured in Forbes with 10,000+ satisfied customers.",
    images: [
      {
        url: "/auto/car-loan4.jpg",
        width: 1200,
        height: 630,
        alt: "Professional team meeting",
      },
    ],
  },
  twitter: {
    title: "About Drive Point Exchange - Trusted Auto Financing Since 2012",
    description: "Learn about Drive Point Exchange, a trusted auto financing company serving customers nationwide since 2012.",
  },
  alternates: {
    canonical: "https://www.drivepointexchange.com/about-us",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
