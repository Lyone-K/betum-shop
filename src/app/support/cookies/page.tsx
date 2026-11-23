import type { Metadata } from 'next';
import InfoPage, { Section } from '@/components/InfoPage';

export const metadata: Metadata = { title: 'Cookie Policy' };

export default function Page() {
  return (
    <InfoPage eyebrow="Legal" title="Cookies" subtitle="Cookie policy for BETUM.">
      <Section title="Cookies">
        <p>BETUM uses cookies and similar technologies to improve your browsing experience, remember your preferences and help us understand how our platform is used.</p>
      </Section>

      <Section title="How We Use Cookies">
        <p>Cookies help us to:</p>
        <ul>
          <li>• Keep you signed in</li>
          <li>• Remember your preferences</li>
          <li>• Improve website performance</li>
          <li>• Enhance security</li>
          <li>• Analyze website traffic and usage</li>
        </ul>
      </Section>

      <Section title="Managing Cookies">
        <p>You can control or disable cookies through your browser settings. Please note that some features of the website may not function properly if cookies are disabled.</p>
      </Section>

      <Section title="Your Consent">
        <p>By continuing to use BETUM, you agree to our use of cookies in accordance with this policy.</p>
      </Section>
    </InfoPage>
  );
}
