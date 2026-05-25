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
    id: 'electronics',
    name: 'Consumer Electronics',
    description: 'Cutting-edge tech from leading manufacturers worldwide',
    image: '/images/category-electronics.jpg',
    count: 248,
  },
  {
    id: 'home',
    name: 'Home & Living',
    description: 'Premium home goods, kitchenware, and decor',
    image: '/images/category-home.jpg',
    count: 194,
  },
  {
    id: 'industrial',
    name: 'Industrial & Tools',
    description: 'Professional-grade tools and industrial equipment',
    image: '/images/category-industrial.jpg',
    count: 312,
  },
  {
    id: 'apparel',
    name: 'Apparel & Accessories',
    description: 'High-quality garments and lifestyle accessories',
    image: '/images/category-apparel.jpg',
    count: 176,
  },
]

export const products: Product[] = [
  {
    id: 'pro-nc-headphones',
    name: 'ProAudio NC-900 Headphones',
    sku: 'ETD-ELEC-0041',
    category: 'Consumer Electronics',
    categoryId: 'electronics',
    price: 189.99,
    moq: 50,
    unit: 'unit',
    image: '/images/product-1.jpg',
    images: ['/images/product-1.jpg', '/images/category-electronics.jpg'],
    shortDescription: 'Professional noise-cancelling headphones with 40-hour battery life and premium driver technology.',
    description: 'The ProAudio NC-900 delivers studio-quality sound in a sleek, portable form factor. Engineered for the modern professional, these headphones feature adaptive noise-cancellation, hi-res audio certification, and a 40-hour battery with rapid charge capability. A premium choice for bulk buyers seeking high-margin electronics.',
    specifications: [
      { label: 'Driver Size', value: '40mm Dynamic' },
      { label: 'Frequency Response', value: '4Hz – 40,000Hz' },
      { label: 'Battery Life', value: '40 hours (ANC on)' },
      { label: 'Connectivity', value: 'Bluetooth 5.3, USB-C, 3.5mm' },
      { label: 'Weight', value: '250g' },
      { label: 'Colors', value: 'Matte Black, Platinum, Bronze' },
      { label: 'Certification', value: 'Hi-Res Audio, CE, FCC' },
    ],
    shipping: 'Ships from Los Angeles, CA. Standard freight or express options available.',
    leadTime: '7–14 business days',
    inStock: true,
    featured: true,
    badge: 'Best Seller',
  },
  {
    id: 'smart-hub-x1',
    name: 'Nexus SmartHub X1',
    sku: 'ETD-ELEC-0078',
    category: 'Consumer Electronics',
    categoryId: 'electronics',
    price: 129.00,
    moq: 100,
    unit: 'unit',
    image: '/images/product-2.jpg',
    images: ['/images/product-2.jpg', '/images/category-electronics.jpg'],
    shortDescription: 'All-in-one smart home control hub with support for 2,000+ devices and voice assistant integration.',
    description: 'The Nexus SmartHub X1 is the centerpiece of the modern connected home. Compatible with all major smart home ecosystems, it features a quad-core processor, dual-band Wi-Fi, and Zigbee/Z-Wave integration. A high-velocity SKU in the smart home category.',
    specifications: [
      { label: 'Processor', value: 'Quad-core 1.8GHz' },
      { label: 'Connectivity', value: 'Wi-Fi 6, Bluetooth 5.2, Zigbee, Z-Wave' },
      { label: 'Compatible Devices', value: '2,000+' },
      { label: 'Power', value: 'USB-C, 12V DC adapter' },
      { label: 'Voice Assistants', value: 'Alexa, Google, Siri' },
      { label: 'Warranty', value: '24 months' },
    ],
    shipping: 'Ships from Los Angeles, CA. FOB available for orders 500+.',
    leadTime: '10–18 business days',
    inStock: true,
    featured: true,
    badge: 'New Arrival',
  },
  {
    id: 'chef-knife-set',
    name: 'Meridian 8-Piece Chef Set',
    sku: 'ETD-HOME-0033',
    category: 'Home & Living',
    categoryId: 'home',
    price: 214.00,
    moq: 30,
    unit: 'set',
    image: '/images/product-3.jpg',
    images: ['/images/product-3.jpg', '/images/category-home.jpg'],
    shortDescription: 'German-forged high-carbon stainless steel chef knife set with full-tang construction.',
    description: 'Crafted from German X50CrMoV15 high-carbon stainless steel, the Meridian 8-piece set is the definitive choice for culinary professionals and premium home kitchens. Each blade is precision-balanced with a full-tang ergonomic handle. Included leather storage roll elevates the unboxing experience.',
    specifications: [
      { label: 'Material', value: 'X50CrMoV15 High-Carbon Steel' },
      { label: 'Hardness', value: '58 HRC' },
      { label: 'Handle', value: 'Pakkawood, Full Tang' },
      { label: 'Pieces', value: '8 (Chef, Santoku, Bread, Utility, Paring, 3x Steak, Leather Roll)' },
      { label: 'Blade Edge', value: '15° per side, hand-honed' },
      { label: 'Origin', value: 'Solingen, Germany' },
    ],
    shipping: 'Ships from Miami, FL. Secure fragile packaging included.',
    leadTime: '5–10 business days',
    inStock: true,
    featured: true,
  },
  {
    id: 'cordless-drill-pro',
    name: 'VoltForce Pro 20V Drill Kit',
    sku: 'ETD-TOOL-0092',
    category: 'Industrial & Tools',
    categoryId: 'industrial',
    price: 159.50,
    moq: 40,
    unit: 'kit',
    image: '/images/product-4.jpg',
    images: ['/images/product-4.jpg', '/images/category-industrial.jpg'],
    shortDescription: '20V MAX brushless cordless drill/driver with 2-speed transmission and dual Li-ion batteries.',
    description: 'The VoltForce Pro is engineered for contractors and serious DIY professionals. Its brushless motor delivers up to 600 in-lbs of torque and runs 60% longer than brushed alternatives. Ships in a rugged molded case with two 2.0Ah batteries, charger, and 29-piece accessory kit.',
    specifications: [
      { label: 'Voltage', value: '20V MAX' },
      { label: 'Max Torque', value: '600 in-lbs' },
      { label: 'Speeds', value: '2 (0–600 / 0–2,000 RPM)' },
      { label: 'Chuck', value: '1/2" All-Metal Keyless' },
      { label: 'Batteries', value: '2x 2.0Ah Li-Ion included' },
      { label: 'Certification', value: 'UL, CE, CSA' },
    ],
    shipping: 'Ships from Dallas, TX. Hazmat packaging for battery compliance.',
    leadTime: '7–12 business days',
    inStock: true,
    featured: true,
    badge: 'High Volume',
  },
  {
    id: 'titan-watch',
    name: 'Titan Chrono Field Watch',
    sku: 'ETD-ACCS-0017',
    category: 'Apparel & Accessories',
    categoryId: 'apparel',
    price: 299.00,
    moq: 20,
    unit: 'unit',
    image: '/images/product-5.jpg',
    images: ['/images/product-5.jpg', '/images/category-apparel.jpg'],
    shortDescription: 'Sapphire crystal field watch with Japanese automatic movement and 100m water resistance.',
    description: 'The Titan Chrono Field Watch fuses military-inspired design with precision Swiss movement. Features a scratch-resistant sapphire crystal, luminous hands, and 316L stainless steel case with matte black PVD coating. A premium gift and accessory category driver.',
    specifications: [
      { label: 'Movement', value: 'Japanese Automatic, Seiko NH35A' },
      { label: 'Case Material', value: '316L Stainless, PVD Coated' },
      { label: 'Crystal', value: 'Sapphire, AR-coated' },
      { label: 'Water Resistance', value: '100m / 330ft' },
      { label: 'Case Diameter', value: '42mm' },
      { label: 'Power Reserve', value: '41 hours' },
    ],
    shipping: 'Ships from New York, NY. Premium gift packaging available.',
    leadTime: '10–20 business days',
    inStock: true,
    featured: false,
    badge: 'Premium',
  },
  {
    id: 'carbon-laptop-bag',
    name: 'Executive Carbon Laptop Brief',
    sku: 'ETD-ACCS-0054',
    category: 'Apparel & Accessories',
    categoryId: 'apparel',
    price: 119.99,
    moq: 50,
    unit: 'unit',
    image: '/images/product-6.jpg',
    images: ['/images/product-6.jpg', '/images/category-apparel.jpg'],
    shortDescription: 'Premium ballistic nylon and carbon fiber laptop briefcase with RFID-blocking pockets.',
    description: 'The Executive Carbon Brief is built for the modern professional. Constructed with lightweight carbon fiber panels and military-grade ballistic nylon, it protects laptops up to 16" while maintaining a sleek executive profile. Features TSA-friendly pass-through, hidden RFID-blocking pockets, and magnetic closures.',
    specifications: [
      { label: 'Material', value: 'Carbon Fiber + 1680D Ballistic Nylon' },
      { label: 'Laptop Fit', value: 'Up to 16"' },
      { label: 'Dimensions', value: '17" x 12" x 4"' },
      { label: 'Weight', value: '1.8 lbs' },
      { label: 'Features', value: 'RFID Blocking, TSA Pass-Through, Mag Closures' },
      { label: 'Warranty', value: 'Lifetime limited' },
    ],
    shipping: 'Ships from Los Angeles, CA. Custom logo embossing available 100+ units.',
    leadTime: '5–8 business days',
    inStock: true,
    featured: false,
  },
]

export const testimonials = [
  {
    id: 1,
    name: 'Marcus Chen',
    title: 'VP of Procurement',
    company: 'Apex Retail Group',
    text: 'ET Distribution has transformed our sourcing pipeline. Their catalog breadth and reliability on MOQs is unmatched. We\'ve been sourcing electronics and home goods through them for three years — flawless execution every time.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Diane Moreau',
    title: 'Director of Operations',
    company: 'Horizon Wholesale Co.',
    text: 'The team at ET Distribution understands what a serious B2B buyer needs. Transparent pricing, real-time inventory visibility, and a logistics network that actually delivers. They\'re our primary distributor for tools and industrial.',
    rating: 5,
  },
  {
    id: 3,
    name: 'James Okafor',
    title: 'Founder & CEO',
    company: 'Meridian Imports LLC',
    text: 'As a growing importer, finding a distributor with both scale and professionalism was critical. ET Distribution checked every box. Their supplier network gives us access to products we couldn\'t source on our own.',
    rating: 5,
  },
]

export const suppliers = [
  { id: 1, name: 'Samsung' },
  { id: 2, name: 'Bosch' },
  { id: 3, name: 'LG Electronics' },
  { id: 4, name: 'Philips' },
  { id: 5, name: 'DeWalt' },
  { id: 6, name: 'Panasonic' },
  { id: 7, name: 'Stanley' },
  { id: 8, name: 'Leatherman' },
]

export const stats = [
  { value: '15,000+', label: 'Active SKUs' },
  { value: '200+', label: 'Verified Suppliers' },
  { value: '48', label: 'States Served' },
  { value: '$2.4B+', label: 'Products Distributed' },
]
