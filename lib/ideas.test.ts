import assert from 'node:assert/strict';
import test from 'node:test';
import { buildPatch } from './builder.ts';
import { findWildIdea, patchForWildIdea, wildIdeas } from './ideas.ts';

const allowedWidgets = new Set([
  'none','clock','countdown','pomodoro','stopwatch','counter','dice','coin','random','fortune','decision',
  'tictactoe','rps','memory','reaction','quiz','poll','higher-lower','color-guess','scramble','adventure',
  'breathing','journal','tracker','list','calculator','password','markdown','self-destruct',
]);

test('the wild catalog contains exactly 100 uniquely addressable ideas', () => {
  assert.equal(wildIdeas.length, 100);
  assert.equal(new Set(wildIdeas.map((idea) => idea.id)).size, 100);
  assert.equal(new Set(wildIdeas.map((idea) => idea.prompt)).size, 100);
});

test('all 100 canonical prompts resolve to their intended implementation', () => {
  for (const [index, idea] of wildIdeas.entries()) {
    assert.equal(findWildIdea(idea.prompt)?.id, idea.id, `idea ${index + 1}: ${idea.id}`);
    const result = buildPatch(idea.prompt);
    assert.equal(result.patch.mode, idea.id, `mode ${index + 1}: ${idea.id}`);
    assert.equal(result.patch.layout, idea.layout, `layout ${index + 1}: ${idea.id}`);
    assert.equal(result.patch.effect, idea.effect, `effect ${index + 1}: ${idea.id}`);
    assert.equal(result.patch.widget, idea.widget, `widget ${index + 1}: ${idea.id}`);
    assert.match(result.message, new RegExp(`${String(index + 1).padStart(3, '0')}/100`));
  }
});

test('every catalog result is complete, local, reversible, and renderer-supported', () => {
  for (const idea of wildIdeas) {
    const patch = patchForWildIdea(idea);
    assert.ok(patch.background && patch.foreground && patch.accent && patch.highlight, idea.id);
    assert.ok(allowedWidgets.has(idea.widget), idea.id);
    assert.equal(patch.backgroundImage, null, idea.id);
    assert.equal(patch.backgroundSourceUrl, null, idea.id);
    const serialized = JSON.stringify(patch).toLowerCase();
    assert.doesNotMatch(serialized, /<script|javascript:|data:text\/html|https?:\/\//, idea.id);
  }
});

test('the catalog excludes unsafe or irreversible capabilities', () => {
  const catalog = JSON.stringify(wildIdeas).toLowerCase();
  assert.doesNotMatch(catalog, /steal|credential|impersonat|malware|ransom|delete files|exfiltrat|keylogger|phishing/);
});
