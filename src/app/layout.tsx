import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Premium Catering Services for Weddings, Corporate & Private Events",
  description: "Elevate your next event with our premium catering services. We specialize in bespoke menus, exquisite food presentation, and flawless execution for weddings, corporate gatherings, and private parties. Request a quote today!",
  keywords: [
    "premium catering services",
    "corporate event catering",
    "luxury wedding caterers",
    "bespoke menu catering",
    "private party food services",
    "best catering company"
  ],
  openGraph: {
    title: "Premium Catering Services for Weddings, Corporate & Private Events",
    description: "Elevate your next event with our premium catering services. We specialize in bespoke menus, exquisite food presentation, and flawless execution for weddings, corporate gatherings, and private parties.",
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
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
