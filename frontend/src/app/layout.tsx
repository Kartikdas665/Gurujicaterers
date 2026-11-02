import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guruji Caterers | Royal Catering & Event Specialists",
  description: "Elevate your next event with Guruji Caterers. We specialize in bespoke menus, royal Awadhi cuisines, live culinary theaters, and white-glove banquet hospitality for weddings, corporate gatherings, and private celebrations.",
  keywords: [
    "guruji caterers",
    "royal catering services",
    "wedding caterers delhi ncr",
    "corporate catering",
    "pure desi ghee catering",
    "live food counters"
  ],
  openGraph: {
    title: "Guruji Caterers | Royal Catering & Event Specialists",
    description: "Elevate your next event with Guruji Caterers. We specialize in bespoke menus, royal Awadhi cuisines, live culinary theaters, and white-glove banquet hospitality.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
