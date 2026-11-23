'use client';
import { useState } from 'react';
import { X } from 'lucide-react';

const messages = [
  'Affordable Countrywide shipping on all orders',
  'All items authenticated by luxury experts',
  'New arrivals added daily — Shop the latest',
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);

  if (!visible) return null;

  return (
    <div
      className="announcement-bar"
      style={{
        background: 'var(--charcoal)',
        color: 'var(--cream)',
        fontSize: '11px',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <button
          onClick={() => setIdx((i) => (i - 1 + messages.length) % messages.length)}
          style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '16px', padding: 0, lineHeight: 1 }}
          aria-label="Previous"
        >‹</button>
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}>{messages[idx]}</span>
        <button
          onClick={() => setIdx((i) => (i + 1) % messages.length)}
          style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '16px', padding: 0, lineHeight: 1 }}
          aria-label="Next"
        >›</button>
      </div>
      <button
        onClick={() => setVisible(false)}
        style={{
          position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: 0,
        }}
        aria-label="Close"
      >
        <X size={13} />
      </button>
    </div>
  );
}