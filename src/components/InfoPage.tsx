'use client';
import PageShell from '@/components/PageShell';
import { ReactNode } from 'react';

interface InfoPageProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function InfoPage({ eyebrow, title, subtitle, children }: InfoPageProps) {
  return (
    <main style={{ flex: 1 }}>
      <PageShell eyebrow={eyebrow} title={title} subtitle={subtitle}>
        <div style={{
          maxWidth: '760px', margin: '0 auto',
          fontFamily: 'var(--font-sans)', fontSize: '15px',
          fontWeight: 300, lineHeight: 1.85, color: 'var(--charcoal)',
        }}>
          {children}
        </div>
      </PageShell>
    </main>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: '48px' }}>
      <h2 style={{
        fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 400,
        color: 'var(--charcoal)', marginBottom: '16px', letterSpacing: '0.01em',
      }}>{title}</h2>
      <div className="divider-gold" style={{ marginBottom: '24px', width: '60px' }} />
      {children}
    </section>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <div style={{
      borderLeft: '2px solid var(--gold)', paddingLeft: '20px',
      margin: '28px 0', color: 'var(--muted)',
      fontFamily: 'var(--font-serif)', fontSize: '18px',
      fontStyle: 'italic', lineHeight: 1.6,
    }}>
      {children}
    </div>
  );
}

export function QA({ q, a }: { q: string; a: string }) {
  return (
    <div style={{ marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid var(--border)' }}>
      <p style={{ fontWeight: 500, fontSize: '15px', marginBottom: '8px', color: 'var(--charcoal)', letterSpacing: '0.02em' }}>{q}</p>
      <p style={{ color: 'var(--muted)', lineHeight: 1.8, margin: 0 }}>{a}</p>
    </div>
  );
}

export function StepCard({ step, title, desc }: { step: number; title: string; desc: string }) {
  return (
    <div style={{
      display: 'flex', gap: '20px', alignItems: 'flex-start',
      padding: '24px', border: '1px solid var(--border)', marginBottom: '16px',
    }}>
      <div style={{
        width: '40px', height: '40px', flexShrink: 0,
        border: '1px solid var(--gold)', color: 'var(--gold)',
        fontFamily: 'var(--font-serif)', fontSize: '18px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{step}</div>
      <div>
        <p style={{ fontWeight: 500, fontSize: '15px', marginBottom: '6px', color: 'var(--charcoal)' }}>{title}</p>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7, margin: 0, fontSize: '14px' }}>{desc}</p>
      </div>
    </div>
  );
}