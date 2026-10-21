'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function MenuPage() {
  const [activeCourse, setActiveCourse] = useState<string>('starters');

  const menuCourses = [
    { id: 'starters', label: '🍢 Starters & Canapés' },
    { id: 'live-counters', label: '🔥 Live Gourmet Stations' },
    { id: 'main-course', label: '🍛 Royal Main Course' },
    { id: 'breads-rice', label: '🫓 Breads & Biryani' },
    { id: 'desserts', label: '🍨 Desserts & Kulfi Bar' },
    { id: 'beverages', label: '🍹 Signature Mocktails' },
  ];

  const menuItems = {
    starters: [
      { name: 'Zafrani Paneer Tikka', desc: 'Cottage cheese steeped in Kashmiri saffron, yellow chili & royal spices roasted in clay tandoor', tag: 'Veg / Chef Signature', price: 'Included' },
      { name: 'Dahi Ke Kebab', desc: 'Velvety hung curd medallions delicately spiced with cardamom and fresh coriander', tag: 'Veg / Crispy', price: 'Included' },
      { name: 'Crispy Truffle Lotus Stem', desc: 'Thinly sliced lotus root tossed in honey glaze, toasted sesame & white truffle oil', tag: 'Gourmet Fusion', price: 'Included' },
      { name: 'Kurkuri Bhindi Chaat Cones', desc: 'Golden shredded crispy okra nestled in edible savory wafer cones with mint coulis', tag: 'Live Presentation', price: 'Included' },
      { name: 'Smoked Beetroot Galouti', desc: 'Melt-in-mouth slow-cooked beetroot kebabs served over mini saffron ulta tawa parathas', tag: 'Royal Heritage', price: 'Included' },
      { name: 'Stuffed Mushroom Duplex', desc: 'Button mushrooms stuffed with spiced spinach, cheddar & pine nuts roasted golden', tag: 'Continental Fusion', price: 'Included' },
    ],
    'live-counters': [
      { name: 'Chandni Chowk Live Chaat Studio', desc: 'Live Palak Patta Chaat, Dahi Bhalla, Golgappe with 5 flavored herbal waters & Dahi Puri', tag: 'Live Chef Counter', price: 'Premium' },
      { name: 'Wood-fired Neapolitan Pizza & Pasta Bar', desc: 'Handcrafted sourdough pizzas and customized penne/fusilli in pink vodka & pesto sauce', tag: 'Italian Gourmet', price: 'Premium' },
      { name: 'Sigri Charcoal Live Barbecue Station', desc: 'Live smoky charcoal grills serving fresh kebabs, grilled pineapples, corn & paneer skewers', tag: 'Live Smoked', price: 'Premium' },
      { name: 'Oriental Dim Sum & Noodle Wok', desc: 'Steamed crystal dim sums, spicy pan-fried bao, and custom ramen / wok-tossed noodles', tag: 'Pan-Asian Live', price: 'Premium' },
    ],
    'main-course': [
      { name: 'Paneer Lababdar Awadhi', desc: 'Rich cottage cheese cubes simmered in buttered tomato cashew gravy with royal mace', tag: 'Royal Awadhi', price: 'Included' },
      { name: 'Dal Guruji Maharani', desc: 'Signature black lentils slow-cooked overnight for 18 hours with white churned butter', tag: 'Must Try Signature', price: 'Included' },
      { name: 'Kashmiri Dum Aloo Banarasi', desc: 'Baby potatoes stuffed with paneer and dry fruits cooked in fragrant fennel gravy', tag: 'Heritage Classic', price: 'Included' },
      { name: 'Subz Diwani Handi', desc: 'Melange of winter garden vegetables and tender baby corn in velvety spinach gravy', tag: 'Farm Fresh', price: 'Included' },
      { name: 'Malai Kofta Nazakat', desc: 'Cottage cheese & dried fruit dumplings in smooth golden saffron almond cream curry', tag: 'Royal Feast', price: 'Included' },
      { name: 'Amritsari Chhole Kulcha Pod', desc: 'Authentic dark spiced chickpeas infused with dried anardana and whole spices', tag: 'Punjabi Traditional', price: 'Included' },
    ],
    'breads-rice': [
      { name: 'Hyderabadi Subz Dum Biryani', desc: 'Aged basmati rice layered with seasonal vegetables, saffron milk, cooked in sealed clay handi', tag: 'Clay Handi Dum', price: 'Included' },
      { name: 'Awadhi Kaju Kishmish Pulao', desc: 'Aromatic long-grain rice infused with roasted cashews, golden raisins & ghee', tag: 'Fragrant Heritage', price: 'Included' },
      { name: 'Assorted Live Tandoori Breads', desc: 'Amritsari Chur Chur Naan, Laccha Paratha, Garlic Butter Naan, Missi Roti & Sheermal', tag: 'Fresh From Oven', price: 'Included' },
      { name: 'Taftan & Roomali Roti Station', desc: 'Paper-thin handkerchief rotis flipped live over inverse iron domed kadhai', tag: 'Live Bread Station', price: 'Included' },
    ],
    desserts: [
      { name: 'Cold Stone Live Kulfi Studio', desc: 'Rabri Falooda, Paan Kulfi, Kesar Pista, and roasted almond slabs smashed fresh on cold stone', tag: 'Live Dessert Counter', price: 'Included' },
      { name: 'Shahi Tukda with Saffron Rabri', desc: 'Crispy ghee-fried brioche steeped in cardamom syrup and blanketed in thick Malai Rabri', tag: 'Royal Mughlai', price: 'Included' },
      { name: 'Live Hot Jalebi with Creamy Rabri', desc: 'Swirled live crisp saffron jalebis served straight from bubbling desi ghee kadhai', tag: 'Live Sweet Counter', price: 'Included' },
      { name: 'Belgian Dark Chocolate Fondue & Lava', desc: 'Warm streaming molten chocolate station with fresh strawberries, brownies & marshmallows', tag: 'Gourmet Western', price: 'Included' },
    ],
    beverages: [
      { name: 'Kesar Badam Thandai Shots', desc: 'Traditional spiced almond and saffron milk infused with fennel, poppy seeds and rose petals', tag: 'Royal Welcome Drink', price: 'Included' },
      { name: 'Smoked Rosemary Jamun Cooler', desc: 'Fresh black plum pulp shaken with roasted cumin, black salt & torch-smoked rosemary', tag: 'Artisan Mixology', price: 'Included' },
      { name: 'Chilli Guava Rock Salt Margarita', desc: 'Spiced pink guava nectar served in rock-salt and red chili-dusted coupe glasses', tag: 'Signature Favorite', price: 'Included' },
      { name: 'Fresh Tender Coconut & Lychee Punch', desc: 'Organic tender coconut water muddled with whole litchi and mint springs', tag: 'Refreshing', price: 'Included' },
    ],
  };

  return (
    <>
      <Navbar />

      {/* 70vh Grand Party Celebration Hero Banner */}
      <section className="page-hero-banner">
        <div className="page-hero-bg"></div>
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content">
          <div className="gold-accent-line" style={{ margin: '0 auto 16px' }}></div>
          <span className="section-pill">ROYAL CATERING REPERTOIRE</span>
          <h1 className="page-hero-title">Grand Culinary Menu Showcase</h1>
          <p className="page-hero-subtitle">
            Explore our curated culinary master-creations — blending timeless royal recipes with contemporary Michelin-level live food theater.
          </p>
        </div>
      </section>

      <main className="dedicated-page-main">
        <div className="container">
          {/* Menu Categories Pills Bar */}
          <div className="reviews-filter-pills" style={{ marginBottom: '45px' }}>
            {menuCourses.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCourse(tab.id)}
                className={`review-pill-btn ${activeCourse === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Menu Showcase Grid */}
          <div className="menu-detailed-grid">
            {menuItems[activeCourse as keyof typeof menuItems]?.map((item, idx) => (
              <div key={idx} className="menu-dish-card">
                <div className="dish-top-bar">
                  <span className="dish-tag">{item.tag}</span>
                  <span className="dish-price-tag">{item.price}</span>
                </div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <div className="dish-card-bottom">
                  <span className="gold-star-mark">✦ 100% Desi Ghee & Fresh Ingredients</span>
                </div>
              </div>
            ))}
          </div>

          {/* Download Full PDF Bar */}
          <div className="menu-download-pdf-card">
            <div className="pdf-card-left">
              <span className="pdf-icon">📜</span>
              <div>
                <h3>Want the Complete 150+ Dishes Master Brochure?</h3>
                <p>Download our complete seasonal banquet brochure including Jain, Continental, Pan-Asian & Royal Awadhi setups.</p>
              </div>
            </div>
            <div className="pdf-card-right">
              <a href="#" className="btn btn-outline" onClick={(e) => { e.preventDefault(); alert("Master Menu PDF will be shared directly on WhatsApp with your customized quote!"); }}>
                Download Menu PDF
              </a>
              <Link href="/book" className="btn btn-gold">
                Custom Menu Consultation
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
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/menu">Menu</Link></li>
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
