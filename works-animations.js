/* Selected Work animations */
/* Tweak: heading stagger 75ms | card stagger 120ms | tilt max 6deg | parallax 20px */
function initWorksAnimations(){
  const section=document.getElementById('works');
  if(!section||section.dataset.waInitialized)return ()=>{};
  section.dataset.waInitialized='true';
  const motion=window.matchMedia('(prefers-reduced-motion: no-preference)');
  const desktop=window.matchMedia('(hover: hover) and (pointer: fine)');
  const heading=section.querySelector('#work-title');
  const rows=Array.from(section.querySelectorAll('.project-row'));
  const cleanup=[];
  const on=(target,event,handler,options)=>{target.addEventListener(event,handler,options);cleanup.push(()=>target.removeEventListener(event,handler,options));};
  let headingObserver,cardObserver,frame=0,parallaxFrame=0;
  if(!motion.matches)return ()=>{delete section.dataset.waInitialized;};
  // Mask existing text nodes without changing text, emphasis, line breaks or headings.
  if(heading){
    let n=0;
    const wrap=node=>{
      for(const child of Array.from(node.childNodes)){
        if(child.nodeType===Node.TEXT_NODE){
          const parts=child.textContent.match(/\S+|\s+/g)||[];
          const fragment=document.createDocumentFragment();
          parts.forEach(part=>{
            if(/^\s+$/.test(part)){fragment.appendChild(document.createTextNode(part));return;}
            const mask=document.createElement('span'),word=document.createElement('span');
            mask.className='wa-mask';word.className='wa-word';word.textContent=part;
            word.style.setProperty('--wa-i',String(n++));
            mask.appendChild(word);fragment.appendChild(mask);
          });
          child.replaceWith(fragment);
        }else if(child.nodeType===Node.ELEMENT_NODE&&child.tagName!=='BR')wrap(child);
      }
    };
    wrap(heading);
    const rule=document.createElement('div');rule.className='wa-heading-rule';rule.setAttribute('aria-hidden','true');
    heading.insertAdjacentElement('afterend',rule);
    cleanup.push(()=>rule.remove());
  }
  rows.forEach((row,i)=>{
    row.style.setProperty('--wa-row',String(i%4));
    row.querySelectorAll('.project-tags>span').forEach((tag,j)=>tag.style.setProperty('--wa-tag',String(j)));
  });
  section.classList.add('wa-ready');
  headingObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){section.classList.add('wa-heading-seen');headingObserver.unobserve(e.target);}}),{threshold:.1});
  if(heading)headingObserver.observe(heading);
  cardObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('wa-seen');cardObserver.unobserve(e.target);}}),{threshold:.15});
  rows.forEach(row=>cardObserver.observe(row));
  let cursor=null,desiredX=-100,desiredY=-100,cursorX=-100,cursorY=-100,cursorActive=false;
  if(desktop.matches){
    cursor=document.createElement('div');cursor.className='wa-view-cursor';cursor.textContent='View';cursor.setAttribute('aria-hidden','true');section.appendChild(cursor);
    const animateCursor=()=>{
      cursorX+=(desiredX-cursorX)*.18;cursorY+=(desiredY-cursorY)*.18;
      cursor.style.transform='translate3d('+(cursorX-32)+'px,'+(cursorY-32)+'px,0) scale('+(cursorActive?1:.55)+')';
      if(cursorActive||Math.abs(cursorX-desiredX)>.5||Math.abs(cursorY-desiredY)>.5)frame=requestAnimationFrame(animateCursor);else frame=0;
    };
    rows.forEach(row=>{
      const visual=row.querySelector('.project-visual');
      if(!visual)return;
      on(visual,'pointerenter',e=>{if(e.pointerType==='touch')return;section.classList.add('wa-hovering');row.classList.add('wa-active');cursorActive=true;cursor.classList.add('wa-visible');desiredX=e.clientX;desiredY=e.clientY;if(!frame)frame=requestAnimationFrame(animateCursor);});
      on(visual,'pointermove',e=>{
        if(e.pointerType==='touch')return;
        const b=visual.getBoundingClientRect();
        const x=Math.max(-1,Math.min(1,(e.clientX-b.left)/b.width*2-1));
        const y=Math.max(-1,Math.min(1,(e.clientY-b.top)/b.height*2-1));
        visual.style.setProperty('--wa-rx',(-y*6).toFixed(2)+'deg');
        visual.style.setProperty('--wa-ry',(x*6).toFixed(2)+'deg');
        desiredX=e.clientX;desiredY=e.clientY;if(!frame)frame=requestAnimationFrame(animateCursor);
      },{passive:true});
      on(visual,'pointerleave',()=>{visual.style.setProperty('--wa-rx','0deg');visual.style.setProperty('--wa-ry','0deg');row.classList.remove('wa-active');section.classList.remove('wa-hovering');cursorActive=false;cursor.classList.remove('wa-visible');});
    });
    cleanup.push(()=>cursor.remove());
  }
  // The existing React/GSAP implementation already parallax-scrolls project images.
  // Avoid a second competing scroll transform or extra off-screen animation frames.
  const dispose=()=>{
    headingObserver?.disconnect();cardObserver?.disconnect();
    cancelAnimationFrame(frame);cancelAnimationFrame(parallaxFrame);
    cleanup.forEach(fn=>fn());section.classList.remove('wa-ready','wa-heading-seen','wa-hovering');
    delete section.dataset.waInitialized;
  };
  return dispose;
}
(function mountWorksAnimations(){
  let stop=()=>{};
  const begin=()=>{if(document.getElementById('works')){stop=initWorksAnimations();return true;}return false;};
  if(begin())return;
  const mountObserver=new MutationObserver(()=>{if(begin())mountObserver.disconnect();});
  mountObserver.observe(document.body,{childList:true,subtree:true});
  window.addEventListener('pagehide',()=>{mountObserver.disconnect();stop();},{once:true});
})();
