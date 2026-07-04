export type Category = {
  id: string
  name: string
  description: string
  image: string
  count: number
}

export type Product = {
  id: string
  name: string
  sku: string
  category: string
  categoryId: string
  price: number
  moq: number
  unit: string
  image: string
  images: string[]
  shortDescription: string
  description: string
  specifications: { label: string; value: string }[]
  shipping: string
  leadTime: string
  inStock: boolean
  featured: boolean
  badge?: string
}

export const categories: Category[] = [
  {
    id: 'grocery',
    name: 'Grocery & Non-Perishables',
    description: 'Pantry staples, shelf-stable goods, and everyday grocery items',
    image: '/images/category-grocery.png',
    count: 12,
  },
  {
    id: 'specialty',
    name: 'Specialty Foods',
    description: 'Gourmet sauces, syrups, seasonings, and specialty condiments',
    image: '/images/category-specialty.png',
    count: 8,
  },
  {
    id: 'wellness',
    name: 'Health & Wellness',
    description: 'Vitamins, supplements, and personal care essentials',
    image: '/images/category-wellness.png',
    count: 9,
  },
  {
    id: 'home',
    name: 'Home Goods',
    description: 'Home essentials, dinnerware, and consumer products',
    image: '/images/category-home.png',
    count: 6,
  },
  {
    id: 'kitchen',
    name: 'Kitchen & Dining',
    description: 'Cookware, utensils, glassware, and dining essentials',
    image: '/images/category-kitchen.png',
    count: 5,
  },
  {
    id: 'cleaning',
    name: 'Cleaning Supplies',
    description: 'Multi-surface cleaners and everyday cleaning products',
    image: '/images/category-household.png',
    count: 6,
  },
  {
    id: 'essentials',
    name: 'Household Essentials',
    description: 'Paper goods, storage, and everyday household supplies',
    image: '/images/category-essentials.png',
    count: 4,
  },
]

export const products: Product[] = [
  {
    id: 'organic-pantry-assortment',
    name: 'Organic Pantry Staples Assortment',
    sku: 'ETD-GROC-0012',
    category: 'Grocery & Non-Perishables',
    categoryId: 'grocery',
    price: 42.0,
    moq: 24,
    unit: 'case',
    image: '/images/product-1.png',
    images: ['/images/product-1.png', '/images/category-grocery.png'],
    shortDescription: 'Wholesale case of organic pantry staples including grains, beans, pasta, and canned goods for retail resale.',
    description:
      'A ready-to-shelf assortment of organic pantry staples curated for grocery retailers, specialty food shops, and wholesale buyers. Each case combines high-turn grains, dried beans, pasta, and canned goods sourced through trusted supplier relationships. Consistent quality and reliable inventory make this a dependable staple for stores of every size.',
    specifications: [
      { label: 'Case Contents', value: 'Assorted grains, beans, pasta, canned goods' },
      { label: 'Units per Case', value: '24' },
      { label: 'Shelf Stable', value: 'Yes' },
      { label: 'Certification', value: 'USDA Organic (select items)' },
      { label: 'Packaging', value: 'Retail-ready cartons' },
    ],
    shipping: 'Ships from Woodstock, NY. Standard freight and LTL options available.',
    leadTime: '5–10 business days',
    inStock: true,
    featured: true,
    badge: 'Best Seller',
  },
  {
    id: 'cold-pressed-olive-oil',
    name: 'Cold-Pressed Extra Virgin Olive Oil (Case)',
    sku: 'ETD-SPEC-0027',
    category: 'Specialty Foods',
    categoryId: 'specialty',
    price: 68.0,
    moq: 12,
    unit: 'case',
    image: '/images/product-2.png',
    images: ['/images/product-2.png', '/images/category-specialty.png'],
    shortDescription: 'Case of premium cold-pressed extra virgin olive oil in dark glass bottles for specialty and grocery retail.',
    description:
      'Premium cold-pressed extra virgin olive oil packaged in UV-protective dark glass bottles. A high-margin specialty food item that performs well in grocery, gourmet, and gift channels. Sourced through vetted supplier relationships for consistent flavor profile and quality.',
    specifications: [
      { label: 'Bottle Size', value: '500ml' },
      { label: 'Bottles per Case', value: '12' },
      { label: 'Type', value: 'Cold-Pressed Extra Virgin' },
      { label: 'Packaging', value: 'UV-protective dark glass' },
      { label: 'Shelf Life', value: '18 months' },
    ],
    shipping: 'Ships from Woodstock, NY. Secure fragile packaging included.',
    leadTime: '7–12 business days',
    inStock: true,
    featured: true,
    badge: 'Specialty',
  },
  {
    id: 'daily-wellness-bundle',
    name: 'Daily Wellness Vitamin Bundle',
    sku: 'ETD-WELL-0009',
    category: 'Health & Wellness',
    categoryId: 'wellness',
    price: 54.5,
    moq: 20,
    unit: 'bundle',
    image: '/images/product-3.png',
    images: ['/images/product-3.png', '/images/category-wellness.png'],
    shortDescription: 'Retail-ready bundle of daily multivitamins and wellness supplements for health-focused retailers.',
    description:
      'A curated bundle of daily multivitamins and everyday wellness supplements designed for pharmacies, health shops, and wellness retailers. Packaged for shelf appeal with clear labeling and dependable supply through established manufacturer relationships.',
    specifications: [
      { label: 'Bundle Contents', value: 'Multivitamin + wellness supplements' },
      { label: 'Bottles per Bundle', value: '4' },
      { label: 'Form', value: 'Tablets / capsules' },
      { label: 'Compliance', value: 'FDA-registered facility sourced' },
      { label: 'Packaging', value: 'Retail-ready' },
    ],
    shipping: 'Ships from Woodstock, NY. Standard ground shipping available.',
    leadTime: '5–10 business days',
    inStock: true,
    featured: true,
    badge: 'New Arrival',
  },
  {
    id: 'stoneware-dinnerware-set',
    name: '16-Piece Stoneware Dinnerware Set',
    sku: 'ETD-HOME-0018',
    category: 'Home Goods',
    categoryId: 'home',
    price: 89.0,
    moq: 10,
    unit: 'set',
    image: '/images/product-6.png',
    images: ['/images/product-6.png', '/images/category-home.png'],
    shortDescription: 'Neutral-tone 16-piece stoneware dinnerware set for home goods and consumer product retailers.',
    description:
      'A durable 16-piece stoneware dinnerware set in versatile neutral earth tones. A strong home goods category driver for general merchandise, home stores, and wholesale buyers, backed by dependable sourcing and reliable delivery.',
    specifications: [
      { label: 'Set Contents', value: 'Plates, bowls, mugs (16 pcs)' },
      { label: 'Service For', value: '4' },
      { label: 'Material', value: 'Stoneware ceramic' },
      { label: 'Dishwasher Safe', value: 'Yes' },
      { label: 'Packaging', value: 'Protective retail carton' },
    ],
    shipping: 'Ships from Woodstock, NY. Secure fragile packaging included.',
    leadTime: '7–14 business days',
    inStock: true,
    featured: true,
    badge: 'Best Seller',
  },
  {
    id: 'stainless-cookware-set',
    name: '10-Piece Stainless Steel Cookware Set',
    sku: 'ETD-KTCH-0021',
    category: 'Kitchen & Dining',
    categoryId: 'kitchen',
    price: 124.0,
    moq: 8,
    unit: 'set',
    image: '/images/product-7.png',
    images: ['/images/product-7.png', '/images/category-kitchen.png'],
    shortDescription: '10-piece stainless steel cookware set with glass lids for kitchen and dining retailers.',
    description:
      'A durable 10-piece stainless steel cookware set featuring nested pots and pans with tempered glass lids. A high-value kitchen and dining category driver for general merchandise and home retailers, backed by dependable sourcing and reliable delivery.',
    specifications: [
      { label: 'Set Contents', value: 'Pots, pans, glass lids (10 pcs)' },
      { label: 'Material', value: 'Stainless steel' },
      { label: 'Cooktop Compatible', value: 'Gas, electric, induction' },
      { label: 'Dishwasher Safe', value: 'Yes' },
      { label: 'Packaging', value: 'Protective retail carton' },
    ],
    shipping: 'Ships from Woodstock, NY. Standard freight options available.',
    leadTime: '7–14 business days',
    inStock: true,
    featured: false,
  },
  {
    id: 'multi-surface-cleaning-case',
    name: 'Multi-Surface Cleaning Solution (Case)',
    sku: 'ETD-CLEN-0031',
    category: 'Cleaning Supplies',
    categoryId: 'cleaning',
    price: 36.0,
    moq: 24,
    unit: 'case',
    image: '/images/product-4.png',
    images: ['/images/product-4.png', '/images/category-household.png'],
    shortDescription: 'Wholesale case of multi-surface cleaning spray for grocery, hardware, and household retail channels.',
    description:
      'An effective multi-surface cleaning solution packaged in convenient spray bottles and shipped by the case. A reliable high-turn cleaning essential for grocery, hardware, and general retail. Consistent supply backed by trusted distributor relationships.',
    specifications: [
      { label: 'Bottle Size', value: '32 oz' },
      { label: 'Bottles per Case', value: '12' },
      { label: 'Use', value: 'Multi-surface cleaning' },
      { label: 'Packaging', value: 'Retail-ready spray bottles' },
    ],
    shipping: 'Ships from Woodstock, NY. Standard freight and LTL options available.',
    leadTime: '5–8 business days',
    inStock: true,
    featured: true,
    badge: 'High Volume',
  },
  {
    id: 'eco-paper-goods-pack',
    name: 'Eco-Friendly Paper Goods Bulk Pack',
    sku: 'ETD-ESSN-0044',
    category: 'Household Essentials',
    categoryId: 'essentials',
    price: 48.0,
    moq: 20,
    unit: 'pack',
    image: '/images/product-5.png',
    images: ['/images/product-5.png', '/images/category-essentials.png'],
    shortDescription: 'Bulk pack of eco-friendly household paper towels and napkins for retail and business buyers.',
    description:
      'A bulk pack of eco-friendly household paper goods including paper towels and napkins. A dependable everyday essential for grocery, convenience, and wholesale buyers seeking sustainable options with reliable inventory.',
    specifications: [
      { label: 'Pack Contents', value: 'Paper towels + napkins' },
      { label: 'Units per Pack', value: '20' },
      { label: 'Material', value: 'Recycled fiber' },
      { label: 'Packaging', value: 'Bulk retail pack' },
    ],
    shipping: 'Ships from Woodstock, NY. Standard freight options available.',
    leadTime: '5–10 business days',
    inStock: true,
    featured: false,
  },
]

// Featured brands and product lines carried through our sourcing network.
export const featuredBrands = [
  'Torani',
  'McCormick',
  'Old Bay',
  'Gold Medal',
  'IQBAR',
  'Rubbermaid',
  'Honeywell',
  'Cork Pops',
  'Zabs',
  'Sky & Sol',
  'Organic PB',
  'Puma',
  'Spicewalla',
]

// Featured supplier relationships within our sourcing network.
export const featuredSuppliers = [
  'Frontier Co-op',
  'Torani',
  'Gold Medal',
  "Houston's",
  'Petra',
  'Everyday Supply Co.',
  'Spicewalla',
  'EE Distribution',
]

export const stats = [
  { value: '50+', label: 'Active SKUs' },
  { value: '12+', label: 'Supplier Relationships' },
  { value: '48', label: 'States Served' },
  { value: '10,000+', label: 'Orders Fulfilled' },
]
