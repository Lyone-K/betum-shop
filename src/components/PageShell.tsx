'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ReactNode } from 'react';

interface PageShellProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** dark hero band behind the title */
  dark?: boolean;
}

export default function PageShell({ eyebrow, title, subtitle, children, dark = true }: PageShellProps) {
  return (
  <div style={{ background: 'var(--warm-white)' }}>
      {/* Hero band */}
      <div style={{
        background: dark ? 'var(--charcoal)' : 'var(--cream)',
        padding: '64px 24px 56px',
        textAlign: 'center',
      }}>
        {eyebrow && (
          <div style={{
            fontFamily: 'var(--font-sans)', fontSize: '10px',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
          }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
            {eyebrow}
            <span style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
          </div>
        )}
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: 300,
          color: dark ? 'var(--cream)' : 'var(--charcoal)',
          letterSpacing: '-0.01em',
          lineHeight: 1.05,
          marginBottom: subtitle ? '16px' : 0,
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 300,
            color: dark ? 'rgba(248,245,240,0.6)' : 'var(--muted)',
            maxWidth: '560px', margin: '0 auto', lineHeight: 1.7,
          }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Back link */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 24px 0' }}>
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          fontFamily: 'var(--font-sans)', fontSize: '11px',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--muted)', textDecoration: 'none',
          transition: 'color 0.2s ease',
        }}>
          <ArrowLeft size={13} strokeWidth={1.5} /> Back to Shop
        </Link>
      </div>

      {/* Page body */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 80px' }}>
        {children}
      </div>
    </div>
  );
}