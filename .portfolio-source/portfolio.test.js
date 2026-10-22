import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';

const assets=JSON.parse(readFileSync(new URL('./src/portfolio-assets.json',import.meta.url)));
test('portfolio contains the four supplied UI project collections and their screens',()=>{
  assert.deepEqual(assets.projects.map(item=>item.id),['arven','nova-deals','gitfit','enterprise-dashboard']);
  assert.equal(assets.projects.find(item=>item.id==='enterprise-dashboard').screens.length,6);
  for(const project of assets.projects)for(const image of [project.preview,...project.screens]){
    assert.ok(existsSync(new URL('./public'+image.image,import.meta.url)),image.image);
    assert.ok(image.width>0&&image.height>0);
  }
});
test('graphic collections include the supplied posters and abstract backgrounds',()=>{
  assert.equal(assets.artwork.length,25);
  assert.equal(assets.artwork.filter(item=>item.collection==='Abstract').length,6);
  assert.equal(new Set(assets.artwork.map(item=>item.id)).size,25);
  for(const item of assets.artwork)assert.ok(existsSync(new URL('./public'+item.image,import.meta.url)),item.title);
});
test('all registered ThreeUI files match their required SHA-256 and byte counts',()=>{
  const manifest=JSON.parse(readFileSync(new URL('./threeui-sources.json',import.meta.url)));
  assert.equal(Object.keys(manifest.files).length,17);
  for(const [path,expected] of Object.entries(manifest.files)){
    const bytes=readFileSync(new URL('./'+path,import.meta.url));
    assert.equal(bytes.length,expected.bytes,path);
    assert.equal(createHash('sha256').update(bytes).digest('hex'),expected.sha256,path);
  }
});
