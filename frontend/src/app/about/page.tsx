import type { Metadata } from 'next';
import AboutContent from '@/app/about/AboutContent';

export const metadata: Metadata = {
  title: "Our Story & Heritage | Guruji Caterers - 15+ Years of Excellence",
  description: "Discover the legacy of Guruji Caterers. With over 15 years of culinary excellence, we deliver royal heritage recipes, uncompromising hygiene, and 7-star hospitality for luxury weddings and corporate banquets across India.",
  keywords: [
    "luxury catering services",
    "royal wedding caterers",
    "destination wedding catering India",
    "premium vegetarian catering",
    "live culinary theater",
    "Guruji caterers heritage"
  ],
  openGraph: {
    title: "Our Story & Heritage | Guruji Caterers - 15+ Years of Excellence",
    description: "Discover the legacy of Guruji Caterers. With over 15 years of culinary excellence, we deliver royal heritage recipes, uncompromising hygiene, and 7-star hospitality.",
    type: "website"
  }
};

export default function AboutPage() {
  return <AboutContent />;
}
