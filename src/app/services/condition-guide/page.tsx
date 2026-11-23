import type { Metadata } from 'next';
import InfoPage, { Section, Callout } from '@/components/InfoPage';

export const metadata: Metadata = { title: 'Condition Guide' };

export default function Page() {
  return (
    <InfoPage
      eyebrow="Condition Grading"
      title="Condition Guide"
      subtitle="How we grade every item so you know exactly what you're buying."
    >
      <Callout>
        We use clear condition ratings to help you understand the state of an item before making a purchase.
      </Callout>

      <Section title="New">
        <p>Brand new, unused, and in original condition.</p>
      </Section>

      <Section title="Like New">
        <p>Used little or not at all, with no noticeable signs of wear.</p>
      </Section>

      <Section title="Excellent">
        <p>Gently used and well maintained, with only minor signs of use.</p>
      </Section>

      <Section title="Very Good">
        <p>Shows normal signs of use but remains in great working and visual condition.</p>
      </Section>

      <Section title="Good">
        <p>Has visible signs of use, wear, or age, but is fully functional and usable.</p>
      </Section>

      <Section title="Fair">
        <p>Noticeable wear and imperfections that are reflected in the price.</p>
      </Section>

      <Section title="*****">
      <p><strong>All product descriptions and photos are provided to help you make an informed purchase.</strong></p>
      </Section>
    </InfoPage>
  );
}
