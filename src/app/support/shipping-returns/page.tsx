import type { Metadata } from 'next';
import InfoPage, { Section, Callout } from '@/components/InfoPage';

export const metadata: Metadata = { title: 'Shipping & Returns' };

export default function Page() {
  return (
    <InfoPage eyebrow="Delivery" title="Shipping & Returns" subtitle="Delivery and returns info.">
      <Callout>Simple, reliable delivery and support for every order.</Callout>

      <Section title="Shipping">
        <p>
          • Delivery available across Kenya<br />
          • Estimated delivery times vary by location<br />
          • Shipping costs are calculated at checkout<br />
          • Order tracking available where applicable
          </p>
      </Section>

      <Section title="Returns">
        <p>
          • Return must be initiated within 8 days of receipt<br /> 
          • Items must be returned in the condition received<br />
          • Return requests should be made within the specified return period
          </p>
      </Section>
    </InfoPage>
  );
}
