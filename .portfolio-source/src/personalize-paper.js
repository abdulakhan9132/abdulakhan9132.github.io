export function personalizePaper(source, profile) {
  const replacements = new Map([
    ['<h1>NOCTURNE</h1>', '<h1>ABDULLA</h1>'],
    ["'o.', M, 190", "'a.', M, 190"],
    ['Studio of the Week.', 'Junior UI/UX'],
    ['Feb 14, 2026', 'Designer & maker.'],
    ['Nocturne Studio.', profile.name],
    ['By Nocturne Studio', profile.location],
    ['Ilya Marchetti', 'UI/UX & Product Design'],
    ['Dara Okonkwo', 'Graphic Design'],
    ['2026 Official Certificate.', 'A little about my practice.'],
    ['The orbit jury is proud to declare this website Studio of the Week in recognition of the great talent and effort invested in its creation.', 'I explore clear interfaces, thoughtful digital products, and expressive graphics. Based in Bengaluru, I work with Figma, Photoshop, and Illustrator.'],
    ["[0,1,2].forEach(i=> signature(ctx, px+6+i*100, endY+24, 0.86, i*5+3, 'rgba(255,255,255,.62)'));", "ctx.fillText('Design with character.', px, endY+42);"],
    ["'SOTW'", "'DESIGN'"],
    ["'orbit.'", "'abdulla.'"],
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
