'use client';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Phone, Shield, CheckCircle, XCircle, Loader, AlertTriangle, X, Lock } from 'lucide-react';

type Stage = 'form' | 'pending' | 'success' | 'failed';

interface CheckoutProps {
  onBack: () => void;
}

export default function CheckoutDrawer({ onBack }: CheckoutProps) {
  const { items, clearCart } = useCart();
  const [phone, setPhone] = useState('');
  const [stage, setStage] = useState<Stage>('form');
  const [error, setError] = useState('');
  const [checkoutRequestId, setCheckoutRequestId] = useState('');
  const [pollCount, setPollCount] = useState(0);
  const [receiptInfo, setReceiptInfo] = useState('');

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const orderId = `BETUM-${Date.now()}`;

  // Poll for payment status every 3 seconds after STK push
  useEffect(() => {
    if (stage !== 'pending' || !checkoutRequestId) return;
    if (pollCount >= 20) { // 60 seconds timeout
      setStage('failed');
      setError('Payment timed out. Please try again.');
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch('/api/mpesa/status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ checkoutRequestId }),
        });
        const data = await res.json();

        if (data.paid) {
          setReceiptInfo(data.mpesaReceiptNumber ?? '');
          setStage('success');
          clearCart();
        } else if (data.cancelled) {
          setStage('failed');
          setError('Payment was cancelled. Please try again.');
        } else {
          setPollCount(c => c + 1);
        }
      } catch {
        setPollCount(c => c + 1);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [stage, checkoutRequestId, pollCount, clearCart]);

  async function handleSubmit() {
    setError('');

    // Client-side phone validation
    const cleaned = phone.replace(/\s+/g, '');
    if (!/^(07|01)\d{8}$/.test(cleaned)) {
      setError('Enter a valid Safaricom number (07XXXXXXXX or 01XXXXXXXX)');
      return;
    }

    setStage('pending');
    setPollCount(0);

    try {
      const res = await fetch('/api/mpesa/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: cleaned,
          amount: subtotal,
          orderId,
          cartTotal: subtotal,
          // Send item prices so server can recompute and verify
          items: items.map(i => ({
            id: i.product.id,
            price: i.product.price,
            quantity: i.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStage('form');
        setError(data.error ?? 'Payment failed. Please try again.');
        return;
      }

      setCheckoutRequestId(data.checkoutRequestId);

    } catch {
      setStage('form');
      setError('Network error. Please check your connection and try again.');
    }
  }

  // ── STAGES ──────────────────────────────────────────────────

  if (stage === 'success') {
    return (
      <div style={{ padding: '40px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckCircle size={32} color="#27ae60" strokeWidth={1.5} />
        </div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 300, color: 'var(--charcoal)' }}>Payment Confirmed</h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>
          Your M-Pesa payment of <strong style={{ color: 'var(--charcoal)' }}>Ksh{subtotal.toLocaleString()}</strong> was received successfully.
        </p>
        {receiptInfo && (
          <div style={{ background: 'var(--cream)', padding: '12px 20px', borderRadius: '4px', fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--charcoal)', letterSpacing: '0.05em' }}>
            Receipt: <strong>{receiptInfo}</strong>
          </div>
        )}
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--muted)' }}>
          Order <strong>{orderId}</strong> — you will receive an SMS confirmation shortly.
        </p>
      </div>
    );
  }

  if (stage === 'failed') {
    return (
      <div style={{ padding: '40px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fdecea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <XCircle size={32} color="var(--red-accent)" strokeWidth={1.5} />
        </div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 300, color: 'var(--charcoal)' }}>Payment Failed</h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>{error}</p>
        <button
          onClick={() => { setStage('form'); setError(''); }}
          style={{ padding: '12px 32px', background: 'var(--charcoal)', color: 'var(--cream)', fontFamily: 'var(--font-sans)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', borderRadius: '2px' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (stage === 'pending') {
    return (
      <div style={{ padding: '40px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Loader size={28} color="var(--charcoal)" strokeWidth={1.5} style={{ animation: 'spin 1s linear infinite' }} />
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 300, color: 'var(--charcoal)' }}>Waiting for Payment</h2>
        <div style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px 20px', maxWidth: '280px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--charcoal)', lineHeight: 1.7, margin: 0 }}>
            An M-Pesa prompt has been sent to <strong>{phone}</strong>.<br /><br />
            Enter your <strong>M-Pesa PIN</strong> on your phone to complete the payment of <strong>Ksh{subtotal.toLocaleString()}</strong>.
          </p>
        </div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.04em' }}>
          Checking payment status... ({Math.floor((20 - pollCount) * 3)}s remaining)
        </p>
        <button
          onClick={() => { setStage('form'); setError(''); }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--muted)', textDecoration: 'underline', letterSpacing: '0.05em' }}
        >
          Cancel
        </button>
      </div>
    );
  }

  // ── FORM ────────────────────────────────────────────────────
  return (
    <div style={{ padding: '24px' }}>
      {/* Back */}
      <button
        onClick={onBack}
        style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '24px', padding: 0 }}
      >
        ← Back to Bag
      </button>

      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 300, color: 'var(--charcoal)', marginBottom: '6px' }}>Checkout</h2>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--muted)', marginBottom: '24px' }}>Pay securely via M-Pesa</p>

      {/* Order summary */}
      <div style={{ background: 'var(--cream)', borderRadius: '6px', padding: '16px', marginBottom: '24px' }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '10px' }}>Order Summary</div>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--charcoal)' }}>
              {item.product.name}
              {item.size && ` · ${item.size}`}
              {item.color && ` · ${item.color}`}
              {item.quantity > 1 && ` × ${item.quantity}`}
            </span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--charcoal)', fontWeight: 500 }}>
              Ksh{(item.product.price * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--border)', marginTop: '10px', paddingTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', color: 'var(--charcoal)' }}>Total</span>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--charcoal)', fontWeight: 400 }}>Ksh{subtotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Phone input */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--charcoal)', marginBottom: '8px' }}>
          M-Pesa Phone Number
        </label>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Phone size={14} color="var(--muted)" strokeWidth={1.5} style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }} />
          <input
            type="tel"
            value={phone}
            onChange={e => { setPhone(e.target.value); setError(''); }}
            placeholder="07XXXXXXXX"
            maxLength={12}
            style={{
              width: '100%', padding: '12px 12px 12px 36px',
              fontFamily: 'var(--font-sans)', fontSize: '15px',
              border: `1px solid ${error ? 'var(--red-accent)' : 'var(--border)'}`,
              borderRadius: '4px', background: 'var(--warm-white)',
              color: 'var(--charcoal)', outline: 'none',
              letterSpacing: '0.05em',
            }}
          />
        </div>
        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
            <AlertTriangle size={12} color="var(--red-accent)" />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--red-accent)' }}>{error}</span>
          </div>
        )}
      </div>

      {/* Security badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: '#e8f5e9', borderRadius: '4px', marginBottom: '20px' }}>
        <Shield size={14} color="#27ae60" strokeWidth={1.5} />
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#1a6b2e', lineHeight: 1.5 }}>
          Payments are verified end-to-end. You will receive an M-Pesa PIN prompt directly from Safaricom — never share your PIN with anyone.
        </span>
      </div>

      {/* Pay button */}
      <button
        onClick={handleSubmit}
        disabled={!phone}
        style={{
          width: '100%', padding: '14px',
          background: phone ? '#27ae60' : 'var(--muted)',
          color: 'white', fontFamily: 'var(--font-sans)',
          fontSize: '13px', fontWeight: 500,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          border: 'none', cursor: phone ? 'pointer' : 'not-allowed',
          borderRadius: '4px', transition: 'all 0.2s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        }}
      >
        <Lock size={14} strokeWidth={2} />
        Pay Ksh{subtotal.toLocaleString()} via M-Pesa
      </button>

      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: 'var(--muted)', textAlign: 'center', marginTop: '12px', lineHeight: 1.6 }}>
        By paying you agree to our terms. Transactions are monitored for fraud protection.
      </p>
    </div>
  );
}