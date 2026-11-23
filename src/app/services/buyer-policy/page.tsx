import type { Metadata } from 'next';
import InfoPage, { Section, Callout, StepCard } from '../../../components/InfoPage';

export const metadata: Metadata = { title: 'Shop with Confidence' };

export default function Page() {
  return (
    <InfoPage
      eyebrow="Our Guarantee"
      title="Shop with Confidence"
      subtitle="At BETUM, we are committed to creating a safe and reliable marketplace for buyers and sellers."
    >
      <Callout>
        We encourage accurate product listings and clear descriptions so customers can make informed purchasing decisions.
      </Callout>

      <Section title="Our Process">
        <StepCard step={1} title="Product Review" desc="Products submitted to BETUM are reviewed to ensure they meet our marketplace standards and guidelines." />
        <StepCard step={2} title="Listing Verification" desc="We verify product information, images, pricing, and category details before listings go live." />
        <StepCard step={3} title="Quality Assessment" desc="Items are checked for condition and accuracy to help buyers understand exactly what they're purchasing." />
        <StepCard step={4} title="Ready For Sale" desc="Once approved, products are published on the marketplace and made available to shoppers across the platform." />
      </Section>

      <Section title="What We Check">
        <sub title="To maintain a trusted marketplace, we review:"> <strong>To maintain a trusted marketplace, we review:</strong></sub>
        <p>
          • Product images and descriptions<br />
          • Product category and specifications<br />
          • Pricing accuracy<br />
          • Item condition (for pre-owned products)<br />
          • Seller compliance with marketplace guidelines
        </p>
        <p> <strong>Our goal is to provide clear and accurate information so buyers can shop with confidence.</strong></p>
      </Section>

      <Section title="Buyer Protection">
        <p>
          • We're committed to creating a safe and reliable shopping experience.<br />
          • If you receive an item that is significantly different from its description, damaged, or not as advertised, please contact our support team. We will investigate the issue and work towards a fair resolution in line with our marketplace policies. <br />
          <strong>Your trust matters to us, and we're dedicated to ensuring a positive experience for both buyers and sellers.</strong>
        </p>
      </Section>
    </InfoPage>
  );
}
