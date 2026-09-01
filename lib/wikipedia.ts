export type WikipediaBackground = {
  title: string;
  pageUrl: string;
  imageUrl: string;
};

type WikiPage = {
  title?: unknown;
  fullurl?: unknown;
  original?: { source?: unknown };
  thumbnail?: { source?: unknown };
};

export function wantsRandomWikipediaBackground(prompt: string) {
  const text = prompt.toLowerCase();
  return /\b(?:random|surprise me|any)\b/.test(text)
    && /\bwiki(?:pedia)?\b/.test(text)
    && /\bbackground\b/.test(text);
}

function trustedUrl(value: unknown, hostname: string) {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && (url.hostname === hostname || url.hostname.endsWith(`.${hostname}`)) ? url.href : null;
  } catch {
    return null;
  }
}

export async function fetchRandomWikipediaBackground(fetcher: typeof fetch = fetch): Promise<WikipediaBackground> {
  const endpoint = new URL('https://en.wikipedia.org/w/api.php');
  endpoint.search = new URLSearchParams({
    action: 'query',
    generator: 'random',
    grnnamespace: '0',
    grnlimit: '12',
    prop: 'pageimages|info',
    inprop: 'url',
    piprop: 'original|thumbnail',
    pithumbsize: '1600',
    format: 'json',
    formatversion: '2',
    maxlag: '5',
  }).toString();

  const response = await fetcher(endpoint, {
    headers: {
      accept: 'application/json',
      'user-agent': 'BYOW/0.3 (https://ai.rhyslindmark.com/byow)',
    },
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Wikipedia returned ${response.status}.`);
  const data = await response.json() as { query?: { pages?: WikiPage[] } };
  const pages = data.query?.pages ?? [];

  for (const page of pages) {
    const title = typeof page.title === 'string' ? page.title.trim() : '';
    const pageUrl = trustedUrl(page.fullurl, 'wikipedia.org');
    const imageUrl = trustedUrl(page.original?.source, 'wikimedia.org') ?? trustedUrl(page.thumbnail?.source, 'wikimedia.org');
    if (title && pageUrl && imageUrl) return { title, pageUrl, imageUrl };
  }
  throw new Error('Wikipedia did not return an illustrated article this time.');
}
