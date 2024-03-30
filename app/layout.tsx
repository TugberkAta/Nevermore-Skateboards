import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import "../common/styles/globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nevermore Skateboards - Premium Skateboarding Gear and Lifestyle",
  keywords:
    "Nevermore Skateboards, premium skateboarding gear, skateboard lifestyle, high-quality skateboards, skateboarding community, skate apparel, skate accessories",
  description:
    "Welcome to Nevermore Skateboards, where skateboarding is not just a sport, but a lifestyle. Immerse yourself in our world of high-quality skateboards, gear, and apparel designed for enthusiasts who live and breathe skateboarding. Join our vibrant community and elevate your skateboarding experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full" lang="en">
      <body className={`${inter.className} h-full`}>{children}</body>
      <SpeedInsights />
      <Analytics />
    </html>
  );
}
