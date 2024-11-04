// src/app/api/manifest/route.ts

import { NextResponse } from "next/server";
import { ogSiteName, shortSiteName } from "@/app/layout";

export async function GET() {
  const manifestData = {
    id: "1",
    name: ogSiteName,
    short_name: shortSiteName,
    icons: [
      {
        src: "/icons/Icon.png",
        sizes: "57x57",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/Icon-Notification@3x.png",
        sizes: "60x60",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/Icon-72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/Icon-76.png",
        sizes: "76x76",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/Icon@2x.png",
        sizes: "114x114",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/Icon-60@2x.png",
        sizes: "120x120",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/Icon-72@2x.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/Icon-76@2x.png",
        sizes: "152x152",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/Icon-60@3x.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/xxxhdpi.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/ico-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    theme_color: "#FFFFFF",
    background_color: "#FFFFFF",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    form_factor: "wide",
    related_applications: [
      {
        platform: "web",
        url: "/",
        id: ogSiteName,
      },
    ],
  };

  return NextResponse.json(manifestData);
}
