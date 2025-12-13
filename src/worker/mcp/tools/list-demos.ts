import { getDemosData } from '../utils/data-loader';

export async function listDemos(): Promise<{
  content: Array<{
    type: 'text';
    text: string;
  }>;
  isError?: boolean;
}> {
  try {
    const demos = getDemosData();

    // Return the demos list as-is (already has the correct structure)
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(demos, null, 2),
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
