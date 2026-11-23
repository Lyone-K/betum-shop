'use client';
import { useState, useMemo, useEffect } from 'react';
import ProductGrid from '@/components/ProductGrid';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/lib/products';
import type { Product } from '@/lib/products';

export type ShopSectionKey =
  | 'new-arrivals'
  | 'women'
  | 'men'
  | 'kids'
  | 'bags'
  | 'footware'
  | 'watches'
  | 'accessories'
  | 'sale';

// All filter logic lives here on the client — no functions passed from server
const SECTION_FILTERS: Record<ShopSectionKey, (p: Product) => boolean> = {
  'new-arrivals': p => p.isNew,
  'women':        p => p.category === "Women's Wear" || p.category === "women's Wear",
  'men':          p => p.category === "Men's Wear",
  'kids':         p => p.category === "Kids's Wear" || p.category === "Kids' Wear",
  'bags':         p => p.category === 'Accessories' && (
                    p.name.toLowerCase().includes('bag') ||
                    p.name.toLowerCase().includes('tote') ||
                    p.name.toLowerCase().includes('clutch') ||
                    p.name.toLowerCase().includes('purse')
                  ),
  'footware':     p => p.category === 'FootWare',
  'watches':      p => p.category === 'Accessories' && (
                    p.name.toLowerCase().includes('watch') ||
                    p.name.toLowerCase().includes('timepiece') ||
                    p.material?.toLowerCase().includes('steel') === true
                  ),
  'accessories':  p => p.category === 'Accessories',
  'sale':         p => p.isSale,
};

interface ShopSectionProps {
  section: ShopSectionKey;
  title: string;
  subtitle?: string;
  emptyMessage?: string;
}

export default function ShopSection({ section, title, subtitle, emptyMessage }: ShopSectionProps) {
  const { addToCart, addToWishlist } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = `${title} — BETUM`;
  }, [title]);

  const products = useMemo(
    () => PRODUCTS.filter(SECTION_FILTERS[section]),
    [section]
  );

  return (
    <>
      {/* Hero strip */}
      <div style={{
        background: 'var(--cream)',
        borderBottom: '1px solid var(--border)',
        padding: '56px 24px 40px',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'var(--font-sans)', fontSize: '10px',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
        }}>
          <span style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
          BETUM Shop
          <span style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
        </div>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 300, lineHeight: 1,
          color: 'var(--charcoal)', marginBottom: '16px',
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '13px',
            color: 'var(--muted)', letterSpacing: '0.05em',
            maxWidth: '480px', margin: '0 auto',
          }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Breadcrumb */}
      <div style={{
        maxWidth: '1400px', margin: '0 auto',
        padding: '14px 24px',
        fontFamily: 'var(--font-sans)', fontSize: '11px',
        color: 'var(--muted)', letterSpacing: '0.05em',
        display: 'flex', gap: '8px', alignItems: 'center',
      }}>
        <a href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Home</a>
        <span>›</span>
        <a href="/#shop" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Shop</a>
        <span>›</span>
        <span style={{ color: 'var(--charcoal)' }}>{title}</span>
      </div>

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '100px 24px', color: 'var(--muted)' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 300, marginBottom: '12px' }}>
            {emptyMessage ?? 'Nothing here yet'}
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', marginBottom: '24px' }}>
            Check back soon — new pieces are added regularly.
          </p>
          <a href="/#shop" style={{
            display: 'inline-block', padding: '12px 32px',
            background: 'var(--charcoal)', color: 'var(--cream)',
            fontFamily: 'var(--font-sans)', fontSize: '11px',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            View All Items
          </a>
        </div>
      ) : (
        <ProductGrid
          products={products}
          searchQuery={searchQuery}
          onAddToCart={addToCart}
          onWishlist={addToWishlist}
        />
      )}
    </>
  );
}