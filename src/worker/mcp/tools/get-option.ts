import { getTypesData } from '../utils/data-loader';
import { findOption } from '../utils/search';

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

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(option, null, 2),
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
