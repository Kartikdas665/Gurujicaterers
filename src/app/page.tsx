import Image from 'next/image';

export default function Home() {
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
            <a href="#menu">Menu</a>
            <a href="#services">Services</a>
            <a href="#gallery">Gallery</a>
            <a href="#bookings">Bookings</a>
          </div>
          <a href="#book" className="btn btn-primary">Book Now</a>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Aapki Parties Ko Banayein Yaadgaar....</h1>
            <p>Bringing Our Culinary Expertise Elevate Your Celebrations</p>
            <div className="hero-btns">
              <a href="#book" className="btn btn-primary">BOOK NOW</a>
              <a href="#quote" className="btn btn-outline">REQUEST A QUOTE</a>
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="container about-container">
            <div className="about-image">
              <img src="/catering_wedding_1791127871855.jpg" alt="Chefs Cooking" style={{height: '400px', objectFit: 'cover'}} />
            </div>
            <div className="about-text">
              <h2>Humari Kahani:<br/>Saalon Ka Anubhav</h2>
              <p>We poplessttad a foaldiond tore wen treditional compelating cecoeststs silfine enssonful easstterts and successfully outhun caterhs oate ceating cosdfions.</p>
              <p>We concuren our censemmene ta taditional online catering toe travistam cemices to online conshling collins paaldons, mere mopdaait oi our roone mamselaghous our yeors of years caperemas.</p>
            </div>
          </div>
        </section>

        <section id="services" className="services-section">
          <div className="container">
            <h2 className="section-title">Our Services</h2>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">💍</div>
                <h3>Wedding</h3>
                <p>Emod dicit coamsonle inn carmepty entercce cootans smmoocetiy your ciddiranco.</p>
                <a href="#" className="explore-link">Explore</a>
              </div>
              <div className="service-card">
                <div className="service-icon">🎂</div>
                <h3>Birthday</h3>
                <p>Wa ons the chonemas enceanner malarhiss sne deis det Gyussi Dence.</p>
                <a href="#" className="explore-link">Explore</a>
              </div>
              <div className="service-card">
                <div className="service-icon">💼</div>
                <h3>Corporate</h3>
                <p>We gea of bdaea sofrcare emenosc merocxsnte obioct or our crnt mnlstds.</p>
                <a href="#" className="explore-link">Explore</a>
              </div>
              <div className="service-card">
                <div className="service-icon">🎭</div>
                <h3>Theme</h3>
                <p>Lisetn asete numson boer aatcdwo mseasssreone hs aunorututobre puinconies simmslas.</p>
                <a href="#" className="explore-link">Explore</a>
              </div>
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

        <section className="why-section">
          <div className="container">
            <h2 className="section-title">Why Choose Us</h2>
            <div className="why-grid">
              <div className="why-card">
                <div className="why-icon">🎖️</div>
                <p>"Rasto wonnori is aocmnidti anaple omoo ei rmoooeie oend oeesedtst evooaox."</p>
                <div className="stars">★★★★★</div>
              </div>
              <div className="why-card">
                <div className="why-icon">🏆</div>
                <p>"Derlodu do clo insvoresthi elatoom boepetks oemcx ding aeat aoeonene cooosied acodick."</p>
                <div className="stars">★★★★★</div>
              </div>
              <div className="why-card">
                <div className="why-icon">🥇</div>
                <p>"Tino hnny thane ontecdote onetoam onmote gesbey disie aoit deidoodt."</p>
                <div className="stars">★★★★★</div>
              </div>
            </div>
          </div>
        </section>

        <section id="book" className="book-section">
          <div className="container book-container">
            <h2 className="section-title">Book Your Event</h2>
            <form className="book-form">
              <div className="form-group">
                <input type="text" placeholder="Name" />
              </div>
              <div className="form-group">
                <select>
                  <option value="">Event Type</option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday</option>
                  <option value="corporate">Corporate</option>
                </select>
              </div>
              <div className="form-group">
                <input type="date" placeholder="Date" />
              </div>
              <div className="form-group">
                <input type="number" placeholder="Guest Count" />
              </div>
              <div className="form-group full-width">
                <textarea placeholder="Special Requests"></textarea>
              </div>
              <div className="submit-wrap">
                <button type="button" className="btn btn-primary">Get a Free Quote</button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo">
                <span className="logo-icon" style={{color: 'white'}}>🍽️</span>
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
