'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function ReviewsPage() {
  const [filter, setFilter] = useState<string>('all');

  const allReviews = [
    {
      id: 1,
      category: 'wedding',
      name: 'Vikram & Ananya Sharma',
      event: 'Royal Destination Wedding at Udaipur Palace',
      guests: '650 Guests',
      rating: 5,
      timeAgo: '2 weeks ago',
      initials: 'VS',
      bgColor: '#ea4335',
      quote:
        'Guruji Caterers ne humari wedding ko ek royal fairy-tale bana diya! Sabhi guests ne food quality, especially live chaat aur traditional Awadhi biryani counter ki behtareen taareef ki. Staff ka grooming aur behaviour 7-star standard ka tha.',
      counters: ['Live Sigri Tandoor', 'Delhi Chaat', 'Royal Kulfi Studio'],
    },
    {
      id: 2,
      category: 'corporate',
      name: 'Rajesh Singhania',
      event: 'Annual Leadership Summit, Aerocity Delhi',
      guests: '800 Delegates',
      rating: 5,
      timeAgo: '1 month ago',
      initials: 'RS',
      bgColor: '#1a73e8',
      quote:
        '800 corporate delegates ke liye time par hot and fresh food deliver karna challenging hota hai, lekin Guruji Caterers ki management team ne clockwork precision ke saath handle kiya. The international salad bar and coffee lounge were fantastic.',
      counters: ['Global Salad Bar', 'Artisanal Coffee & Mocktails', 'Pan-Asian Wok'],
    },
    {
      id: 3,
      category: 'celebrity',
      name: 'Priya & Siddharth Mehra',
      event: 'Private Celebrity Birthday Gala, Mumbai',
      guests: '120 VIPs',
      rating: 5,
      timeAgo: '1 month ago',
      initials: 'PM',
      bgColor: '#9334e9',
      quote:
        'Utmost discretion and privacy were maintained. The plated molecular dessert course was breathtaking. Chef curated every course according to our international guest preferences. Flawless hospitality!',
      counters: ['Molecular Desserts', 'Italian Truffle Pasta', 'Sushi Station'],
    },
    {
      id: 4,
      category: 'wedding',
      name: 'Kavita & Harshwardhan Rathore',
      event: 'Grand Sangeet & Reception, Jaipur',
      guests: '1,100 Guests',
      rating: 5,
      timeAgo: '2 months ago',
      initials: 'KR',
      bgColor: '#137333',
      quote:
        'Traditional Rajasthani Dal Baati Churma cooked in pure desi ghee was the showstopper! 1100 guests hone ke bawajood kisi bhi counter par delay nahi tha. Every plate felt royal.',
      counters: ['Rajasthani Royal Thali', 'Wood-fired Pizza', 'Live Jalebi & Rabri'],
    },
    {
      id: 5,
      category: 'theme',
      name: 'Nitin & Shweta Kapur',
      event: '25th Silver Jubilee Retro Night, Gurgaon',
      guests: '250 Guests',
      rating: 5,
      timeAgo: '3 months ago',
      initials: 'NK',
      bgColor: '#fa7b17',
      quote:
        'From vintage mocktail jars to retro Mumbai street food live counters, everything fit our 80s theme seamlessly. Thank you Guruji Caterers for making our anniversary unforgettable!',
      counters: ['Bombay Street Cart', 'Smoky Barbecue Grills', 'Cold Stone Ice Cream'],
    },
    {
      id: 6,
      category: 'corporate',
      name: 'Megha Oberoi',
      event: 'Product Launch & Gala Cocktail, Bangalore',
      guests: '400 Attendees',
      rating: 5,
      timeAgo: '4 months ago',
      initials: 'MO',
      bgColor: '#0284c7',
      quote:
        'The finger-food presentation and roaming butler service kept our networking sessions uninterrupted. The dessert shots were an absolute hit with everyone.',
      counters: ['Gourmet Canapés', 'Nitro Dessert Shots', 'Mocktail Mixology'],
    },
  ];

  const filteredReviews = filter === 'all' ? allReviews : allReviews.filter((r) => r.category === filter);

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
          <span className="section-pill">VERIFIED GOOGLE REVIEWS</span>
          <h1 className="page-hero-title">Google Reviews & Accolades</h1>
          <p className="page-hero-subtitle">
            Over 1,000+ happy celebrations curated with royal perfection. Real verified 5-star reviews from families, corporate leaders, and wedding couples on Google.
          </p>

          {/* Overall Rating Badge */}
          <div className="google-reviews-header-badge" style={{ marginTop: '24px' }}>
            <svg className="google-icon-svg" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            <div className="google-badge-rating">
              <span className="google-badge-score">4.9</span>
              <span className="google-badge-stars">★★★★★</span>
              <span className="google-badge-count">350+ Reviews on Google</span>
            </div>
          </div>
        </div>
      </section>

      <main className="dedicated-page-main">

        {/* Filter Tabs */}
        <div className="container">
          <div className="reviews-filter-pills">
            {[
              { id: 'all', label: 'All Reviews (6)' },
              { id: 'wedding', label: '💍 Weddings (2)' },
              { id: 'corporate', label: '💼 Corporate (2)' },
              { id: 'celebrity', label: '🌟 Celebrity VIP (1)' },
              { id: 'theme', label: '🎭 Themed Galas (1)' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`review-pill-btn ${filter === f.id ? 'active' : ''}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Reviews Grid */}
          <div className="reviews-masonry-grid">
            {filteredReviews.map((rev) => (
              <div key={rev.id} className="review-detailed-card">
                <div className="google-card-header">
                  <div className="google-source-tag">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                    </svg>
                    <span>Google Review</span>
                  </div>
                  <span className="google-verified-pill">✓ Verified Host</span>
                </div>

                <div className="review-card-top">
                  <div className="google-avatar-circle" style={{ backgroundColor: rev.bgColor }}>
                    {rev.initials}
                  </div>
                  <div className="rev-identity">
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {rev.name}
                      <svg className="google-check-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </h3>
                    <span className="rev-event-tag">{rev.event}</span>
                    <span className="rev-meta">{rev.guests} • {rev.timeAgo}</span>
                  </div>
                </div>

                <div className="rev-star-row">
                  <span>{'★'.repeat(rev.rating)}</span>
                </div>

                <p className="rev-text">{rev.quote}</p>

                <div className="rev-counters-list">
                  <span className="counters-label">Favorite Counters:</span>
                  <div className="rev-counter-chips">
                    {rev.counters.map((c, i) => (
                      <span key={i} className="rev-chip">✦ {c}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="services-cta-banner" style={{ marginTop: '70px' }}>
            <div className="banner-gold-glow"></div>
            <h3>Ready to Experience Guruji Caterers?</h3>
            <p>Join our growing family of delighted hosts. Reserve your date and taste the difference.</p>
            <div className="banner-btns">
              <Link href="/book" className="btn btn-gold btn-large">
                Reserve Your Event Date 👑
              </Link>
              <Link href="/services" className="btn btn-outline btn-large">
                Explore Services
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
