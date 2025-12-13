import { typesData } from '../data/types';
import { demosData } from '../data/demos';

// Cache for demo files
const demoCache = new Map<string, unknown>();

export function getTypesData(): unknown {
  return typesData;
}

export function getDemosData() {
  return demosData;
}

export async function getDemoFile(
  folder: string,
  framework: string,
  assets: { fetch: (request: Request | string) => Promise<Response> },
  baseUrl: string
): Promise<Record<string, { content: string }>> {
  const cacheKey = `${folder}/${framework}`;

  // Check cache first
  if (demoCache.has(cacheKey)) {
    return demoCache.get(cacheKey) as Record<string, { content: string }>;
  }

  // Fetch from ASSETS
  const demoUrl = new URL(`/demos/${folder}/${framework}.json`, baseUrl);
  const response = await assets.fetch(demoUrl.toString());


  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        `Demo file not found: ${folder}/${framework}.json. Available frameworks may be limited for this demo.`
      );
    }
    throw new Error(
      `Failed to fetch demo file: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as Record<string, { content: string }>;

  // Cache the result
  demoCache.set(cacheKey, data);

  return data;
}

export function findDemoBySlug(slug: string) {
  return demosData.find((demo) => demo.slug === slug);
}
