'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const faqData = [
    {
      cat: 'booking',
      q: 'Kitne din pehle booking confirm karni chahiye?',
      a: 'Royal Weddings aur peak season dates (October to March) ke liye hum 2 se 4 mahine pehle book karne ki advise dete hain taaki date block ho sake. Corporate ya intimate parties ke liye hum 7-10 din pehle bhi booking accommodate kar sakte hain depending on availability.',
    },
    {
      cat: 'booking',
      q: 'Payment terms aur cancellation schedule kya rehta hai?',
      a: 'Booking confirm karne ke liye 30% advance deposit lia jata hai. Event se 10 din pehle 50% second tranche, aur event completion par remaining 20% clear hota hai. Agar aapko date reschedule karni ho to 15 din pehle intimate karne par deposit next available date par seamlessly transfer ho jata hai.',
    },
    {
      cat: 'food',
      q: 'Kya complimentary menu tasting arrange hoti hai?',
      a: 'Ji haan, bilkul! Once preliminary event discussion complete ho jati hai, hum family ke 4 members tak ke liye private live tasting session conduct karte hain jisme aap starters, gravies, desserts aur breads customize kar sakte hain.',
    },
    {
      cat: 'food',
      q: 'Kya Pure Vegetarian aur Jain (No Onion, No Garlic) food options available hain?',
      a: 'Haan, hum 100% dedicated pure-veg aur dedicated Jain kitchen setups arrange karte hain jisme separate utensils, fresh ingredients aur strict dietary hygiene maintain ki jaati hai.',
    },
    {
      cat: 'service',
      q: 'Crockery, cutlery, glassware aur table linen caterer provide karta hai?',
      a: 'Haan, hum complete 7-star luxury setup provide karte hain — premium gold-rimmed bone china dinnerware, crystal glassware, Italian cutlery, aur coordinated luxury table runners and linen included rehte hain.',
    },
    {
      cat: 'service',
      q: 'Staff ka grooming aur uniform standards kya hota hai?',
      a: 'Hamare staff mein hotel management background ke trained professionals hote hain. Uniforms event theme ke according black-tie tuxedo, royal bandhgala, ya formal white-glove aprons me rehti hain. Hygiene and courteous guest etiquette hamari top priority hai.',
    },
    {
      cat: 'logistics',
      q: 'Destination weddings me outstation travel aur setup kaise manage hota hai?',
      a: 'Hum Udaipur, Jaipur, Goa, Jim Corbett, aur foreign locales par full logistics team aur mobile kitchen units bhejte hain. Local fresh procurement ke saath hamare masterchefs pure authentic taste ensure karte hain.',
    },
    {
      cat: 'logistics',
      q: 'Minimum aur maximum guest capacity kya hai?',
      a: 'Hamare packages 50 guests (intimate VIP dinners) se shuru hote hain aur hum 5,000+ guests tak ke grand mega-summits aur wedding receptions seamlessly serve kar chuke hain.',
    },
  ];

  const filteredFaqs = faqData.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.cat === activeCategory;
    const matchesSearch =
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

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
          <span className="section-pill">HELP & CLARITY</span>
          <h1 className="page-hero-title">Frequently Asked Questions</h1>
          <p className="page-hero-subtitle">
            Have questions about booking, live tasting, hygiene, or destination wedding catering? Find answers to commonly asked queries below.
          </p>

          {/* Live Search */}
          <div className="faq-search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search questions (e.g., tasting, veg, payment, destination)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="faq-search-input"
            />
          </div>
        </div>
      </section>

      <main className="dedicated-page-main">

        {/* Content */}
        <div className="container">
          {/* Category Tabs */}
          <div className="reviews-filter-pills">
            {[
              { id: 'all', label: 'All Topics' },
              { id: 'booking', label: '📅 Booking & Dates' },
              { id: 'food', label: '🍲 Food & Tasting' },
              { id: 'service', label: '🎩 Staff & Crockery' },
              { id: 'logistics', label: '✈️ Destination & Capacity' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveCategory(tab.id);
                  setOpenIndex(null);
                }}
                className={`review-pill-btn ${activeCategory === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="faq-page-accordion">
            {filteredFaqs.length === 0 ? (
              <div className="no-faq-found">
                <p>No questions matched your search query. Feel free to contact our team directly.</p>
                <Link href="/book" className="btn btn-gold" style={{ marginTop: '14px' }}>
                  Ask via Booking Form
                </Link>
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`faq-item ${isOpen ? 'active' : ''}`}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
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
              })
            )}
          </div>

          {/* Bottom Help Contact Box */}
          <div className="faq-contact-card">
            <div className="faq-contact-info">
              <h3>Still Have Questions?</h3>
              <p>Call our Senior Catering Manager directly for immediate assistance and customized quotes.</p>
            </div>
            <div className="faq-contact-actions">
              <a href="tel:+919876543210" className="btn btn-outline">
                📞 +91 98765 43210
              </a>
              <Link href="/book" className="btn btn-gold">
                Schedule Call Back
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
