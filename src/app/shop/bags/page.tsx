// app/shop/bags/page.tsx
import ShopSection from '@/components/ShopSection';
export const metadata = { title: 'Bags — BETUM' };
export default function BagsPage() {
  return <ShopSection section="bags" title="Bags" subtitle="From everyday totes to designer classics — carry something worth carrying." emptyMessage="No bags listed right now" />;
}