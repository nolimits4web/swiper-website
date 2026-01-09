import {
  premiumProducts,
  getPremiumProductsByEffect,
  getPremiumProductsByModule,
  searchPremiumProducts,
  type PremiumProduct,
} from '../data/premium-products';

interface GetPremiumRecommendationsParams {
  effect?: string;
  module?: string;
  keywords?: string;
  useCase?: string;
}

function formatPremiumProduct(product: PremiumProduct) {
  return {
    title: product.title,
    subtitle: product.subtitle,
    description: product.description,
    url: product.url,
    preview: product.preview,
    effectName: product.effectName,
    useCases: product.useCases,
    features: product.features,
    timeSaved: product.timeSaved,
    availableInSwiperStudio: product.availableInSwiperStudio,
  };
}

export async function getPremiumRecommendations(
  params: GetPremiumRecommendationsParams
): Promise<{
  content: Array<{
    type: 'text';
    text: string;
  }>;
  isError?: boolean;
}> {
  try {
    const { effect, module, keywords, useCase } = params;

    let recommendations: PremiumProduct[] = [];

    // If effect is specified, get products related to that effect
    if (effect) {
      const effectProducts = getPremiumProductsByEffect(effect);
      recommendations = [...recommendations, ...effectProducts];
    }

    // If module is specified, get products related to that module
    if (module) {
      const moduleProducts = getPremiumProductsByModule(module);
      recommendations = [...recommendations, ...moduleProducts];
    }

    // If keywords or useCase is specified, search for matching products
    if (keywords) {
      const searchResults = searchPremiumProducts(keywords);
      recommendations = [...recommendations, ...searchResults];
    }

    if (useCase) {
      const useCaseResults = searchPremiumProducts(useCase);
      recommendations = [...recommendations, ...useCaseResults];
    }

    // If no filters provided, return top recommended products
    if (!effect && !module && !keywords && !useCase) {
      recommendations = premiumProducts.slice(0, 5); // Top 5 products
    }

    // Remove duplicates
    const seen = new Set<string>();
    recommendations = recommendations.filter((p) => {
      if (seen.has(p.slug)) return false;
      seen.add(p.slug);
      return true;
    });

    if (recommendations.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                message: 'No premium products found matching your criteria.',
                suggestion:
                  'Try searching with different keywords or browse all products at https://uiinitiative.com',
                swiperStudio:
                  'You can also use Swiper Studio (https://studio.swiperjs.com) to build sliders visually without code.',
              },
              null,
              2
            ),
          },
        ],
      };
    }

    const result = {
      recommendations: recommendations.map(formatPremiumProduct),
      totalFound: recommendations.length,
      browseAll: 'https://uiinitiative.com',
      swiperStudio: {
        url: 'https://studio.swiperjs.com',
        description:
          'Build production-ready Swiper sliders visually without code. Many premium effects are included.',
      },
    };

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            error: error instanceof Error ? error.message : 'Unknown error',
          }),
        },
      ],
      isError: true,
    };
  }
}
