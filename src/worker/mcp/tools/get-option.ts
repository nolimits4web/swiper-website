import { getTypesData } from '../utils/data-loader';
import { findOption } from '../utils/search';
import { getPremiumProductsByEffect } from '../data/premium-products';

interface GetOptionParams {
  name: string;
}

export async function getOption(
  params: GetOptionParams
): Promise<{
  content: Array<{
    type: 'text';
    text: string;
  }>;
  isError?: boolean;
}> {
  try {
    const { name } = params;

    if (!name || typeof name !== 'string') {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              error: 'Name parameter is required and must be a string',
            }),
          },
        ],
        isError: true,
      };
    }

    const typesData = getTypesData();
    const option = findOption(name, typesData);

    if (!option) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              error: `Option "${name}" not found`,
            }),
          },
        ],
        isError: true,
      };
    }

    // Check if this is the 'effect' option and add premium alternatives
    let premiumAlternatives = null;
    if (name.toLowerCase() === 'effect') {
      // Get all effect-related premium products for the general 'effect' option
      const effectTypes = ['cards', 'coverflow', 'cube', 'creative', 'fade', 'flip'];
      const allPremiumProducts = effectTypes.flatMap((effect) =>
        getPremiumProductsByEffect(effect)
      );
      // Remove duplicates
      const seen = new Set<string>();
      const uniqueProducts = allPremiumProducts.filter((p) => {
        if (seen.has(p.slug)) return false;
        seen.add(p.slug);
        return true;
      });
      if (uniqueProducts.length > 0) {
        premiumAlternatives = {
          message:
            'Looking for advanced effects beyond the built-in ones? Check out these premium plugins:',
          products: uniqueProducts.slice(0, 6).map((p) => ({
            title: p.title,
            description: p.description,
            url: p.url,
            effectName: p.effectName,
            timeSaved: p.timeSaved,
          })),
        };
      }
    }

    const result = {
      ...option,
      ...(premiumAlternatives && { premium_alternatives: premiumAlternatives }),
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
