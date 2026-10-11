'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BookNowPage() {
  const [step, setStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    eventType: 'Royal Wedding',
    packageTier: 'Royal Grand Banquet',
    guests: 200,
    eventDate: '',
    eventSlot: 'Dinner Banquet',
    cityVenue: '',
    fullName: '',
    phone: '',
    email: '',
    specialRequirements: '',
    liveCounters: ['Delhi Chaat', 'Dessert Studio', 'Live Tandoor'] as string[],
  });

  const packages = [
    {
      id: 'Silver Classic',
      price: 850,
      badge: 'POPULAR',
      features: ['4 Starters + 2 Live Counters', '8 Main Course Curries & Dal', 'Assorted Tandoori Breads & Rice', '3 Signature Desserts', 'Uniformed Service Crew'],
    },
    {
      id: 'Royal Grand Banquet',
      price: 1350,
      badge: 'RECOMMENDED',
      features: ['6 Artisanal Starters', '4 Live Counters (Chaat, Pasta, Tandoor)', '12 Gourmet Main Courses', 'Liquid Mocktail Lounge', 'Artisanal Dessert & Kulfi Bar', 'Luxury Bone China Dinnerware'],
    },
    {
      id: 'Imperial Celebrity VIP',
      price: 2200,
      badge: 'ULTRA LUXURY',
      features: ['Personal Masterchef Curation', 'Unlimited Global Live Stations', 'Imported Gourmet Ingredients', 'Exotic Fruit & Molecular Desserts', 'Butler Style Silver Service', 'Dedicated VIP Hospitality Manager'],
    },
  ];

  const availableCounters = [
    'Delhi Chaat Corner',
    'Live Tandoor & Kebabs',
    'Wood-fired Italian Pizza & Pasta',
    'Oriental Wok & Dimsums',
    'Signature Mocktail Bar',
    'Dessert Studio & Cold Stone Kulfi',
    'Rajasthani Traditional Dal Baati',
    'Coastal Seafood Special',
  ];

  const handleCounterToggle = (counter: string) => {
    if (formData.liveCounters.includes(counter)) {
      setFormData({
        ...formData,
        liveCounters: formData.liveCounters.filter((c) => c !== counter),
      });
    } else {
      setFormData({
        ...formData,
        liveCounters: [...formData.liveCounters, counter],
      });
    }
  };

  const selectedPkg = packages.find((p) => p.id === formData.packageTier) || packages[1];
  const counterAddonRate = (formData.liveCounters.length) * 80;
  const estimatedPerGuest = selectedPkg.price + counterAddonRate;
  const totalInvestment = estimatedPerGuest * formData.guests;

  return (
    <>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <Link href="/" className="logo">
            <span className="logo-icon">🍽️</span>
            GURUJI CATERERS
          </Link>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/#about">About</Link>
            <Link href="/#signature-services">Services</Link>
            <Link href="/#menu">Menu</Link>
            <Link href="/#faq">FAQ</Link>
          </div>
          <Link href="/" className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '8px 18px' }}>
            ← Back to Home
          </Link>
        </div>
      </nav>

      <main className="book-page-main">
        <div className="container">
          {/* Page Header */}
          <div className="book-page-header">
            <span className="section-pill">ONLINE RESERVATION</span>
            <h1>Reserve Your Grand Culinary Experience</h1>
            <p>Customize your royal menu, select bespoke live counters, and get an instant quote.</p>
          </div>

          {/* Stepper Wizard Indicator */}
          <div className="booking-stepper">
            <div className={`step-node ${step >= 1 ? 'active' : ''}`}>
              <div className="step-circle">1</div>
              <span>Event Details</span>
            </div>
            <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
            <div className={`step-node ${step >= 2 ? 'active' : ''}`}>
              <div className="step-circle">2</div>
              <span>Package & Counters</span>
            </div>
            <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
            <div className={`step-node ${step >= 3 ? 'active' : ''}`}>
              <div className="step-circle">3</div>
              <span>Contact & Summary</span>
            </div>
          </div>

          {/* Form Container */}
          <div className="book-page-layout">
            {/* Left Multi-step Content */}
            <div className="book-step-card">
              {submitted ? (
                <div className="booking-success-screen">
                  <div className="success-badge-icon">👑</div>
                  <h2>Reservation Request Submitted!</h2>
                  <p className="success-highlight">Reference ID: #GC-{Math.floor(100000 + Math.random() * 900000)}</p>
                  <p className="success-desc">
                    Thank you, <strong>{formData.fullName}</strong>. Humare senior culinary director aapke event (<strong>{formData.eventType}</strong> on <strong>{formData.eventDate || 'selected date'}</strong>) ke regarding sample menu tasting aur final booking schedule ke sath agle 2 ghante me call/WhatsApp karenge.
                  </p>
                  <div className="success-actions">
                    <Link href="/" className="btn btn-gold">
                      Return to Homepage
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setStep(1);
                      }}
                      className="btn btn-outline"
                    >
                      Book Another Event
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (step < 3) {
                      setStep(step + 1);
                    } else {
                      setSubmitted(true);
                    }
                  }}
                >
                  {/* STEP 1: EVENT DETAILS */}
                  {step === 1 && (
                    <div className="step-content">
                      <h3 className="step-title">Step 1: Event & Venue Particulars</h3>

                      <div className="form-row-2">
                        <div className="form-field">
                          <label>Event Type</label>
                          <select
                            value={formData.eventType}
                            onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                            required
                          >
                            <option value="Royal Wedding">💍 Royal Wedding</option>
                            <option value="Destination Wedding">🏖️ Destination Wedding</option>
                            <option value="Corporate Gala & Summit">💼 Corporate Gala & Summit</option>
                            <option value="Celebrity & VIP Gathering">🌟 Celebrity & VIP Gathering</option>
                            <option value="Cocktail & Sangeet Night">🍸 Cocktail & Sangeet Night</option>
                            <option value="Anniversary & Birthday Celebration">🎂 Anniversary & Birthday</option>
                          </select>
                        </div>

                        <div className="form-field">
                          <label>Meal Session Slot</label>
                          <select
                            value={formData.eventSlot}
                            onChange={(e) => setFormData({ ...formData, eventSlot: e.target.value })}
                            required
                          >
                            <option value="Dinner Banquet">🌙 Dinner Banquet (Evening)</option>
                            <option value="Lunch Feast">☀️ Lunch Feast (Afternoon)</option>
                            <option value="High Tea & Evening Cocktails">☕ High Tea & Evening Cocktails</option>
                            <option value="All-Day Catering">✨ Full Day (Lunch + Dinner)</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-row-2">
                        <div className="form-field">
                          <label>Event Date</label>
                          <input
                            type="date"
                            value={formData.eventDate}
                            onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                            required
                          />
                        </div>

                        <div className="form-field">
                          <label>City & Venue Location</label>
                          <input
                            type="text"
                            placeholder="e.g. Udaipur Palace / The Leela, Delhi NCR"
                            value={formData.cityVenue}
                            onChange={(e) => setFormData({ ...formData, cityVenue: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      {/* Guest Slider */}
                      <div className="form-field" style={{ marginTop: '16px' }}>
                        <div className="slider-header-flex">
                          <label>Guest Capacity</label>
                          <span className="slider-count-badge">{formData.guests} Guests</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="2000"
                          step="25"
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                          className="luxury-range"
                        />
                        <div className="slider-markers">
                          <span>50 Min</span>
                          <span>500</span>
                          <span>1,000</span>
                          <span>2,000+ Guests</span>
                        </div>
                      </div>

                      <div className="step-nav-buttons">
                        <div></div>
                        <button type="submit" className="btn btn-gold">
                          Continue to Packages →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: PACKAGES & COUNTERS */}
                  {step === 2 && (
                    <div className="step-content">
                      <h3 className="step-title">Step 2: Select Culinary Tier & Live Counters</h3>

                      {/* Package Tiers Grid */}
                      <div className="package-cards-grid">
                        {packages.map((pkg) => (
                          <div
                            key={pkg.id}
                            className={`package-card-option ${formData.packageTier === pkg.id ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, packageTier: pkg.id })}
                          >
                            <div className="pkg-badge">{pkg.badge}</div>
                            <h4>{pkg.id}</h4>
                            <div className="pkg-price-row">
                              <span className="pkg-price">₹{pkg.price}</span>
                              <span className="pkg-per">/ plate</span>
                            </div>
                            <ul className="pkg-feature-list">
                              {pkg.features.map((f, i) => (
                                <li key={i}>✓ {f}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Live Counter Addons */}
                      <div className="counter-section-block">
                        <label className="section-sub-label">Customize Live Gourmet Counters</label>
                        <p className="counter-sub-note">Select specific live stations you want in your event:</p>
                        <div className="counter-selection-grid">
                          {availableCounters.map((counter) => (
                            <div
                              key={counter}
                              className={`counter-pill-box ${formData.liveCounters.includes(counter) ? 'selected' : ''}`}
                              onClick={() => handleCounterToggle(counter)}
                            >
                              <span className="counter-checkbox">
                                {formData.liveCounters.includes(counter) ? '✓' : '+'}
                              </span>
                              <span>{counter}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="step-nav-buttons">
                        <button type="button" onClick={() => setStep(1)} className="btn btn-outline">
                          ← Back to Event Details
                        </button>
                        <button type="submit" className="btn btn-gold">
                          Continue to Final Step →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: CONTACT & CONFIRMATION */}
                  {step === 3 && (
                    <div className="step-content">
                      <h3 className="step-title">Step 3: Contact & Tasting Schedule</h3>

                      <div className="form-row-2">
                        <div className="form-field">
                          <label>Full Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Vikramaditya Rathore"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            required
                          />
                        </div>

                        <div className="form-field">
                          <label>WhatsApp / Phone Number</label>
                          <input
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-field">
                        <label>Email Address</label>
                        <input
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-field">
                        <label>Special Instructions & Dietary Preferences (Optional)</label>
                        <textarea
                          rows={3}
                          placeholder="Mention any specific regional delicacies, pure Jain requests, foreign cuisines, or celebrity privacy protocols..."
                          value={formData.specialRequirements}
                          onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                        ></textarea>
                      </div>

                      <div className="tasting-perk-box">
                        <span className="perk-icon">🎁</span>
                        <div>
                          <strong>Complimentary Masterchef Tasting Included</strong>
                          <p>Once submitted, our team will coordinate a private menu tasting for up to 4 family members before finalizing contracts.</p>
                        </div>
                      </div>

                      <div className="step-nav-buttons">
                        <button type="button" onClick={() => setStep(2)} className="btn btn-outline">
                          ← Back to Packages
                        </button>
                        <button type="submit" className="btn btn-gold btn-large">
                          Confirm & Reserve Date 👑
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Right Summary Sidebar Card */}
            <div className="booking-summary-sidebar">
              <div className="summary-card-inner">
                <div className="summary-header">
                  <span className="gold-mini-bar"></span>
                  <h3>Order Summary</h3>
                </div>

                <div className="summary-list">
                  <div className="summary-item">
                    <span>Event Type:</span>
                    <strong>{formData.eventType}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Guest Count:</span>
                    <strong>{formData.guests} Persons</strong>
                  </div>
                  <div className="summary-item">
                    <span>Selected Tier:</span>
                    <strong>{formData.packageTier}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Slot & Venue:</span>
                    <strong>{formData.eventSlot} • {formData.cityVenue || 'TBD'}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Date:</span>
                    <strong>{formData.eventDate || 'Not yet selected'}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Live Counters:</span>
                    <strong>{formData.liveCounters.length} Selected</strong>
                  </div>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-pricing">
                  <div className="price-row">
                    <span>Base Tier:</span>
                    <span>₹{selectedPkg.price} / plate</span>
                  </div>
                  <div className="price-row">
                    <span>Addon Counters:</span>
                    <span>+₹{counterAddonRate} / plate</span>
                  </div>
                  <div className="price-row total-highlight">
                    <span>Est. Total Investment:</span>
                    <span className="gold-total">₹{totalInvestment.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="per-plate-note">
                    (Approx. ₹{estimatedPerGuest} per guest all-inclusive)
                  </div>
                </div>

                <div className="sidebar-trust-badges">
                  <div className="trust-item">
                    <span>🛡️</span> 100% Date Protection Guarantee
                  </div>
                  <div className="trust-item">
                    <span>👨‍🍳</span> Certified 5-Star Executive Chefs
                  </div>
                  <div className="trust-item">
                    <span>✨</span> Zero Hidden Charges
                  </div>
                </div>
              </div>
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
              <h4>EXPLORE</h4>
              <ul>
                <li><Link href="/#about">About Us</Link></li>
                <li><Link href="/#signature-services">Signature Services</Link></li>
                <li><Link href="/#menu">Menu Showcase</Link></li>
                <li><Link href="/#faq">FAQ</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>QUICK LINKS</h4>
              <ul>
                <li><Link href="/book">Reserve Date</Link></li>
                <li><Link href="/#testimonials">Client Reviews</Link></li>
                <li><Link href="/#menu">Download PDF Menu</Link></li>
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
