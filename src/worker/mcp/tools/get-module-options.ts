import { getTypesData } from '../utils/data-loader';

interface GetModuleOptionsParams {
  module: string;
}

/**
 * Normalize module name to match TypeScript naming convention
 * e.g., "navigation" -> "Navigation", "Navigation" -> "Navigation"
 */
function normalizeModuleName(module: string): string {
  if (!module) return '';
  return module.charAt(0).toUpperCase() + module.slice(1);
}

export async function getModuleOptions(
  params: GetModuleOptionsParams
): Promise<{
  content: Array<{
    type: 'text';
    text: string;
  }>;
  isError?: boolean;
}> {
  try {
    const { module } = params;

    if (!module || typeof module !== 'string') {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              error: 'Module parameter is required and must be a string',
            }),
          },
        ],
        isError: true,
      };
    }

    const typesData = getTypesData() as Record<string, unknown>;
    const normalizedModule = normalizeModuleName(module);

    // Look for Options, Methods, and Events for this module
    const optionsKey = `${normalizedModule}Options`;
    const methodsKey = `${normalizedModule}Methods`;
    const eventsKey = `${normalizedModule}Events`;

    const options = typesData[optionsKey];
    const methods = typesData[methodsKey];
    const events = typesData[eventsKey];

    // Check if any of them exist
    if (!options && !methods && !events) {
      // Try to find similar module names
      const availableModules = Object.keys(typesData)
        .filter((key) => key.endsWith('Options'))
        .map((key) => key.replace('Options', ''))
        .sort();

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              error: `Module "${module}" not found. Available modules: ${availableModules.join(', ')}`,
              availableModules,
            }),
          },
        ],
        isError: true,
      };
    }

    const result: {
      module: string;
      options?: unknown;
      methods?: unknown;
      events?: unknown;
    } = {
      module: normalizedModule,
    };

    if (options) {
      result.options = options;
    }

    if (methods) {
      result.methods = methods;
    }

    if (events) {
      result.events = events;
    }

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
