'use client';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const SLIDES = [
    {
    headline: 'Women’s Wear',
    sub: 'Bodycon · Crop tops · Two-piece sets',
    body: 'BETUM women’s collection blends comfort, elegance and bold expression.',
    cta: 'Explore women’s collection',
    href: '#shop',
    accent: 'Confidence in Every Outfit',
    image: 'https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    align: 'right',
  },
  
  {
    headline: 'Men’S Wear',
    sub: 'Hoodies · T-shirts · Jeans',
    body: 'From laid-back casual to sharp fits, BETUM delivers effortless fashion for the modern man.',
    cta: 'Explore men’s collection',
    href: '#shop',
    accent: 'Clean. Confident. Timeless.',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    align: 'right',
  },

    {
    headline: 'Kids’ Wear',
    sub: 'Shorts & Joggers · Cartoon T-shirts · Dresses',
    body: 'Bright, playful, and made for movement—our kids’ collection brings comfort and fun together.',
    cta: 'Explore kids’ collection',
    href: '#shop',
    accent: 'Little Styles, Big Smiles',
    image: 'https://images.unsplash.com/photo-1622218286192-95f6a20083c7?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    align: 'right',
  },

    {
    headline: 'FootWear',
    sub: 'Boots · Sneakers · Loafers',
    body: 'Complete your look with footwear that combines comfort, durability, and trend.',
    cta: 'Explore footwear collection',
    href: '#shop',
    accent: 'Step Into Style',
    image: 'https://images.unsplash.com/photo-1560906977-d266eff65a1f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    align: 'right',
  },

  {
    headline: 'New Arrivals',
    sub: 'Just In',
    body: 'Discover freshly authenticated pre-owned luxury — bags, shoes, watches & accessories curated for the discerning collector.',
    cta: 'Shop New In',
    href: '#shop',
    accent: 'Luxury 2026',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=85',
    align: 'left',
  },
  {
    headline: 'Timeless Accessories',
    sub: 'Fine Horology',
    body: 'It’s the little details that define your style. Discover accessories that elevate every outfit, from bold statements to subtle essentials.',
    cta: 'View Accessories',
    href: '#shop',
    accent: 'The Finishing Touch',
    image: 'https://images.unsplash.com/photo-1609587312208-cea54be969e7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    align: 'left',
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slide = SLIDES[current];

  return (
    <section
      style={{
        position: 'relative', width: '100%', height: 'min(90vh, 720px)',
        overflow: 'hidden', background: 'var(--charcoal)',
      }}
      aria-label="Featured collection"
    >
      {/* Background image */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${s.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1.2s ease',
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: slide.align === 'left'
          ? 'linear-gradient(100deg, rgba(26,24,20,0.82) 0%, rgba(26,24,20,0.4) 60%, transparent 100%)'
          : 'linear-gradient(260deg, rgba(26,24,20,0.82) 0%, rgba(26,24,20,0.4) 60%, transparent 100%)',
        transition: 'background 1s ease',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0,
        maxWidth: '1400px', margin: '0 auto',
        display: 'flex', alignItems: 'center',
        padding: '0 48px',
        justifyContent: slide.align === 'right' ? 'flex-end' : 'flex-start',
      }}>
        <div
          style={{
            maxWidth: '540px',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease',
          }}
          key={current}
        >
          {/* Eyebrow */}
          <div style={{
            fontFamily: 'var(--font-sans)', fontSize: '10px',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: '16px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <span style={{ width: '32px', height: '1px', background: 'var(--gold)', display: 'inline-block' }} />
            {slide.accent}
          </div>

          {/* Sub */}
          <div style={{
            fontFamily: 'var(--font-sans)', fontSize: '11px',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(248,245,240,0.7)', marginBottom: '12px',
          }}>{slide.sub}</div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(48px, 7vw, 84px)',
            fontWeight: 300, color: 'var(--cream)',
            lineHeight: 1.0, letterSpacing: '-0.01em',
            marginBottom: '24px',
          }}>
            {slide.headline}
          </h1>

          {/* Body */}
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 300,
            color: 'rgba(248,245,240,0.75)', lineHeight: 1.7,
            marginBottom: '40px', maxWidth: '400px',
          }}>
            {slide.body}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href={slide.href}
              className="btn-primary"
              style={{
                background: 'var(--gold)', borderColor: 'var(--gold)',
                color: 'white', textDecoration: 'none',
              }}
            >
              {slide.cta} <ArrowRight size={14} />
            </a>
            <a
              href="#"
              className="btn-outline"
              style={{ borderColor: 'rgba(248,245,240,0.4)', color: 'var(--cream)', textDecoration: 'none' }}
            >
              How It Works
            </a>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '8px',
      }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? '32px' : '8px',
              height: '2px',
              background: i === current ? 'var(--gold)' : 'rgba(248,245,240,0.4)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.4s ease',
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Trust badges */}
      <div style={{
        position: 'absolute', bottom: '32px', right: '48px',
        display: 'flex', gap: '24px',
      }} className="hide-mobile">
        {['100% Authenticated', 'Free Returns', 'Secure Checkout'].map((badge) => (
          <div key={badge} style={{
            fontFamily: 'var(--font-sans)', fontSize: '10px',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'rgba(248,245,240,0.6)',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
            {badge}
          </div>
        ))}
      </div>
    </section>
  );
}