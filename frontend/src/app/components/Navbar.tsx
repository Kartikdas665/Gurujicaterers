'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPackagesOpen, setIsPackagesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPackagesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsPackagesOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isPackagesActive = pathname.startsWith('/packages') || pathname === '/menu';

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
      <div className="nav-container">
        <Link href="/" className="logo">
          <span className="logo-icon">🍽️</span>
          GURUJI CATERERS
        </Link>

        {/* Desktop Nav Links */}
        <div className="nav-links">
          <Link href="/" className={pathname === '/' ? 'active' : ''}>
            Home
          </Link>
          <Link href="/about" className={pathname === '/about' ? 'active' : ''}>
            About
          </Link>
          <Link href="/services" className={pathname === '/services' ? 'active' : ''}>
            Services
          </Link>

          {/* Packages Dropdown */}
          <div
            className={`nav-dropdown ${isPackagesOpen ? 'open' : ''}`}
            ref={dropdownRef}
            onMouseEnter={() => setIsPackagesOpen(true)}
            onMouseLeave={() => setIsPackagesOpen(false)}
          >
            <button
              type="button"
              className={`nav-dropdown-btn ${isPackagesActive ? 'active' : ''}`}
              onClick={() => setIsPackagesOpen((prev) => !prev)}
              aria-expanded={isPackagesOpen}
              aria-haspopup="true"
            >
              <span>Packages</span>
              <svg
                className={`dropdown-chevron ${isPackagesOpen ? 'rotated' : ''}`}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div className={`nav-dropdown-menu ${isPackagesOpen ? 'show' : ''}`}>
              <div className="dropdown-menu-header">
                <span className="dropdown-gold-tag">✦ ROYAL PACKAGES</span>
              </div>
              <Link
                href="/packages/events-expenditure"
                className={`nav-dropdown-item ${pathname === '/packages/events-expenditure' ? 'active' : ''}`}
                onClick={() => setIsPackagesOpen(false)}
              >
                <div className="dropdown-item-icon">🎪</div>
                <div className="dropdown-item-content">
                  <div className="dropdown-item-title">Events & Expenditure</div>
                  <div className="dropdown-item-desc">Budget planning, cost breakdowns & event estimates</div>
                </div>
                <span className="dropdown-item-arrow">→</span>
              </Link>
              <Link
                href="/packages/catering"
                className={`nav-dropdown-item ${pathname === '/packages/catering' || pathname === '/menu' ? 'active' : ''}`}
                onClick={() => setIsPackagesOpen(false)}
              >
                <div className="dropdown-item-icon">🍽️</div>
                <div className="dropdown-item-content">
                  <div className="dropdown-item-title">Catering</div>
                  <div className="dropdown-item-desc">Royal buffet, live counters & curated menu packages</div>
                </div>
                <span className="dropdown-item-arrow">→</span>
              </Link>
            </div>
          </div>

          <Link href="/reviews" className={pathname === '/reviews' ? 'active' : ''}>
            Reviews
          </Link>
          <Link href="/blog" className={pathname === '/blog' ? 'active' : ''}>
            Blog
          </Link>
          <Link href="/contact" className={pathname === '/contact' ? 'active' : ''}>
            Contact
          </Link>
        </div>

        {/* Brochure CTA Button (Replaced Book Now) */}
        <div className="nav-action-wrap">
          <Link href="/brochure" className="btn btn-primary nav-brochure-btn">
            <span className="brochure-btn-icon">📄</span>
            <span>Brochure</span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-inner">
          <Link href="/" className={pathname === '/' ? 'mobile-active' : ''}>
            Home
          </Link>
          <Link href="/about" className={pathname === '/about' ? 'mobile-active' : ''}>
            About
          </Link>
          <Link href="/services" className={pathname === '/services' ? 'mobile-active' : ''}>
            Services
          </Link>

          {/* Mobile Packages Accordion */}
          <div className="mobile-accordion">
            <div className="mobile-accordion-header">
              <span className={isPackagesActive ? 'mobile-active' : ''}>Packages</span>
            </div>
            <div className="mobile-accordion-content">
              <Link
                href="/packages/events-expenditure"
                className={`mobile-sub-link ${pathname === '/packages/events-expenditure' ? 'active' : ''}`}
              >
                🎪 Events & Expenditure
              </Link>
              <Link
                href="/packages/catering"
                className={`mobile-sub-link ${pathname === '/packages/catering' || pathname === '/menu' ? 'active' : ''}`}
              >
                🍽️ Catering Packages
              </Link>
            </div>
          </div>

          <Link href="/reviews" className={pathname === '/reviews' ? 'mobile-active' : ''}>
            Reviews
          </Link>
          <Link href="/blog" className={pathname === '/blog' ? 'mobile-active' : ''}>
            Blog
          </Link>
          <Link href="/contact" className={pathname === '/contact' ? 'mobile-active' : ''}>
            Contact
          </Link>

          <div className="mobile-btn-wrap">
            <Link href="/brochure" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
              📄 View Brochure
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
