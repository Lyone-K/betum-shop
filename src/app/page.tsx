'use client';
import { useCart } from '@/context/CartContext';
import HeroBanner from '@/components/HeroBanner';
import ProductGrid from '@/components/ProductGrid';
import { BrandStrip, FeaturesSection, TestimonialsSection, NewsletterSection } from '@/components/Sections';
import { PRODUCTS } from '@/lib/products';

export default function HomePage() {
  const { addToCart, addToWishlist, searchQuery } = useCart();

  return (
    <main style={{ flex: 1 }}>
      {!searchQuery && <HeroBanner />}
      {!searchQuery && <BrandStrip />}
      <ProductGrid
        products={PRODUCTS}
        searchQuery={searchQuery}
        onAddToCart={addToCart}
        onWishlist={addToWishlist}
      />
      {!searchQuery && (
        <>
          <FeaturesSection />
          <TestimonialsSection />
          <NewsletterSection />
        </>
      )}
    </main>
  );
}