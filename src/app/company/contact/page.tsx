import type { Metadata } from 'next';
import InfoPage, { Section } from '@/components/InfoPage';

export const metadata: Metadata = { title: 'Contact Us' };

export default function Page() {
  return (
    <InfoPage
      eyebrow="Get in Touch"
      title="Contact Us"
      subtitle="Have a question or need help?"
    >
      <Section title="Contact">
        <p>Reach out to us and our team will get back to you as soon as possible.</p>
        <p>Email: hello@betumshop.com</p>
        <p>WhatsApp: +254 714 355 795</p>
      </Section>

      <Section title="Customer Support">
        <p>If you have any questions or need assistance, feel free to reach out to our customer support team.</p>
        <p><strong>Sundays to Fridays</strong></p>
        <p>9:00 AM to 6:00 PM (GMT+3)</p>
      </Section>
    </InfoPage>
  );
}
