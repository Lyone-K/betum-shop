'use client';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, Heart } from 'lucide-react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Women',      href: '/shop/women-section' },
  { label: 'Men',        href: '/shop/mens-section' },
  { label: 'Kids',       href: '/shop/kids-section' },
  { label: 'FootWare',      href: '/shop/footware' },
  { label: 'Bags',       href: '/shop/bags' },
  { label: 'Accessories',href: '/shop/accessories' },
];

export default function Header() {
  const { cartCount, wishlistCount, openCart, setSearchQuery } = useCart();

  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchVal,   setSearchVal]   = useState('');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchQuery(searchVal);
    setSearchOpen(false);
  }

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: scrolled ? 'rgba(253,252,249,0.97)' : 'var(--warm-white)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '68px',
        }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img
              src="/logo.png" alt="BETUM"
              style={{ width: '68px', height: '68px', borderRadius: '50%', border: '5px solid var(--gold)', objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="hide-mobile">
            {NAV_LINKS.map(link => (
              <Link key={link.label} href={link.href} className="nav-link" style={{ textDecoration: 'none' }}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--charcoal)', display: 'flex', padding: 0 }}
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--charcoal)', display: 'flex', position: 'relative', padding: 0 }}
              aria-label="Wishlist"
            >
              <Heart size={18} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  background: 'var(--gold)', color: 'white', fontSize: '9px',
                  width: '16px', height: '16px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-sans)',
                }}>{wishlistCount}</span>
              )}
            </button>

            <button
              onClick={openCart}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--charcoal)', display: 'flex', position: 'relative', padding: 0 }}
              aria-label="Cart"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  background: 'var(--charcoal)', color: 'white', fontSize: '9px',
                  width: '16px', height: '16px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-sans)',
                }}>{cartCount}</span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--charcoal)', display: 'flex', padding: 0 }}
              className="hide-desktop"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div style={{ borderTop: '1px solid var(--border)', padding: '16px 24px', background: 'var(--warm-white)', animation: 'fadeIn 0.2s ease' }}>
            <form onSubmit={handleSearch} style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Search size={16} color="var(--muted)" strokeWidth={1.5} style={{ flexShrink: 0 }} />
              <input
                autoFocus
                className="search-input"
                type="text"
                placeholder="Search by brand, category or style..."
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
              />
              <button type="submit" className="btn-primary" style={{ padding: '10px 20px', whiteSpace: 'nowrap' }}>
                Search
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: '68px', left: 0, right: 0, bottom: 0,
          background: 'var(--warm-white)', zIndex: 45,
          padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '8px',
          animation: 'fadeIn 0.2s ease',
        }}>
          {NAV_LINKS.map(link => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 300,
                color: 'var(--charcoal)', textDecoration: 'none',
                padding: '12px 0', borderBottom: '1px solid var(--border)',
                letterSpacing: '0.02em', display: 'block',
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="#" className="nav-link" style={{ fontSize: '11px' }}>My Account</a>
            <a href="#" className="nav-link" style={{ fontSize: '11px' }}>Order Tracking</a>
            <a href="#" className="nav-link" style={{ fontSize: '11px' }}>Authentication Policy</a>
          </div>
        </div>
      )}
    </>
  );
}