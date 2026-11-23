import { NextRequest, NextResponse } from 'next/server';

async function getDarajaToken(): Promise<string> {
  const credentials = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString('base64');
  const res = await fetch(
    `https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials`,
    { headers: { Authorization: `Basic ${credentials}` } }
  );
  const data = await res.json();
  return data.access_token;
}

export async function POST(req: NextRequest) {
  const { checkoutRequestId } = await req.json();

  if (!checkoutRequestId) {
    return NextResponse.json({ error: 'Missing checkoutRequestId' }, { status: 400 });
  }

  try {
    const token = await getDarajaToken();
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString('base64');

    const res = await fetch('https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId,
      }),
    });

    const data = await res.json();

    // ResultCode 0 = success, 1032 = cancelled, 1037 = timeout
    return NextResponse.json({
      resultCode: data.ResultCode,
      resultDesc: data.ResultDesc,
      paid: data.ResultCode === '0',
      cancelled: data.ResultCode === '1032',
    });

  } catch (err) {
    return NextResponse.json({ error: 'Status check failed' }, { status: 500 });
  }
}