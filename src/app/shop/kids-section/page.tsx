// app/shop/kids-section/page.tsx
import ShopSection from '@/components/ShopSection';
export const metadata = { title: "Kids' Wear — BETUM" };
export default function KidsPage() {
  return <ShopSection section="kids" title="Kids' Wear" subtitle="Playful, comfortable and durable clothing for the little ones." emptyMessage="Kids' section coming soon" />;
}