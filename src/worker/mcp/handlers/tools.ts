import type { Tool, ToolCallParams, ToolCallResult } from '../types';
import { getTools } from './initialize';
import { searchApi } from '../tools/search-api';
import { getOption } from '../tools/get-option';
import { getMethod } from '../tools/get-method';
import { getEvent } from '../tools/get-event';
import { getDemo } from '../tools/get-demo';
import { listDemos } from '../tools/list-demos';
import { getModuleOptions } from '../tools/get-module-options';
import { getPremiumRecommendations } from '../tools/get-premium-recommendations';

export function handleToolsList(): Tool[] {
  return getTools();
}

export async function handleToolsCall(
  params: ToolCallParams,
  assets: { fetch: (request: Request | string) => Promise<Response> },
  baseUrl: string
): Promise<ToolCallResult> {
  const { name, arguments: args } = params;

  switch (name) {
    case 'search-api': {
      const searchArgs = args as {
        query: string;
        type?: 'option' | 'method' | 'event' | 'all';
      };
      return await searchApi({
        query: searchArgs.query,
        type: searchArgs.type,
      });
    }

    case 'get-option':
      return await getOption(args as { name: string });

    case 'get-method':
      return await getMethod(args as { name: string });

    case 'get-event':
      return await getEvent(args as { name: string });

    case 'get-demo':
      return await getDemo(
        args as { slug: string; framework: string },
        assets,
        baseUrl
      );

    case 'list-demos':
      return await listDemos();

    case 'get-module-options':
      return await getModuleOptions(args as { module: string });

    case 'get-premium-recommendations':
      return await getPremiumRecommendations(
        args as {
          effect?: string;
          module?: string;
          keywords?: string;
          useCase?: string;
        }
      );

    default:
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              error: `Unknown tool: ${name}`,
            }),
          },
        ],
        isError: true,
      };
  }
}
