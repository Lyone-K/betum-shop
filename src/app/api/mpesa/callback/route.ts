import { NextRequest, NextResponse } from 'next/server';

// Safaricom's callback IPs — whitelist these in production
const SAFARICOM_IPS = [
  '196.201.214.200', '196.201.214.206', '196.201.213.114',
  '196.201.214.207', '196.201.214.208', '196.201.213.44',
  '196.201.212.127', '196.201.212.138', '196.201.212.129',
  '196.201.212.136', '196.201.212.74',  '196.201.212.69',
];

export async function POST(req: NextRequest) {
  try {
    // 1. Verify request comes from Safaricom
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? '';
    if (process.env.NODE_ENV === 'production' && !SAFARICOM_IPS.includes(ip)) {
      console.warn(`SECURITY: Callback from unknown IP: ${ip}`);
      return NextResponse.json({ ResultCode: 1, ResultDesc: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const { Body } = body;
    const callback = Body?.stkCallback;

    if (!callback) {
      return NextResponse.json({ ResultCode: 1, ResultDesc: 'Invalid payload' });
    }

    const { ResultCode, ResultDesc, CheckoutRequestID, CallbackMetadata } = callback;

    if (ResultCode !== 0) {
      // Payment failed or was cancelled
      console.log(`Payment failed: ${ResultDesc} (CheckoutRequestID: ${CheckoutRequestID})`);
      // TODO: Update your DB order status to 'failed'
      return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
    }

    // Extract payment details from callback
    const meta = CallbackMetadata?.Item ?? [];
    const getValue = (name: string) => meta.find((i: { Name: string }) => i.Name === name)?.Value;

    const mpesaReceiptNumber = getValue('MpesaReceiptNumber');
    const amount = getValue('Amount');
    const phoneNumber = getValue('PhoneNumber');
    const transactionDate = getValue('TransactionDate');

    // 2. Validate amount again on callback (double-check)
    // TODO: Look up the pending order by CheckoutRequestID in your DB
    // and verify callback amount matches the order amount
    console.log('Payment confirmed:', {
      CheckoutRequestID,
      mpesaReceiptNumber,
      amount,
      phoneNumber,
      transactionDate,
    });

    // TODO: 
    // - Mark order as paid in your DB
    // - Send confirmation email/SMS to customer  
    // - Reduce stock count
    // - Trigger fulfillment

    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });

  } catch (err) {
    console.error('M-Pesa callback error:', err);
    return NextResponse.json({ ResultCode: 1, ResultDesc: 'Internal error' });
  }
}