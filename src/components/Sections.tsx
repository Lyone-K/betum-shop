'use client';
import { ShieldCheck, RotateCcw, CreditCard, Award, Truck, Star } from 'lucide-react';

const BRANDS = ['Denim', 'Louis Vuitton', 'Gucci', 'Adidas', 'Puma', 'Denri', 'Dior', 'Kitenge', 'Official Wear', 'Nike'];

const FEATURES = [
  {
    icon: <ShieldCheck size={22} strokeWidth={1.2} />,
    title: 'Our Guarantee',
    desc: 'At BETUM, we are committed to creating a safe and reliable marketplace for buyers and sellers.',
  },
  {
    icon: <RotateCcw size={22} strokeWidth={1.2} />,
    title: 'Free Returns',
    desc: 'Shop with confidence. Return any item within 8 days for a full refund, no questions asked.',
  },
  {
    icon: <CreditCard size={22} strokeWidth={1.2} />,
    title: 'Secure Payments',
    desc: 'All transactions are encrypted with bank-level security. We accept M-Pesa payments only at the moment.',
  },
  {
    icon: <Truck size={22} strokeWidth={1.2} />,
    title: 'Countrywide Shipping',
    desc: 'Free express delivery on orders over 15,000. Insured packaging for every luxury piece.',
  },
];

export function BrandStrip() {
  const repeated = [...BRANDS, ...BRANDS];
  return (
    <div style={{
      borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
      padding: '20px 0', background: 'var(--cream)', overflow: 'hidden',
    }}>
      <div className="animate-marquee" style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
        {repeated.map((brand, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '24px' }}>
            <span style={{
              fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 400,
              letterSpacing: '0.08em', color: 'var(--charcoal)', padding: '0 32px',
              opacity: 0.7,
            }}>
              {brand}
            </span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--gold)', display: 'inline-block', flexShrink: 0 }} />
          </span>
        ))}
      </div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section style={{ background: 'var(--charcoal)', padding: '72px 24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            fontFamily: 'var(--font-sans)', fontSize: '10px',
            letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)',
            marginBottom: '12px',
          }}>
            The BETUM Promise
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 300, color: 'var(--cream)', letterSpacing: '-0.01em',
          }}>
            Shop with Confidence
          </h2>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2px',
        }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              padding: '40px 32px',
              borderRight: i < FEATURES.length - 1 ? '1px solid rgba(248,245,240,0.08)' : 'none',
              textAlign: 'center',
            }}>
              <div style={{ color: 'var(--gold)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                {f.icon}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 400,
                color: 'var(--cream)', marginBottom: '12px', letterSpacing: '0.01em',
              }}>
                {f.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 300,
                color: 'rgba(248,245,240,0.55)', lineHeight: 1.7,
              }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const reviews = [
    { name: 'Amira K.', location: 'Nakuru', rating: 5, text: 'Bought a Hoodie and it arrived perfectly packaged. BETUM is my go-to for pre-owned luxury.', item: 'Hoodie' },
    { name: 'Sophie L.', location: 'Mombasa', rating: 5, text: 'The condition grading is very accurate. My Dress arrived exactly as described — in excellent condition. Exceptional service.', item: 'Dress' },
    { name: 'Fatima R.', location: 'Nairobi', rating: 5, text: 'Fast shipping around Nairobi, beautifully wrapped. The Heels are stunning and authentic. Will shop again!', item: 'Heels' },
  ];

  return (
    <section style={{ padding: '80px 24px', background: 'var(--cream)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            fontFamily: 'var(--font-sans)', fontSize: '10px',
            letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)',
            marginBottom: '12px',
          }}>
            Customer Stories
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 300, color: 'var(--charcoal)',
          }}>
            What Our Clients Say
          </h2>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px',
        }}>
          {reviews.map((r, i) => (
            <div key={i} style={{
              background: 'var(--warm-white)', padding: '36px 32px',
              borderTop: '2px solid var(--gold)',
              opacity: 0, animation: `fadeInUp 0.6s ease forwards`,
              animationDelay: `${i * 0.15}s`,
            }}>
              <div style={{ display: 'flex', gap: '2px', marginBottom: '16px' }}>
                {Array(r.rating).fill(0).map((_, j) => (
                  <Star key={j} size={13} fill="var(--gold)" color="var(--gold)" />
                ))}
              </div>
              <p style={{
                fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 300,
                color: 'var(--charcoal)', lineHeight: 1.65, marginBottom: '20px',
                fontStyle: 'italic',
              }}>
                "{r.text}"
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 500, color: 'var(--charcoal)' }}>
                    {r.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.05em' }}>
                    {r.location}
                  </div>
                </div>
                <div style={{
                  fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.08em',
                  color: 'var(--gold)', textTransform: 'uppercase',
                }}>
                  {r.item}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NewsletterSection() {
  return (
    <section id="sell" style={{ padding: '80px 24px', background: 'var(--warm-white)', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{
          fontFamily: 'var(--font-sans)', fontSize: '10px',
          letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)',
          marginBottom: '12px',
        }}>
          Stay Connected
        </div>
        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 300, color: 'var(--charcoal)', marginBottom: '16px',
        }}>
          New Arrivals. First.
        </h2>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 300,
          color: 'var(--muted)', lineHeight: 1.7, marginBottom: '36px',
        }}>
          Join our curated mailing list and be first to discover new luxury arrivals, exclusive offers, and style insights.
        </p>
        <div style={{ display: 'flex', gap: '0', maxWidth: '440px', margin: '0 auto' }}>
          <input
            type="email"
            placeholder="Your email address"
            style={{
              flex: 1, border: '1px solid var(--border)', borderRight: 'none',
              padding: '14px 20px', fontFamily: 'var(--font-sans)', fontSize: '13px',
              background: 'var(--cream)', outline: 'none', color: 'var(--charcoal)',
            }}
          />
          <button className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
            Subscribe
          </button>
        </div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--muted)', marginTop: '12px', letterSpacing: '0.03em' }}>
          Unsubscribe anytime. No spam, ever.
        </p>
      </div>
    </section>
  );
}