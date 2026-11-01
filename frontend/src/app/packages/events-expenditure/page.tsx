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
  const [eventType, setEventType] = useState('wedding');
  const [guestCount, setGuestCount] = useState<number>(500);
  const [tier, setTier] = useState<number>(1450); // Gold default
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'chaat-studio',
    'dessert-bar',
  ]);

  const eventTypes = [
    { id: 'wedding', label: '👑 Royal Wedding & Reception', desc: 'Grand multi-course feast with regal setups' },
    { id: 'corporate', label: '💼 Corporate Gala / Summit', desc: 'Punctual, executive international buffet' },
    { id: 'sangeet', label: '🎶 Sangeet & Cocktail Night', desc: 'High-energy live stations & gourmet canapés' },
    { id: 'private', label: '✨ Private Celebration / Gala', desc: 'Intimate bespoke dining & butler service' },
  ];

  const packages = [
    {
      price: 950,
      name: 'Silver Heritage',
      tag: 'Classic Royal Feast',
      features: ['3 Starters', '1 Live Counter', '4 Mains', '2 Breads & Rice', '2 Desserts', 'Welcome Drinks'],
    },
    {
      price: 1450,
      name: 'Gold Imperial',
      tag: 'Most Popular Choice',
      features: ['5 Starters', '2 Live Gourmet Counters', '6 Mains', '4 Breads & Biryani', '3 Desserts + Kulfi', 'Signature Mocktails'],
    },
    {
      price: 2200,
      name: 'Platinum Maharani',
      tag: '7-Star Luxury Royal Feast',
      features: ['7 Starters', '4 Live Stations', '8 Mains with Dal Bukhara', 'Gourmet Breads & Saffron Dum Handis', 'Liquid Nitrogen Dessert Studio', 'Butler Mocktail Service'],
    },
  ];

  const availableAddons: Addon[] = [
    { id: 'chaat-studio', name: 'Chandni Chowk Live Chaat Studio', costPerPax: 150, icon: '🥘' },
    { id: 'pizza-pasta', name: 'Wood-fired Pizza & Pasta Bar', costPerPax: 200, icon: '🍕' },
    { id: 'dessert-bar', name: 'Liquid Nitrogen Kulfi & Dessert Studio', costPerPax: 180, icon: '🍨' },
    { id: 'sigri-bbq', name: 'Sigri Charcoal Live Barbecue Grills', costPerPax: 180, icon: '🔥' },
    { id: 'mocktail-bar', name: 'Artisanal Mocktail & Mixology Bar', costPerPax: 120, icon: '🍹' },
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
          <span className="section-pill">✦ COMPLETE TRANSPARENCY</span>
          <h1 className="page-hero-title">Events & Expenditure Planning</h1>
          <p className="page-hero-subtitle">
            Plan your royal celebration with total financial clarity. Transparent per-plate pricing, live counter structures, and realistic event expenditure estimates.
          </p>
        </div>
      </section>

      <main className="dedicated-page-main">
        <div className="container">
          {/* Interactive Calculator Section */}
          <section className="expenditure-calc-card">
            <div className="calc-header">
              <span className="section-pill">INTERACTIVE BUDGET CALCULATOR</span>
              <h2 className="calc-title">Estimate Your Catering & Event Expenditure</h2>
              <p className="calc-subtitle">
                Select your event type, expected guest count, and desired culinary tier to get an instant realistic estimate.
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
                    <label className="calc-label">2. Estimated Guest Count (Pax)</label>
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
                  <label className="calc-label">3. Select Culinary Tier (Per Plate)</label>
                  <div className="calc-tiers-grid">
                    {packages.map((pkg) => (
                      <div
                        key={pkg.price}
                        onClick={() => setTier(pkg.price)}
                        className={`calc-tier-card ${tier === pkg.price ? 'active' : ''}`}
                      >
                        <div className="tier-tag">{pkg.tag}</div>
                        <h4 className="tier-name">{pkg.name}</h4>
                        <div className="tier-price">₹{pkg.price.toLocaleString('en-IN')} <span className="tier-sub">/ plate</span></div>
                        <ul className="tier-features">
                          {pkg.features.map((f, i) => (
                            <li key={i}>✓ {f}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Optional Live Stations */}
                <div className="calc-group">
                  <label className="calc-label">4. Add Interactive Live Counters (Optional)</label>
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
                            <span className="addon-cost">+₹{addon.costPerPax} / guest</span>
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
                  <span className="calc-summary-badge">✦ ESTIMATED EXPENDITURE SUMMARY</span>
                  <div className="summary-total-price">
                    ₹{totalEstimatedCost.toLocaleString('en-IN')}
                  </div>
                  <div className="summary-per-pax">
                    ₹{totalPerPax.toLocaleString('en-IN')} per guest ({guestCount} Guests)
                  </div>

                  <div className="summary-breakdown">
                    <div className="summary-line">
                      <span>Base Food & Royal Menu:</span>
                      <span>₹{(tier * guestCount).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="summary-line">
                      <span>Live Counters ({selectedAddons.length}):</span>
                      <span>₹{(addonsCostPerPax * guestCount).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="summary-line">
                      <span>7-Star Butler & Service Staff:</span>
                      <span className="complimentary-tag">Complimentary</span>
                    </div>
                    <div className="summary-line">
                      <span>Luxury Cutlery & Chafing Stations:</span>
                      <span className="complimentary-tag">Complimentary</span>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-line total-line">
                      <span>Total Estimated Cost:</span>
                      <span className="total-highlight">₹{totalEstimatedCost.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="summary-notes">
                    <p>✓ All items prepared in 100% Pure Desi Ghee</p>
                    <p>✓ Includes dedicated Event Operations Manager</p>
                    <p>✓ Free menu tasting session for up to 4 family members</p>
                  </div>

                  <div className="summary-actions">
                    <Link
                      href={`/book?guests=${guestCount}&budget=${totalEstimatedCost}`}
                      className="btn btn-primary"
                      style={{ width: '100%', textAlign: 'center', marginBottom: '12px' }}
                    >
                      Book Event with This Estimate →
                    </Link>
                    <a
                      href={`https://wa.me/919876543210?text=Hi%20Guruji%20Caterers,%20I%20calculated%20an%20estimate%20for%20${guestCount}%20guests%20(${totalEstimatedCost.toLocaleString('en-IN')}%20INR).%20Please%20share%20further%20details.`}
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

          {/* Event Breakdown Pillars */}
          <section className="expenditure-guide-section" style={{ marginTop: '80px' }}>
            <div className="section-header-centered">
              <span className="section-pill">EVENT CATEGORIES & LOGISTICS</span>
              <h2 className="section-title-luxury">What Shapes Your Event Expenditure?</h2>
              <p className="section-subtitle">
                Understanding the key variables that influence banqueting and catering costs across Indian weddings and galas.
              </p>
            </div>

            <div className="pillars-grid" style={{ marginTop: '40px' }}>
              <div className="pillar-card">
                <div className="pillar-icon">👑</div>
                <h3>Destination Weddings</h3>
                <p>
                  Requires multi-day mobile kitchen setups, round-the-clock chef brigades for Haldi, Mehendi, Sangeet & Pheras, and regional heritage ingredients transported fresh.
                </p>
                <div className="pillar-stats">Avg 500 – 2,000 Guests</div>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon">💼</div>
                <h3>Corporate Galas & Summits</h3>
                <p>
                  Demands clockwork timing, zero-queue buffet lanes for 800+ executive delegates, international salad bars, and hygienic individually plated executive luncheons.
                </p>
                <div className="pillar-stats">Punctual Clockwork Setup</div>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon">🎪</div>
                <h3>Live Interactive Stations</h3>
                <p>
                  From wood-fired sourdough pizzas to nitrogen smoking kulfi slabs and charcoal sigri kebabs, live counters add theater and unforgettable guest excitement.
                </p>
                <div className="pillar-stats">Michelin-Level Live Theater</div>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon">🧈</div>
                <h3>Pure Desi Ghee & Quality</h3>
                <p>
                  We never compromise with commercial vegetable oils or preservatives. We source 100% farm-fresh organic dairy and unadulterated whole spices for royal authenticity.
                </p>
                <div className="pillar-stats">100% Authentic Ingredients</div>
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

