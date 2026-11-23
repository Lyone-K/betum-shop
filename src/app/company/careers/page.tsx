import type { Metadata } from 'next';
import InfoPage, { Section, Callout } from '@/components/InfoPage';

export const metadata: Metadata = { title: 'Careers at BETUM Shop' };

export default function Page() {
  return (
    <InfoPage
      eyebrow="Join the Betum Team"
      title="Careers"
      subtitle="We're building a trusted marketplace and are always looking for talented, passionate people to grow with us."
    >
      <Callout>
        Whether your expertise is in technology, customer support, marketing, operations, sales, or e-commerce, we'd love to hear from you.
      </Callout>

      <Section title="Why Work With Us?">
        <p>Growth-focused environment</p>
        <p>Flexible and collaborative culture</p>
        <p>Opportunities to learn and make an impact</p>
        <p>Work with a team that values innovation and trust</p>
      </Section>

      <Section title="Current Opportunities">
        <p>We are currently not accepting applications for any positions.</p>
        <p style={{ marginTop: '16px' }}>
          However, we are always interested in connecting with talented individuals who are passionate about our mission. If you would like to be considered for future opportunities, please send your resume and a brief introduction to <a href="mailto:careers@betumshop.com">careers@betumshop.com</a>.
        </p>
      </Section>
    </InfoPage>
  );
}
