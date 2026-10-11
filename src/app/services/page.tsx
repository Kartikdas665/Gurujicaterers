'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function ServicesPage() {
  const services = [
    {
      id: 'celebrity-events',
      num: '01',
      title: 'Celebrity & VIP Events',
      tagline: 'ELITE PRIVATE GATHERINGS',
      image: '/catering_hero_1791127858700.jpg',
      desc: 'Bespoke fine-dining curation crafted with Michelin-standard culinary precision for high-profile celebrities, dignitaries, and private estates with confidential butler service.',
      highlights: ['Custom Masterchef Menu Curation', 'VVIP White Glove Table Service', 'Molecular Gastronomy & Artisanal Plating', 'Strict Privacy & Security Protocols'],
      rate: 'Starting at ₹2,200 / guest',
    },
    {
      id: 'destination-weddings',
      num: '02',
      title: 'Destination Weddings',
      tagline: 'ROYAL FEASTS ACROSS EXOTIC LOCALES',
      image: '/catering_wedding_1791127871855.jpg',
      desc: 'Multi-day celebratory feasts covering Sangeet, Mehendi, Haldi, Reception, and Pheras across royal palaces in Udaipur, Jaipur, Goa, and international destinations.',
      highlights: ['15+ Thematic Live Food Stations', 'Authentic Regional Indian Royal Recipes', 'Global Cuisine Live Counters (Italian, Pan-Asian, Mexican)', 'Midnight Afterparty Street Food Counters'],
      rate: 'Starting at ₹1,450 / guest',
    },
    {
      id: 'corporate-catering',
      num: '03',
      title: 'Corporate Galas & Summits',
      tagline: 'EXECUTIVE CONFERENCES & ANNUAL GALAS',
      image: '/catering_corporate_1791127885197.jpg',
      desc: 'Flawless culinary logistics catering to 100 to 5,000+ delegates. Elegant corporate lunch buffets, networking high teas, and black-tie dinner galas.',
      highlights: ['Precision Timing & High-Speed Service Lines', 'Executive Balanced & Healthy Gourmet Trays', 'Liquid Mocktail & Barista Coffee Lounges', 'Branded Table Displays & Custom Logo Desserts'],
      rate: 'Starting at ₹850 / guest',
    },
    {
      id: 'theme-parties',
      num: '04',
      title: 'Thematic Celebrations & Anniversaries',
      tagline: 'UNFORGETTABLE CONCEPT EXPERIENCES',
      image: '/catering_party_footer.jpg',
      desc: 'From vintage Great Gatsby soirees to vibrant Moroccan souks and retro Bollywood nights, we engineer our food styling and counters around your event theme.',
      highlights: ['Custom Themed Table Décor & Crockery', 'Live Flaming Tandoor & Barbecue Stations', 'Artisanal Nitrogen & Cold-Stone Ice Cream Studio', 'Custom Mixology & Infused Beverages'],
      rate: 'Starting at ₹1,100 / guest',
    },
  ];

  return (
    <>
      {/* Navigation */}
      <Navbar />

      {/* 70vh Grand Party Celebration Hero Banner */}
      <section className="page-hero-banner">
        <div className="page-hero-bg"></div>
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content">
          <div className="gold-accent-line" style={{ margin: '0 auto 16px' }}></div>
          <span className="section-pill">BESPOKE HOSPITALITY</span>
          <h1 className="page-hero-title">Our Signature Services</h1>
          <p className="page-hero-subtitle">
            From intimate VIP evenings to grand 3,000+ guest royal weddings, explore our masterfully executed catering services.
          </p>
        </div>
      </section>

      <main className="dedicated-page-main">

        {/* Services Detailed List */}
        <div className="container services-page-container">
          <div className="services-detailed-list">
            {services.map((srv, index) => (
              <div key={srv.id} className={`service-detail-row ${index % 2 === 1 ? 'reverse' : ''}`}>
                <div className="service-detail-image-box">
                  <div className="service-detail-image" style={{ backgroundImage: `url('${srv.image}')` }}></div>
                  <div className="service-number-badge">{srv.num}</div>
                </div>

                <div className="service-detail-text">
                  <span className="service-gold-tag">{srv.tagline}</span>
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

                  <div className="service-pricing-cta">
                    <span className="service-rate-label">{srv.rate}</span>
                    <Link href={`/book?service=${srv.id}`} className="btn btn-gold">
                      Book This Service →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="services-cta-banner">
            <div className="banner-gold-glow"></div>
            <h3>Need a Custom Tailored Culinary Experience?</h3>
            <p>Our executive chefs and event directors are available for private consultations and menu tastings.</p>
            <div className="banner-btns">
              <Link href="/book" className="btn btn-gold btn-large">
                Schedule Menu Tasting 👑
              </Link>
              <Link href="/reviews" className="btn btn-outline btn-large">
                Read Guest Reviews
              </Link>
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
