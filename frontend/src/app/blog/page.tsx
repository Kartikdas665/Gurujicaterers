'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

interface BlogPost {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  tag: string;
  icon: string;
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'weddings', label: '👑 Royal Weddings' },
    { id: 'budget', label: '💰 Event Expenditure' },
    { id: 'culinary', label: '🥘 Culinary Heritage' },
    { id: 'corporate', label: '💼 Corporate Galas' },
  ];

  const blogPosts: BlogPost[] = [
    {
      id: 'wedding-catering-expenditure-guide',
      category: 'budget',
      title: 'How to Plan Catering Expenditure for a 500+ Guest Royal Wedding (2026 Guide)',
      excerpt: 'A comprehensive financial blueprint for destination weddings in Delhi NCR, Rajasthan & Goa. Learn how per-plate pricing, live interactive counters, and logistics impact your overall catering investment.',
      date: 'October 24, 2026',
      readTime: '6 min read',
      author: 'Shivansh Singh',
      authorRole: 'VP - Banquet Logistics',
      tag: 'Wedding Budgeting',
      icon: '📊',
    },
    {
      id: 'pure-desi-ghee-dal-bukhara-secret',
      category: 'culinary',
      title: 'The Art of 18-Hour Slow Charcoal Simmering: Behind Our Signature Dal Bukhara',
      excerpt: 'Discover why Guruji Caterers insists on 100% unadulterated churned desi ghee, whole Kashmiri spices, and overnight earthen slow-fire cooking to achieve that legendary velvety texture.',
      date: 'October 18, 2026',
      readTime: '5 min read',
      author: 'Chef Rajeev Kapoor',
      authorRole: 'Executive Culinary Director',
      tag: 'Culinary Heritage',
      icon: '🍲',
    },
    {
      id: 'top-live-food-counters-wedding',
      category: 'weddings',
      title: 'Top 5 Interactive Live Food Counters That Wow Wedding Guests Every Single Time',
      excerpt: 'From smoking liquid nitrogen kulfi bars to wood-fired sourdough pizzas and Chandni Chowk palak patta chaat, explore the experiential food stations transforming modern Indian banqueting.',
      date: 'October 10, 2026',
      readTime: '4 min read',
      author: 'Chef Ananya Sen',
      authorRole: 'Global Gastronomy Director',
      tag: 'Live Theater',
      icon: '🔥',
    },
    {
      id: 'corporate-summit-zero-queue-catering',
      category: 'corporate',
      title: 'Clockwork Catering: Orchestrating Zero-Delay Luncheons for 1,000+ Corporate Delegates',
      excerpt: 'When hosting international leadership summits, timing is non-negotiable. Learn our tactical layout strategies, multi-lane buffet zoning, and high-speed gourmet salad curation.',
      date: 'September 28, 2026',
      readTime: '5 min read',
      author: 'Kartik Das',
      authorRole: 'Director of Operations',
      tag: 'Corporate Banquets',
      icon: '⏱️',
    },
    {
      id: 'haccp-7-star-hygiene-protocols',
      category: 'culinary',
      title: '7-Star Hygiene in Outdoor Catering: How We Guarantee Zero-Contamination Standards',
      excerpt: 'Behind the scenes with our food safety auditors: farm-to-table dairy lab inspections, temperature-controlled transportation, and mobile kitchen sanitation protocols.',
      date: 'September 15, 2026',
      readTime: '4 min read',
      author: 'Dr. Radhika Nair',
      authorRole: 'Head of Food Safety',
      tag: 'Food Safety & Hygiene',
      icon: '🛡️',
    },
    {
      id: 'sangeet-cocktail-curation-ideas',
      category: 'weddings',
      title: 'Curating the Ultimate Sangeet & Cocktail Menu: Artisan Mocktails & Gourmet Canapés',
      excerpt: 'How to design a roaming butler menu with bite-sized molecular appetizers and refreshing torch-smoked mocktails that keep networking and dancing uninterrupted.',
      date: 'August 30, 2026',
      readTime: '5 min read',
      author: 'Chef Vikramaditya Rathore',
      authorRole: 'Head of Sigri Tandoor',
      tag: 'Cocktail Evenings',
      icon: '🍹',
    },
  ];

  const filteredPosts =
    selectedCategory === 'all'
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <section className="page-hero-banner">
        <div className="page-hero-bg"></div>
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content">
          <div className="gold-accent-line" style={{ margin: '0 auto 16px' }}></div>
          <span className="section-pill">✦ CATERING INSIGHTS & STORIES</span>
          <h1 className="page-hero-title">Guruji Caterers Journal</h1>
          <p className="page-hero-subtitle">
            Expert insights on royal wedding catering trends, expenditure planning, authentic culinary secrets, and world-class event hospitality.
          </p>
        </div>
      </section>

      <main className="dedicated-page-main">
        <div className="container">
          {/* Category Filter Pills */}
          <div className="reviews-filter-pills" style={{ marginBottom: '50px', justifyContent: 'center' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`review-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                style={{ fontSize: '0.92rem', padding: '10px 22px' }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Blog Articles Grid */}
          <div className="blog-posts-grid">
            {filteredPosts.map((post) => (
              <article key={post.id} className="blog-article-card">
                <div className="blog-card-header">
                  <span className="blog-icon-box">{post.icon}</span>
                  <span className="blog-tag-pill">{post.tag}</span>
                </div>
                <div className="blog-card-body">
                  <div className="blog-meta-strip">
                    <span>📅 {post.date}</span>
                    <span>•</span>
                    <span>⏳ {post.readTime}</span>
                  </div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                </div>
                <div className="blog-card-footer">
                  <div className="blog-author-box">
                    <div className="blog-author-avatar">{post.author.charAt(0)}</div>
                    <div className="blog-author-details">
                      <div className="author-name">{post.author}</div>
                      <div className="author-role">{post.authorRole}</div>
                    </div>
                  </div>
                  <Link href={`/book?topic=${encodeURIComponent(post.title)}`} className="blog-read-link">
                    Discuss Plan →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Consultation CTA Banner */}
          <section className="luxury-cta-banner-section" style={{ marginTop: '80px', padding: '0' }}>
            <div className="cta-banner-wrapper" style={{ padding: '40px' }}>
              <div className="cta-banner-left">
                <span className="cta-pill-tag">✦ Complimentary Consultation</span>
                <h3 className="cta-main-title" style={{ fontSize: '1.8rem' }}>
                  Have questions about menu design or catering costs for your event?
                </h3>
                <p className="cta-description">
                  Our master chefs and event planners are here to customize your culinary journey and guide your budget.
                </p>
              </div>
              <div className="cta-banner-right" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Link href="/contact" className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
                  Connect with Our Team →
                </Link>
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

