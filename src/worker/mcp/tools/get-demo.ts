import { getDemoFile, findDemoBySlug } from '../utils/data-loader';

interface GetDemoParams {
  slug: string;
  framework: string;
}

export async function getDemo(
  params: GetDemoParams,
  assets: { fetch: (request: Request | string) => Promise<Response> },
  baseUrl: string
): Promise<{
  content: Array<{
    type: 'text';
    text: string;
  }>;
  isError?: boolean;
}> {
  try {
    const { slug, framework } = params;

    if (!slug || typeof slug !== 'string') {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              error: 'Slug parameter is required and must be a string',
            }),
          },
        ],
        isError: true,
      };
    }

    if (!framework || typeof framework !== 'string') {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              error:
                'Framework parameter is required and must be a string (e.g., "core", "element", "react", "vue")',
            }),
          },
        ],
        isError: true,
      };
    }

    // Find the demo by slug
    const demo = findDemoBySlug(slug);
    if (!demo) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              error: `Demo with slug "${slug}" not found`,
            }),
          },
        ],
        isError: true,
      };
    }

    // Validate that the requested framework exists in the demo's frameworks array
    if (!(demo.frameworks as readonly string[]).includes(framework)) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              error: `Framework "${framework}" is not available for demo "${slug}". Available frameworks: ${demo.frameworks.join(', ')}`,
            }),
          },
        ],
        isError: true,
      };
    }

    // Fetch the demo file
    const demoFiles = await getDemoFile(demo.folder, framework, assets, baseUrl);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(demoFiles, null, 2),
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
