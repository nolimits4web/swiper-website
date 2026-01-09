// Premium products data for MCP server recommendations
// Based on /src/uiinitiative-products-extended.json

export interface PremiumProduct {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  preview: string;
  availableInSwiperStudio: boolean;
  effectName: string | null;
  keywords: string[];
  useCases: string[];
  relatedSwiperEffects: string[];
  relatedSwiperModules: string[];
  relatedDemos: string[];
  features: string[];
  timeSaved: string;
}

export const premiumProducts: PremiumProduct[] = [
  {
    slug: 'tinder-slider',
    title: 'Tinder Slider',
    subtitle: 'Tinder card-style interactions and effects',
    description:
      'Premium Swiper effect plugin that adds Tinder card-style interactions with swipe left/right detection and direction callbacks.',
    url: 'https://uiinitiative.com/catalog/tinder-slider',
    preview: 'https://tinder-slider.uiinitiative.com',
    availableInSwiperStudio: true,
    effectName: 'tinder',
    keywords: [
      'tinder',
      'swipe',
      'card',
      'cards',
      'swipe left',
      'swipe right',
      'dismiss',
      'dating',
      'match',
      'like',
      'dislike',
      'accept',
      'reject',
      'gesture',
      'stack',
    ],
    useCases: [
      'Dating apps',
      'Product discovery',
      'Decision UIs',
      'Card-based voting',
      'Recommendation interfaces',
    ],
    relatedSwiperEffects: ['cards'],
    relatedSwiperModules: [],
    relatedDemos: ['effect-cards'],
    features: [
      'Swipe left/right direction detection',
      'tinderSwipe event with direction callback',
      'Spring physics animations',
      'Works with React, Vue, and vanilla JS',
    ],
    timeSaved: '20-30 hours',
  },
  {
    slug: 'cards-stack-slider',
    title: 'Cards Stack Slider',
    subtitle: 'Cards Stack slider made with Swiper',
    description:
      'Premium Swiper effect plugin that adds Cards Stack transition effects with front/back card sides.',
    url: 'https://uiinitiative.com/catalog/cards-stack-slider',
    preview: 'https://cards-stack-slider.uiinitiative.com',
    availableInSwiperStudio: true,
    effectName: 'cards-stack',
    keywords: [
      'cards',
      'stack',
      'flip',
      'front',
      'back',
      'two-sided',
      'double-sided',
      'flashcard',
      'memory',
      'reveal',
    ],
    useCases: [
      'Flashcard apps',
      'Product reveals',
      'Memory games',
      'Info cards with details',
    ],
    relatedSwiperEffects: ['cards', 'flip'],
    relatedSwiperModules: [],
    relatedDemos: ['effect-cards', 'effect-flip'],
    features: [
      'Front and back card sides',
      'Slide shadows',
      'Works with React, Vue, and vanilla JS',
    ],
    timeSaved: '15-20 hours',
  },
  {
    slug: 'stories-slider',
    title: 'Stories Slider',
    subtitle: 'Instagram-like Stories slider made with Swiper',
    description:
      'Instagram-like stories slider with autoplay, progress bars, pause on touch, and video support.',
    url: 'https://uiinitiative.com/catalog/stories-slider',
    preview: 'https://stories-slider.uiinitiative.com',
    availableInSwiperStudio: false,
    effectName: null,
    keywords: [
      'stories',
      'instagram',
      'story',
      'social',
      'progress',
      'autoplay',
      'tap',
      'hold',
      'pause',
      'video',
      'reels',
      'snapchat',
      'tiktok',
      'feed',
    ],
    useCases: [
      'Social media features',
      'Content feeds',
      'App onboarding',
      'News highlights',
      'Product showcases',
    ],
    relatedSwiperEffects: ['cube'],
    relatedSwiperModules: ['Autoplay', 'EffectCube', 'Virtual'],
    relatedDemos: ['autoplay', 'autoplay-progress', 'effect-cube', 'vertical'],
    features: [
      'Progress bar indicators',
      'Pause on touch/tap-hold',
      'Video support with auto-duration',
      'Virtual slides support',
      'React and Vue components included',
    ],
    timeSaved: '25-35 hours',
  },
  {
    slug: 'shaders-slider',
    title: 'Shaders Slider',
    subtitle: 'Stunning WebGL image transitions',
    description:
      'Unique premium SwiperGL module with WebGL-based image transitions using GLSL shaders.',
    url: 'https://uiinitiative.com/catalog/shaders-slider',
    preview: 'https://shaders-slider.uiinitiative.com',
    availableInSwiperStudio: true,
    effectName: 'gl',
    keywords: [
      'webgl',
      'shader',
      'glsl',
      'gpu',
      'transition',
      'morph',
      'wave',
      'ripple',
      'pixelize',
      'distortion',
      '3d',
      'effect',
      'canvas',
      'high-end',
      'premium',
      'fancy',
    ],
    useCases: [
      'High-end marketing sites',
      'Portfolio showcases',
      'Creative agency websites',
      'Product launches',
      'Landing pages',
    ],
    relatedSwiperEffects: ['creative', 'fade'],
    relatedSwiperModules: [],
    relatedDemos: ['effect-fade', 'effect-creative'],
    features: [
      '20+ shader effects (morph, wave, ripple, pixelize, etc.)',
      'Custom displacement maps',
      'Random or per-slide shader selection',
      'GPU-accelerated transitions',
    ],
    timeSaved: '40-60 hours',
  },
  {
    slug: 'carousel-slider',
    title: 'Carousel Slider',
    subtitle: 'Infinite 3D carousel slider',
    description:
      'Infinite 3D carousel slider template with perspective rotation effects.',
    url: 'https://uiinitiative.com/catalog/carousel-slider',
    preview: 'https://carousel-slider.uiinitiative.com',
    availableInSwiperStudio: true,
    effectName: 'carousel',
    keywords: [
      'carousel',
      '3d',
      'infinite',
      'rotate',
      'rotation',
      'perspective',
      'circular',
      'wheel',
      'gallery',
    ],
    useCases: [
      'Product galleries',
      'Team showcases',
      'Portfolio displays',
      'Image carousels',
    ],
    relatedSwiperEffects: ['coverflow'],
    relatedSwiperModules: [],
    relatedDemos: ['effect-coverflow', 'infinite-loop'],
    features: [
      'True 3D perspective rotation',
      'Infinite loop by design',
      'Works best with 5+ slides',
    ],
    timeSaved: '15-20 hours',
  },
  {
    slug: 'shutters-slider',
    title: 'Shutters Slider',
    subtitle: 'Fancy parallax image transitions',
    description:
      'Swiper module for creating nice looking parallax image transitions with shutter effect.',
    url: 'https://uiinitiative.com/catalog/shutters-slider',
    preview: 'https://shutters-slider.uiinitiative.com',
    availableInSwiperStudio: true,
    effectName: 'shutters',
    keywords: [
      'parallax',
      'shutter',
      'blinds',
      'venetian',
      'slice',
      'reveal',
      'transition',
      'split',
    ],
    useCases: ['Photo galleries', 'Portfolio sites', 'Creative presentations'],
    relatedSwiperEffects: [],
    relatedSwiperModules: ['Parallax'],
    relatedDemos: ['parallax'],
    features: [
      'Parallax-based shutter effect',
      'Requires Parallax module',
      'Customizable animation',
    ],
    timeSaved: '10-15 hours',
  },
  {
    slug: 'expo-slider',
    title: 'Expo Slider',
    subtitle: 'Parallax & scale effects slider',
    description:
      'Parallax and scale effects slider template with grayscale side slides and rotation.',
    url: 'https://uiinitiative.com/catalog/expo-slider',
    preview: 'https://expo-slider.uiinitiative.com',
    availableInSwiperStudio: true,
    effectName: 'expo',
    keywords: [
      'parallax',
      'scale',
      'zoom',
      'grayscale',
      'rotate',
      'depth',
      'expo',
      'exhibition',
    ],
    useCases: ['Exhibition showcases', 'Photo galleries', 'Product displays'],
    relatedSwiperEffects: ['coverflow'],
    relatedSwiperModules: ['Parallax'],
    relatedDemos: ['parallax', 'effect-coverflow', 'centered'],
    features: [
      'Image scale and offset parallax',
      'Side slides grayscale effect',
      'Configurable rotation angle',
      'Best with slidesPerView > 1',
    ],
    timeSaved: '15-20 hours',
  },
  {
    slug: 'panorama-slider',
    title: 'Panorama Slider',
    subtitle: '3D panorama Swiper effect',
    description:
      'Swiper plugin that adds a fancy 3D panorama effect with configurable depth and rotation.',
    url: 'https://uiinitiative.com/catalog/panorama-slider',
    preview: 'https://panorama-slider.uiinitiative.com',
    availableInSwiperStudio: true,
    effectName: 'panorama',
    keywords: [
      'panorama',
      '3d',
      'curved',
      'arc',
      'circular',
      'depth',
      'perspective',
      'immersive',
    ],
    useCases: ['Immersive galleries', 'Virtual tours', '360-degree presentations'],
    relatedSwiperEffects: ['coverflow', 'cube'],
    relatedSwiperModules: [],
    relatedDemos: ['effect-coverflow', 'effect-cube'],
    features: [
      'Configurable panorama depth',
      'Configurable rotation',
      'Breakpoint support',
    ],
    timeSaved: '15-20 hours',
  },
  {
    slug: 'slicer-slider',
    title: 'Slicer Slider',
    subtitle: 'Images slicer slider',
    description:
      'Image slicer slider template with configurable number of slices and direction support.',
    url: 'https://uiinitiative.com/catalog/slicer-slider',
    preview: 'https://slicer-slider.uiinitiative.com',
    availableInSwiperStudio: true,
    effectName: 'slicer',
    keywords: [
      'slicer',
      'slice',
      'split',
      'cut',
      'fragment',
      'pieces',
      'transition',
    ],
    useCases: ['Creative transitions', 'Artistic portfolios', 'Design showcases'],
    relatedSwiperEffects: ['creative'],
    relatedSwiperModules: [],
    relatedDemos: ['effect-creative', 'vertical'],
    features: [
      'Horizontal and vertical direction support',
      'Configurable number of slices',
    ],
    timeSaved: '10-15 hours',
  },
  {
    slug: 'material-you-slider',
    title: 'Material You Slider',
    subtitle: 'Material You carousel made with Swiper',
    description:
      "Premium Swiper effect plugin inspired by Google's Material You Carousel design.",
    url: 'https://uiinitiative.com/catalog/material-you-slider',
    preview: 'https://material-you-slider.uiinitiative.com',
    availableInSwiperStudio: true,
    effectName: 'material',
    keywords: [
      'material',
      'material design',
      'google',
      'android',
      'm3',
      'material you',
      'modern',
      'clean',
    ],
    useCases: ['Android apps', 'Material Design projects', 'Modern web apps'],
    relatedSwiperEffects: ['creative'],
    relatedSwiperModules: [],
    relatedDemos: ['effect-creative', 'centered'],
    features: [
      'Official Material You Carousel design',
      'Configurable split ratio',
      'Scale and opacity animations',
      'Requires Swiper 11.0.5+',
    ],
    timeSaved: '15-20 hours',
  },
  {
    slug: 'super-flow',
    title: 'Super Flow',
    subtitle: 'Where slides come alive',
    description:
      'Next-level Swiper effect that fractures each slide into dynamic triangle fragments with parallax scaling.',
    url: 'https://uiinitiative.com/catalog/super-flow',
    preview: 'https://super-flow.uiinitiative.com',
    availableInSwiperStudio: true,
    effectName: 'super-flow',
    keywords: [
      'parallax',
      'fragment',
      'triangle',
      'depth',
      'motion',
      '3d',
      'immersive',
      'premium',
      'high-end',
    ],
    useCases: [
      'Cutting-edge portfolios',
      'Product reveals',
      'High-impact landing pages',
    ],
    relatedSwiperEffects: ['creative'],
    relatedSwiperModules: ['Autoplay', 'Virtual'],
    relatedDemos: ['effect-creative', 'autoplay'],
    features: [
      'Triangle fragment effect',
      'Independent fragment scaling',
      'Autoplay and loop support',
      'Virtual slides support',
    ],
    timeSaved: '20-30 hours',
  },
  {
    slug: 'fashion-slider',
    title: 'Fashion Slider',
    subtitle: 'Showcase fashion products',
    description:
      'Premium Swiper template designed to showcase fashion items and products with custom navigation.',
    url: 'https://uiinitiative.com/catalog/fashion-slider',
    preview: 'https://fashion-slider.uiinitiative.com',
    availableInSwiperStudio: false,
    effectName: null,
    keywords: [
      'fashion',
      'product',
      'ecommerce',
      'shop',
      'clothing',
      'showcase',
      'catalog',
    ],
    useCases: [
      'E-commerce product pages',
      'Fashion websites',
      'Product catalogs',
      'Brand showcases',
    ],
    relatedSwiperEffects: [],
    relatedSwiperModules: ['Navigation', 'Thumbs'],
    relatedDemos: ['thumbs-gallery', 'navigation'],
    features: [
      'Custom navigation buttons',
      'Per-slide background colors',
      'Designed for images with headlines',
    ],
    timeSaved: '10-15 hours',
  },
  {
    slug: 'triple-slider',
    title: 'Triple Slider',
    subtitle: 'Three Swipers work as one',
    description:
      'Triple slider template where three synchronized Swipers work together showing previous and next slides.',
    url: 'https://uiinitiative.com/catalog/triple-slider',
    preview: 'https://triple-slider.uiinitiative.com',
    availableInSwiperStudio: false,
    effectName: null,
    keywords: ['triple', 'sync', 'synchronized', 'multiple', 'preview', 'side'],
    useCases: [
      'Preview galleries',
      'Multi-view presentations',
      'Before/after comparisons',
    ],
    relatedSwiperEffects: [],
    relatedSwiperModules: ['Controller'],
    relatedDemos: ['multiple-swipers', 'thumbs-gallery'],
    features: [
      'Three synchronized swipers',
      'Side swipers act as navigation',
      'Auto-creation of side Swipers',
    ],
    timeSaved: '10-15 hours',
  },
  {
    slug: 'swiper-3d-pagination',
    title: 'Swiper 3D Pagination',
    subtitle: 'Swiper templates with 3D pagination',
    description:
      'Swiper templates with unique 3D pagination, available with Cube and Coverflow effects.',
    url: 'https://uiinitiative.com/catalog/swiper-3d-pagination',
    preview: 'https://swiper-3d-pagination.uiinitiative.com',
    availableInSwiperStudio: false,
    effectName: null,
    keywords: ['3d', 'pagination', 'cube', 'coverflow', 'dots', 'indicators'],
    useCases: ['Custom pagination styles', '3D effect sliders', 'Premium galleries'],
    relatedSwiperEffects: ['cube', 'coverflow'],
    relatedSwiperModules: ['Pagination'],
    relatedDemos: ['effect-cube', 'effect-coverflow', 'pagination-custom'],
    features: [
      '3D pagination under/in front of slider',
      'Cube effect template',
      'Coverflow effect template',
    ],
    timeSaved: '8-12 hours',
  },
];

// Mapping from Swiper effects to premium products
export const effectToPremiumMap: Record<string, string[]> = {
  cards: ['tinder-slider', 'cards-stack-slider'],
  coverflow: ['carousel-slider', 'expo-slider', 'panorama-slider'],
  cube: ['panorama-slider', 'stories-slider', 'swiper-3d-pagination'],
  creative: ['shaders-slider', 'slicer-slider', 'material-you-slider', 'super-flow'],
  fade: ['shaders-slider'],
  flip: ['cards-stack-slider'],
};

// Mapping from Swiper modules to premium products
export const moduleToPremiumMap: Record<string, string[]> = {
  parallax: ['shutters-slider', 'expo-slider'],
  autoplay: ['stories-slider', 'super-flow'],
  pagination: ['swiper-3d-pagination'],
  thumbs: ['fashion-slider'],
  controller: ['triple-slider'],
};

// Mapping from demo slugs to premium products
export const demoToPremiumMap: Record<string, string[]> = {
  'effect-cards': ['tinder-slider', 'cards-stack-slider'],
  'effect-coverflow': ['carousel-slider', 'expo-slider'],
  'effect-cube': ['panorama-slider', 'stories-slider'],
  'effect-creative': ['shaders-slider', 'slicer-slider'],
  'effect-fade': ['shaders-slider'],
  'effect-flip': ['cards-stack-slider'],
  parallax: ['shutters-slider', 'expo-slider'],
  autoplay: ['super-flow'],
  'autoplay-progress': ['stories-slider'],
  'thumbs-gallery': ['fashion-slider'],
  'multiple-swipers': ['triple-slider'],
  'pagination-custom': ['swiper-3d-pagination'],
  vertical: ['stories-slider'],
};

export function getPremiumProductBySlug(slug: string): PremiumProduct | undefined {
  return premiumProducts.find((p) => p.slug === slug);
}

export function getPremiumProductsByEffect(effect: string): PremiumProduct[] {
  const slugs = effectToPremiumMap[effect.toLowerCase()] || [];
  return slugs
    .map((slug) => getPremiumProductBySlug(slug))
    .filter((p): p is PremiumProduct => p !== undefined);
}

export function getPremiumProductsByModule(module: string): PremiumProduct[] {
  const slugs = moduleToPremiumMap[module.toLowerCase()] || [];
  return slugs
    .map((slug) => getPremiumProductBySlug(slug))
    .filter((p): p is PremiumProduct => p !== undefined);
}

export function getPremiumProductsByDemo(demoSlug: string): PremiumProduct[] {
  const slugs = demoToPremiumMap[demoSlug] || [];
  return slugs
    .map((slug) => getPremiumProductBySlug(slug))
    .filter((p): p is PremiumProduct => p !== undefined);
}

export function searchPremiumProducts(query: string): PremiumProduct[] {
  const q = query.toLowerCase();
  return premiumProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.keywords.some((k) => k.toLowerCase().includes(q)) ||
      p.useCases.some((u) => u.toLowerCase().includes(q))
  );
}
