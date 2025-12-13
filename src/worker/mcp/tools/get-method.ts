import { getTypesData } from '../utils/data-loader';
import { findMethod } from '../utils/search';

interface GetMethodParams {
  name: string;
}

export async function getMethod(
  params: GetMethodParams
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
    const method = findMethod(name, typesData);

    if (!method) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              error: `Method "${name}" not found`,
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
          text: JSON.stringify(method, null, 2),
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
