'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function AboutContent() {
  const milestones = [
    { year: '2010', title: 'The Royal Inception', desc: 'Started with authentic North Indian traditional banquets in Delhi with an unyielding passion for pure ingredients.' },
    { year: '2015', title: '500+ Mega Weddings', desc: 'Expanded into grand destination weddings across Rajasthan palaces (Udaipur, Jaipur, Jodhpur).' },
    { year: '2020', title: 'Corporate & VIP Banqueting', desc: 'Introduced international live counters, molecular dessert stations, and white-glove executive hospitality.' },
    { year: '2026', title: 'Over 1,000+ Celebrations', desc: 'Recognized as one of India\'s premier luxury catering enterprises with a team of 150+ masterchefs and hospitality artisans.' },
  ];

  const pillars = [
    { icon: '👑', title: 'Royal Heritage Recipes', desc: 'Century-old recipes perfected through generations using pure desi ghee and hand-ground royal spices.' },
    { icon: '🌿', title: 'Uncompromising Purity & Hygiene', desc: '100% farm-sourced fresh ingredients, RO filtered cooking, and separate dedicated pure-veg / Jain kitchens.' },
    { icon: '🎭', title: 'Live Culinary Theater', desc: 'Spectacular visual cooking with liquid nitrogen desserts, wood-fired ovens, and interactive live chaat studios.' },
    { icon: '⭐', title: '7-Star White-Glove Hospitality', desc: 'Professionally groomed service brigade trained to deliver seamless royal warmth to every single guest.' },
  ];

  return (
    <>
      <Navbar />

      {/* 1. Hero Section */}
      <section className="page-hero-banner">
        <div className="page-hero-bg"></div>
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content">
          <div className="gold-accent-line" style={{ margin: '0 auto 16px' }}></div>
          <span className="section-pill">OUR HERITAGE & VISION</span>
          <h1 className="page-hero-title">Our Story: Years of Experience</h1>
          <p className="page-hero-subtitle">
            Crafting indelible culinary memories and royal celebratory banquets for over 15+ years.
          </p>
        </div>
      </section>

      <main className="dedicated-page-main">
        <div className="container">
          {/* 2. Introduction Section */}
          <div className="about-story-split">
            <div className="story-split-text">
              <span className="service-gold-tag">15+ YEARS OF CULINARY EXCELLENCE</span>
              <h2>Purity, Passion & Unmatched Hospitality</h2>
              <p>
                Guruji Caterers was founded on a simple philosophy: <em>Food is not merely served at a celebration — it is the soul of every lasting memory.</em>
              </p>
              <p>
                From humble beginnings in Delhi NCR to engineering multi-day destination wedding extravaganzas in royal heritage palaces across Udaipur and Goa, our masterchefs preserve time-honored Indian traditions while seamlessly integrating cutting-edge global culinary trends.
              </p>
              <div className="story-stat-strip">
                <div className="story-stat-box">
                  <span className="stat-number">1,000+</span>
                  <span className="stat-label">Events Hosted</span>
                </div>
                <div className="story-stat-box">
                  <span className="stat-number">150+</span>
                  <span className="stat-label">Master Chefs</span>
                </div>
                <div className="story-stat-box">
                  <span className="stat-number">4.9★</span>
                  <span className="stat-label">Client Rating</span>
                </div>
              </div>
            </div>

            <div className="story-split-visual">
              <div className="about-visual-frame">
                <div className="about-visual-img" style={{ backgroundImage: `url('/catering_wedding_1791127871855.jpg')` }}></div>
                <div className="gold-accent-corner top-left"></div>
                <div className="gold-accent-corner bottom-right"></div>
              </div>
            </div>
          </div>

          {/* 3. Our Core Values */}
          <div className="about-pillars-section">
            <div className="section-header-centered">
              <span className="section-pill">OUR CORE VALUES</span>
              <h2 className="section-title-luxury">The Pillars of Guruji Caterers</h2>
              <p className="section-subtitle">What sets our catering apart at the most prestigious celebrations in India.</p>
            </div>

            <div className="pillars-grid">
              {pillars.map((p, i) => (
                <div key={i} className="pillar-card">
                  <div className="pillar-icon">{p.icon}</div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Our Journey */}
          <div className="timeline-section">
            <div className="section-header-centered">
              <span className="section-pill">OUR JOURNEY</span>
              <h2 className="section-title-luxury">Milestones of Excellence</h2>
            </div>

            <div className="timeline-grid">
              {milestones.map((m, idx) => (
                <div key={idx} className="timeline-card">
                  <div className="timeline-year">{m.year}</div>
                  <h4>{m.title}</h4>
                  <p>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4.5 Full Leadership & Master Chef Brigade */}
          <section id="team" className="about-team-section" style={{ marginTop: '90px' }}>
            <div className="section-header-centered">
              <span className="section-pill">✦ LEADERSHIP & CULINARY BRIGADE</span>
              <h2 className="section-title-luxury">Meet Our Master Chefs & Directors</h2>
              <p className="section-subtitle">
                The visionary artisans, culinary masters, and banquet directors dedicated to orchestrating royalty across every plate and celebration.
              </p>
            </div>

            <div className="team-grid">
              {/* Member 1 */}
              <div className="team-member-card">
                <div className="team-card-top">
                  <div className="team-avatar-wrap" style={{ borderColor: '#c59b27' }}>
                    <div className="team-avatar-inner" style={{ background: 'linear-gradient(135deg, #2b1f0d, #140d17)' }}>
                      <span className="team-avatar-text" style={{ color: '#c59b27' }}>RK</span>
                    </div>
                    <span className="team-avatar-badge">👑 Master Chef</span>
                  </div>
                  <div className="team-exp-chip">25+ Yrs Exp</div>
                </div>
                <div className="team-card-body">
                  <h3 className="team-member-name">Chef Rajeev Kapoor</h3>
                  <div className="team-member-role">Executive Culinary Director</div>
                  <div className="team-member-specialty">Royal Awadhi & Dum Pukht Gastronomy</div>
                  <p className="team-member-bio">
                    Former Executive Sous Chef at luxury heritage palaces. The master craftsman behind Guruji&apos;s celebrated 18-hour Dal Bukhara, saffron shahi gravies, and sealed clay-handi biryanis.
                  </p>
                  <div className="team-chip-tags">
                    <span className="team-chip">Awadhi Master</span>
                    <span className="team-chip">Heirloom Spices</span>
                    <span className="team-chip">Clay Handi</span>
                  </div>
                </div>
              </div>

              {/* Member 2 */}
              <div className="team-member-card">
                <div className="team-card-top">
                  <div className="team-avatar-wrap" style={{ borderColor: '#d97706' }}>
                    <div className="team-avatar-inner" style={{ background: 'linear-gradient(135deg, #2c1a0c, #140d17)' }}>
                      <span className="team-avatar-text" style={{ color: '#f59e0b' }}>VR</span>
                    </div>
                    <span className="team-avatar-badge">🔥 Sigri Master</span>
                  </div>
                  <div className="team-exp-chip">18+ Yrs Exp</div>
                </div>
                <div className="team-card-body">
                  <h3 className="team-member-name">Chef Vikramaditya Rathore</h3>
                  <div className="team-member-role">Head of Sigri Tandoor & Barbecue</div>
                  <div className="team-member-specialty">Live Sigri Charcoal & Smoked Kebabs</div>
                  <p className="team-member-bio">
                    Hailing from Rajasthan&apos;s royal banquet lineage. Specialist in authentic live charcoal smoking, artisanal zafrani paneer tikkas, and melt-in-mouth smoked galouti kebabs.
                  </p>
                  <div className="team-chip-tags">
                    <span className="team-chip">Live Sigri</span>
                    <span className="team-chip">Charcoal Smoking</span>
                    <span className="team-chip">Rajasthani Royal</span>
                  </div>
                </div>
              </div>

              {/* Member 3 */}
              <div className="team-member-card">
                <div className="team-card-top">
                  <div className="team-avatar-wrap" style={{ borderColor: '#e11d48' }}>
                    <div className="team-avatar-inner" style={{ background: 'linear-gradient(135deg, #2d0e1b, #140d17)' }}>
                      <span className="team-avatar-text" style={{ color: '#fb7185' }}>AS</span>
                    </div>
                    <span className="team-avatar-badge">✨ Live Fusion</span>
                  </div>
                  <div className="team-exp-chip">14+ Yrs Exp</div>
                </div>
                <div className="team-card-body">
                  <h3 className="team-member-name">Chef Ananya Sen</h3>
                  <div className="team-member-role">Director of Global Gastronomy</div>
                  <div className="team-member-specialty">Artisanal Pasta Theater & Dim Sums</div>
                  <p className="team-member-bio">
                    Trained at Le Cordon Bleu. Spearheads our live gourmet interactive stations, wood-fired sourdough pizzas, handcrafted truffle pastas, and delicate Pan-Asian dim sum wok bars.
                  </p>
                  <div className="team-chip-tags">
                    <span className="team-chip">Le Cordon Bleu</span>
                    <span className="team-chip">Neapolitan Sourdough</span>
                    <span className="team-chip">Pasta Theater</span>
                  </div>
                </div>
              </div>

              {/* Member 4 */}
              <div className="team-member-card">
                <div className="team-card-top">
                  <div className="team-avatar-wrap" style={{ borderColor: '#ea580c' }}>
                    <div className="team-avatar-inner" style={{ background: 'linear-gradient(135deg, #2e1509, #140d17)' }}>
                      <span className="team-avatar-text" style={{ color: '#fb923c' }}>RS</span>
                    </div>
                    <span className="team-avatar-badge">🍨 Mithai Maestro</span>
                  </div>
                  <div className="team-exp-chip">30+ Yrs Exp</div>
                </div>
                <div className="team-card-body">
                  <h3 className="team-member-name">Pandit Ramkishan Sharma</h3>
                  <div className="team-member-role">Chief Master Confectioner</div>
                  <div className="team-member-specialty">Pure Desi Ghee Sweets & Kulfi Studios</div>
                  <p className="team-member-bio">
                    Custodian of three generations of Banaras sweet craftsmanship. Curates live swirling desi ghee jalebis, thick malai rabri, and molecular liquid nitrogen smoking kulfi bars.
                  </p>
                  <div className="team-chip-tags">
                    <span className="team-chip">100% Desi Ghee</span>
                    <span className="team-chip">Live Jalebi Rabri</span>
                    <span className="team-chip">Nitrogen Kulfi</span>
                  </div>
                </div>
              </div>

              {/* Member 5 */}
              <div className="team-member-card">
                <div className="team-card-top">
                  <div className="team-avatar-wrap" style={{ borderColor: '#2563eb' }}>
                    <div className="team-avatar-inner" style={{ background: 'linear-gradient(135deg, #0e1b33, #140d17)' }}>
                      <span className="team-avatar-text" style={{ color: '#60a5fa' }}>SS</span>
                    </div>
                    <span className="team-avatar-badge">🎩 Hospitality Lead</span>
                  </div>
                  <div className="team-exp-chip">16+ Yrs Exp</div>
                </div>
                <div className="team-card-body">
                  <h3 className="team-member-name">Shivansh Singh</h3>
                  <div className="team-member-role">VP - Banquet Operations & Logistics</div>
                  <div className="team-member-specialty">White-Glove Butler Hospitality & 2000+ Pax</div>
                  <p className="team-member-bio">
                    Ensures clockwork timing, immaculate luxury table layout, discreet VIP butler service, and zero food delays for high-profile destination weddings across India.
                  </p>
                  <div className="team-chip-tags">
                    <span className="team-chip">White-Glove Service</span>
                    <span className="team-chip">2000+ Pax Galas</span>
                    <span className="team-chip">Zero-Delay Delivery</span>
                  </div>
                </div>
              </div>

              {/* Member 6 */}
              <div className="team-member-card">
                <div className="team-card-top">
                  <div className="team-avatar-wrap" style={{ borderColor: '#059669' }}>
                    <div className="team-avatar-inner" style={{ background: 'linear-gradient(135deg, #0a2418, #140d17)' }}>
                      <span className="team-avatar-text" style={{ color: '#34d399' }}>RN</span>
                    </div>
                    <span className="team-avatar-badge">🛡️ Hygiene Lead</span>
                  </div>
                  <div className="team-exp-chip">12+ Yrs Exp</div>
                </div>
                <div className="team-card-body">
                  <h3 className="team-member-name">Dr. Radhika Nair</h3>
                  <div className="team-member-role">Head of Food Safety & Sanitation</div>
                  <div className="team-member-specialty">HACCP 7-Star Kitchen Protocols</div>
                  <p className="team-member-bio">
                    Directs strict lab testing of ingredients, daily farm-fresh dairy audits, temperature-controlled logistics, and multi-tier sterilizations across our mobile kitchens.
                  </p>
                  <div className="team-chip-tags">
                    <span className="team-chip">HACCP Certified</span>
                    <span className="team-chip">7-Star Hygiene</span>
                    <span className="team-chip">Lab Tested Food</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Trust Bar */}
            <div className="team-trust-strip">
              <div className="team-trust-item">
                <div className="trust-number">150+</div>
                <div className="trust-label">Culinary Artisans & Brigade</div>
              </div>
              <div className="team-trust-divider"></div>
              <div className="team-trust-item">
                <div className="trust-number">1,000+</div>
                <div className="trust-label">Royal Galas & Weddings Executed</div>
              </div>
              <div className="team-trust-divider"></div>
              <div className="team-trust-item">
                <div className="trust-number">100%</div>
                <div className="trust-label">Pure Desi Ghee & Veg Integrity</div>
              </div>
              <div className="team-trust-divider"></div>
              <div className="team-trust-item">
                <div className="trust-number">7-Star</div>
                <div className="trust-label">HACCP Certified Sanitation Standard</div>
              </div>
            </div>
          </section>

          {/* 5. Call to Action (CTA) Section */}
          <div className="services-cta-banner" style={{ marginTop: '70px' }}>
            <div className="banner-gold-glow"></div>
            <h3>Let Us Craft Your Celebration</h3>
            <p>Schedule a complimentary menu consultation and private food tasting session with our culinary directors.</p>
            <div className="banner-btns">
              <Link href="/book" className="btn btn-gold btn-large">
                RESERVE DATE & FOOD TASTING
              </Link>
              <Link href="/packages/catering" className="btn btn-outline btn-large">
                Explore Catering Packages
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* 6. Footer */}
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
              <h4>QUICK NAVIGATION</h4>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/packages/catering">Catering Packages</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>EXPERIENCE</h4>
              <ul>
                <li><Link href="/packages/events-expenditure">Events & Expenditure</Link></li>
                <li><Link href="/brochure">Official Brochure</Link></li>
                <li><Link href="/reviews">Reviews</Link></li>
                <li><Link href="/book">Plan Your Event</Link></li>
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
