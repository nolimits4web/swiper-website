import Link from 'next/link';

// Mapping of demo slugs to premium products (ordered by popularity)
const premiumProductsMap = {
  'effect-cards': [
    {
      title: 'Carousel Slider',
      url: 'https://uiinitiative.com/catalog/carousel-slider',
      description: 'True 3D infinite carousel',
    },
    {
      title: 'Cards Stack Slider',
      url: 'https://uiinitiative.com/catalog/cards-stack-slider',
      description: 'Front/back card sides',
    },
  ],
  'effect-coverflow': [
    {
      title: 'Carousel Slider',
      url: 'https://uiinitiative.com/catalog/carousel-slider',
      description: 'True 3D infinite carousel',
    },
    {
      title: 'Super Flow',
      url: 'https://uiinitiative.com/catalog/super-flow',
      description: 'Dynamic triangle fragments',
    },
  ],
  parallax: [
    {
      title: 'Super Flow',
      url: 'https://uiinitiative.com/catalog/super-flow',
      description: 'Parallax triangle fragments',
    },
    {
      title: 'Shutters Slider',
      url: 'https://uiinitiative.com/catalog/shutters-slider',
      description: 'Venetian blinds parallax effect',
    },
  ],
  'autoplay-progress': [
    {
      title: 'Super Flow',
      url: 'https://uiinitiative.com/catalog/super-flow',
      description: 'Dynamic fragments with autoplay',
    },
    {
      title: 'Stories Slider',
      url: 'https://uiinitiative.com/catalog/stories-slider',
      description: 'Instagram-style stories with video support',
    },
  ],
  'effect-creative': [
    {
      title: 'Shaders Slider',
      url: 'https://uiinitiative.com/catalog/shaders-slider',
      description: '20+ WebGL shader effects',
    },
    {
      title: 'Super Flow',
      url: 'https://uiinitiative.com/catalog/super-flow',
      description: 'Triangle fragment transitions',
    },
    {
      title: 'Material You Slider',
      url: 'https://uiinitiative.com/catalog/material-you-slider',
      description: 'Google Material You design',
    },
  ],
  'effect-cube': [
    {
      title: 'Carousel Slider',
      url: 'https://uiinitiative.com/catalog/carousel-slider',
      description: 'True 3D perspective rotation',
    },
    {
      title: 'Panorama Slider',
      url: 'https://uiinitiative.com/catalog/panorama-slider',
      description: '3D curved panorama effect',
    },
  ],
  'thumbs-gallery': [
    {
      title: 'Fashion Slider',
      url: 'https://uiinitiative.com/catalog/fashion-slider',
      description: 'E-commerce product showcase',
    },
  ],
  'effect-fade': [
    {
      title: 'Shaders Slider',
      url: 'https://uiinitiative.com/catalog/shaders-slider',
      description: 'Advanced WebGL fade transitions',
    },
    {
      title: 'Super Flow',
      url: 'https://uiinitiative.com/catalog/super-flow',
      description: 'Dynamic fragment transitions',
    },
  ],
  'effect-flip': [
    {
      title: 'Cards Stack Slider',
      url: 'https://uiinitiative.com/catalog/cards-stack-slider',
      description: 'Enhanced flip with front/back sides',
    },
  ],
  'multiple-swipers': [
    {
      title: 'Triple Slider',
      url: 'https://uiinitiative.com/catalog/triple-slider',
      description: 'Three synchronized swipers',
    },
  ],
  'pagination-custom': [
    {
      title: '3D Pagination',
      url: 'https://uiinitiative.com/catalog/swiper-3d-pagination',
      description: 'Unique 3D pagination styles',
    },
  ],
  autoplay: [
    {
      title: 'Super Flow',
      url: 'https://uiinitiative.com/catalog/super-flow',
      description: 'Fragment effect with autoplay',
    },
  ],
  vertical: [
    {
      title: 'Material You Slider',
      url: 'https://uiinitiative.com/catalog/material-you-slider',
      description: 'Material design carousel',
    },
  ],
  centered: [
    {
      title: 'Carousel Slider',
      url: 'https://uiinitiative.com/catalog/carousel-slider',
      description: 'True 3D infinite carousel',
    },
    {
      title: 'Material You Slider',
      url: 'https://uiinitiative.com/catalog/material-you-slider',
      description: 'Google Material You design',
    },
  ],
  'slides-per-view': [
    {
      title: 'Carousel Slider',
      url: 'https://uiinitiative.com/catalog/carousel-slider',
      description: 'True 3D infinite carousel',
    },
    {
      title: 'Material You Slider',
      url: 'https://uiinitiative.com/catalog/material-you-slider',
      description: 'Google Material You design',
    },
  ],
};

export function getPremiumProducts(slug) {
  return premiumProductsMap[slug] || null;
}

export default function PremiumUpsell({ slug }) {
  const products = premiumProductsMap[slug];

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="my-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
        <span>Want more? Check out premium alternatives:</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {products.map((product) => (
          <Link
            key={product.url}
            href={product.url}
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-lg bg-surface-1 px-3 py-1.5 text-sm hover:bg-surface-2 transition-colors border border-outline-variant !no-underline"
          >
            <span className="font-medium">{product.title}</span>
            <span className="text-on-surface-variant hidden sm:inline">
              - {product.description}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
