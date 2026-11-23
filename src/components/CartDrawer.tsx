'use client';
import { useCart } from '@/context/CartContext';
import CheckoutDrawer from './CheckoutDrawer';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export default function CartDrawer() {
  const [view, setView] = useState<'cart' | 'checkout'>('cart');
  const { items, cartOpen, closeCart, removeFromCart, updateQuantity, clearCart } = useCart();

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  // Reset to cart view when drawer closes
  function handleClose() {
    closeCart();
    setTimeout(() => setView('cart'), 400); // after slide-out animation
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          zIndex: 1200, opacity: cartOpen ? 1 : 0,
          pointerEvents: cartOpen ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(420px, 95vw)',
        background: 'var(--warm-white)',
        zIndex: 1300,
        transform: cartOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex', flexDirection: 'column',
        overflowY: 'auto',
      }}>

        {/* ── CHECKOUT VIEW ── */}
        {view === 'checkout' ? (
          <CheckoutDrawer onBack={() => setView('cart')} />
        ) : (
          <>
            {/* ── CART VIEW ── */}

            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '24px 24px 20px',
              borderBottom: '1px solid var(--border)',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShoppingBag size={18} strokeWidth={1.5} color="var(--charcoal)" />
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 400, color: 'var(--charcoal)' }}>
                  Your Bag
                </span>
                {items.length > 0 && (
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.05em' }}>
                    ({items.reduce((s, i) => s + i.quantity, 0)} items)
                  </span>
                )}
              </div>
              <button
                onClick={handleClose}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--charcoal)' }}
                aria-label="Close cart"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
              {items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <ShoppingBag size={40} strokeWidth={1} color="var(--muted)" style={{ margin: '0 auto 16px' }} />
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 300, color: 'var(--charcoal)', marginBottom: '8px' }}>
                    Your bag is empty
                  </p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--muted)' }}>
                    Add items to get started
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {items.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.size}-${item.color}-${idx}`}
                      style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '14px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        style={{ width: '80px', height: '100px', objectFit: 'cover', display: 'block' }}
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '2px' }}>
                              {item.product.brand}
                            </div>
                            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 400, color: 'var(--charcoal)', lineHeight: 1.3 }}>
                              {item.product.name}
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: '2px', flexShrink: 0 }}
                            aria-label="Remove item"
                          >
                            <X size={14} strokeWidth={1.5} />
                          </button>
                        </div>

                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '2px' }}>
                          {item.color && (
                            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '2px 8px', border: '1px solid var(--border)', borderRadius: '2px' }}>
                              {item.color}
                            </span>
                          )}
                          {item.size && (
                            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '2px 8px', border: '1px solid var(--border)', borderRadius: '2px' }}>
                              {item.size}
                            </span>
                          )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '2px' }}>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--charcoal)' }}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} strokeWidth={1.5} />
                            </button>
                            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--charcoal)', minWidth: '24px', textAlign: 'center' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--charcoal)' }}
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} strokeWidth={1.5} />
                            </button>
                          </div>
                          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 500, color: 'var(--charcoal)' }}>
                            Ksh{(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border)', background: 'var(--warm-white)', flexShrink: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Subtotal</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.05em' }}>excl. shipping</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 300, color: 'var(--charcoal)' }}>
                    Ksh{subtotal.toLocaleString()}
                  </span>
                </div>

                {/* ← THE FIX: onClick now switches to checkout view */}
                <button
                  onClick={() => setView('checkout')}
                  style={{
                    width: '100%', padding: '14px',
                    background: 'var(--charcoal)', color: 'var(--cream)',
                    fontFamily: 'var(--font-sans)', fontSize: '12px',
                    fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase',
                    border: 'none', cursor: 'pointer', marginBottom: '10px',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseOver={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseOut={e => (e.currentTarget.style.opacity = '1')}
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={clearCart}
                  style={{
                    width: '100%', padding: '11px',
                    background: 'transparent', color: 'var(--muted)',
                    fontFamily: 'var(--font-sans)', fontSize: '11px',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    border: '1px solid var(--border)', cursor: 'pointer',
                  }}
                >
                  Clear Bag
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}