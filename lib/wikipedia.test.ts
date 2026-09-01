import assert from 'node:assert/strict';
import test from 'node:test';
import { fetchRandomWikipediaBackground, wantsRandomWikipediaBackground } from './wikipedia.ts';

test('recognizes the requested random Wikipedia background action', () => {
  assert.equal(wantsRandomWikipediaBackground('find a random wiki page and make it the background'), true);
  assert.equal(wantsRandomWikipediaBackground('make the page feel encyclopedic'), false);
});

test('selects the first illustrated random article and preserves attribution', async () => {
  const mockFetch = (async () => new Response(JSON.stringify({ query: { pages: [
    { title: 'No image', fullurl: 'https://en.wikipedia.org/wiki/No_image' },
    { title: 'Banana', fullurl: 'https://en.wikipedia.org/wiki/Banana', original: { source: 'https://upload.wikimedia.org/banana.jpg' } },
  ] } }), { status: 200 })) as typeof fetch;
  const result = await fetchRandomWikipediaBackground(mockFetch);
  assert.deepEqual(result, {
    title: 'Banana',
    pageUrl: 'https://en.wikipedia.org/wiki/Banana',
    imageUrl: 'https://upload.wikimedia.org/banana.jpg',
  });
});

test('rejects untrusted image hosts', async () => {
  const mockFetch = (async () => new Response(JSON.stringify({ query: { pages: [
    { title: 'Bad', fullurl: 'https://en.wikipedia.org/wiki/Bad', original: { source: 'https://evil.example/image.jpg' } },
  ] } }), { status: 200 })) as typeof fetch;
  await assert.rejects(() => fetchRandomWikipediaBackground(mockFetch), /illustrated article/);
});
