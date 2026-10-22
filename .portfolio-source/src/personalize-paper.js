export function personalizePaper(source) {
  const start=source.indexOf("  ctx.font='500 106px");
  const end=source.indexOf('  ctx.save(); ctx.translate(1200-M-24',start);
  if(start<0||end<0)throw new Error('Paper source changed: profile typography');
  source=source.slice(0,start)+`  ctx.font='600 100px "Inter Tight", Inter, sans-serif';
  ctx.fillStyle='#ffffff';
  ctx.fillText('Abdullah Khan', M, 392);
  ctx.font='500 54px "Inter Tight", Inter, sans-serif';
  ctx.fillStyle='rgba(255,255,255,.82)';
  ctx.fillText('UI/UX & Product Designer', M, 510);
  ctx.fillText('Graphic Designer', M, 582);
  ctx.font='400 36px Inter, sans-serif';
  ctx.fillStyle='rgba(255,255,255,.65)';
  ctx.fillText('Designing clear experiences', M, 710);
  ctx.fillText('with purpose and character.', M, 760);

`+source.slice(end);
  const replacements = new Map([
    ['<h1>NOCTURNE</h1>', '<h1>ABDULLAH</h1>'],
    ["'o.', M, 190", "'a.', M, 190"],
    ["'SOTW'", "'DESIGN'"],
    ["'orbit.'", "'abdullah.'"],
    ["' winners'", "' design'"],
    ['touch-action:none;overscroll-behavior:none', 'touch-action:pan-y;overscroll-behavior:auto'],
  ]);
  for (const [original, replacement] of replacements) {
    if (!source.includes(original)) throw new Error(`Paper source changed: ${original}`);
    source = source.replaceAll(original, replacement);
  }
  // The sandboxed canvas owns wheel/touch events; relay vertical scrolling to the page.
  const scrollBridge = `<script>
    const sendScroll=deltaY=>parent.postMessage({type:'portfolio-paper-scroll',deltaY},'*');
    window.addEventListener('wheel',event=>{event.preventDefault();sendScroll(event.deltaY*(event.deltaMode===1?20:event.deltaMode===2?innerHeight:1));},{passive:false});
    let lastTouch=null;
    window.addEventListener('touchstart',event=>{const t=event.touches[0];lastTouch=t?{x:t.clientX,y:t.clientY}:null;},{passive:true});
    window.addEventListener('touchmove',event=>{const t=event.touches[0];if(!t||!lastTouch)return;const dx=lastTouch.x-t.clientX,dy=lastTouch.y-t.clientY;lastTouch={x:t.clientX,y:t.clientY};if(Math.abs(dy)>Math.abs(dx)){event.preventDefault();sendScroll(dy);}},{passive:false});
    window.addEventListener('touchend',()=>{lastTouch=null;},{passive:true});
  </script>`;
  return source + scrollBridge;
}
