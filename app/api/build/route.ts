import { buildPatch, initialSite, type SiteState } from '@/lib/builder';
import { fetchRandomWikipediaBackground, wantsRandomWikipediaBackground } from '@/lib/wikipedia';

export async function POST(request: Request) {
  let prompt = '';
  let site: SiteState = initialSite;
  try {
    const body = await request.json() as { prompt?: unknown; site?: unknown };
    prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
    if (body.site && typeof body.site === 'object') site = { ...initialSite, ...body.site } as SiteState;
  } catch {
    return Response.json({ error: 'Send a JSON prompt.' }, { status: 400 });
  }
  if (!prompt || prompt.length > 1000) {
    return Response.json({ error: 'Prompt must be between 1 and 1,000 characters.' }, { status: 400 });
  }
  if (wantsRandomWikipediaBackground(prompt)) {
    try {
      const article = await fetchRandomWikipediaBackground();
      return Response.json({
        patch: {
          backgroundImage: article.imageUrl,
          backgroundSourceLabel: `${article.title} — Wikipedia`,
          backgroundSourceUrl: article.pageUrl,
          foreground: '#fffef5',
          accent: '#ffe45c',
          highlight: '#ff6f61',
          showOrb: false,
          gradient: false,
        } satisfies Partial<SiteState>,
        message: `Found “${article.title}” at random on Wikipedia and made its lead image the background. The source link is on the page.`,
      });
    } catch {
      return Response.json({ error: 'I could not find an illustrated random Wikipedia page just now. Try the same request again.' }, { status: 502 });
    }
  }
  return Response.json(buildPatch(prompt, site));
}
