'use client';

import { useState, useRef } from 'react';
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

  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  const testimonials = [
    {
      name: 'Vikram & Ananya Sharma',
      role: 'Destination Wedding, Udaipur Palace',
      rating: 5,
      timeAgo: '2 weeks ago',
      review: 'Guruji Caterers made our wedding reception truly unforgettable! Every single guest praised the live chaat, signature Dal Bukhara, and Awadhi Biryani. The 7-star service and spotless presentation exceeded all expectations.',
      initials: 'VS',
      bgColor: '#ea4335'
    },
    {
      name: 'Rajesh Singhania',
      role: 'Annual Corporate Leadership Summit (800 Pax)',
      rating: 5,
      timeAgo: '1 month ago',
      review: 'Hosting 800 corporate delegates requires clockwork precision. The food was delivered piping hot with incredible consistency, strict hygiene protocols, and an outstanding international salad and coffee bar.',
      initials: 'RS',
      bgColor: '#1a73e8'
    },
    {
      name: 'Dr. Arjun & Radhika Patel',
      role: 'Grand Silver Jubilee Gala, Delhi NCR',
      rating: 5,
      timeAgo: '3 weeks ago',
      review: 'The live culinary counters and gourmet dessert studio were absolute showstoppers! From prompt communication during tasting sessions to white-glove event hospitality on the day, 10/10 service!',
      initials: 'AP',
      bgColor: '#137333'
    },
    {
      name: 'Priya & Siddharth Mehra',
      role: 'Private Celebrity Birthday Gala, Mumbai',
      rating: 5,
      timeAgo: '1 month ago',
      review: 'Utmost discretion and flawless privacy were maintained. The plated molecular dessert course was breathtaking. Chef curated every course according to our international guest preferences. Flawless hospitality!',
      initials: 'PM',
      bgColor: '#9334e9'
    },
    {
      name: 'Kavita & Harshwardhan Rathore',
      role: 'Grand Royal Sangeet & Reception, Jaipur',
      rating: 5,
      timeAgo: '2 months ago',
      review: 'Traditional Rajasthani Dal Baati Churma cooked in pure desi ghee was the showstopper! 1,100 guests hone ke bawajood kisi bhi counter par delay nahi tha. Every plate felt regal.',
      initials: 'KR',
      bgColor: '#fa7b17'
    },
    {
      name: 'Megha Oberoi',
      role: 'Corporate Tech Expo & Product Gala, Bangalore',
      rating: 5,
      timeAgo: '2 months ago',
      review: 'The roaming butler service and exquisite gourmet canapés kept all networking conversations uninterrupted. Their nitro dessert shots and mocktail mixology were huge hits!',
      initials: 'MO',
      bgColor: '#0284c7'
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

        {/* 2. Key Highlights (Why Choose Us) - Luxury Redesign */}
        <section className="features-section-dark">
          <div className="container">
            <div className="features-grid">
              <div className="feature-pillar-card">
                <div className="feature-card-header">
                  <div className="feature-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                      <line x1="6" y1="17" x2="18" y2="17" />
                    </svg>
                  </div>
                  <span className="feature-index-num">01</span>
                </div>
                <h3>Culinary Excellence</h3>
                <p>Highly seasoned master chefs crafting signature royal dishes with artisanal passion and precision.</p>
                <div className="feature-pill-badge">
                  <span className="feature-pill-dot"></span>
                  <span>Master Chefs</span>
                </div>
              </div>

              <div className="feature-pillar-card">
                <div className="feature-card-header">
                  <div className="feature-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <span className="feature-index-num">02</span>
                </div>
                <h3>Premium Ingredients</h3>
                <p>Farm-fresh organic produce and 100% pure desi ghee sourced directly for unmatched richness and taste.</p>
                <div className="feature-pill-badge">
                  <span className="feature-pill-dot"></span>
                  <span>Pure Desi Ghee</span>
                </div>
              </div>

              <div className="feature-pillar-card">
                <div className="feature-card-header">
                  <div className="feature-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  </div>
                  <span className="feature-index-num">03</span>
                </div>
                <h3>Bespoke Menus</h3>
                <p>Tailor-made multi-cuisine culinary menus customized for your exact guest count, palate, and celebration.</p>
                <div className="feature-pill-badge">
                  <span className="feature-pill-dot"></span>
                  <span>Custom Curated</span>
                </div>
              </div>

              <div className="feature-pillar-card">
                <div className="feature-card-header">
                  <div className="feature-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <span className="feature-index-num">04</span>
                </div>
                <h3>Uncompromising Hygiene</h3>
                <p>Stringent 7-star kitchen sanitation protocols, food safety testing, and impeccable staff grooming.</p>
                <div className="feature-pill-badge">
                  <span className="feature-pill-dot"></span>
                  <span>7-Star Standards</span>
                </div>
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
              <div className="luxury-service-card">
                <div
                  className="service-card-bg-layer"
                  style={{ backgroundImage: `url('/catering_hero_1791127858700.jpg')` }}
                ></div>
                <div className="service-card-gradient-overlay"></div>
                <div className="service-floating-top">
                  <span className="service-pill-tag">✦ BESPOKE GATHERINGS</span>
                  <span className="service-num-watermark">01</span>
                </div>
                <div className="luxury-service-content">
                  <h3>Social & Private Events</h3>
                  <p className="luxury-service-desc">
                    Celebrate milestones with personalized heritage menus and white-glove hospitality suited for intimate gatherings and grand celebrations.
                  </p>
                  <div className="service-feature-chips">
                    <span className="service-feature-chip">Live Counters</span>
                    <span className="service-feature-chip">Bespoke Curation</span>
                    <span className="service-feature-chip">Butler Service</span>
                  </div>
                  <div className="service-action-row">
                    <a href="#book" className="service-explore-btn">
                      Plan Private Event <span className="arrow-circle">→</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Service 2: Corporate Catering */}
              <div className="luxury-service-card">
                <div
                  className="service-card-bg-layer"
                  style={{ backgroundImage: `url('/catering_corporate_1791127885197.jpg')` }}
                ></div>
                <div className="service-card-gradient-overlay"></div>
                <div className="service-floating-top">
                  <span className="service-pill-tag">✦ EXECUTIVE STANDARDS</span>
                  <span className="service-num-watermark">02</span>
                </div>
                <div className="luxury-service-content">
                  <h3>Corporate Catering</h3>
                  <p className="luxury-service-desc">
                    Punctual, seamless catering solutions for international summits, board meetings, executive retreats, and annual corporate galas.
                  </p>
                  <div className="service-feature-chips">
                    <span className="service-feature-chip">Punctual Timing</span>
                    <span className="service-feature-chip">High Capacity (2000+)</span>
                    <span className="service-feature-chip">Global Flavors</span>
                  </div>
                  <div className="service-action-row">
                    <a href="#book" className="service-explore-btn">
                      Book Corporate Summit <span className="arrow-circle">→</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Service 3: Destination Weddings */}
              <div className="luxury-service-card">
                <div
                  className="service-card-bg-layer"
                  style={{ backgroundImage: `url('/catering_wedding_1791127871855.jpg')` }}
                ></div>
                <div className="service-card-gradient-overlay"></div>
                <div className="service-floating-top">
                  <span className="service-pill-tag">✦ ROYAL WEDDINGS</span>
                  <span className="service-num-watermark">03</span>
                </div>
                <div className="luxury-service-content">
                  <h3>Destination Weddings</h3>
                  <p className="luxury-service-desc">
                    Turn your royal nuptials into a fairytale banquet with master chefs, live culinary theater, pure desi ghee preparations, and regal decor.
                  </p>
                  <div className="service-feature-chips">
                    <span className="service-feature-chip">Palace Setups</span>
                    <span className="service-feature-chip">Dessert Studio</span>
                    <span className="service-feature-chip">Regional Heritage</span>
                  </div>
                  <div className="service-action-row">
                    <a href="#book" className="service-explore-btn">
                      Curate Wedding Menu <span className="arrow-circle">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. About Us - Luxury Legacy Section */}
        <section id="about" className="about-section">
          <div className="container about-container">
            <div className="about-image-wrapper">
              <div className="about-gold-frame"></div>
              <img
                src="/catering_wedding_1791127871855.jpg"
                alt="Our Story A Legacy of Excellence - Masterchefs orchestrating catering gala"
                className="about-main-img"
              />
              <div className="about-experience-badge">
                <span className="exp-years">15+</span>
                <span className="exp-text">Years of Royal Catering Excellence</span>
              </div>
            </div>

            <div className="about-text">
              <span className="section-pill" style={{ marginBottom: '14px' }}>HERITAGE & CRAFT</span>
              <h2>Our Story: A Legacy of Excellence</h2>
              <p>
                We believe exceptional food is the soul of every grand event. With over 15 years of culinary mastery across India, Guruji Caterers transcends ordinary banqueting to create unforgettable multi-sensory dining experiences.
              </p>
              <p>
                From extravagant royal palace destination weddings to high-profile executive corporate summits, our master chefs and white-glove service brigade orchestrate pure authenticity, artistic presentation, and uncompromising hygiene.
              </p>

              {/* Story Highlights Stat Strip */}
              <div className="about-stat-strip">
                <div className="about-stat-item">
                  <div className="stat-value">1,000+</div>
                  <div className="stat-label">Events Hosted</div>
                </div>
                <div className="about-stat-divider"></div>
                <div className="about-stat-item">
                  <div className="stat-value">350+</div>
                  <div className="stat-label">5-Star Google Reviews</div>
                </div>
                <div className="about-stat-divider"></div>
                <div className="about-stat-item">
                  <div className="stat-value">100%</div>
                  <div className="stat-label">Pure Desi Ghee & Veg</div>
                </div>
              </div>

              <div style={{ marginTop: '28px' }}>
                <a href="/about" className="btn btn-outline" style={{ padding: '12px 28px' }}>
                  Discover Our Heritage Story →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Menu Showcase */}
        <section id="menu" className="menu-section">
          <div className="container">
            <div className="section-header-centered">
              <span className="section-pill">CHEF'S SIGNATURES</span>
              <h2 className="section-title-luxury">Menu Showcase</h2>
              <p className="section-subtitle">
                A symphony of hand-picked culinary treasures. From traditional royal sigri tandoor to modern global gastronomy and bespoke live dessert creations.
              </p>
            </div>

            <div className="menu-showcase-grid">
              <div className="menu-showcase-card">
                <div className="menu-showcase-img-wrap">
                  <img src="/catering_hero_1791127858700.jpg" alt="Luxury Wedding Catering Food Display - Charcoal Tandoori & Artisanal Kebabs" />
                  <span className="menu-card-badge">ROYAL GRILLS</span>
                </div>
                <div className="menu-card-body">
                  <h4>Artisanal Tandoori & Kebabs</h4>
                  <p>Authentic charcoal sigri appetizers infused with hand-ground spices, served sizzling with mint chutney.</p>
                  <div className="menu-card-footer">
                    <span className="menu-tag-list">Tandoor • Awadhi • Live</span>
                    <span className="menu-view-arrow">Explore →</span>
                  </div>
                </div>
              </div>

              <div className="menu-showcase-card">
                <div className="menu-showcase-img-wrap">
                  <img src="/catering_corporate_1791127885197.jpg" alt="Corporate Event Buffet Setup - Contemporary Global & Mediterranean Platter" />
                  <span className="menu-card-badge">GLOBAL DELIGHTS</span>
                </div>
                <div className="menu-card-body">
                  <h4>Continental & Mediterranean</h4>
                  <p>Farm-fresh organic salads, hand-rolled pasta live counters, and exquisite mezze boards crafted fresh.</p>
                  <div className="menu-card-footer">
                    <span className="menu-tag-list">Gourmet • Italian • Salads</span>
                    <span className="menu-view-arrow">Explore →</span>
                  </div>
                </div>
              </div>

              <div className="menu-showcase-card">
                <div className="menu-showcase-img-wrap">
                  <img src="/catering_wedding_1791127871855.jpg" alt="Gourmet Dessert Studio - Traditional Confectionery & Liquid Nitrogen Kulfi" />
                  <span className="menu-card-badge">DESSERT THEATER</span>
                </div>
                <div className="menu-card-body">
                  <h4>Artisanal Dessert Studio</h4>
                  <p>Desi ghee royal mithais alongside liquid nitrogen smoking kulfi bars and Belgian chocolate fondue.</p>
                  <div className="menu-card-footer">
                    <span className="menu-tag-list">Liquid Nitrogen • Kulfi</span>
                    <span className="menu-view-arrow">Explore →</span>
                  </div>
                </div>
              </div>

              <div className="menu-showcase-card">
                <div className="menu-showcase-img-wrap">
                  <img src="/catering_party_footer.jpg" alt="Private Party Catering Buffet Setup - Grand Celebratory Spread" />
                  <span className="menu-card-badge">GRAND SPREAD</span>
                </div>
                <div className="menu-card-body">
                  <h4>Grand Banquet Buffet</h4>
                  <p>Lavish multi-cuisine dining spreads orchestrated with 7-star presentation and warm hospitality.</p>
                  <div className="menu-card-footer">
                    <span className="menu-tag-list">Banquets • Multi-Cuisine</span>
                    <span className="menu-view-arrow">Explore →</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '35px' }}>
              <a href="/menu" className="btn btn-primary" style={{ padding: '14px 34px' }}>
                View Complete Menu Portfolio 📖
              </a>
            </div>
          </div>
        </section>

        {/* 6. Testimonials - Scrollable Carousel */}
        <section id="testimonials" className="testimonials-section">
          <div className="container">
            <div className="section-header-centered">
              <span className="section-pill">TESTIMONIALS</span>
              <h2 className="section-title-luxury">What Our Guests Say</h2>
              <p className="section-subtitle">Real experiences highlighting our culinary quality, impeccable punctuality, and professional hospitality staff.</p>

              {/* Official Google Rating Strip */}
              <div className="google-reviews-header-badge">
                <svg className="google-icon-svg" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
                <div className="google-badge-rating">
                  <span className="google-badge-score">4.9</span>
                  <span className="google-badge-stars">★★★★★</span>
                  <span className="google-badge-count">350+ Google Reviews</span>
                </div>
              </div>
            </div>

            {/* Scrollable Track with Left & Right Floating Arrows */}
            <div className="testimonials-carousel-wrapper">
              <button
                type="button"
                onClick={scrollLeft}
                className="carousel-side-arrow prev"
                aria-label="Previous reviews"
              >
                ‹
              </button>

              <div className="testimonials-scroll-track" ref={scrollTrackRef}>
                {testimonials.map((item, idx) => (
                  <div key={idx} className="testimonial-card">
                    <div className="google-card-header">
                      <div className="google-source-tag">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                        </svg>
                        <span>Google Review</span>
                      </div>
                      <span className="google-verified-pill">✓ Verified Host</span>
                    </div>

                    <div className="testimonial-rating">
                      <span>{'★'.repeat(item.rating)}</span>
                      <span className="testimonial-time">• {item.timeAgo}</span>
                    </div>

                    <p className="testimonial-text">{item.review}</p>

                    <div className="testimonial-user">
                      <div className="google-avatar-circle" style={{ backgroundColor: item.bgColor }}>
                        {item.initials}
                      </div>
                      <div className="testimonial-info">
                        <h4>
                          {item.name}
                          <svg className="google-check-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </h4>
                        <span>{item.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={scrollRight}
                className="carousel-side-arrow next"
                aria-label="Next reviews"
              >
                ›
              </button>
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

              {/* Right Side: Direct Inquiry Form */}
              <div className="book-card-right">
                <div className="inquiry-header-badge">
                  <div className="inquiry-badge-tag">✦ BESPOKE RESERVATION</div>
                  <h3 className="inquiry-badge-title">Request a Custom Proposal</h3>
                  <p className="inquiry-badge-sub">
                    Share your event details below. Our culinary team will review your menu preferences and provide a personalized proposal within 2 hours.
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
