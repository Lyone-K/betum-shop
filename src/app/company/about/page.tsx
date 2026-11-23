import type { Metadata } from 'next';
import InfoPage, { Section, Callout } from '@/components/InfoPage';

export const metadata: Metadata = { title: 'About BETUM Shop' };

export default function Page() {
  return (
    <InfoPage
      eyebrow="Who We Are"
      title="About BETUM"
      subtitle="BETUM is an online marketplace for quality fashion, footwear, accessories and lifestyle products."
    >
      <Callout>"BETUM - Find What Fits You."</Callout>

      <Section title="Our Mission">
        <p>
          To make quality fashion and lifestyle products more accessible, affordable, and convenient for everyone.
        </p>
      </Section>

      <Section title="Our Expertise">
        <p>
          Every item on BETUM is carefully reviewed and clearly described, so you can shop with confidence.
        </p>
        <p>
          Whether you're looking for something brand new or a unique pre-owned find, BETUM offers a trusted place to discover products you'll love.
        </p>
      </Section>

      <Section title="Our Promise">
        <p>
          Quality. Transparency. Value.
        </p>
        <p>
          That's what drives everything we do.
        </p>

      </Section>
    </InfoPage>
  );
}
