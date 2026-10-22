import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

const manifest=JSON.parse(readFileSync(new URL('../threeui-sources.json',import.meta.url)));
for(const [path,expected] of Object.entries(manifest.files)){
  const bytes=readFileSync(new URL('../'+path,import.meta.url));
  assert.equal(bytes.length,expected.bytes,`${path}: byte count`);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),expected.sha256,`${path}: SHA-256`);
}
console.log(`Verified ${Object.keys(manifest.files).length} exact ThreeUI source and asset hashes.`);
