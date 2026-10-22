import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {personalizePaper} from './src/personalize-paper.js';
import {PERSONAL_INFO} from './data.js';

const assets=JSON.parse(readFileSync(new URL('./src/portfolio-assets.json',import.meta.url)));
test('paper uses the designer profile and relays vertical scrolling without award claims',()=>{
  const source=readFileSync(new URL('./src/shaders/3d-paper/sources/3d-paper.html',import.meta.url),'utf8');
  const result=personalizePaper(source,PERSONAL_INFO);
  for(const text of [PERSONAL_INFO.name,'Junior UI/UX','Bengaluru','portfolio-paper-scroll','touch-action:pan-y'])assert.ok(result.includes(text),text);
  for(const text of ['NOCTURNE','Nocturne','Studio of the Week','Official Certificate','Ilya Marchetti','Dara Okonkwo'])assert.ok(!result.includes(text),text);
  assert.ok(result.includes('passive:false'));
  assert.throws(()=>personalizePaper('',PERSONAL_INFO),/Paper source changed/);
});
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
