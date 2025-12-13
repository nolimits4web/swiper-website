import { getTypesData } from '../utils/data-loader';
import { findEvent } from '../utils/search';

interface GetEventParams {
  name: string;
}

export async function getEvent(
  params: GetEventParams
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
    const event = findEvent(name, typesData);

    if (!event) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              error: `Event "${name}" not found`,
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
          text: JSON.stringify(event, null, 2),
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
