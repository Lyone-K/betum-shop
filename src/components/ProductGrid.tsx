'use client';
import { useState, useMemo } from 'react';
import { SlidersHorizontal, Grid3x3, LayoutGrid, ChevronDown } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductDetailPanel from './ProductDetailPanel';
import type { Product } from '@/lib/products';
import { CATEGORIES, BRANDS, CONDITIONS } from '@/lib/products';

interface ProductGridProps {
  products: Product[];
  searchQuery?: string;
  onAddToCart?: (p: Product, size: string, color: string) => void;
  onWishlist?: (p: Product) => void;
}

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'brand';

export default function ProductGrid({ products, searchQuery = '', onAddToCart, onWishlist }: ProductGridProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeBrand, setActiveBrand] = useState('All Brands');
  const [activeCondition, setActiveCondition] = useState('All Conditions');
  const [sort, setSort] = useState<SortOption>('newest');
  const [showSale, setShowSale] = useState(false);
  const [showInStock, setShowInStock] = useState(false);
  const [colCount, setColCount] = useState<3 | 4>(4);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filtered = useMemo(() => {
    let res = [...products];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      res = res.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q)
      );
    }
    if (activeCategory !== 'All') res = res.filter(p => p.category === activeCategory);
    if (activeBrand !== 'All Brands') res = res.filter(p => p.brand === activeBrand);
    if (activeCondition !== 'All Conditions') res = res.filter(p => p.condition === activeCondition);
    if (showSale) res = res.filter(p => p.isSale);
    if (showInStock) res = res.filter(p => p.inStock);
    res.sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'brand') return a.brand.localeCompare(b.brand);
      return b.isNew ? 1 : -1;
    });
    return res;
  }, [products, searchQuery, activeCategory, activeBrand, activeCondition, showSale, showInStock, sort]);

  const resetFilters = () => {
    setActiveCategory('All');
    setActiveBrand('All Brands');
    setActiveCondition('All Conditions');
    setShowSale(false);
    setShowInStock(false);
  };

  const hasFilters = activeCategory !== 'All' || activeBrand !== 'All Brands' ||
    activeCondition !== 'All Conditions' || showSale || showInStock;

  function handleCardClick(id: string) {
    const next = activeId === id ? null : id;
    setActiveId(next);
    if (next) {
      // scroll panel into view after render
      setTimeout(() => {
        document.getElementById(`panel-${next}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    }
  }

  // Build grid rows so the panel always sits BELOW its row, full width
  function buildRows(items: Product[], cols: number) {
    const rows: Product[][] = [];
    for (let i = 0; i < items.length; i += cols) {
      rows.push(items.slice(i, i + cols));
    }
    return rows;
  }

  const rows = buildRows(filtered, colCount);
  const activeProduct = filtered.find(p => p.id === activeId) ?? null;

  return (
    <section id="shop" style={{ maxWidth: '1400px', margin: '0 auto', padding: '48px 24px' }}>
      {/* Section header */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
          Just Arrived
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 300, lineHeight: 1 }}>
            New Arrivals
          </h2>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.05em' }}>
            {filtered.length} item{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="divider-gold" style={{ marginTop: '20px' }} />
      </div>

      {/* Category quick filters */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'nowrap', overflowX: 'auto', marginBottom: '32px', paddingBottom: '4px' }}>
        {CATEGORIES.map(cat => (
          <button key={cat} className={`filter-pill ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
        {/* Sidebar — unchanged */}
        <aside style={{ width: sidebarOpen ? '220px' : '0', flexShrink: 0, overflow: 'hidden', transition: 'width 0.35s ease' }} className="hide-mobile">
          <div style={{ width: '220px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Refine</span>
              {hasFilters && (
                <button onClick={resetFilters} style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Clear all
                </button>
              )}
            </div>
            <FilterGroup label="Brand">
              {BRANDS.map(brand => (
                <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '4px 0' }}>
                  <input type="radio" name="brand" className="filter-checkbox" checked={activeBrand === brand} onChange={() => setActiveBrand(brand)} />
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--charcoal)' }}>{brand}</span>
                </label>
              ))}
            </FilterGroup>
            <FilterGroup label="Condition">
              {CONDITIONS.map(cond => (
                <label key={cond} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '4px 0' }}>
                  <input type="radio" name="condition" className="filter-checkbox" checked={activeCondition === cond} onChange={() => setActiveCondition(cond)} />
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--charcoal)' }}>{cond}</span>
                </label>
              ))}
            </FilterGroup>
            <FilterGroup label="Availability">
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '4px 0' }}>
                <input type="checkbox" className="filter-checkbox" checked={showInStock} onChange={e => setShowInStock(e.target.checked)} />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--charcoal)' }}>In Stock Only</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '4px 0' }}>
                <input type="checkbox" className="filter-checkbox" checked={showSale} onChange={e => setShowSale(e.target.checked)} />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--charcoal)' }}>On Sale</span>
              </label>
            </FilterGroup>
          </div>
        </aside>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border)', flexWrap: 'wrap', gap: '12px' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--charcoal)' }} className="hide-mobile">
              <SlidersHorizontal size={14} strokeWidth={1.5} />
              {sidebarOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: 'auto' }}>
              <div style={{ display: 'flex', gap: '4px' }} className="hide-mobile">
                <button onClick={() => setColCount(4)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: colCount === 4 ? 'var(--charcoal)' : 'var(--muted)', padding: '4px' }}>
                  <Grid3x3 size={16} strokeWidth={1.5} />
                </button>
                <button onClick={() => setColCount(3)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: colCount === 3 ? 'var(--charcoal)' : 'var(--muted)', padding: '4px' }}>
                  <LayoutGrid size={16} strokeWidth={1.5} />
                </button>
              </div>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Sort:</span>
                <select value={sort} onChange={e => setSort(e.target.value as SortOption)} style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--charcoal)', background: 'none', border: 'none', cursor: 'pointer', outline: 'none', appearance: 'none', paddingRight: '20px' }}>
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low–High</option>
                  <option value="price-desc">Price: High–Low</option>
                  <option value="brand">Brand A–Z</option>
                </select>
                <ChevronDown size={12} style={{ position: 'absolute', right: 0, pointerEvents: 'none', color: 'var(--muted)' }} />
              </div>
            </div>
          </div>

          {/* Grid — row by row so panel slots in after its row */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 300, marginBottom: '12px' }}>No items found</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px' }}>Try adjusting your filters or search terms</p>
              <button className="btn-outline" style={{ marginTop: '24px' }} onClick={resetFilters}>Clear Filters</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {rows.map((row, rowIndex) => {
                const rowContainsActive = row.some(p => p.id === activeId);
                return (
                  <div key={rowIndex}>
                    {/* The row of cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`, gap: '24px' }}>
                      {row.map((product, i) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          index={rowIndex * colCount + i}
                          isActive={activeId === product.id}
                          onClick={() => handleCardClick(product.id)}
                          onWishlist={onWishlist}
                        />
                      ))}
                    </div>

                    {/* Detail panel — only renders in the row that contains the active card */}
                    {rowContainsActive && activeProduct && (
                      <div id={`panel-${activeProduct.id}`} style={{ marginTop: '8px' }}>
                        <ProductDetailPanel
                          product={activeProduct}
                          onClose={() => setActiveId(null)}
                          onAddToCart={(p, size, color) => {
                            onAddToCart?.(p, size, color);
                            setActiveId(null);
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ marginBottom: '28px', borderBottom: '1px solid var(--border)', paddingBottom: '24px' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', marginBottom: open ? '14px' : 0, padding: 0 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--charcoal)' }}>{label}</span>
        <ChevronDown size={13} style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease', color: 'var(--muted)' }} />
      </button>
      {open && <div style={{ display: 'flex', flexDirection: 'column' }}>{children}</div>}
    </div>
  );
}