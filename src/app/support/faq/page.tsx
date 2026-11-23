import type { Metadata } from 'next';
import InfoPage, { Section, QA } from '@/components/InfoPage';

export const metadata: Metadata = { title: 'FAQ' };

export default function Page() {
  return (
    <InfoPage eyebrow="Help Centre" title="FAQ" subtitle="Answers to common questions.">
      <Section title="Buying">
        <QA q="How do I place an order?" a="Browse products, add your preferred items to cart, and proceed to checkout." />
        <QA q="Can I buy both new and pre-owned items?" a="Yes. BETUM offers both new and pre-owned products from trusted sellers." />
        <QA q="How can I contact support?" a="You can reach us via email or WhatsApp for any questions about your order or products." />
      </Section>

      <Section title="Shipping">
        <QA q="How long does delivery take?" a="Delivery times vary depending on your location and the seller. Estimated delivery times are shown during checkout." />
        <QA q="Can I track my order?" a="Yes. Once your order is confirmed, you'll receive updates and tracking information where available." />
        <QA q="Do you deliver nationwide?" a="Yes, we deliver across Kenya, with additional locations subject to availability." />
      </Section>

      <Section title="Returns & Refunds">
        <QA q="Can I return an item?" a="You can return items within 8 days of receipt, provided they are in original condition." />
        <QA q="What is your refund policy?" a="Refunds are processed within 5-7 business days after we receive the returned item." />
        <QA q="What if I receive a damaged or incorrect item?" a="Contact our support team as soon as possible, and we'll help resolve the issue." />
      </Section>
    </InfoPage>
  );
}
