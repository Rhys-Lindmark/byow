import assert from 'node:assert/strict';
import test from 'node:test';
import { buildPatch, initialSite } from './builder.ts';

test('open-ended banana direction becomes a coherent full-page remix', () => {
  const result = buildPatch('make the page all bananas');
  assert.equal(result.patch.title, 'GO FULL\nBANANAS.');
  assert.equal(result.patch.mode, 'bananas');
  assert.equal(result.patch.effect, 'confetti');
  assert.equal(result.patch.cards?.length, 3);
  assert.match(result.message, /wild idea 021\/100/i);
  assert.doesNotMatch(result.message, /need one concrete handle/i);
});

test('unfamiliar imaginative direction still changes the whole page', () => {
  const result = buildPatch('make it feel like a rainy Tokyo record store at midnight');
  assert.match(String(result.patch.title), /RAINY TOKYO RECORD STORE AT MIDNIGHT/);
  assert.ok(result.patch.background);
  assert.equal(result.patch.gradient, true);
  assert.equal(result.patch.cards?.length, 3);
});

test('precise commands remain precise', () => {
  const result = buildPatch('change the background to purple and center everything');
  assert.equal(result.patch.background, '#6d3cff');
  assert.equal(result.patch.align, 'center');
});

test('adding a section preserves existing sections', () => {
  const result = buildPatch('add a section about recipes', initialSite);
  assert.equal(result.patch.cards?.length, initialSite.cards.length + 1);
  assert.equal(result.patch.cards?.at(-1)?.title, 'RECIPES');
});
