import { NextRequest, NextResponse } from 'next/server';

const DARAJA_BASE = 'https://api.safaricom.co.ke'; // use sandbox: https://sandbox.safaricom.co.ke

// Rate limiting store (use Redis in production)
const attempts = new Map<string, { count: number; firstAttempt: number }>();

function rateLimit(key: string, maxAttempts = 3, windowMs = 60_000): boolean {
  const now = Date.now();
  const record = attempts.get(key);
  if (!record || now - record.firstAttempt > windowMs) {
    attempts.set(key, { count: 1, firstAttempt: now });
    return true;
  }
  if (record.count >= maxAttempts) return false;
  record.count++;
  return true;
}

async function getDarajaToken(): Promise<string> {
  const credentials = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString('base64');

  const res = await fetch(`${DARAJA_BASE}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${credentials}` },
  });

  if (!res.ok) throw new Error('Failed to get M-Pesa token');
  const data = await res.json();
  return data.access_token;
}

function validatePhoneNumber(phone: string): string | null {
  // Normalize: accept 07xx, 01xx, +2547xx, 2547xx
  const cleaned = phone.replace(/\s+/g, '').replace(/^\+/, '');
  if (/^0[17]\d{8}$/.test(phone)) {
    return '254' + phone.slice(1);
  }
  if (/^254[17]\d{8}$/.test(cleaned)) {
    return cleaned;
  }
  return null;
}

function validateAmount(amount: number, expectedAmount: number): boolean {
  // Reject if amount differs from cart total by more than 1 shilling (rounding)
  return Math.abs(amount - expectedAmount) <= 1;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
    const body = await req.json();
    const { phone, amount, orderId, cartTotal, items } = body;

    // ── FRAUD CHECKS ──────────────────────────────────────────

    // 1. Rate limiting — max 3 attempts per IP per minute
    if (!rateLimit(`ip:${ip}`)) {
      return NextResponse.json(
        { error: 'Too many payment attempts. Please wait a moment and try again.' },
        { status: 429 }
      );
    }

    // 2. Rate limiting per phone number
    if (phone && !rateLimit(`phone:${phone}`)) {
      return NextResponse.json(
        { error: 'Too many attempts from this number. Please wait.' },
        { status: 429 }
      );
    }

    // 3. Validate phone number format
    const normalizedPhone = validatePhoneNumber(phone);
    if (!normalizedPhone) {
      return NextResponse.json(
        { error: 'Invalid phone number. Use format 07XXXXXXXX or 01XXXXXXXX.' },
        { status: 400 }
      );
    }

    // 4. Validate amount matches server-side cart total
    // In production: recompute cart total from your DB using orderId
    if (!amount || amount < 1) {
      return NextResponse.json({ error: 'Invalid payment amount.' }, { status: 400 });
    }

    if (!validateAmount(amount, cartTotal)) {
      // Someone tampered with the amount in the request
      console.warn(`FRAUD ALERT: Amount mismatch. Sent: ${amount}, Expected: ${cartTotal}, IP: ${ip}`);
      return NextResponse.json(
        { error: 'Payment amount does not match order total.' },
        { status: 400 }
      );
    }

    // 5. Minimum amount check
    if (amount < 10) {
      return NextResponse.json({ error: 'Minimum payment amount is KES 10.' }, { status: 400 });
    }

    // 6. Validate items exist (prevent phantom orders)
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items in order.' }, { status: 400 });
    }

    // 7. Recompute total from items server-side to prevent price tampering
    // In production: look up prices from your DB, never trust client prices
    const computedTotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0
    );
    if (!validateAmount(amount, computedTotal)) {
      console.warn(`FRAUD ALERT: Price tampering detected. IP: ${ip}, Items total: ${computedTotal}, Claimed: ${amount}`);
      return NextResponse.json(
        { error: 'Order total mismatch. Please refresh and try again.' },
        { status: 400 }
      );
    }

    // ── INITIATE STK PUSH ─────────────────────────────────────

    const token = await getDarajaToken();
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString('base64');

    const stkRes = await fetch(`${DARAJA_BASE}/mpesa/stkpush/v1/processrequest`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.ceil(amount), // always round up, never down
        PartyA: normalizedPhone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: normalizedPhone,
        CallBackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/mpesa/callback`,
        AccountReference: orderId ?? 'BETUM-ORDER',
        TransactionDesc: `BETUM Order ${orderId}`,
      }),
    });

    const stkData = await stkRes.json();

    if (stkData.ResponseCode !== '0') {
      return NextResponse.json(
        { error: stkData.errorMessage ?? 'M-Pesa request failed. Please try again.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      checkoutRequestId: stkData.CheckoutRequestID,
      message: 'M-Pesa prompt sent to your phone. Enter your PIN to complete payment.',
    });

  } catch (err) {
    console.error('M-Pesa initiate error:', err);
    return NextResponse.json({ error: 'Payment service unavailable. Please try again.' }, { status: 500 });
  }
}