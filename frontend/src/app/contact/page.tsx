'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Royal Wedding & Reception',
    guestCount: '500',
    date: '',
    city: 'Delhi NCR',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <section className="page-hero-banner">
        <div className="page-hero-bg"></div>
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content">
          <div className="gold-accent-line" style={{ margin: '0 auto 16px' }}></div>
          <span className="section-pill">✦ WE ARE AT YOUR SERVICE</span>
          <h1 className="page-hero-title">Contact & Plan Your Event</h1>
          <p className="page-hero-subtitle">
            Connect directly with our banquet directors and culinary planners. Let us curate an exquisite dining experience tailored to your exact celebration.
          </p>
        </div>
      </section>

      <main className="dedicated-page-main">
        <div className="container">
          {/* Quick Contact Info Cards */}
          <div className="features-grid" style={{ marginBottom: '60px' }}>
            <div className="feature-pillar-card">
              <div className="feature-card-header">
                <span className="feature-icon-box">📞</span>
                <span className="feature-index-num">01</span>
              </div>
              <h3>Call Us Directly</h3>
              <p>Speak directly with our senior event planners for urgent bookings and date availability.</p>
              <div style={{ marginTop: '16px' }}>
                <a href="tel:+919876543210" style={{ color: 'var(--primary-hover)', fontWeight: 600 }}>
                  +91 98765 43210
                </a>
                <br />
                <a href="tel:+919123456789" style={{ color: 'var(--gray-text)', fontSize: '0.88rem' }}>
                  +91 91234 56789
                </a>
              </div>
            </div>

            <div className="feature-pillar-card">
              <div className="feature-card-header">
                <span className="feature-icon-box">💬</span>
                <span className="feature-index-num">02</span>
              </div>
              <h3>WhatsApp Chat</h3>
              <p>Get instant brochure PDFs, customized menus, and quick budget estimates over WhatsApp.</p>
              <div style={{ marginTop: '16px' }}>
                <a
                  href="https://wa.me/919876543210?text=Hi%20Guruji%20Caterers,%20I%20would%20like%20to%20inquire%20about%20catering%20services%20for%20my%20event."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                >
                  Chat on WhatsApp →
                </a>
              </div>
            </div>

            <div className="feature-pillar-card">
              <div className="feature-card-header">
                <span className="feature-icon-box">✉️</span>
                <span className="feature-index-num">03</span>
              </div>
              <h3>Email Inquiries</h3>
              <p>Send your detailed RFPs, corporate requirements, or bespoke wedding itineraries.</p>
              <div style={{ marginTop: '16px' }}>
                <a href="mailto:info@gurujicaterers.com" style={{ color: 'var(--primary-hover)', fontWeight: 600 }}>
                  info@gurujicaterers.com
                </a>
                <br />
                <span style={{ color: 'var(--gray-text)', fontSize: '0.84rem' }}>Fast response within 2 hours</span>
              </div>
            </div>

            <div className="feature-pillar-card">
              <div className="feature-card-header">
                <span className="feature-icon-box">📍</span>
                <span className="feature-index-num">04</span>
              </div>
              <h3>Headquarters & Kitchens</h3>
              <p>Main Ring Road, Near Hyatt Regency, Delhi NCR, India.</p>
              <div style={{ marginTop: '16px' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.88rem' }}>
                  Open Mon–Sun: 9:00 AM – 10:00 PM
                </span>
              </div>
            </div>
          </div>

          {/* Contact & Inquiry Form */}
          <div className="cta-banner-wrapper" style={{ padding: '45px 35px' }}>
            <div className="cta-banner-left">
              <span className="cta-pill-tag">✦ Complimentary Food Tasting</span>
              <h2 className="cta-main-title" style={{ fontSize: '2.2rem' }}>
                Book a Tasting Session or Request a Custom Proposal
              </h2>
              <p className="cta-description">
                Experience our culinary craft first-hand. Share your tentative dates, guest count, and cuisine preferences. Our Master Chef will prepare an exclusive tasting flight for your family.
              </p>

              <div className="cta-features-list" style={{ marginTop: '28px' }}>
                <div className="cta-feature-item">
                  <span className="cta-check-icon">✓</span>
                  <span>100% Pure Desi Ghee & Handpicked Whole Spices</span>
                </div>
                <div className="cta-feature-item">
                  <span className="cta-check-icon">✓</span>
                  <span>Dedicated Hospitality & Logistics Director</span>
                </div>
                <div className="cta-feature-item">
                  <span className="cta-check-icon">✓</span>
                  <span>Zero Delay Guarantee with 7-Star Standards</span>
                </div>
                <div className="cta-feature-item">
                  <span className="cta-check-icon">✓</span>
                  <span>Pan-India Coverage: Delhi NCR, Rajasthan, Agra & Punjab</span>
                </div>
              </div>
            </div>

            <div className="cta-banner-right">
              <div className="cta-action-card" style={{ padding: '30px 26px' }}>
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '14px' }}>🎉</div>
                    <h3 style={{ color: 'var(--primary-hover)', marginBottom: '8px' }}>Thank You!</h3>
                    <p style={{ color: 'var(--gray-text)', fontSize: '0.9rem', marginBottom: '20px' }}>
                      Your inquiry has been received. Our senior catering coordinator will reach out to you within 2 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="btn btn-outline"
                      style={{ fontSize: '0.85rem' }}
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h3 className="cta-card-heading">Send Us a Direct Message</h3>
                    <p className="cta-card-sub">Fill out the form below and we will get back to you promptly.</p>

                    <div className="cta-input-group">
                      <label className="cta-input-label">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Malhotra"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="cta-card-input"
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div className="cta-input-group">
                        <label className="cta-input-label">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="cta-card-input"
                        />
                      </div>
                      <div className="cta-input-group">
                        <label className="cta-input-label">Email Address</label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="cta-card-input"
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div className="cta-input-group">
                        <label className="cta-input-label">Event Type</label>
                        <select
                          value={formData.eventType}
                          onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                          className="cta-card-input"
                          style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#ffffff' }}
                        >
                          <option value="Royal Wedding & Reception" style={{ background: '#160f17' }}>Royal Wedding & Reception</option>
                          <option value="Pre-Wedding Sangeet / Mehendi" style={{ background: '#160f17' }}>Pre-Wedding Sangeet / Mehendi</option>
                          <option value="Corporate Summit / Gala" style={{ background: '#160f17' }}>Corporate Summit / Gala</option>
                          <option value="Private Milestone Celebration" style={{ background: '#160f17' }}>Private Milestone Celebration</option>
                        </select>
                      </div>
                      <div className="cta-input-group">
                        <label className="cta-input-label">Guest Count (Pax)</label>
                        <input
                          type="text"
                          placeholder="e.g. 500"
                          value={formData.guestCount}
                          onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                          className="cta-card-input"
                        />
                      </div>
                    </div>

                    <div className="cta-input-group">
                      <label className="cta-input-label">Celebration Details / Venue City</label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your event theme, preferred dates, or dietary requests..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="cta-card-input"
                        style={{ resize: 'vertical' }}
                      />
                    </div>

                    <button type="submit" className="cta-primary-btn" style={{ width: '100%', marginTop: '8px' }}>
                      <span>Submit Inquiry & Request Tasting</span>
                      <span className="cta-btn-arrow">→</span>
                    </button>
                  </form>
                )}
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

