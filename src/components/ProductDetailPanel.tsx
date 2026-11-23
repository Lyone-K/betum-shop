'use client';
import { useState } from 'react';
import { X } from 'lucide-react';
import type { Product } from '@/lib/products';
import { useCart } from '@/context/CartContext';


const COLOR_MAP: Record<string, string> = {
  black: '#1a1a1a', white: '#f0f0f0', blue: '#4a6fa5', navy: '#1b2a4a',
  red: '#c0392b', green: '#27ae60', grey: '#9e9e9e', gray: '#9e9e9e',
  brown: '#7b4f2e', camel: '#c19a6b', pink: '#e8a0a8', gold: '#c8a030',
  silver: '#aaaaaa', nude: '#d4a98a', natural: '#c8a96e',
};
const getHex = (name: string) => COLOR_MAP[name.toLowerCase()] ?? '#cccccc';

interface Props {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product, size: string, color: string) => void;
}

export default function ProductDetailPanel({ product, onClose, onAddToCart }: Props) {
  const { addToCart } = useCart();
  const sizes = product.size?.split(',').map(s => s.trim()).filter(Boolean) ?? [];
  const colors = product.color?.split(',').map(c => c.trim()).filter(Boolean) ?? [];

  const hasSizes = sizes.length > 1;
  const hasColors = colors.length > 1;

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ size?: boolean; color?: boolean }>({});

  const isReady = (!hasSizes || selectedSize) && (!hasColors || selectedColor);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  function handleAdd() {
    const errs: { size?: boolean; color?: boolean } = {};
    if (hasSizes && !selectedSize) errs.size = true;
    if (hasColors && !selectedColor) errs.color = true;
    if (Object.keys(errs).length) { setErrors(errs); return; }
    addToCart(product, selectedSize ?? '', selectedColor ?? colors[0] ?? '');
    onClose();
  }

  const btnLabel = !isReady
    ? (!selectedColor && hasColors && !selectedSize && hasSizes)
      ? 'Select options'
      : (!selectedColor && hasColors) ? 'Select a color' : 'Select a size'
    : 'Add to Cart';

  return (
    <div style={{
      background: 'var(--warm-white)',
      border: '1.5px solid var(--charcoal)',
      borderTop: 'none',
      borderRadius: '0 0 12px 12px',
      padding: '24px',
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      gap: '24px',
      animation: 'slideDown 0.3s ease',
    }}>
      <style>{`@keyframes slideDown { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }`}</style>

      {/* Left: image */}
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '8px', display: 'block' }}
      />

      {/* Right: details */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 0, right: 0, background: 'var(--cream)', border: 'none', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          aria-label="Close"
        >
          <X size={14} />
        </button>

        <div style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '4px' }}>{product.brand}</div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 400, color: 'var(--charcoal)', marginBottom: '8px' }}>{product.name}</h2>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '3px', background: 'var(--cream)', color: 'var(--muted)', border: '1px solid var(--muted)' }}>{product.condition}</span>
          {product.material && <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '3px', background: 'var(--cream)', color: 'var(--muted)', border: '1px solid var(--muted)' }}>{product.material}</span>}
          {product.year && <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '3px', background: 'var(--cream)', color: 'var(--muted)', border: '1px solid var(--muted)' }}>{product.year}</span>}
        </div>

        <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '14px' }}>{product.description}</p>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '18px' }}>
          <span style={{ fontSize: '20px', fontWeight: 500, color: product.isSale ? 'var(--red-accent)' : 'var(--charcoal)' }}>
            Ksh{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span style={{ fontSize: '14px', color: 'var(--muted)', textDecoration: 'line-through' }}>
              Ksh{product.originalPrice.toLocaleString()} &nbsp;
              <span style={{ color: 'var(--red-accent)', textDecoration: 'none' }}>-{discount}%</span>
            </span>
          )}
        </div>

        {/* Color selector */}
        {hasColors && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
              <span style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                Color {selectedColor && <strong style={{ color: 'var(--charcoal)', textTransform: 'none' }}>— {selectedColor}</strong>}
              </span>
              {errors.color && <span style={{ fontSize: '11px', color: 'var(--red-accent)' }}>Pick a color</span>}
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {colors.map(color => (
                <div key={color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <button
                    onClick={() => { setSelectedColor(selectedColor === color ? null : color); setErrors(e => ({ ...e, color: false })); }}
                    aria-label={`Color: ${color}`}
                    style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: getHex(color), border: 'none', cursor: 'pointer',
                      outline: selectedColor === color ? '2.5px solid var(--charcoal)' : '1.5px solid rgba(0,0,0,0.15)',
                      outlineOffset: '2px',
                      transform: selectedColor === color ? 'scale(1.15)' : 'scale(1)',
                      transition: 'all 0.15s ease',
                    }}
                  />
                  <span style={{ fontSize: '9px', color: 'var(--muted)', textTransform: 'capitalize' }}>{color}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Size selector */}
        {hasSizes && (
          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
              <span style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                Size {selectedSize && <strong style={{ color: 'var(--charcoal)', textTransform: 'none' }}>— {selectedSize}</strong>}
              </span>
              {errors.size && <span style={{ fontSize: '11px', color: 'var(--red-accent)' }}>Pick a size</span>}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => { setSelectedSize(selectedSize === size ? null : size); setErrors(e => ({ ...e, size: false })); }}
                  style={{
                    padding: '6px 14px', fontSize: '12px',
                    border: selectedSize === size ? '1.5px solid var(--charcoal)' : '1px solid var(--muted)',
                    borderRadius: '4px',
                    background: selectedSize === size ? 'var(--charcoal)' : 'transparent',
                    color: selectedSize === size ? 'var(--warm-white)' : 'var(--charcoal)',
                    cursor: 'pointer', fontFamily: 'var(--font-sans)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to cart */}
        {product.inStock ? (
          <button
            onClick={handleAdd}
            style={{
              width: '100%', padding: '12px', fontSize: '13px', fontWeight: 500,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              fontFamily: 'var(--font-sans)', borderRadius: '4px',
              border: '1px solid var(--charcoal)', cursor: isReady ? 'pointer' : 'default',
              background: isReady ? 'var(--charcoal)' : 'transparent',
              color: isReady ? 'var(--warm-white)' : 'var(--charcoal)',
              transition: 'all 0.2s ease',
            }}
          >
            {btnLabel}
          </button>
        ) : (
          <button disabled style={{ width: '100%', padding: '12px', opacity: 0.4, cursor: 'not-allowed', border: '1px solid var(--muted)', borderRadius: '4px', background: 'transparent' }}>
            Out of stock
          </button>
        )}
      </div>
    </div>
  );
}