'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Signature Offerings' },
    { id: 'weddings', label: '💍 Royal Weddings' },
    { id: 'corporate', label: '💼 Corporate Galas' },
    { id: 'private', label: '🎉 Private Soirees' },
    { id: 'vip', label: '🌟 Celebrity & VIP' },
  ];

  const services = [
    {
      id: 'celebrity-events',
      category: 'vip',
      num: '01',
      title: 'Celebrity & VIP Gatherings',
      tagline: 'ELITE PRIVATE HOSPITALITY',
      image: '/catering_hero_1791127858700.jpg',
      badge: 'Michelin-Standard Service',
      guestCapacity: '25 – 300 VVIP Guests',
      desc: 'Bespoke fine-dining curation crafted with culinary mastery for high-profile celebrities, dignitaries, and private estates. Includes confidential white-glove butler service, hand-crafted gold leaf crockery, and signature amuse-bouches.',
      highlights: [
        'Personal Masterchef Menu Curation',
        'VVIP White-Glove Table Service',
        'Molecular Gastronomy & Artisanal Plating',
        'Strict Privacy, NDA & VIP Security Protocols',
      ],
      features: ['Exotic Ingredients', 'Private Sommelier & Barista', 'Personalized Tasting Table'],
    },
    {
      id: 'destination-weddings',
      category: 'weddings',
      num: '02',
      title: 'Grand Destination Weddings',
      tagline: 'ROYAL FEASTS ACROSS EXOTIC LOCALES',
      image: '/catering_wedding_1791127871855.jpg',
      badge: 'Multi-Day Palace Feasts',
      guestCapacity: '200 – 3,500+ Guests',
      desc: 'Comprehensive multi-day celebratory feasts covering Sangeet, Mehendi, Haldi, Reception, and Pheras across royal palaces in Udaipur, Jaipur, Goa, and international destinations.',
      highlights: [
        '18+ Thematic Live Street & Gourmet Food Stations',
        'Traditional Shahi Awadhi & Rajasthani Pure Desi Ghee Recipes',
        'Global Live Counters (Wood-Fired Pizza, Dim Sum Wok, Mexican)',
        'Midnight Afterparty Gourmet Street Food Counters',
      ],
      features: ['Dedicated Banquet Director', 'Live Regional Chef Stations', 'Complimentary Pre-Wedding Tasting'],
    },
    {
      id: 'corporate-catering',
      category: 'corporate',
      num: '03',
      title: 'Corporate Galas & Global Summits',
      tagline: 'EXECUTIVE CONFERENCES & ANNUAL AWARDS',
      image: '/catering_corporate_1791127885197.jpg',
      badge: 'Flawless High-Speed Logistics',
      guestCapacity: '100 – 5,000+ Delegates',
      desc: 'Punctual, hygienic, and sophisticated culinary logistics for high-level boardroom luncheons, international tech summits, and black-tie annual galas.',
      highlights: [
        'Rapid Dual-Buffet Line Deployment for 2,000+ Guests',
        'Health-Conscious Gourmet Trays & Superfood Salads',
        'Liquid Mocktail & Artisanal Pour-Over Coffee Lounges',
        'Corporate Branding with Logo-Embossed Dessert Tables',
      ],
      features: ['Zero-Spill Packing', 'Dietary Precision Counters', 'Dedicated Corporate Account Manager'],
    },
    {
      id: 'theme-parties',
      category: 'private',
      num: '04',
      title: 'Thematic Celebrations & Anniversaries',
      tagline: 'UNFORGETTABLE CONCEPT EXPERIENCES',
      image: '/catering_party_footer.jpg',
      badge: 'Custom Concept Gastronomy',
      guestCapacity: '50 – 800 Guests',
      desc: 'From vintage Great Gatsby cocktail nights to vibrant Lucknowi Dastarkhwans and beachside barbecue sundowners, we engineer food styling, counters, and staff attire around your chosen theme.',
      highlights: [
        'Custom Themed Table Styling, Lighting & Designer Crockery',
        'Live Smoky Charcoal Sigri & Barbecue Grills',
        'Liquid Nitrogen Smoking Kulfi & Cold-Stone Dessert Theater',
        'Bespoke Infused Mocktails & Signature Welcome Drinks',
      ],
      features: ['Interactive Chef Theatrics', 'Custom Printed Menus', 'Sensory Food Presentation'],
    },
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  const pillars = [
    {
      icon: '👨‍🍳',
      title: 'Masterchef Craftsmanship',
      desc: 'Our culinary directors have decades of experience executing feasts for royal families and top enterprises.',
    },
    {
      icon: '🌿',
      title: '100% Pure Desi Ghee & Quality',
      desc: 'Cold-pressed oils, pure A2 desi ghee, and daily farm-sourced organic greens with strict hygiene audits.',
    },
    {
      icon: '🎭',
      title: 'Live Interactive Theaters',
      desc: 'From spinning rotis to smoking nitrogen kulfis, we make cooking a live visual spectacle for your guests.',
    },
    {
      icon: '✨',
      title: 'White-Glove Hospitality',
      desc: 'Elegantly groomed, polite service staff trained in 5-star hospitality etiquette and guest warmth.',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Consultation & Taste Discovery',
      desc: 'We discuss your event date, venue, guest profile, cultural heritage, and favorite flavor notes.',
    },
    {
      step: '02',
      title: 'Exclusive Menu Tasting',
      desc: 'Experience a complimentary private tasting session with our executive chef to curate the final menu.',
    },
    {
      step: '03',
      title: 'Concept & Theme Styling',
      desc: 'Selection of live counters, customized chinaware, live station aesthetics, and butler uniforms.',
    },
    {
      step: '04',
      title: 'Seamless Flawless Execution',
      desc: 'Our dedicated on-site event directors manage kitchen timing, guest flows, and hot fresh service.',
    },
  ];

  return (
    <>
      {/* Navigation */}
      <Navbar />

      {/* Hero Banner */}
      <section className="page-hero-banner">
        <div className="page-hero-bg"></div>
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content">
          <div className="gold-accent-line" style={{ margin: '0 auto 16px' }}></div>
          <span className="section-pill">ROYAL HOSPITALITY</span>
          <h1 className="page-hero-title">Signature Catering Experiences</h1>
          <p className="page-hero-subtitle">
            Crafting indelible culinary memories with unmatched authentic flavors, artistic presentations, and regal warmth.
          </p>
        </div>
      </section>

      <main className="dedicated-page-main">
        <div className="container services-page-container">

          {/* Pillars Row */}
          <div className="services-pillars-grid">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="services-pillar-card">
                <span className="pillar-icon">{pillar.icon}</span>
                <h4>{pillar.title}</h4>
                <p>{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className="services-filter-nav">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`service-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Services Detailed List */}
          <div className="services-detailed-list">
            {filteredServices.map((srv, index) => (
              <div key={srv.id} className={`service-detail-row ${index % 2 === 1 ? 'reverse' : ''}`}>
                <div className="service-detail-image-box">
                  <div className="service-detail-image" style={{ backgroundImage: `url('${srv.image}')` }}></div>
                  <div className="service-number-badge">{srv.num}</div>
                  <div className="service-floating-badge">{srv.badge}</div>
                </div>

                <div className="service-detail-text">
                  <div className="service-top-meta">
                    <span className="service-gold-tag">{srv.tagline}</span>
                    <span className="service-capacity-tag">👥 {srv.guestCapacity}</span>
                  </div>
                  <h2>{srv.title}</h2>
                  <p className="service-detail-desc">{srv.desc}</p>

                  <div className="service-highlights-box">
                    <h4>Experience Highlights</h4>
                    <ul>
                      {srv.highlights.map((h, i) => (
                        <li key={i}>
                          <span className="gold-check">✦</span> {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="service-perks-row">
                    {srv.features.map((feat, fi) => (
                      <span key={fi} className="service-perk-pill">
                        ★ {feat}
                      </span>
                    ))}
                  </div>

                  <div className="service-action-cta">
                    <div className="service-cta-info">
                      <span className="service-cta-title">Bespoke Proposal</span>
                      <span className="service-cta-sub">Tailored to your guest count & menu preferences</span>
                    </div>
                    <Link href={`/book?service=${srv.id}`} className="btn btn-gold">
                      Inquire for Event →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 4-Step Culinary Journey Section */}
          <section className="service-journey-section">
            <div className="section-header-centered">
              <span className="section-pill">HOW WE EXECUTE</span>
              <h2 className="section-title-luxury">The Guruji Hospitality Experience</h2>
              <p className="section-subtitle">
                From your initial idea to the final satisfied guest, our 4-step seamless process ensures zero stress.
              </p>
            </div>

            <div className="service-journey-grid">
              {steps.map((st, i) => (
                <div key={i} className="service-journey-step">
                  <div className="journey-step-num">{st.step}</div>
                  <h3>{st.title}</h3>
                  <p>{st.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Banner */}
          <div className="services-cta-banner">
            <div className="banner-gold-glow"></div>
            <h3>Planning a Milestone Celebration?</h3>
            <p>
              Connect with our master chefs and banquet directors for a bespoke consultation and exclusive menu tasting.
            </p>
            <div className="banner-btns">
              <Link href="/book" className="btn btn-gold btn-large">
                Schedule Royal Tasting 👑
              </Link>
              <a 
                href="https://wa.me/919876543210?text=Hi%20Guruji%20Caterers,%20I%20am%20interested%20in%20your%20catering%20services." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline btn-large"
              >
                💬 WhatsApp Consultation
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo">
                <span className="logo-icon" style={{ color: 'white' }}>🍽️</span>
                GURUJI CATERERS
              </div>
              <p className="footer-desc">Delivering exceptional culinary experiences for your special events.</p>
            </div>
            <div className="footer-col">
              <h4>CONTACT US</h4>
              <ul>
                <li><p>📞 +91 98765 43210</p></li>
                <li><p>✉️ bookings@gurujicaterers.com</p></li>
                <li><p>📍 Delhi NCR • Udaipur • Mumbai</p></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>PAGES</h4>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/reviews">Reviews</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>RESERVATIONS</h4>
              <ul>
                <li><Link href="/book">Book Now</Link></li>
                <li><Link href="/#menu">Menu Showcase</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Guruji Caterers. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
