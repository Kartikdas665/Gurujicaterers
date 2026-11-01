'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

interface Addon {
  id: string;
  name: string;
  costPerPax: number;
  icon: string;
}

export default function EventsExpenditurePage() {
  const [eventType, setEventType] = useState('corporate');
  const [guestCount, setGuestCount] = useState<number>(500);
  const [tier, setTier] = useState<number>(1450);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'chaat-studio',
    'av-production',
  ]);

  // 9 Core Event Services
  const allEventServices = [
    {
      num: '01',
      id: 'on-ground-activation',
      title: 'On-Ground Activation',
      icon: '🎪',
      tag: 'Brand Experience',
      desc: 'Experiential consumer engagement, mall brand popups, interactive kiosks, sampling booths, and retail promoter activations with real-time footfall analytics.',
      highlights: ['Custom Kiosk Fabrication', 'Interactive Product Demos', 'Promoter & Hostess Staffing'],
      budgetRange: '₹1.5L – ₹8L per setup',
    },
    {
      num: '02',
      id: 'outdoor-activation',
      title: 'Outdoor Activation',
      icon: '⛺',
      tag: 'High Footfall',
      desc: 'Large-scale outdoor brand pavilions, mobile canopies, roadshow vehicle fabrication, public square activations, and city-wide experiential campaigns.',
      highlights: ['Weatherproof German Canopies', 'Mobile Roadshow Trucks', 'Permits & Council Approvals'],
      budgetRange: '₹2.5L – ₹15L per campaign',
    },
    {
      num: '03',
      id: 'av-content-creation',
      title: 'AV Content Creation',
      icon: '🎥',
      tag: 'Creative Media',
      desc: 'End-to-end multi-cam 4K event production, dynamic LED wall motion graphics, live satellite streaming, projection mapping, and cinematic event aftermovies.',
      highlights: ['4K Multi-Cam Broadcast', '3D Projection Mapping', 'Cinematic Event Aftermovie'],
      budgetRange: '₹1L – ₹6L per event',
    },
    {
      num: '04',
      id: 'concert-management',
      title: 'Concert Management',
      icon: '🎸',
      tag: 'Mega Production',
      desc: 'Turnkey live concert production with stadium sound engineering, high-load aluminum stage trussing, intelligent moving beam lights, pyro SFX, and crowd security.',
      highlights: ['Line-Array Sound Systems', 'Heavy Stage Trussing & SFX', 'Crowd Barricading & Security'],
      budgetRange: '₹5L – ₹50L+ per concert',
    },
    {
      num: '05',
      id: 'artist-management',
      title: 'Artist Management',
      icon: '⭐',
      tag: 'Talent & Riders',
      desc: 'Complete talent contracting for Bollywood playback singers, live Sufi bands, celebrity anchors, standup comedians, international DJs, and rider hospitality.',
      highlights: ['A-List Celebrity Booking', 'Technical Rider Compliance', 'VIP Green Room Hospitality'],
      budgetRange: 'Tailored to Artist Bracket',
    },
    {
      num: '06',
      id: 'corporate-events',
      title: 'Corporate Events',
      icon: '💼',
      tag: 'Annual Galas',
      desc: 'Flawless corporate celebrations, annual award galas, milestone foundation days, brand unveilings, and partner summits with clockwork timing and luxury setups.',
      highlights: ['Turnkey Gala Logistics', 'Themed Stage Architecture', 'VIP Dignitary Protocol'],
      budgetRange: '₹3L – ₹25L per event',
    },
    {
      num: '07',
      id: 'seminar-workshop',
      title: 'Seminar & Workshop',
      icon: '📋',
      tag: 'Executive Learning',
      desc: 'Comprehensive conference infrastructure, delegate badge printing, interactive Q&A audio systems, breakout session setups, and premium executive catering.',
      highlights: ['Delegate Registration Desks', 'Keynote Presentation AV', 'Executive Conference Kits'],
      budgetRange: '₹1.5L – ₹10L per seminar',
    },
    {
      num: '08',
      id: 'team-build-activation',
      title: 'Team Building Activation',
      icon: '🤝',
      tag: 'Employee Bonding',
      desc: 'High-energy corporate offsite retreats, outdoor adventure challenges, gamified team competitions, and facilitator-led leadership bonding activities.',
      highlights: ['Gamified Team Challenges', 'Certified Facilitator Leads', 'Custom Props & Obstacles'],
      budgetRange: '₹1L – ₹7L per offsite',
    },
    {
      num: '09',
      id: 'fund-raiser-campaigns',
      title: 'Fundraiser Campaigns',
      icon: '🎗️',
      tag: 'Social Impact',
      desc: 'High-visibility charity galas, donor networking dinners, philanthropic auctions, awareness runs, and multimedia presentations designed to inspire donor generosity.',
      highlights: ['Donor Banquet Orchestration', 'Live Auction Mechanics', 'Media & Press Management'],
      budgetRange: '₹2L – ₹12L per campaign',
    },
  ];

  const eventTypes = [
    { id: 'corporate', label: '💼 Corporate Gala / Summit', desc: 'Conferences, awards & corporate banquets' },
    { id: 'concert', label: '🎸 Concert & Live Production', desc: 'Sound, stage, trussing & artist bookings' },
    { id: 'activation', label: '🎪 On-Ground / Outdoor Activation', desc: 'Brand popups, roadshows & mall tours' },
    { id: 'fundraiser', label: '🎗️ Fundraiser & Charity Gala', desc: 'Donor networking & non-profit campaigns' },
  ];

  const packages = [
    {
      price: 950,
      name: 'Essential Package',
      tag: 'Classic Standard',
      features: ['Core Sound & Stage Setup', 'Registration Management', 'Classic Catering Spread', 'Standard Lighting Grid'],
    },
    {
      price: 1450,
      name: 'Premium Production',
      tag: 'Most Popular',
      features: ['LED Wall Video Background', 'Interactive Live Stations', 'Royal Multi-Cuisine Buffet', 'Live Multi-Cam Streaming'],
    },
    {
      price: 2200,
      name: 'Grand Regal Production',
      tag: 'Turnkey 7-Star Gala',
      features: ['Celebrity Stage & Trussing', '4K Broadcast & Motion Media', '7-Star White-Glove Banqueting', 'Full Artist & Rider Logistics'],
    },
  ];

  const availableAddons: Addon[] = [
    { id: 'av-production', name: '4K Multi-Cam & LED Wall Production', costPerPax: 220, icon: '🎥' },
    { id: 'chaat-studio', name: 'Live Gourmet Food Theaters & Chaat', costPerPax: 150, icon: '🥘' },
    { id: 'artist-rider', name: 'Live Band / Emcee Sound Engineering', costPerPax: 180, icon: '🎤' },
    { id: 'dessert-bar', name: 'Liquid Nitrogen Kulfi & Dessert Bar', costPerPax: 180, icon: '🍨' },
    { id: 'mocktail-bar', name: 'Artisanal Mocktail & Beverage Lounge', costPerPax: 120, icon: '🍹' },
  ];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addonsCostPerPax = selectedAddons.reduce((sum, id) => {
    const addon = availableAddons.find((a) => a.id === id);
    return sum + (addon ? addon.costPerPax : 0);
  }, 0);

  const totalPerPax = tier + addonsCostPerPax;
  const totalEstimatedCost = totalPerPax * guestCount;

  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <section className="page-hero-banner">
        <div className="page-hero-bg"></div>
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content">
          <div className="gold-accent-line" style={{ margin: '0 auto 16px' }}></div>
          <span className="section-pill">✦ COMPLETE EVENTS & PRODUCTION REPERTOIRE</span>
          <h1 className="page-hero-title">Events & Expenditure Planning</h1>
          <p className="page-hero-subtitle">
            Explore our complete spectrum of on-ground activations, outdoor campaigns, concerts, corporate galas, and interactive budget estimation.
          </p>
        </div>
      </section>

      <main className="dedicated-page-main">
        <div className="container">
          {/* Section: All 9 Event Services & Packages */}
          <section id="event-services-grid" style={{ marginBottom: '80px' }}>
            <div className="section-header-centered">
              <span className="section-pill">OUR COMPREHENSIVE SUITE</span>
              <h2 className="section-title-luxury">All 9 Event Services & Packages</h2>
              <p className="section-subtitle">
                Turnkey event management, creative production, brand activations, and large-scale entertainment across North India.
              </p>
            </div>

            <div className="pillars-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '26px', marginTop: '45px' }}>
              {allEventServices.map((svc) => (
                <div key={svc.id} className="feature-pillar-card" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column' }}>
                  <div className="feature-card-header">
                    <span className="feature-icon-box">{svc.icon}</span>
                    <span className="feature-index-num">{svc.num}</span>
                  </div>
                  <div style={{ marginTop: '10px', marginBottom: '4px' }}>
                    <span className="section-pill" style={{ fontSize: '0.68rem', padding: '3px 8px' }}>{svc.tag}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginTop: '6px', color: '#ffffff' }}>{svc.title}</h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--gray-text)', lineHeight: 1.55, marginBottom: '16px', flex: 1 }}>
                    {svc.desc}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '18px' }}>
                    {svc.highlights.map((h, i) => (
                      <div key={i} style={{ fontSize: '0.78rem', color: '#e5e7eb', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ paddingTop: '14px', borderTop: '1px solid rgba(197, 155, 39, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--primary-hover)', fontWeight: 600 }}>{svc.budgetRange}</span>
                    <a
                      href={`https://wa.me/919876543210?text=Hi%20Guruji%20Events,%20I%20am%20interested%20in%20${encodeURIComponent(svc.title)}.%20Please%20share%20details.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="menu-view-arrow"
                      style={{ fontSize: '0.84rem' }}
                    >
                      Inquire →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive Calculator Section */}
          <section className="expenditure-calc-card">
            <div className="calc-header">
              <span className="section-pill">INTERACTIVE BUDGET CALCULATOR</span>
              <h2 className="calc-title">Estimate Your Event & Catering Expenditure</h2>
              <p className="calc-subtitle">
                Select your event style, expected guest count, and desired production tier to get an instant realistic estimate.
              </p>
            </div>

            <div className="calc-body-grid">
              {/* Left Controls */}
              <div className="calc-controls">
                {/* 1. Event Type Selection */}
                <div className="calc-group">
                  <label className="calc-label">1. Choose Event Type</label>
                  <div className="calc-event-type-grid">
                    {eventTypes.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setEventType(t.id)}
                        className={`calc-type-btn ${eventType === t.id ? 'active' : ''}`}
                      >
                        <div className="calc-type-title">{t.label}</div>
                        <div className="calc-type-desc">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Guest Count */}
                <div className="calc-group">
                  <div className="calc-label-row">
                    <label className="calc-label">2. Estimated Delegate / Guest Count</label>
                    <span className="calc-highlight-val">{guestCount} Guests</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="50"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="calc-range-slider"
                  />
                  <div className="calc-quick-pax">
                    {[150, 300, 500, 800, 1200, 1500].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuestCount(num)}
                        className={`calc-quick-pill ${guestCount === num ? 'active' : ''}`}
                      >
                        {num} Pax
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Package Tier */}
                <div className="calc-group">
                  <label className="calc-label">3. Select Production & Culinary Tier</label>
                  <div className="calc-tiers-grid">
                    {packages.map((pkg) => (
                      <div
                        key={pkg.price}
                        onClick={() => setTier(pkg.price)}
                        className={`calc-tier-card ${tier === pkg.price ? 'active' : ''}`}
                      >
                        <div className="tier-tag">{pkg.tag}</div>
                        <h4 className="tier-name">{pkg.name}</h4>
                        <div className="tier-price">₹{pkg.price.toLocaleString('en-IN')} <span className="tier-sub">/ pax</span></div>
                        <ul className="tier-features">
                          {pkg.features.map((f, i) => (
                            <li key={i}>✓ {f}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Optional Live Stations & Technicals */}
                <div className="calc-group">
                  <label className="calc-label">4. Add Production & Culinary Enhancements</label>
                  <div className="calc-addons-grid">
                    {availableAddons.map((addon) => {
                      const isChecked = selectedAddons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`calc-addon-item ${isChecked ? 'selected' : ''}`}
                        >
                          <span className="addon-icon">{addon.icon}</span>
                          <div className="addon-info">
                            <span className="addon-name">{addon.name}</span>
                            <span className="addon-cost">+₹{addon.costPerPax} / pax</span>
                          </div>
                          <span className="addon-check">{isChecked ? '✓' : '+'}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Output Box */}
              <div className="calc-summary-panel">
                <div className="calc-summary-card">
                  <span className="calc-summary-badge">✦ ESTIMATED EVENT EXPENDITURE</span>
                  <div className="summary-total-price">
                    ₹{totalEstimatedCost.toLocaleString('en-IN')}
                  </div>
                  <div className="summary-per-pax">
                    ₹{totalPerPax.toLocaleString('en-IN')} per pax ({guestCount} Capacity)
                  </div>

                  <div className="summary-breakdown">
                    <div className="summary-line">
                      <span>Base Production & Catering:</span>
                      <span>₹{(tier * guestCount).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="summary-line">
                      <span>Enhancements & Media ({selectedAddons.length}):</span>
                      <span>₹{(addonsCostPerPax * guestCount).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="summary-line">
                      <span>On-Site Stage & Event Manager:</span>
                      <span className="complimentary-tag">Complimentary</span>
                    </div>
                    <div className="summary-line">
                      <span>White-Glove Stewards & Logistics:</span>
                      <span className="complimentary-tag">Complimentary</span>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-line total-line">
                      <span>Total Estimated Cost:</span>
                      <span className="total-highlight">₹{totalEstimatedCost.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="summary-notes">
                    <p>✓ Transparent line-item billing with zero hidden costs</p>
                    <p>✓ Dedicated Event Technical & Hospitality Director</p>
                    <p>✓ Full safety certifications & risk mitigation support</p>
                  </div>

                  <div className="summary-actions">
                    <Link
                      href={`/book?guests=${guestCount}&budget=${totalEstimatedCost}&event=${encodeURIComponent(eventType)}`}
                      className="btn btn-primary"
                      style={{ width: '100%', textAlign: 'center', marginBottom: '12px' }}
                    >
                      Book Event with This Estimate →
                    </Link>
                    <a
                      href={`https://wa.me/919876543210?text=Hi%20Guruji%20Events,%20I%20calculated%20an%20estimate%20for%20${guestCount}%20delegates%20(${totalEstimatedCost.toLocaleString('en-IN')}%20INR).%20Please%20share%20full%20RFP%20details.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                      style={{ width: '100%', textAlign: 'center' }}
                    >
                      💬 Discuss on WhatsApp
                    </a>
                  </div>
                </div>
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
              <p className="footer-desc">Premium event management and catering services for brand activations, corporate summits, concerts, and regal celebrations.</p>
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
