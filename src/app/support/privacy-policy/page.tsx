import type { Metadata } from 'next';
import InfoPage, { Section } from '@/components/InfoPage';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function Page() {
  return (
    <InfoPage eyebrow="Legal" title="Privacy Policy" subtitle="Last Updated: June 2026">
      <Section title="Information We Collect">
        <p>We collect information needed to process orders, manage accounts, improve our services, and provide customer support.</p>
      </Section>

      <Section title="How We Use Your Information">
        <p>Your information is used to:</p>
        <ul>
          <li>• Process orders and payments</li>
          <li>• Deliver products and services</li>
          <li>• Communicate order updates</li>
          <li>• Improve the BETUM experience</li>
          <li>• Provide customer support</li>
        </ul>
      </Section>

      <Section title="Data Protection">
        <p>We take the security of your information seriously and implement appropriate measures to protect it.</p>
      </Section>

      <Section title="Your Privacy">
        <p>
          We do not sell your personal information to third parties.</p>
        <p>
          By using BETUM, you agree to the collection and use of information in accordance with this policy.
        </p>
      </Section>
    </InfoPage>
  );
}
