'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function BrochurePage() {
  const [downloadInitiated, setDownloadInitiated] = useState(false);

  const handleDownload = () => {
    setDownloadInitiated(true);
    // Trigger brochure print/download window
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const brochureSections = [
    {
      num: '01',
      title: 'Our Heritage & Philosophy',
      desc: '15+ years of royal banqueting excellence across Delhi NCR, Rajasthan, and North India. Crafted with 100% pure desi ghee, heirloom spice blends, and Michelin-standard techniques.',
      icon: '👑',
      tag: 'Heritage',
    },
    {
      num: '02',
      title: 'Royal Awadhi & Signature Menus',
      desc: 'Featuring our slow-cooked 18-hour Dal Bukhara, Zafrani clay-tandoor paneer, clay handi dum biryanis, and rich saffron gravies prepared by master chefs.',
      icon: '🍛',
      tag: 'Cuisine',
    },
    {
      num: '03',
      title: 'Interactive Live Gourmet Theaters',
      desc: 'Chandni Chowk live chaat studio, wood-fired Neapolitan pizza and pasta stations, smoking liquid nitrogen kulfi bars, and charcoal sigri tandoors.',
      icon: '🔥',
      tag: 'Live Stations',
    },
    {
      num: '04',
      title: 'Curated Package Tiers & Pricing',
      desc: 'Comprehensive breakdown of our Silver Heritage (₹950), Gold Imperial (₹1,450), and Platinum Maharani (₹2,200) banquet packages with transparent terms.',
      icon: '💎',
      tag: 'Pricing',
    },
    {
      num: '05',
      title: 'White-Glove Hospitality & Logistics',
      desc: 'Zero-delay food replenishment, immaculate royal brass chafing setups, 7-star trained uniformed stewards, and dedicated on-site event managers.',
      icon: '🎩',
      tag: 'Service',
    },
    {
      num: '06',
      title: 'Food Safety, HACCP & 7-Star Hygiene',
      desc: 'Strict farm-to-table organic dairy sourcing, daily lab quality audits, temperature-controlled transport, and sanitized mobile kitchen units.',
      icon: '🛡️',
      tag: 'Sanitation',
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <section className="page-hero-banner">
        <div className="page-hero-bg"></div>
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content">
          <div className="gold-accent-line" style={{ margin: '0 auto 16px' }}></div>
          <span className="section-pill">✦ OFFICIAL DIGITAL CATALOG</span>
          <h1 className="page-hero-title">Luxury Event & Catering Brochure</h1>
          <p className="page-hero-subtitle">
            Download our comprehensive royal catering portfolio featuring signature dishes, live food counter spectacles, and complete banquet package breakdowns.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '28px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleDownload}
              className="btn btn-primary"
              style={{ padding: '14px 34px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <span>📥</span>
              <span>{downloadInitiated ? 'Opening Brochure / Print...' : 'Download Official Brochure (PDF)'}</span>
            </button>
            <a
              href="https://wa.me/919876543210?text=Hi%20Guruji%20Caterers,%20please%20send%20me%20your%20latest%20wedding%20and%20event%20catering%20brochure%20PDF."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ padding: '14px 30px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <span>💬</span>
              <span>Receive on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      <main className="dedicated-page-main">
        <div className="container">
          {/* Brochure Highlights Section */}
          <div className="section-header-centered">
            <span className="section-pill">INSIDE THE PORTFOLIO</span>
            <h2 className="section-title-luxury">What&apos;s Included in Our Brochure</h2>
            <p className="section-subtitle">A preview of everything documented in our comprehensive event and catering portfolio.</p>
          </div>

          <div className="features-grid" style={{ marginTop: '50px' }}>
            {brochureSections.map((item, idx) => (
              <div key={idx} className="feature-pillar-card">
                <div className="feature-card-header">
                  <span className="feature-icon-box">{item.icon}</span>
                  <span className="feature-index-num">{item.num}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="feature-pill-badge">
                  <span className="feature-pill-dot"></span>
                  <span>{item.tag}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Package Summary Strip */}
          <section className="luxury-cta-banner-section" style={{ marginTop: '80px', padding: '0' }}>
            <div className="cta-banner-wrapper" style={{ padding: '45px' }}>
              <div className="cta-banner-left">
                <span className="cta-pill-tag">✦ Instant Customization</span>
                <h2 className="cta-main-title" style={{ fontSize: '2rem' }}>
                  Ready to craft a bespoke menu for your dates?
                </h2>
                <p className="cta-description">
                  Our culinary directors can prepare a customized menu proposition suited to your venue, guest count, and family traditions.
                </p>
              </div>
              <div className="cta-banner-right" style={{ display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
                <Link href="/packages/events-expenditure" className="btn btn-outline" style={{ textAlign: 'center', padding: '14px 28px' }}>
                  Calculate Event Expenditure →
                </Link>
                <Link href="/book" className="btn btn-primary" style={{ textAlign: 'center', padding: '14px 28px' }}>
                  Book Tasting Session →
                </Link>
              </div>
            </div>
          </section>
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
              <p className="footer-desc">Premium catering services for weddings, corporate galas, and private celebrations with exquisite taste and flawless execution.</p>
            </div>
            <div className="footer-col">
              <h4>CONTACT US</h4>
              <ul>
                <li><p>📞 +91 98765 43210</p></li>
                <li><p>✉️ info@gurujicaterers.com</p></li>
                <li><p>📍 Main Ring Road, Delhi NCR, India</p></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>QUICK NAVIGATION</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/packages/catering">Catering Packages</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>EXPERIENCE</h4>
              <ul>
                <li><a href="/packages/events-expenditure">Events & Expenditure</a></li>
                <li><a href="/brochure">Official Brochure</a></li>
                <li><a href="/reviews">Reviews</a></li>
                <li><a href="/book">Plan Your Event</a></li>
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

