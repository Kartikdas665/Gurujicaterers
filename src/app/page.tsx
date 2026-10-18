'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from './components/Navbar';

export default function Home() {
  // Interactive Form State
  const [selectedEventType, setSelectedEventType] = useState('wedding');
  const [dietaryOptions, setDietaryOptions] = useState<string[]>(['veg', 'dessert']);
  const [guestCount, setGuestCount] = useState<number>(150);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const toggleDietary = (item: string) => {
    if (dietaryOptions.includes(item)) {
      setDietaryOptions(dietaryOptions.filter((d) => d !== item));
    } else {
      setDietaryOptions([...dietaryOptions, item]);
    }
  };

  const calculateEstimate = () => {
    let baseRate = 850;
    if (selectedEventType === 'corporate') baseRate = 750;
    if (selectedEventType === 'celebrity') baseRate = 1800;
    if (selectedEventType === 'theme') baseRate = 1100;
    const addOn = dietaryOptions.length * 120;
    return (baseRate + addOn) * guestCount;
  };

  const faqs = [
    {
      q: 'What types of events do you cater to?',
      a: 'We provide comprehensive catering services for a wide range of events, including weddings, corporate functions, private parties, and destination events.'
    },
    {
      q: 'Can we customize the menu according to our preferences?',
      a: 'Absolutely. We specialize in creating bespoke menus tailored specifically to your taste, dietary requirements, and event theme.'
    },
    {
      q: 'Do you accommodate special dietary restrictions?',
      a: 'Yes, our chefs are highly skilled at preparing delicious vegetarian, vegan, gluten-free, and allergy-friendly options upon request.'
    },
    {
      q: 'Do you offer tasting sessions before booking?',
      a: 'Yes, we encourage our clients to schedule a tasting session to experience our culinary quality and finalize their menu selections.'
    }
  ];

  const testimonials = [
    {
      name: 'Victoria & Alexander Sterling',
      role: 'Luxury Destination Wedding',
      rating: 5,
      review: 'Guruji Caterers created an unforgettable culinary journey for our wedding weekend. From the exquisite live stations to the punctual and courteous service brigade, every detail was executed to perfection.',
      avatar: '👑'
    },
    {
      name: 'Marcus Vance',
      role: 'VP Corporate Relations, Global Summit',
      rating: 5,
      review: 'Hosting 800 international delegates requires precision and consistency. The catering team exceeded all expectations with impeccable food quality, seamless presentation, and strict hygiene standards.',
      avatar: '💼'
    },
    {
      name: 'Elena & Julian Brooks',
      role: 'Private Silver Jubilee Gala',
      rating: 5,
      review: 'The bespoke menu curation was second to none. Our guests are still raving about the live culinary displays and gourmet dessert studio. True white-glove hospitality!',
      avatar: '✨'
    },
    {
      name: 'Dr. Arjun & Radhika Patel',
      role: 'Grand Reception & Cocktail Evening',
      rating: 5,
      review: 'The harmonious blend of authentic regional heritage dishes with modern contemporary global fare was sublime. Highly recommended for any milestone occasion.',
      avatar: '🌟'
    }
  ];
  return (
    <>
      <Navbar />

      <main>
        {/* 1. Hero Section */}
        <section className="hero">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-video"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="hero-content">
            <h1>Crafting Unforgettable Culinary Experiences</h1>
            <p>Exquisite cuisine, impeccable service, and meticulous attention to detail. Let us transform your special occasions into extraordinary memories.</p>
            <div className="hero-btns">
              <a href="#menu" className="btn btn-primary">Explore Our Menu</a>
              <a href="#book" className="btn btn-outline">Get a Custom Quote</a>
            </div>
          </div>
        </section>

        {/* 2. Key Highlights (Why Choose Us) */}
        <section className="features-section features-section-dark">
          <div className="container">
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                    <line x1="6" y1="17" x2="18" y2="17" />
                  </svg>
                </div>
                <h3>Culinary Excellence</h3>
                <p>Highly experienced chefs crafting masterful dishes with passion and precision.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3>Premium Ingredients</h3>
                <p>We source only the freshest and highest quality ingredients for unparalleled taste.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <h3>Bespoke Menus</h3>
                <p>Fully customized culinary offerings tailored to your specific event requirements and budget.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3>Uncompromising Hygiene</h3>
                <p>Adhering to the strictest safety and sanitation standards for your peace of mind.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Our Signature Services */}
        <section id="signature-services" className="signature-services-section">
          <div className="container">
            <div className="signature-header">
              <div className="gold-accent-line"></div>
              <p className="signature-subheading">Experience unparalleled catering excellence.</p>
              <h2 className="signature-title">Our Signature Services</h2>
              <div className="signature-divider">
                <span className="divider-line"></span>
                <span className="signature-bowl-icon">🥣</span>
                <span className="divider-line"></span>
              </div>
            </div>

            <div className="signature-grid">
              {/* Service 1: Social & Private Events */}
              <div className="signature-card">
                <div className="signature-card-inner">
                  {/* Front Side */}
                  <div className="signature-card-front">
                    <div className="signature-card-bg" style={{ backgroundImage: `url('/catering_hero_1791127858700.jpg')` }}></div>
                    <div className="signature-card-overlay"></div>
                    <div className="signature-card-inner-frame">
                      <div className="signature-card-content">
                        <div className="card-top-accent"></div>
                        <h3 className="signature-card-title">Social & Private Events</h3>
                        <p className="signature-card-tag">MEMORABLE GATHERINGS</p>
                        <div className="card-mini-divider">
                          <span></span>
                          <span className="mini-icon">🍲</span>
                          <span></span>
                        </div>
                        <div className="signature-card-number">01.</div>
                      </div>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="signature-card-back">
                    <div className="signature-card-inner-frame">
                      <div className="signature-card-content back-content">
                        <div className="card-top-accent"></div>
                        <h3 className="signature-card-title">Social & Private Events</h3>
                        <p className="signature-card-desc">
                          Celebrate life’s milestones with personalized menus and flawless hospitality perfectly suited for intimate gatherings and grand celebrations.
                        </p>
                        <div className="card-mini-divider">
                          <span></span>
                          <span className="mini-icon">✨</span>
                          <span></span>
                        </div>
                        <a href="#book" className="btn btn-gold">Explore Experience</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service 2: Corporate Catering */}
              <div className="signature-card">
                <div className="signature-card-inner">
                  {/* Front Side */}
                  <div className="signature-card-front">
                    <div className="signature-card-bg" style={{ backgroundImage: `url('/catering_corporate_1791127885197.jpg')` }}></div>
                    <div className="signature-card-overlay"></div>
                    <div className="signature-card-inner-frame">
                      <div className="signature-card-content">
                        <div className="card-top-accent"></div>
                        <h3 className="signature-card-title">Corporate Catering</h3>
                        <p className="signature-card-tag">PROFESSIONAL EXCELLENCE</p>
                        <div className="card-mini-divider">
                          <span></span>
                          <span className="mini-icon">🍲</span>
                          <span></span>
                        </div>
                        <div className="signature-card-number">02.</div>
                      </div>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="signature-card-back">
                    <div className="signature-card-inner-frame">
                      <div className="signature-card-content back-content">
                        <div className="card-top-accent"></div>
                        <h3 className="signature-card-title">Corporate Catering</h3>
                        <p className="signature-card-desc">
                          Impress your clients and colleagues with highly professional catering solutions, ideal for board meetings, seminars, and corporate galas.
                        </p>
                        <div className="card-mini-divider">
                          <span></span>
                          <span className="mini-icon">💼</span>
                          <span></span>
                        </div>
                        <a href="#book" className="btn btn-gold">Book For Events</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service 3: Destination Weddings */}
              <div className="signature-card">
                <div className="signature-card-inner">
                  {/* Front Side */}
                  <div className="signature-card-front">
                    <div className="signature-card-bg" style={{ backgroundImage: `url('/catering_wedding_1791127871855.jpg')` }}></div>
                    <div className="signature-card-overlay"></div>
                    <div className="signature-card-inner-frame">
                      <div className="signature-card-content">
                        <div className="card-top-accent"></div>
                        <h3 className="signature-card-title">Destination Weddings</h3>
                        <p className="signature-card-tag">CELEBRATE IN STYLE</p>
                        <div className="card-mini-divider">
                          <span></span>
                          <span className="mini-icon">🍲</span>
                          <span></span>
                        </div>
                        <div className="signature-card-number">03.</div>
                      </div>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="signature-card-back">
                    <div className="signature-card-inner-frame">
                      <div className="signature-card-content back-content">
                        <div className="card-top-accent"></div>
                        <h3 className="signature-card-title">Destination Weddings</h3>
                        <p className="signature-card-desc">
                          Turn your dream wedding into reality with a luxurious culinary experience designed to delight you and your esteemed guests.
                        </p>
                        <div className="card-mini-divider">
                          <span></span>
                          <span className="mini-icon">💍</span>
                          <span></span>
                        </div>
                        <a href="#book" className="btn btn-gold">Plan Your Wedding</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. About Us */}
        <section id="about" className="about-section">
          <div className="container about-container">
            <div className="about-image">
              <img src="/catering_wedding_1791127871855.jpg" alt="Our Story A Legacy of Excellence - Masterchefs orchestrating catering gala" style={{ height: '400px', objectFit: 'cover' }} />
            </div>
            <div className="about-text">
              <h2>Our Story: A Legacy of Excellence</h2>
              <p>We believe that exceptional food is the soul of every great event. With years of industry experience, our dedicated team goes beyond just cooking; we curate memorable dining experiences that leave a lasting impression. From the first bite to the final toast, we ensure perfection.</p>
              <p>Whether it is an extravagant destination wedding banquet, an executive corporate summit, or an intimate private gathering, our master chefs and service brigade bring precision, artistic presentation, and bespoke luxury to your celebrations.</p>
            </div>
          </div>
        </section>

        {/* 5. Menu Showcase */}
        <section id="menu" className="menu-section">
          <div className="container">
            <h2 className="section-title">Menu Showcase</h2>
            <p style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px', color: '#c7c7c7', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Discover a world of flavors with our thoughtfully curated selection of signature dishes. From authentic regional delicacies to contemporary global cuisines, our diverse menu is designed to satisfy every palate.
            </p>
            <div className="menu-grid">
              <div className="menu-item">
                <img src="/catering_hero_1791127858700.jpg" alt="Luxury Wedding Catering Food Display - Charcoal Tandoori & Artisanal Kebabs" />
                <h4>Artisanal Tandoori & Kebabs</h4>
                <p>Authentic charcoal sigri appetizers cooked to perfection with exquisite hand-ground spices.</p>
              </div>
              <div className="menu-item">
                <img src="/catering_corporate_1791127885197.jpg" alt="Corporate Event Buffet Setup - Contemporary Global & Mediterranean Platter" />
                <h4>Continental & Mediterranean</h4>
                <p>Curated artisanal salads, pasta stations and gourmet international delicacies crafted fresh.</p>
              </div>
              <div className="menu-item">
                <img src="/catering_wedding_1791127871855.jpg" alt="Gourmet Dessert Studio - Traditional Confectionery & Liquid Nitrogen Kulfi" />
                <h4>Artisanal Dessert Studio</h4>
                <p>Rich traditional mithais alongside decadent chocolate confectionery and live nitrogen delicacies.</p>
              </div>
              <div className="menu-item">
                <img src="/catering_party_footer.jpg" alt="Private Party Catering Buffet Setup - Grand Celebratory Spread" />
                <h4>Grand Banquet Buffet</h4>
                <p>Exquisite multi-cuisine spreads with royal live counters tailored for lavish celebratory dining.</p>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '35px' }}>
              <a href="/menu" className="btn btn-primary">View Full Menu</a>
            </div>
          </div>
        </section>

        {/* 6. Testimonials */}
        <section id="testimonials" className="testimonials-section">
          <div className="container">
            <div className="section-header-centered">
              <span className="section-pill">TESTIMONIALS</span>
              <h2 className="section-title-luxury">What Our Guests Say</h2>
              <p className="section-subtitle">Real experiences highlighting our culinary quality, impeccable punctuality, and professional hospitality staff.</p>
            </div>

            <div className="testimonials-grid">
              {testimonials.map((item, idx) => (
                <div key={idx} className="testimonial-card">
                  <div className="testimonial-quote-mark">“</div>
                  <div className="testimonial-rating">
                    {'★'.repeat(item.rating)}
                  </div>
                  <p className="testimonial-text">{item.review}</p>
                  <div className="testimonial-user">
                    <div className="testimonial-avatar">{item.avatar}</div>
                    <div className="testimonial-info">
                      <h4>{item.name}</h4>
                      <span>{item.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Booking / Lead Generation Form */}
        <section id="book" className="interactive-book-section">
          <div className="container">
            <div className="book-card-container">
              <div className="book-card-left">
                <span className="section-pill">LIVE QUOTE & BOOKING</span>
                <h2>Design Your Dream Catering Experience</h2>
                <p>Tell us about your upcoming event, and our culinary experts will craft a customized proposal just for you.</p>

                {/* Event Type Selector */}
                <div className="booking-option-group">
                  <label className="group-label">1. Event Type</label>
                  <div className="event-pills-row">
                    {[
                      { id: 'wedding', label: '💍 Destination Wedding' },
                      { id: 'corporate', label: '💼 Corporate Catering' },
                      { id: 'private', label: '🎉 Social & Private Events' },
                      { id: 'celebrity', label: '🌟 Celebrity VIP' },
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedEventType(type.id)}
                        className={`event-type-pill ${selectedEventType === type.id ? 'active' : ''}`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Guest Slider */}
                <div className="booking-option-group">
                  <div className="slider-label-row">
                    <label className="group-label">2. Estimated Guest Count</label>
                    <span className="slider-val-badge">{guestCount} Guests</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1500"
                    step="25"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="guest-range-slider"
                  />
                  <div className="slider-scale">
                    <span>50 Guests</span>
                    <span>500</span>
                    <span>1,000</span>
                    <span>1,500+ Guests</span>
                  </div>
                </div>

                {/* Dietary & Service Addons */}
                <div className="booking-option-group">
                  <label className="group-label">3. Culinary Stations & Add-ons</label>
                  <div className="addon-chips-grid">
                    {[
                      { id: 'veg', label: '🥗 Pure Veg & Jain Counter' },
                      { id: 'chaat', label: '🥘 Live Delhi Chaat Studio' },
                      { id: 'live-tandoor', label: '🔥 Live Sigri Tandoor' },
                      { id: 'dessert', label: '🍨 Royal Dessert Studio' },
                      { id: 'mocktails', label: '🍹 Signature Mocktail Lounge' },
                    ].map((addon) => (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleDietary(addon.id)}
                        className={`addon-chip ${dietaryOptions.includes(addon.id) ? 'active' : ''}`}
                      >
                        <span className="chip-check">{dietaryOptions.includes(addon.id) ? '✓' : '+'}</span>
                        {addon.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: Contact & Live Price Card */}
              <div className="book-card-right">
                <div className="price-estimator-box">
                  <div className="price-tag-title">ESTIMATED INVESTMENT</div>
                  <div className="price-number">
                    ₹{calculateEstimate().toLocaleString('en-IN')}
                    <span className="price-approx"> *approx</span>
                  </div>
                  <p className="price-note">
                    ₹{Math.round(calculateEstimate() / guestCount)} / guest for {guestCount} attendees with {dietaryOptions.length} premium counters.
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="booking-success-box">
                    <div className="success-icon">🎉</div>
                    <h3>Booking Request Received!</h3>
                    <p>Thank you! Our culinary director will connect with you within 2 business hours with a bespoke tasting menu and detailed proposal.</p>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="btn btn-outline"
                      style={{ marginTop: '16px' }}
                    >
                      Plan Another Event
                    </button>
                  </div>
                ) : (
                  <form
                    className="interactive-form-inputs"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormSubmitted(true);
                    }}
                  >
                    <div className="form-input-field">
                      <label>Full Name</label>
                      <input type="text" placeholder="e.g. Alexander Vance" required />
                    </div>

                    <div className="form-input-field">
                      <label>Email Address</label>
                      <input type="email" placeholder="alexander@example.com" required />
                    </div>

                    <div className="form-input-field">
                      <label>Phone Number</label>
                      <input type="tel" placeholder="+91 98765 43210" required />
                    </div>

                    <div className="form-input-row">
                      <div className="form-input-field">
                        <label>Event Date</label>
                        <input type="date" required />
                      </div>
                      <div className="form-input-field">
                        <label>Event Type</label>
                        <select
                          value={selectedEventType}
                          onChange={(e) => setSelectedEventType(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            background: '#151515',
                            border: '1px solid #333',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '0.95rem'
                          }}
                        >
                          <option value="private">Social & Private Events</option>
                          <option value="corporate">Corporate Catering</option>
                          <option value="wedding">Destination Weddings</option>
                          <option value="celebrity">Celebrity & VIP Events</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-input-field">
                      <label>Estimated Guest Count</label>
                      <input
                        type="number"
                        min="50"
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        required
                      />
                    </div>

                    <div className="form-input-field">
                      <label>Special Requirements</label>
                      <textarea rows={2} placeholder="Dietary restrictions (vegan, gluten-free, Jain), chef live counters, or event themes..."></textarea>
                    </div>

                    <button type="submit" className="btn-luxury-submit">
                      <span>Request a Bespoke Tasting</span>
                      <span className="btn-arrow">→</span>
                    </button>
                    <p className="guarantee-text">🔒 100% Privacy • No Spam • Complimentary Food Tasting</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 8. Frequently Asked Questions (FAQ) */}
        <section id="faq" className="faq-section">
          <div className="container faq-container">
            <div className="section-header-centered">
              <span className="section-pill">HELP & CLARITY</span>
              <h2 className="section-title-luxury">Frequently Asked Questions</h2>
              <p className="section-subtitle">Everything you need to know about our luxury catering and booking procedure.</p>
            </div>

            <div className="faq-accordion">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className={`faq-item ${isOpen ? 'active' : ''}`}
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                  >
                    <div className="faq-question">
                      <h3>{faq.q}</h3>
                      <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                    </div>
                    {isOpen && (
                      <div className="faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* 9. Footer */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo">
                <span className="logo-icon" style={{ color: 'white' }}>🍽️</span>
                GURUJI CATERERS
              </div>
              <p className="footer-desc">Premium catering services for weddings, corporate galas, and private celebrations with exquisite taste and flawless execution.</p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px', fontSize: '1.2rem' }}>
                <a href="#" aria-label="Instagram" style={{ color: '#c5a880' }}>📸</a>
                <a href="#" aria-label="Facebook" style={{ color: '#c5a880' }}>📘</a>
                <a href="#" aria-label="LinkedIn" style={{ color: '#c5a880' }}>💼</a>
                <a href="#" aria-label="WhatsApp" style={{ color: '#c5a880' }}>💬</a>
              </div>
            </div>
            <div className="footer-col">
              <h4>CONTACT US</h4>
              <ul>
                <li><p>📞 +91 98765 43210 / +91 91234 56789</p></li>
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
                <li><a href="/menu">Menu</a></li>
                <li><a href="/faq">FAQ</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>EXPERIENCE</h4>
              <ul>
                <li><a href="/book">Book Tasting</a></li>
                <li><a href="/reviews">Reviews</a></li>
                <li><a href="#signature-services">Signature Services</a></li>
                <li><a href="#book">Get a Quote</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Guruji Caterers. All Rights Reserved. | Premium Catering Services for Weddings, Corporate & Private Events</p>
          </div>
        </div>
      </footer>
    </>
  );
}
