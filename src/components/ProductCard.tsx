'use client';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import type { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  index?: number;
  isActive: boolean;
  onClick: () => void;
  onWishlist?: (p: Product) => void;
}

export default function ProductCard({ product, index = 0, isActive, onClick, onWishlist }: ProductCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={onClick}
      className="product-card"
      style={{
        background: 'var(--warm-white)',
        opacity: 0,
        animation: `fadeInUp 0.6s ease forwards`,
        animationDelay: `${index * 0.07}s`,
        cursor: 'pointer',
        outline: isActive ? '1.5px solid var(--charcoal)' : 'none',
        outlineOffset: '-1px',
        borderRadius: '4px',
        transition: 'outline 0.15s ease',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: 'var(--cream)' }}>
        {!imgLoaded && <div className="shimmer" style={{ position: 'absolute', inset: 0 }} />}
        <img
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          className="product-image"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: imgLoaded ? 1 : 0, display: 'block' }}
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
        />
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {product.isNew && <span className="badge-new">New In</span>}
          {product.isSale && <span className="badge-sale">Sale -{discount}%</span>}
          {!product.inStock && (
            <span style={{ background: 'rgba(26,24,20,0.7)', color: 'var(--cream)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px' }}>Sold</span>
          )}
        </div>
        <button
          onClick={e => { e.stopPropagation(); setWishlisted(!wishlisted); onWishlist?.(product); }}
          style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(253,252,249,0.9)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          aria-label="Add to wishlist"
        >
          <Heart size={14} strokeWidth={1.5} fill={wishlisted ? 'var(--red-accent)' : 'none'} color={wishlisted ? 'var(--red-accent)' : 'var(--charcoal)'} />
        </button>
      </div>
      <div style={{ padding: '16px 4px 8px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '4px' }}>{product.brand}</div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 400, color: 'var(--charcoal)', lineHeight: 1.3, marginBottom: '6px' }}>{product.name}</h3>
        <div style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
          {product.condition} · {product.color}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '15px', fontWeight: 500, color: product.isSale ? 'var(--red-accent)' : 'var(--charcoal)' }}>
            Ksh{product.price.toLocaleString()}
          </span>
          {product.originalPrice && <span className="price-original">Ksh{product.originalPrice.toLocaleString()}</span>}
        </div>
      </div>
    </div>
  );
}