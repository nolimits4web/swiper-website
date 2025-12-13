type TypeItem = {
  readonly name: string;
  readonly default_value?: string | null;
  readonly type?: unknown;
  readonly comment?: unknown;
  readonly signatures?: unknown;
};

type TypesData = {
  readonly [key: string]: readonly TypeItem[];
};

interface SearchResult {
  name: string;
  type: string;
  description?: string;
  default_value?: string | null;
  category: 'option' | 'method' | 'event';
  fullData?: unknown;
}

/**
 * Simple fuzzy matching score
 */
function fuzzyScore(query: string, text: string): number {
  const lowerQuery = query.toLowerCase();
  const lowerText = text.toLowerCase();

  // Exact match gets highest score
  if (lowerText === lowerQuery) return 100;
  if (lowerText.startsWith(lowerQuery)) return 80;
  if (lowerText.includes(lowerQuery)) return 60;

  // Word boundary matches
  const words = lowerText.split(/[-_\s]/);
  for (const word of words) {
    if (word.startsWith(lowerQuery)) return 50;
    if (word.includes(lowerQuery)) return 30;
  }

  // Character sequence match
  let queryIndex = 0;
  for (let i = 0; i < lowerText.length && queryIndex < lowerQuery.length; i++) {
    if (lowerText[i] === lowerQuery[queryIndex]) {
      queryIndex++;
    }
  }
  if (queryIndex === lowerQuery.length) return 20;

  return 0;
}

/**
 * Extract description from comment
 */
function extractDescription(comment: unknown): string | undefined {
  if (!comment || typeof comment !== 'object') return undefined;

  const comm = comment as {
    summary?: Array<{ kind?: string; text?: string }>;
    shortText?: string;
  };

  if (comm.summary && Array.isArray(comm.summary)) {
    return comm.summary
      .map((item) => (item.kind === 'text' ? item.text : ''))
      .filter(Boolean)
      .join(' ')
      .trim();
  }

  if (comm.shortText) {
    return comm.shortText.trim();
  }

  return undefined;
}

/**
 * Determine if a type name represents options, methods, or events
 */
function getCategory(typeName: string): 'option' | 'method' | 'event' {
  if (typeName.endsWith('Options')) return 'option';
  if (typeName.endsWith('Methods')) return 'method';
  if (typeName.endsWith('Events')) return 'event';
  return 'option'; // Default fallback
}

/**
 * Search through SwiperOptions and component options
 */
export function searchOptions(
  query: string,
  typesData: TypesData | unknown
): SearchResult[] {
  const data = typesData as TypesData;
  const results: SearchResult[] = [];

  // Search through all *Options types
  for (const [typeName, items] of Object.entries(data)) {
    if (!typeName.endsWith('Options')) continue;
    if (!Array.isArray(items)) continue;

    for (const item of items) {
      const score = fuzzyScore(query, item.name);
      if (score > 0) {
        results.push({
          name: item.name,
          type: typeName,
          description: extractDescription(item.comment),
          default_value: item.default_value,
          category: 'option',
          fullData: item,
        });
      }
    }
  }

  // Sort by relevance score (descending)
  return results
    .map((result) => ({
      ...result,
      score: fuzzyScore(query, result.name),
    }))
    .sort((a, b) => (b.score as number) - (a.score as number))
    .slice(0, 50) // Limit results
    .map(({ score, ...rest }) => rest);
}

/**
 * Search through Swiper methods and component methods
 */
export function searchMethods(
  query: string,
  typesData: TypesData | unknown
): SearchResult[] {
  const data = typesData as TypesData;
  const results: SearchResult[] = [];

  // Search through all *Methods types
  for (const [typeName, items] of Object.entries(data)) {
    if (!typeName.endsWith('Methods')) continue;
    if (!Array.isArray(items)) continue;

    for (const item of items) {
      const score = fuzzyScore(query, item.name);
      if (score > 0) {
        results.push({
          name: item.name,
          type: typeName,
          description: extractDescription(item.comment),
          category: 'method',
          fullData: item,
        });
      }
    }
  }

  // Also search the "Swiper" key for methods (items with signatures)
  const swiperItems = data.Swiper;
  if (Array.isArray(swiperItems)) {
    for (const item of swiperItems) {
      // Only include items with signatures (methods, not properties)
      if (item.signatures) {
        const score = fuzzyScore(query, item.name);
        if (score > 0) {
          results.push({
            name: item.name,
            type: 'Swiper',
            description: extractDescription(item.comment || item.signatures?.[0]?.comment),
            category: 'method',
            fullData: item,
          });
        }
      }
    }
  }

  // Sort by relevance score (descending)
  return results
    .map((result) => ({
      ...result,
      score: fuzzyScore(query, result.name),
    }))
    .sort((a, b) => (b.score as number) - (a.score as number))
    .slice(0, 50) // Limit results
    .map(({ score, ...rest }) => rest);
}

/**
 * Search through Swiper events and component events
 */
export function searchEvents(
  query: string,
  typesData: TypesData | unknown
): SearchResult[] {
  const data = typesData as TypesData;
  const results: SearchResult[] = [];

  // Search through all *Events types
  for (const [typeName, items] of Object.entries(data)) {
    if (!typeName.endsWith('Events')) continue;
    if (!Array.isArray(items)) continue;

    for (const item of items) {
      const score = fuzzyScore(query, item.name);
      if (score > 0) {
        results.push({
          name: item.name,
          type: typeName,
          description: extractDescription(item.comment),
          category: 'event',
          fullData: item,
        });
      }
    }
  }

  // Sort by relevance score (descending)
  return results
    .map((result) => ({
      ...result,
      score: fuzzyScore(query, result.name),
    }))
    .sort((a, b) => (b.score as number) - (a.score as number))
    .slice(0, 50) // Limit results
    .map(({ score, ...rest }) => rest);
}

/**
 * Search through all API items (options, methods, events)
 */
export function searchAll(
  query: string,
  typesData: TypesData | unknown
): SearchResult[] {
  const data = typesData as TypesData;
  const allResults = [
    ...searchOptions(query, typesData),
    ...searchMethods(query, typesData),
    ...searchEvents(query, typesData),
  ];

  // Sort by relevance score (descending)
  return allResults
    .map((result) => ({
      ...result,
      score: fuzzyScore(query, result.name),
    }))
    .sort((a, b) => (b.score as number) - (a.score as number))
    .slice(0, 50) // Limit results
    .map(({ score, ...rest }) => rest);
}

/**
 * Find a specific option by name
 */
export function findOption(
  name: string,
  typesData: TypesData | unknown
): SearchResult | null {
  const data = typesData as TypesData;
  for (const [typeName, items] of Object.entries(data)) {
    if (!typeName.endsWith('Options')) continue;
    if (!Array.isArray(items)) continue;

    const item = items.find((item) => item.name === name);
    if (item) {
      return {
        name: item.name,
        type: typeName,
        description: extractDescription(item.comment),
        default_value: item.default_value,
        category: 'option',
        fullData: item,
      };
    }
  }
  return null;
}

/**
 * Find a specific method by name
 */
export function findMethod(
  name: string,
  typesData: TypesData | unknown
): SearchResult | null {
  const data = typesData as TypesData;

  // Check all *Methods types
  for (const [typeName, items] of Object.entries(data)) {
    if (!typeName.endsWith('Methods')) continue;
    if (!Array.isArray(items)) continue;

    const item = items.find((item) => item.name === name);
    if (item) {
      return {
        name: item.name,
        type: typeName,
        description: extractDescription(item.comment),
        category: 'method',
        fullData: item,
      };
    }
  }

  // Also check the "Swiper" key which contains methods (items with signatures)
  const swiperItems = data.Swiper;
  if (Array.isArray(swiperItems)) {
    const item = swiperItems.find(
      (item) => item.name === name && item.signatures
    );
    if (item) {
      return {
        name: item.name,
        type: 'Swiper',
        description: extractDescription(item.comment || item.signatures?.[0]?.comment),
        category: 'method',
        fullData: item,
      };
    }
  }

  return null;
}

/**
 * Find a specific event by name
 */
export function findEvent(
  name: string,
  typesData: TypesData | unknown
): SearchResult | null {
  const data = typesData as TypesData;
  for (const [typeName, items] of Object.entries(data)) {
    if (!typeName.endsWith('Events')) continue;
    if (!Array.isArray(items)) continue;

    const item = items.find((item) => item.name === name);
    if (item) {
      return {
        name: item.name,
        type: typeName,
        description: extractDescription(item.comment),
        category: 'event',
        fullData: item,
      };
    }
  }
  return null;
}
