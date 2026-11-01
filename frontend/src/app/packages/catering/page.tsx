'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

export default function CateringPackagesPage() {
  const [selectedPkg, setSelectedPkg] = useState('gold');

  const packages = [
    {
      id: 'silver',
      name: 'Silver Heritage Buffet',
      price: '₹950',
      period: 'per guest',
      subtitle: 'Classic royal feast ideal for celebrations, birthdays & corporate gatherings',
      badge: 'POPULAR CHOICE',
      highlights: [
        '3 Artisanal Starters & Tandoor Kebabs',
        '1 Live Counter (Live Chandni Chowk Chaat Station)',
        '4 Royal Main Course Curries (incl. Dal Bukhara)',
        '2 Handcrafted Breads & Hyderabadi Dum Pulao',
        '2 Heritage Desserts (Hot Gulab Jamun & Shahi Tukda)',
        'Welcome Royal Welcome Drinks & Mocktails',
        'Full 7-Star Table Setup & Brass Chafing Stations',
        'Trained Uniformed Waitstaff & Stewards',
      ],
      dishes: {
        starters: ['Zafrani Paneer Tikka', 'Dahi Ke Kebab', 'Kurkuri Bhindi Chaat Cones'],
        mains: ['Dal Guruji Maharani', 'Paneer Butter Masala', 'Subz Diwani Handi', 'Kashmiri Dum Aloo'],
        live: ['Chandni Chowk Live Golgappa & Papdi Chaat'],
        desserts: ['Hot Gulab Jamun in Saffron Syrup', 'Traditional Shahi Tukda with Rabri'],
      },
    },
    {
      id: 'gold',
      name: 'Gold Imperial Banquet',
      price: '₹1,450',
      period: 'per guest',
      subtitle: 'Our signature grand celebration menu for opulent weddings and high-profile galas',
      badge: 'MOST PREFERRED',
      featured: true,
      highlights: [
        '5 Artisanal Starters & Clay Sigri Kebabs',
        '2 Live Gourmet Counters (Chaat Studio + Neapolitan Pasta Bar)',
        '6 Royal Main Courses with Heritage Awadhi Curries',
        '4 Assorted Breads (Amritsari Kulcha, Roomali, Naan) + Saffron Biryani',
        '3 Luxury Desserts + Live Cold Stone Kulfi Bar',
        '3 Signature Artisanal Mocktails & Fruit Bar',
        'Complete White-Glove VIP Service & Banquet Logistics',
        'Free Tasting Session for 4 Family Members',
      ],
      dishes: {
        starters: ['Zafrani Paneer Tikka', 'Dahi Ke Kebab', 'Crispy Truffle Lotus Stem', 'Smoked Beetroot Galouti', 'Stuffed Mushroom Duplex'],
        mains: ['Dal Guruji Maharani (18-hr slow cooked)', 'Paneer Lababdar Awadhi', 'Kashmiri Dum Aloo Banarasi', 'Malai Kofta Nazakat', 'Subz Diwani Handi', 'Amritsari Pindi Chhole'],
        live: ['Chandni Chowk Live Chaat Studio (6 flavored waters)', 'Wood-fired Neapolitan Pizza & Live Pasta Bar'],
        desserts: ['Cold Stone Live Kulfi Studio', 'Live Swirled Desi Ghee Jalebi with Creamy Rabri', 'Belgian Dark Chocolate Fondue'],
      },
    },
    {
      id: 'platinum',
      name: 'Platinum Maharani Feast',
      price: '₹2,200',
      period: 'per guest',
      subtitle: 'The pinnacle of regal banqueting for luxury destination palace weddings',
      badge: 'ROYAL LUXURY',
      highlights: [
        '7 Artisanal Gourmet Starters & Sigri Smoked Delicacies',
        '4 Live Experiential Stations (Chaat, Pasta, Dim Sum & Charcoal BBQ)',
        '8 Royal Mains including 24-hr Dal Bukhara & Shahi Kaju Gravies',
        'Gourmet Saffron Dum Biryani Handis with Mirch Ka Salan',
        'Artisanal Dessert Studio with Liquid Nitrogen Smoking Kulfi Bars',
        'Full Mocktail Lounge Mixology & Tender Coconut Bar',
        'Butler Service Brigade & VIP Host Table Orchestration',
        'Complimentary VIP Tasting Session & Chef Consultation',
      ],
      dishes: {
        starters: ['Truffle Lotus Stem', 'Zafrani Paneer Tikka', 'Galouti Kebab on Ulta Tawa Paratha', 'Artisanal Dim Sums', 'Avocado & Burrata Canapés', 'Smoked Sigri Pineapples', 'Stuffed Morel Mushrooms'],
        mains: ['Dal Guruji Maharani 24-Hour', 'Paneer Anardana Masaledar', 'Shahi Malai Kofta Kaju Gravy', 'Kashmiri Nadru Yakhni', 'Baingan Mirch Ka Salan', 'Kalonji Baby Aloo', 'Pindi Rawalpindi Chhole', 'Dal Panchmel Rajasthani'],
        live: ['Palak Patta Chaat & Golgappa Pod', 'Wood-fired Sourdough Pizza & Truffle Risotto', 'Sigri Charcoal Live Barbecue Station', 'Pan-Asian Crystal Dim Sum Wok'],
        desserts: ['Smoking Liquid Nitrogen Kulfi Studio', 'Live Jalebi & Rabri Station', 'Belgian Chocolate Lava Slabs', 'Kesar Pista Rasmalai Pots'],
      },
    },
    {
      id: 'corporate',
      name: 'Corporate Executive Summit',
      price: '₹1,100',
      period: 'per guest',
      subtitle: 'Tailored for punctuality, high delegate throughput & international standards',
      badge: 'EXECUTIVE TIER',
      highlights: [
        '4 Light Gourmet Starters & Butler Canapés',
        '1 High-Speed Live Station (Artisanal Pasta or Wok Tossed Noodles)',
        '5 Balanced Main Courses (Health-conscious & Rich options)',
        'Gourmet Fresh Salad Bar (Greek, Quinoa, Caesar)',
        '2 Light Desserts + Artisanal Coffee & Tea Bar',
        'Zero-Delay Buffet Logistics for 500 – 2000+ Delegates',
        'Pristine ISO 22000 & HACCP Hygiene Compliance',
      ],
      dishes: {
        starters: ['Grilled Herb Paneer Skewers', 'Crispy Corn & Water Chestnut Cones', 'Mushroom Bruschetta', 'Falafel with Roasted Garlic Hummus'],
        mains: ['Dal Maharani Classic', 'Paneer Tikka Butter Gravy', 'Steamed Garden Vegetables in Herb Broth', 'Hyderabadi Vegetable Biryani with Burani Raita', 'Artisanal Naan & Roti'],
        live: ['Live Neapolitan Pasta Station (Choice of sauces & greens)'],
        desserts: ['Walnut Chocolate Brownie with Vanilla Cream', 'Traditional Gulab Jamun'],
      },
    },
  ];

  const current = packages.find((p) => p.id === selectedPkg) || packages[1];

  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <section className="page-hero-banner">
        <div className="page-hero-bg"></div>
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content">
          <div className="gold-accent-line" style={{ margin: '0 auto 16px' }}></div>
          <span className="section-pill">✦ ROYAL BANQUETING & BUFFET PACKAGES</span>
          <h1 className="page-hero-title">Curated Catering Packages</h1>
          <p className="page-hero-subtitle">
            Experience our signature catering packages crafted with 100% pure desi ghee, masterchef technique, and exquisite multi-course presentations for celebrations of any scale.
          </p>
        </div>
      </section>

      <main className="dedicated-page-main">
        <div className="container">
          {/* Package Tier Navigation Tabs */}
          <div className="reviews-filter-pills" style={{ marginBottom: '45px', justifyContent: 'center' }}>
            {packages.map((pkg) => (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setSelectedPkg(pkg.id)}
                className={`review-pill-btn ${selectedPkg === pkg.id ? 'active' : ''}`}
                style={{ fontSize: '0.95rem', padding: '10px 22px' }}
              >
                {pkg.name} ({pkg.price})
              </button>
            ))}
          </div>

          {/* Selected Package Spotlight Card */}
          <div className="selected-package-spotlight">
            <div className="spotlight-header">
              <div className="spotlight-info">
                <span className="section-pill">{current.badge}</span>
                <h2 className="spotlight-title">{current.name}</h2>
                <p className="spotlight-subtitle">{current.subtitle}</p>
              </div>
              <div className="spotlight-price-box">
                <div className="spotlight-price">{current.price}</div>
                <div className="spotlight-period">{current.period}</div>
                <div className="spotlight-tax">+ pure desi ghee assurance</div>
              </div>
            </div>

            {/* Inclusions Highlights */}
            <div className="spotlight-inclusions-grid">
              {current.highlights.map((item, idx) => (
                <div key={idx} className="spotlight-inc-item">
                  <span className="inc-check-icon">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Detailed Sample Dish Menu */}
            <div className="spotlight-dishes-section">
              <h3 className="dishes-heading">Featured Menu Curation in This Package</h3>
              <div className="dishes-breakdown-grid">
                <div className="dish-cat-box">
                  <div className="cat-title">🍢 Starters & Appetizers</div>
                  <ul>
                    {current.dishes.starters.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div className="dish-cat-box">
                  <div className="cat-title">🍛 Royal Main Course</div>
                  <ul>
                    {current.dishes.mains.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div className="dish-cat-box">
                  <div className="cat-title">🔥 Live Gourmet Counters</div>
                  <ul>
                    {current.dishes.live.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div className="dish-cat-box">
                  <div className="cat-title">🍨 Desserts & Kulfi Bar</div>
                  <ul>
                    {current.dishes.desserts.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="spotlight-action-bar">
              <div className="action-left">
                <span>Want to see our comprehensive dish portfolio?</span>
                <Link href="/menu" className="menu-link-highlight">
                  Explore Complete Dish Repertoire 📖 →
                </Link>
              </div>
              <div className="action-right">
                <Link href="/packages/events-expenditure" className="btn btn-outline" style={{ marginRight: '12px' }}>
                  Calculate Event Budget
                </Link>
                <Link href="/book" className="btn btn-primary">
                  Book This Package Now →
                </Link>
              </div>
            </div>
          </div>

          {/* All 4 Packages Comparison Cards */}
          <div className="all-packages-overview" style={{ marginTop: '90px' }}>
            <div className="section-header-centered">
              <span className="section-pill">PACKAGE COMPARISON</span>
              <h2 className="section-title-luxury">All Catering Packages at a Glance</h2>
              <p className="section-subtitle">Choose the package that aligns with your guest count, celebration style, and culinary preferences.</p>
            </div>

            <div className="features-grid" style={{ marginTop: '45px' }}>
              {packages.map((pkg) => (
                <div key={pkg.id} className="feature-pillar-card" style={{ cursor: 'pointer' }} onClick={() => setSelectedPkg(pkg.id)}>
                  <div className="feature-card-header">
                    <span className="section-pill" style={{ fontSize: '0.68rem', padding: '3px 8px' }}>{pkg.badge}</span>
                    <span className="feature-index-num">{pkg.price}</span>
                  </div>
                  <h3 style={{ marginTop: '14px' }}>{pkg.name}</h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--gray-text)', minHeight: '50px' }}>{pkg.subtitle}</p>
                  <div style={{ marginTop: '16px' }}>
                    <button
                      type="button"
                      className={`btn ${selectedPkg === pkg.id ? 'btn-primary' : 'btn-outline'}`}
                      style={{ width: '100%', padding: '10px 16px', fontSize: '0.88rem' }}
                    >
                      {selectedPkg === pkg.id ? 'Currently Selected' : 'View Details'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pure Desi Ghee & Quality Guarantee */}
          <section className="quality-banner" style={{ marginTop: '80px' }}>
            <div className="quality-card">
              <div className="gold-accent-line"></div>
              <h3>Our 100% Pure Desi Ghee & Veg Integrity Promise</h3>
              <p>
                Every pot of Dal Bukhara, simmering kadhai of Shahi Paneer, and swirled live jalebi is prepared strictly with 100% pure churned desi ghee and farm-fresh organic dairy. We ensure strict hygiene and authentic royal culinary traditions.
              </p>
              <div className="quality-badges">
                <span className="q-badge">✓ 100% Pure Desi Ghee</span>
                <span className="q-badge">✓ Pure Vegetarian Kitchens</span>
                <span className="q-badge">✓ Saffron & Whole Spices</span>
                <span className="q-badge">✓ 7-Star Kitchen Sanitation</span>
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

