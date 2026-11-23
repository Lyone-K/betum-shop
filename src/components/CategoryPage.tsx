'use client';
import { useMemo } from 'react';
import PageShell from '@/components/PageShell';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, Product } from '@/lib/products';
import { CartProvider, useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import AnnouncementBar from '@/components/AnnouncementBar';
import Footer from '@/components/Footer';

interface CategoryPageProps {
  productIds?: string[];   // pre-filtered list from the server
  category?: string | null;
  title: string;
  eyebrow: string;
  subtitle: string;
}

function CategoryContent({ productIds, category, title, eyebrow, subtitle }: CategoryPageProps) {
  const { cartCount, wishlistCount, addToCart, addToWishlist } = useCart();
  
  const products = useMemo(() => {
    if (productIds) return PRODUCTS.filter(p => productIds.includes(p.id));
    if (category) return PRODUCTS.filter(p => p.category === category);
    return [...PRODUCTS];
  }, [productIds, category]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AnnouncementBar />
      <Header cartCount={cartCount} wishlistCount={wishlistCount} />
      <main style={{ flex: 1 }}>
        <PageShell eyebrow={eyebrow} title={title} subtitle={subtitle}>
          {products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 300 }}>
                No items available right now
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', marginTop: '8px' }}>
                Check back soon — new arrivals are added daily.
              </p>
            </div>
          ) : (
            <>
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: '12px',
                color: 'var(--muted)', letterSpacing: '0.05em',
                marginBottom: '32px',
              }}>
                {products.length} item{products.length !== 1 ? 's' : ''} available
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '28px',
              }}>
                {products.map((p, i) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    index={i}
                    onAddToCart={addToCart}
                    onWishlist={addToWishlist}
                  />
                ))}
              </div>
            </>
          )}
        </PageShell>
      </main>
      <Footer />
    </div>
  );
}

export default function CategoryPage(props: CategoryPageProps) {
  return (
    <CartProvider>
      <CategoryContent {...props} />
    </CartProvider>
  );
}