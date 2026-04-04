import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Drive Point Exchange - Chicago Auto Financing Experts",
  description: "Contact Drive Point Exchange for personalized auto financing assistance. Located in Chicago, IL. Call (888) 990-7112 or email support@drivepointexchange.com for expert advice.",
  keywords: [
    "contact apex auto solutions",
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
  return children;
}
