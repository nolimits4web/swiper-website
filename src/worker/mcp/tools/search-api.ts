import { getTypesData } from '../utils/data-loader';
import {
  searchOptions,
  searchMethods,
  searchEvents,
  searchAll,
} from '../utils/search';

interface SearchApiParams {
  query: string;
  type?: 'option' | 'method' | 'event' | 'all';
}

export async function searchApi(
  params: SearchApiParams
): Promise<{
  content: Array<{
    type: 'text';
    text: string;
  }>;
  isError?: boolean;
}> {
  try {
    const { query, type = 'all' } = params;

    if (!query || typeof query !== 'string') {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              error: 'Query parameter is required and must be a string',
            }),
          },
        ],
        isError: true,
      };
    }

    const typesData = getTypesData();
    let results;

    switch (type) {
      case 'option':
        results = searchOptions(query, typesData);
        break;
      case 'method':
        results = searchMethods(query, typesData);
        break;
      case 'event':
        results = searchEvents(query, typesData);
        break;
      case 'all':
      default:
        results = searchAll(query, typesData);
        break;
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(results, null, 2),
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
