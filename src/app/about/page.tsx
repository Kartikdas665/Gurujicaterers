'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function AboutPage() {
  const milestones = [
    { year: '2010', title: 'The Royal Inception', desc: 'Started with authentic North Indian traditional banquets in Delhi with an unyielding passion for pure ingredients.' },
    { year: '2015', title: '500+ Mega Weddings', desc: 'Expanded into grand destination weddings across Rajasthan palaces (Udaipur, Jaipur, Jodhpur).' },
    { year: '2020', title: 'Corporate & VIP Banqueting', desc: 'Introduced international live counters, molecular dessert stations, and white-glove executive hospitality.' },
    { year: '2026', title: 'Over 1,000+ Celebrations', desc: 'Recognized as one of India’s premier luxury catering enterprises with a team of 150+ masterchefs and hospitality artisans.' },
  ];

  const pillars = [
    { icon: '👑', title: 'Royal Heritage Recipes', desc: 'Century-old recipes perfected through generations using pure desi ghee and hand-ground royal spices.' },
    { icon: '🌿', title: 'Uncompromising Purity & Hygiene', desc: '100% farm-sourced fresh ingredients, RO filtered cooking, and separate dedicated pure-veg / Jain kitchens.' },
    { icon: '🎭', title: 'Live Culinary Theater', desc: 'Spectacular visual cooking with liquid nitrogen desserts, wood-fired ovens, and interactive live chaat studios.' },
    { icon: '⭐', title: '7-Star White-Glove Hospitality', desc: 'Professionally groomed service brigade trained to deliver seamless royal warmth to every single guest.' },
  ];

  return (
    <>
      <Navbar />

      {/* 70vh Grand Party Celebration Hero Banner */}
      <section className="page-hero-banner">
        <div className="page-hero-bg"></div>
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content">
          <div className="gold-accent-line" style={{ margin: '0 auto 16px' }}></div>
          <span className="section-pill">OUR HERITAGE & VISION</span>
          <h1 className="page-hero-title">Humari Kahani: Saalon Ka Anubhav</h1>
          <p className="page-hero-subtitle">
            Crafting indelible culinary memories and royal celebratory banquets for over 15+ years.
          </p>
        </div>
      </section>

      <main className="dedicated-page-main">
        <div className="container">
          {/* Story Intro Split */}
          <div className="about-story-split">
            <div className="story-split-text">
              <span className="service-gold-tag">15+ YEARS OF CULINARY EXCELLENCE</span>
              <h2>Purity, Passion & Unmatched Hospitality</h2>
              <p>
                Guruji Caterers was founded on a simple philosophy: <em>Food is not merely served at a celebration — it is the soul of every lasting memory.</em>
              </p>
              <p>
                From humble beginnings in Delhi NCR to engineering multi-day destination wedding extravaganzas in royal heritage palaces across Udaipur and Goa, our masterchefs preserve time-honored Indian traditions while seamlessly integrating cutting-edge global culinary trends.
              </p>
              <div className="story-stat-strip">
                <div className="story-stat-box">
                  <span className="stat-number">1,000+</span>
                  <span className="stat-label">Events Hosted</span>
                </div>
                <div className="story-stat-box">
                  <span className="stat-number">150+</span>
                  <span className="stat-label">Master Chefs</span>
                </div>
                <div className="story-stat-box">
                  <span className="stat-number">4.9★</span>
                  <span className="stat-label">Client Rating</span>
                </div>
              </div>
            </div>

            <div className="story-split-visual">
              <div className="about-visual-frame">
                <div className="about-visual-img" style={{ backgroundImage: `url('/catering_wedding_1791127871855.jpg')` }}></div>
                <div className="gold-accent-corner top-left"></div>
                <div className="gold-accent-corner bottom-right"></div>
              </div>
            </div>
          </div>

          {/* Pillars of Excellence */}
          <div className="about-pillars-section">
            <div className="section-header-centered">
              <span className="section-pill">OUR CORE VALUES</span>
              <h2 className="section-title-luxury">The Pillars of Guruji Caterers</h2>
              <p className="section-subtitle">What sets our catering apart at the most prestigious celebrations in India.</p>
            </div>

            <div className="pillars-grid">
              {pillars.map((p, i) => (
                <div key={i} className="pillar-card">
                  <div className="pillar-icon">{p.icon}</div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Milestones */}
          <div className="timeline-section">
            <div className="section-header-centered">
              <span className="section-pill">OUR JOURNEY</span>
              <h2 className="section-title-luxury">Milestones of Excellence</h2>
            </div>

            <div className="timeline-grid">
              {milestones.map((m, idx) => (
                <div key={idx} className="timeline-card">
                  <div className="timeline-year">{m.year}</div>
                  <h4>{m.title}</h4>
                  <p>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div className="services-cta-banner" style={{ marginTop: '70px' }}>
            <div className="banner-gold-glow"></div>
            <h3>Let Us Craft Your Celebration</h3>
            <p>Schedule a complimentary menu consultation and private food tasting session with our culinary directors.</p>
            <div className="banner-btns">
              <Link href="/book" className="btn btn-gold btn-large">
                Reserve Date & Food Tasting 👑
              </Link>
              <Link href="/menu" className="btn btn-outline btn-large">
                Explore Full Menu
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
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/menu">Menu</Link></li>
                <li><Link href="/reviews">Reviews</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>RESERVATIONS</h4>
              <ul>
                <li><Link href="/book">Book Now</Link></li>
                <li><Link href="/menu">Menu Showcase</Link></li>
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
