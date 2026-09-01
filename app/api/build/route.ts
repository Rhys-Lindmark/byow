import { buildPatch, initialSite, type SiteState } from '@/lib/builder';

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
  return Response.json(buildPatch(prompt, site));
}
