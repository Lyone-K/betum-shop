'use client';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { Product } from '@/lib/products';
import CartDrawer from '@/components/CartDrawer';

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  wishlistCount: number;
  toast: string | null;
  cartOpen: boolean;
  searchQuery: string;
  openCart: () => void;
  closeCart: () => void;
  setSearchQuery: (q: string) => void;
  addToCart: (p: Product, size?: string, color?: string) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, qty: number) => void;
  addToWishlist: (p: Product) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [], cartCount: 0, wishlistCount: 0, toast: null, cartOpen: false,
  searchQuery: '',
  openCart: () => {}, closeCart: () => {}, setSearchQuery: () => {},
  addToCart: () => {}, removeFromCart: () => {}, updateQuantity: () => {},
  addToWishlist: () => {}, clearCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const addToCart = useCallback((p: Product, size = '', color = '') => {
    if (!p.inStock) { showToast('Item is currently sold'); return; }
    setItems(prev => {
      const existing = prev.find(i => i.product.id === p.id && i.size === size && i.color === color);
      if (existing) {
        return prev.map(i =>
          i.product.id === p.id && i.size === size && i.color === color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product: p, size, color, quantity: 1 }];
    });
    showToast(`${p.name} added to bag`);
    setCartOpen(true);
  }, [showToast]);

  const removeFromCart = useCallback((id: string, size: string, color: string) => {
    setItems(prev => prev.filter(i => !(i.product.id === id && i.size === size && i.color === color)));
  }, []);

  const updateQuantity = useCallback((id: string, size: string, color: string, qty: number) => {
    if (qty < 1) return;
    setItems(prev => prev.map(i =>
      i.product.id === id && i.size === size && i.color === color ? { ...i, quantity: qty } : i
    ));
  }, []);

  const addToWishlist = useCallback((_p: Product) => {
    setWishlistCount(c => c + 1);
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, cartCount, wishlistCount, toast, cartOpen,
      searchQuery, setSearchQuery,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      addToCart, removeFromCart, updateQuantity, addToWishlist, clearCart,
    }}>
      {children}
      <CartDrawer />
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px',
          background: 'var(--charcoal)', color: 'var(--cream)',
          padding: '14px 24px', fontFamily: 'var(--font-sans)',
          fontSize: '12px', letterSpacing: '0.04em', zIndex: 1100,
          maxWidth: '320px', lineHeight: 1.5,
          animation: 'fadeInUp 0.4s ease',
        }}>
          ✓ &nbsp;{toast}
        </div>
      )}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);