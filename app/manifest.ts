import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Drive Point Exchange",
    short_name: "DPE",
    description:
      "Auto loan refinancing, vehicle coverage, home refinance, insurance consulting, and credit consultations.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0E1A56",
    icons: [
      { src: "/favicon.PNG", sizes: "192x192", type: "image/png" },
      { src: "/favicon.PNG", sizes: "512x512", type: "image/png" },
    ],
  };
}
