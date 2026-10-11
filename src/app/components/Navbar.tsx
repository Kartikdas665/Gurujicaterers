'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
      <div className="nav-container">
        <Link href="/" className="logo">
          <span className="logo-icon">🍽️</span>
          GURUJI CATERERS
        </Link>
        <div className="nav-links">
          <Link href="/" className={pathname === '/' ? 'active' : ''}>Home</Link>
          <Link href="/about" className={pathname === '/about' ? 'active' : ''}>About</Link>
          <Link href="/services" className={pathname === '/services' ? 'active' : ''}>Services</Link>
          <Link href="/menu" className={pathname === '/menu' ? 'active' : ''}>Menu</Link>
          <Link href="/reviews" className={pathname === '/reviews' ? 'active' : ''}>Reviews</Link>
          <Link href="/faq" className={pathname === '/faq' ? 'active' : ''}>FAQ</Link>
        </div>
        <Link href="/book" className="btn btn-primary">
          Book Now
        </Link>
      </div>
    </nav>
  );
}
