import { buildPatch } from '@/lib/builder';

export async function POST(request: Request) {
  let prompt = '';
  try {
    const body = await request.json() as { prompt?: unknown };
    prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
  } catch {
    return Response.json({ error: 'Send a JSON prompt.' }, { status: 400 });
  }
  if (!prompt || prompt.length > 1000) {
    return Response.json({ error: 'Prompt must be between 1 and 1,000 characters.' }, { status: 400 });
  }
  return Response.json(buildPatch(prompt));
}
