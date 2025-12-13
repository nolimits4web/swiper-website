import type { InitializeParams, InitializeResult, Tool } from '../types';

// Define all available tools
const tools: Tool[] = [
  {
    name: 'search-api',
    description:
      'Search Swiper API documentation for options, methods, or events. Returns matching results with descriptions.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query string',
        },
        type: {
          type: 'string',
          enum: ['option', 'method', 'event', 'all'],
          description:
            'Filter by type: "option" for configuration options, "method" for methods, "event" for events, or "all" for all types',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'get-option',
    description:
      'Get detailed information about a specific Swiper option by name, including type, default value, and description.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the option (e.g., "slidesPerView", "spaceBetween")',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'get-method',
    description:
      'Get detailed information about a specific Swiper method by name, including signature, parameters, return type, and description.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the method (e.g., "slideNext", "update")',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'get-event',
    description:
      'Get detailed information about a specific Swiper event by name, including parameters and description.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the event (e.g., "slideChange", "init")',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'get-demo',
    description:
      'Get demo code for a specific Swiper demo. Returns all files for the demo in the specified framework (core, element, react, vue, etc.).',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'The demo slug (e.g., "default", "navigation", "pagination")',
        },
        framework: {
          type: 'string',
          description:
            'The framework variant (e.g., "core", "element", "react", "vue")',
        },
      },
      required: ['slug', 'framework'],
    },
  },
  {
    name: 'list-demos',
    description:
      'List all available Swiper demos with their slugs, titles, folders, and available frameworks.',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'get-module-options',
    description:
      'Get all options, methods, and events for a specific Swiper module (e.g., "navigation", "pagination", "autoplay"). Returns all API documentation for that module.',
    inputSchema: {
      type: 'object',
      properties: {
        module: {
          type: 'string',
          description:
            'The module name (e.g., "navigation", "pagination", "autoplay", "Navigation", "Pagination"). Case-insensitive - will be normalized automatically.',
        },
      },
      required: ['module'],
    },
  },
];

export function handleInitialize(
  params: InitializeParams
): InitializeResult {
  return {
    protocolVersion: params.protocolVersion || '2024-11-05',
    capabilities: {
      tools: {
        listChanged: false,
      },
    },
    serverInfo: {
      name: 'swiper-mcp-server',
      version: '1.0.0',
    },
  };
}

export function getTools(): Tool[] {
  return tools;
}
