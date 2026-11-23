'use client';

import Link from 'next/link';
import { FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { FaFacebook } from 'react-icons/fa';

const LINKS: Record<string, { label: string; href: string }[]> = {
  Shop: [
    { label: 'Women', href: '/shop/women-section' },
    { label: 'Men', href: '/shop/mens-section' },
    { label: 'Kids', href: '/shop/kids-section' },
    { label: 'FootWare', href: '/shop/footware' },
    { label: 'Bags', href: '/shop/bags' },
    { label: 'Accessories', href: '/shop/accessories' },
  ],
  Services: [
    { label: 'Policy', href: '/services/buyer-policy' },
    { label: 'Order Tracking', href: '/services/order-tracking' },
    { label: 'Condition Guide', href: '/services/condition-guide' },
  ],
  Company: [
    { label: 'About BETUM', href: '/company/about' },
    { label: 'Our Story', href: '/company/our-story' },
    { label: 'Careers', href: '/company/careers' },
    { label: 'Contact Us', href: '/company/contact' },
  ],
  Support: [
    { label: 'FAQ', href: '/support/faq' },
    { label: 'Shipping & Returns', href: '/support/shipping-returns' },
    { label: 'Privacy Policy', href: '/support/privacy-policy' },
    { label: 'Terms of Service', href: '/support/terms' },
    { label: 'Cookie Policy', href: '/support/cookies' },
  ],
};

const SOCIALS = [
  { Icon: FaInstagram, href: 'https://instagram.com/betumshop', label: 'Instagram' },
  { Icon: FaXTwitter, href: 'https://twitter.com/betumshop', label: 'X (Twitter)' },
  { Icon: FaFacebook, href: 'https://facebook.com/betumshop', label: 'Facebook' },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--deep-brown)',
        color: 'var(--cream)',
        padding: '72px 24px 32px',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, var(--gold), transparent)',
            marginBottom: '40px',
          }}
        />

        {/* Main Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '48px',
            paddingBottom: '56px',
            borderBottom: '1px solid rgba(248,245,240,0.1)',
          }}
        >
          {/* Brand */}
          <div>
            <a href="/">
              <img
                src="/logo.png"
                alt="BETUM"
                style={{
                  width: '98px',
                  height: '98px',
                  borderRadius: '50%',
                  border: '5px solid var(--gold)',
                  display: 'flex',
                  objectFit: 'contain',
                }}
              />        
            </a>

            <p
              style={{
                fontSize: '13px',
                color: 'rgba(248,245,240,0.5)',
                lineHeight: 1.7,
                marginBottom: '20px',
              }}
            >
              BETUM — Quality Products. Trusted Marketplace.
            </p>

            <p
              style={{
                fontSize: '11px',
                color: 'var(--gold)',
                letterSpacing: '0.08em',
                marginBottom: '20px',
              }}
            >
              New Finds. Pre-Owned Gems. One Marketplace.
            </p>

            {/* Socials */}
            <div style={{ display: 'flex', gap: '16px' }}>
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'rgba(248,245,240,0.6)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <h4
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: '20px',
                }}
              >
                {group}
              </h4>

              <ul style={{ listStyle: 'none', padding: 0 }}>
                {items.map(({ label, href }) => (
                  <li key={label} style={{ marginBottom: '10px' }}>
                    <Link
                      href={href}
                      style={{
                        color: 'rgba(248,245,240,0.6)',
                        textDecoration: 'none',
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            paddingTop: '28px',
          }}
        >
          <p style={{ fontSize: '11px', color: 'rgba(248,245,240,0.35)' }}>
            © {new Date().getFullYear()} BETUM Shop. All rights reserved.
          </p>

          <p style={{ fontSize: '11px', color: 'rgba(248,245,240,0.35)' }}>
            Brand Identity by LEON GRAPHICS DESIGN & BRANDING
          </p>

          <div style={{ display: 'flex', gap: '20px' }}>
            {['Mpesa', 'PayPal', 'Card'].map((pm) => (
              <span
                key={pm}
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(248,245,240,0.3)',
                }}
              >
                {pm}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}