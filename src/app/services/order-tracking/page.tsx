import type { Metadata } from 'next';
import InfoPage, { Section } from '@/components/InfoPage';

export const metadata: Metadata = { title: 'Order Tracking' };

export default function Page() {
  return (
    <InfoPage
      eyebrow="Your Order"
      title="Order Tracking"
      subtitle="Track the status of your order and stay updated on its delivery progress."
    >
      <Section title="Track Your Order">
        <div className="order-tracker-form">
          <input
            placeholder="Enter order number (e.g. BS-10042)"
            className="order-tracker-input"
          />
          <button className="btn-primary">Track</button>
        </div>

        <p>
          You can find your order number in your order confirmation email or account dashboard.
        </p>
      </Section>
      <style jsx>{`
        .order-tracker-form {
          display: flex;
          max-width: 480px;
          margin-bottom: 32px;
        }

        .order-tracker-input {
          flex: 1;
          border: 1px solid var(--border);
          border-right: none;
          padding: 14px 16px;
          font-size: 13px;
          outline: none;
          background: var(--cream);
        }
      `}</style>

      <Section title="Delivery Timelines">
        <p>
          <strong>Within Nairobi:</strong> 1–5 business days<br />
          <strong>Outside Nairobi:</strong> 3–7 business days (available at checkout).<br />
          <strong>Delivery estimates may vary, </strong> depending on location and courier availability.
        </p>
      </Section>

      <Section title="Need Help?">
        <p>
          If you have questions about your order, contact our support team.
        </p>
        <p>
           <strong>Email </strong>: <a href="mailto:orders@betumshop.com">orders@betumshop.com</a> <br />
           <strong>WhatsApp: </strong> <a href="tel:+254714355795">+254 714 355 795</a> <br />
        </p>
      </Section>
    </InfoPage>
  );
}
