'use client';

import { useState } from 'react';
import Image from 'next/image';

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
      q: 'Kitne din pehle booking confirm karni chahiye?',
      a: 'Hum recommend karte hain ki weddings aur grand events ke liye kam se kam 3-4 hafte pehle book karein. Corporate ya intimate parties ke liye hum 5-7 din pehle bhi booking accommodate kar sakte hain.'
    },
    {
      q: 'Kya hum custom live food counters aur tasting arrange kar sakte hain?',
      a: 'Haan bilkul! Hum customized live chaat counters, tandoor stations, Italian pasta bars aur artisan desserts arrange karte hain. Final menu lock karne se pehle complimentary food tasting session bhi available hai.'
    },
    {
      q: 'Minimum guest count requirement kya hai?',
      a: 'Humari standard packages 50 guests se start hoti hain. Badi weddings aur corporate summits ke liye hum 3,000+ guests tak ka live seamless catering manage karte hain.'
    },
    {
      q: 'Service staff, crockery aur cutlery caterers ke side se provide hoti hai?',
      a: 'Haan, hum complete end-to-end luxury hospitality provide karte hain — professionally groomed uniforms me waiters, chefs, premium bone china crockery, glassware aur live table setups included rehte hain.'
    },
    {
      q: 'Payment terms aur cancellation policies kya hain?',
      a: 'Booking confirm karne ke liye 30% advance deposit hota hai, event se 2 din pehle 50%, aur event complete hone ke baad balance 20%. Date reschedule karne ki flexible policy bhi provided hai.'
    }
  ];

  const testimonials = [
    {
      name: 'Vikram & Ananya Sharma',
      role: 'Destination Wedding at Udaipur',
      rating: 5,
      review: 'Guruji Caterers ne humari wedding ko sach me yaadgaar bana diya! Khaane ka swaad, presentation aur staff ki hospitality lajawaab thi. Har guest ne khaane ki taareef ki!',
      avatar: '👑'
    },
    {
      name: 'Rajesh Singhania',
      role: 'Director, Singhania Tech Summit',
      rating: 5,
      review: '800 delegates ke liye corporate lunch manage karna easy nahi hota, lekin inki team ne time, taste aur hygiene me 100% perfection deliver kiya. Highly recommended!',
      avatar: '💼'
    },
    {
      name: 'Pooja & Rohan Malhotra',
      role: 'Silver Jubilee Celebration',
      rating: 5,
      review: 'Live chaat counter aur traditional desserts top-notch the. Customization bohot smooth thi aur pricing pure luxury experience ke hisaab se fully justified thi.',
      avatar: '✨'
    }
  ];
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">🍽️</span>
            LOGO
          </div>
          <div className="nav-links">
            <a href="#" className="active">Home</a>
            <a href="#about">About</a>
            <a href="#signature-services">Services</a>
            <a href="#menu">Menu</a>
            <a href="#testimonials">Reviews</a>
            <a href="#faq">FAQ</a>
          </div>
          <a href="/book" className="btn btn-primary">Book Now</a>
        </div>
      </nav>

      <main>
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
            <h1>Aapki Parties Ko Banayein Yaadgaar....</h1>
            <p>Bringing Our Culinary Expertise Elevate Your Celebrations</p>
            <div className="hero-btns">
              <a href="/book" className="btn btn-primary">BOOK NOW</a>
              <a href="#book" className="btn btn-outline">QUICK ESTIMATE</a>
            </div>
          </div>
        </section>

        {/* <section className="features-section">
          <div className="container">
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2-2a1 1 0 0 0-1.4 0l-4.3 4.3a1 1 0 0 0 0 1.4Z" />
                    <path d="m18 10 3.3-3.3a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0L14 6" />
                    <path d="m2 14 6 6" />
                    <path d="M7 8l4-4" />
                    <path d="m14 13-1.5-1.5" />
                    <path d="M3 21l3-3" />
                  </svg>
                </div>
                <h3>Trusted Services</h3>
                <p>Over 1,000+ happy customers and growing</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                    <path d="M21 14h-1a3 3 0 0 0-3 3v1a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-1a3 3 0 0 0-3-3H2" />
                  </svg>
                </div>
                <h3>Instant Support</h3>
                <p>Whenever you want to contact our pros they are available.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <polyline points="16 11 18 13 22 9" />
                  </svg>
                </div>
                <h3>Verified professionals</h3>
                <p>Our professionals with backgrounds checked give best services.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l1.6 3.2 3.6.5-2.6 2.5.6 3.6L12 10.1 8.8 11.8l.6-3.6-2.6-2.5 3.6-.5z" />
                    <rect x="3" y="14" width="5" height="7" rx="1" />
                    <rect x="9.5" y="11" width="5" height="10" rx="1" />
                    <rect x="16" y="16" width="5" height="5" rx="1" />
                  </svg>
                </div>
                <h3>Highest Average Rating</h3>
                <p>We are rated 4.5 or over by customers across all sections of our services.</p>
              </div>
            </div>
          </div>
        </section> */}

        <section className="features-section features-section-dark">
          <div className="container">
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2-2a1 1 0 0 0-1.4 0l-4.3 4.3a1 1 0 0 0 0 1.4Z" />
                    <path d="m18 10 3.3-3.3a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0L14 6" />
                    <path d="m2 14 6 6" />
                    <path d="M7 8l4-4" />
                    <path d="m14 13-1.5-1.5" />
                    <path d="M3 21l3-3" />
                  </svg>
                </div>
                <h3>Trusted Services</h3>
                <p>Over 1,000+ happy customers and growing</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                    <path d="M21 14h-1a3 3 0 0 0-3 3v1a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-1a3 3 0 0 0-3-3H2" />
                  </svg>
                </div>
                <h3>Instant Support</h3>
                <p>Whenever you want to contact our pros they are available.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <polyline points="16 11 18 13 22 9" />
                  </svg>
                </div>
                <h3>Verified professionals</h3>
                <p>Our professionals with backgrounds checked give best services.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l1.6 3.2 3.6.5-2.6 2.5.6 3.6L12 10.1 8.8 11.8l.6-3.6-2.6-2.5 3.6-.5z" />
                    <rect x="3" y="14" width="5" height="7" rx="1" />
                    <rect x="9.5" y="11" width="5" height="10" rx="1" />
                    <rect x="16" y="16" width="5" height="5" rx="1" />
                  </svg>
                </div>
                <h3>Highest Average Rating</h3>
                <p>We are rated 4.5 or over by customers across all sections of our services.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Signature Services Section */}
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
              {/* Card 1 */}
              <div className="signature-card">
                <div className="signature-card-inner">
                  {/* Front Side */}
                  <div className="signature-card-front">
                    <div className="signature-card-bg" style={{ backgroundImage: `url('/catering_hero_1791127858700.jpg')` }}></div>
                    <div className="signature-card-overlay"></div>
                    <div className="signature-card-inner-frame">
                      <div className="signature-card-content">
                        <div className="card-top-accent"></div>
                        <h3 className="signature-card-title">Celebrity Events</h3>
                        <p className="signature-card-tag">ELITE PRIVATE GATHERINGS</p>
                        <div className="card-mini-divider">
                          <span></span>
                          <span className="mini-icon">🍲</span>
                          <span></span>
                        </div>
                        <div className="signature-card-number">05.</div>
                      </div>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="signature-card-back">
                    <div className="signature-card-inner-frame">
                      <div className="signature-card-content back-content">
                        <div className="card-top-accent"></div>
                        <h3 className="signature-card-title">Celebrity Events</h3>
                        <p className="signature-card-desc">
                          Bespoke culinary journeys curated for high-profile gatherings with utmost privacy, luxury service & Michelin-inspired cuisine.
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

              {/* Card 2 */}
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
                        <p className="signature-card-tag">CORPORATE EVENTS</p>
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
                        <h3 className="signature-card-title">Corporate Catering</h3>
                        <p className="signature-card-desc">
                          Seamless catering solutions for summits, annual galas, client luncheons, and executive board meets with impeccable presentation.
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

              {/* Card 3 */}
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
                        <div className="signature-card-number">02.</div>
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
                          Grand royal feasts and live gourmet counters tailored for destination wedding extravaganzas across exotic locales.
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

        <section id="about" className="about-section">
          <div className="container about-container">
            <div className="about-image">
              <img src="/catering_wedding_1791127871855.jpg" alt="Chefs Cooking" style={{ height: '400px', objectFit: 'cover' }} />
            </div>
            <div className="about-text">
              <h2>Humari Kahani:<br />Saalon Ka Anubhav</h2>
              <p>We poplessttad a foaldiond tore wen treditional compelating cecoeststs silfine enssonful easstterts and successfully outhun caterhs oate ceating cosdfions.</p>
              <p>We concuren our censemmene ta taditional online catering toe travistam cemices to online conshling collins paaldons, mere mopdaait oi our roone mamselaghous our yeors of years caperemas.</p>
            </div>
          </div>
        </section>

        <section id="menu" className="menu-section">
          <div className="container">
            <h2 className="section-title">Menu Showcase</h2>
            <div className="menu-grid">
              <div className="menu-item">
                <img src="/catering_hero_1791127858700.jpg" alt="Roasted Chicken" />
                <h4>Temdusp andiamti sam maseting tankoom o scorring tandoorn aonn alidination.</h4>
                <p>A delicious spread featuring our best grilled items and side dishes.</p>
              </div>
              <div className="menu-item">
                <img src="/catering_corporate_1791127885197.jpg" alt="Mediterranean Platter" />
                <h4>Meditesmsmam Naumt plistter as a neos aninnoldalmetse Mediterrmsme Hisurs.</h4>
                <p>A wonderful healthy platter filled with Mediterranean delights.</p>
              </div>
              <div className="menu-item">
                <img src="/catering_wedding_1791127871855.jpg" alt="Chocolate Dessert" />
                <h4>Cheodolate locniano deurhocorhecoko leve, enco plates ocosent ae bommorn.</h4>
                <p>Our famous chocolate dessert is a must-have at any event.</p>
              </div>
              <div className="menu-item">
                <img src="/catering_hero_1791127858700.jpg" alt="Buffet Dining" />
                <h4>Pertevalstest colop of a buffdong zci nvoce preteretesoues.</h4>
                <p>Exquisite buffet setups perfect for large gatherings.</p>
              </div>
            </div>
            <a href="#" className="btn btn-primary">Download Full Menu PDF</a>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="testimonials-section">
          <div className="container">
            <div className="section-header-centered">
              <span className="section-pill">TESTIMONIALS</span>
              <h2 className="section-title-luxury">What Our Guests Say</h2>
              <p className="section-subtitle">Real experiences from memorable weddings and premier corporate events.</p>
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

        {/* Interactive Luxury Booking & Estimate Form */}
        <section id="book" className="interactive-book-section">
          <div className="container">
            <div className="book-card-container">
              <div className="book-card-left">
                <span className="section-pill">LIVE QUOTE & BOOKING</span>
                <h2>Design Your Dream Catering Experience</h2>
                <p>Select your event preferences below for an instant preliminary estimate. Our culinary planners will contact you within 2 business hours.</p>

                {/* Event Type Selector */}
                <div className="booking-option-group">
                  <label className="group-label">1. Event Type</label>
                  <div className="event-pills-row">
                    {[
                      { id: 'wedding', label: '💍 Royal Wedding' },
                      { id: 'corporate', label: '💼 Corporate Gala' },
                      { id: 'celebrity', label: '🌟 Celebrity VIP' },
                      { id: 'theme', label: '🎭 Theme Party' },
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
                    <label className="group-label">2. Estimated Guests</label>
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
                      { id: 'chaat', label: '🥘 Live Delhi Chaat' },
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
                    <p>Shukriya! Humari culinary director team agle 2 ghante me aapko sample menu aur customized quote ke sath connect karegi.</p>
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
                      <input type="text" placeholder="e.g. Rahul Verma" required />
                    </div>

                    <div className="form-input-field">
                      <label>Phone / WhatsApp</label>
                      <input type="tel" placeholder="+91 98765 43210" required />
                    </div>

                    <div className="form-input-row">
                      <div className="form-input-field">
                        <label>Event Date</label>
                        <input type="date" required />
                      </div>
                      <div className="form-input-field">
                        <label>City / Venue</label>
                        <input type="text" placeholder="e.g. Delhi NCR" required />
                      </div>
                    </div>

                    <div className="form-input-field">
                      <label>Special Notes (Optional)</label>
                      <textarea rows={2} placeholder="Any specific cuisine preference or chef request..."></textarea>
                    </div>

                    <button type="submit" className="btn-luxury-submit">
                      <span>Reserve Date & Request Tasting</span>
                      <span className="btn-arrow">→</span>
                    </button>
                    <p className="guarantee-text">🔒 100% Privacy • No Spam • Complimentary Food Tasting</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo">
                <span className="logo-icon" style={{ color: 'white' }}>🍽️</span>
                LOGO
              </div>
              <p className="footer-desc">Delivering exceptional culinary experiences for your special events.</p>
            </div>
            <div className="footer-col">
              <h4>CONTACT US</h4>
              <ul>
                <li><p>📞 +1 234 567 8900</p></li>
                <li><p>✉️ dummy@logo.com</p></li>
                <li><p>📍 123 Street Name, City</p></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>COMPANY</h4>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Gallery</a></li>
                <li><a href="#">Events</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>QUICK LINKS</h4>
              <ul>
                <li><a href="#">Book</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Testimonials</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Your Company Name. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
