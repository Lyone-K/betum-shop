import type { Metadata } from 'next';
import InfoPage, { Section } from '@/components/InfoPage';

export const metadata: Metadata = { title: 'Terms of Service' };

export default function Page() {
  return (
    <InfoPage eyebrow="Legal" title="Terms" subtitle="Terms of service">
      <Section title="Acceptance">
        <p>By accessing or using BETUM, you agree to comply with these Terms of Service and all applicable laws and regulations.</p>
      </Section>

      <Section title="MarketPlace">
        <p>BETUM provides a platform that connects buyers and sellers. Product information, pricing, and availability are subject to change without notice.</p>
      </Section>

      <Section title="Purchases">
        <p>Buyers are responsible for reviewing product details before making a purchase. All products are sold based on the descriptions and information provided on the platform.</p>
      </Section>

      <Section title="User Responsibilities">
        <p>Users must provide accurate information and comply with all applicable laws when using BETUM. Prohibited activities include fraudulent transactions, unauthorized access and misuse of the platform.</p>
      </Section>

      <Section title="Limitation of Liability">
        <p>BETUM is not responsible for losses resulting from misuse of the platform, inaccurate information provided by users, or circumstances beyond our reasonable control.</p>
      </Section>

      <Section title="Changes to Terms">
        <p>We may update these Terms of Service from time to time. Continued use of BETUM constitutes acceptance of any updated terms.</p>
      </Section>

      <Section title="Contact Us">
        <p>If you have questions about these terms, please contact our support team.</p>
      </Section>
    </InfoPage>
  );
}
