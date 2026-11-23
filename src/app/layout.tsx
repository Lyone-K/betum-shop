import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/AnnouncementBar';
import { CartProvider } from '@/context/CartContext';
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'BETUM Shop - Find What Fits You', template: '%s | BETUM Shop' },
  description: 'Shop quality products across fashion, footwear, accessories, beauty, home décor, and everyday essentials. New arrivals daily.',
  keywords: ['BETUM', 'online marketplace Kenya', 'fashion marketplace', 'new and pre-owned products', 'women fashion', 'men fashion', 'footwear', 'accessories',  'home decor',  'online shopping Kenya',  'Kenya marketplace',  'buy online'],
  metadataBase: new URL('https://betumshop.com'),
  openGraph: {
    type: 'website', siteName: 'BETUM Shop',
    title: 'BETUM Shop — Premium New & Pre-Owned Luxury',
    description: 'Authenticated New & Pre-Owned luxury fashion. New arrivals daily.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#1A1814', width: 'device-width', initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CartProvider>
          <Header />
          <AnnouncementBar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}