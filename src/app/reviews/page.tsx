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
      date: 'February 2026',
      avatar: '👑',
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
      date: 'January 2026',
      avatar: '💼',
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
      date: 'December 2025',
      avatar: '✨',
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
      date: 'November 2025',
      avatar: '💍',
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
      date: 'October 2025',
      avatar: '🎭',
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
      date: 'September 2025',
      avatar: '🍸',
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
          <span className="section-pill">VERIFIED CLIENT STORIES</span>
          <h1 className="page-hero-title">Guest Reviews & Accolades</h1>
          <p className="page-hero-subtitle">
            Over 1,000+ happy celebrations curated with royal perfection. Read authentic testimonials from families, corporate leaders, and wedding planners.
          </p>

          {/* Overall Rating Badge */}
          <div className="overall-rating-card">
            <div className="rating-huge-score">4.9</div>
            <div className="rating-score-stars">★★★★★</div>
            <p>Rated 4.9 / 5 across 350+ Google & WeddingWire Reviews</p>
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
                <div className="review-card-top">
                  <div className="rev-avatar">{rev.avatar}</div>
                  <div className="rev-identity">
                    <h3>{rev.name}</h3>
                    <span className="rev-event-tag">{rev.event}</span>
                    <span className="rev-meta">{rev.guests} • {rev.date}</span>
                  </div>
                  <div className="rev-quote-mark">“</div>
                </div>

                <div className="rev-star-row">
                  {'★'.repeat(rev.rating)}
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
