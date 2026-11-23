import type { Metadata } from 'next';
import InfoPage, { Section, Callout } from '@/components/InfoPage';

export const metadata: Metadata = { title: 'Our Story' };

export default function Page() {
  return (
    <InfoPage
      eyebrow="The Beginning"
      title="Our Story"
      subtitle="How BETUM Shop was born from a passion for fashion and honest dealing."
    >
      <Section title="How it all started">
        <p>
          BETUM was created with a simple idea: make it easier for people to buy and sell quality products online.
        </p>
        <p style={{ marginTop: '16px' }}>
          We saw an opportunity to build a marketplace where shoppers could find great products, sellers could reach more customers, and every transaction could happen with confidence.
        </p>
      </Section>

      <Callout>
        We wanted a place where buyers could trust every description, and sellers could trust every transaction.
      </Callout>

      <Section title="Growing together">
        <p>
          What started as a small platform will continue to grow through the support of our community of buyers and sellers.
        </p>
        <p style={{ marginTop: '16px' }}>  
          As more people continue joining BETUM, our product range will expand to include more fashion, footwear, accessories and lifestyle products.
        </p>
      </Section>

      <Section title="Today">
        <p>
          We wish to reach every customer and provide them with the best shopping experience possible.
        </p>
      </Section>
    </InfoPage>
  );
}
