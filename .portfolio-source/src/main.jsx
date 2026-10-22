import React, {Suspense, useCallback, useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {SylvaHero, ThreeDPaper} from '@designcodeio/threeui';
import '@designcodeio/threeui/style.css';
import {PERSONAL_INFO, EXPERIENCE_EDUCATION, SKILLS} from '../data.js';
import assets from './portfolio-assets.json';
import './portfolio.css';

const {projects,artwork}=assets;
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
function go(id){document.getElementById(id)?.scrollIntoView({behavior:reduced()?'instant':'smooth',block:'start'});}

function App(){
  const [selection,setSelection]=useState(null);
  const [filter,setFilter]=useState('All');
  const [showAll,setShowAll]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const [searchOpen,setSearchOpen]=useState(false);
  const [query,setQuery]=useState('');
  const heroRef=useRef(null),paperRef=useRef(null),dialogRef=useRef(null),searchRef=useRef(null);
  const filtered=artwork.filter(item=>filter==='All'||item.style===filter||item.collection===filter);
  const visible=showAll?filtered:filtered.slice(0,12);

  const personalizeHero=useCallback(frame=>{
    const doc=frame.contentDocument;
    if(!doc?.querySelector('.headline')||doc.documentElement.dataset.portfolioBound)return;
    doc.documentElement.dataset.portfolioBound='true';
    const text=(selector,value)=>{const node=doc.querySelector(selector);if(node)node.textContent=value;};
    text('.headline span:first-child i','Design with');
    text('.headline span:last-child i','character.');
    text('.lede','I’m Abdulla Khan, a UI/UX & Product Designer in Bengaluru. I create clear interfaces, thoughtful digital products, and expressive graphics.');
    text('.ghost','KHAN');
    doc.querySelectorAll('.card,.knob-float').forEach(node=>{node.hidden=true;node.style.display='none';});
    text('.liquid-button--explore .lbl','Explore my work');
    const discover=doc.querySelector('.scroll');
    if(discover?.firstChild)discover.firstChild.textContent='Selected work';
    text('.stat--a dt','Digital experiences');text('.stat--a dd','UI / UX');
    text('.stat--b dt','Visual expression');text('.stat--b dd','Art & identity');
    const destinations=['hero','works','graphics','about','contact'];
    const labels=['Abdulla Khan — home','UI/UX','Graphics','About','Contact'];
    const icons=[null,'<path d="M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z"/>','<path d="M3 1.5h10v13H3zM5 4h6M5 6h4M5 12l2-3 2 1 2-2"/>','<circle cx="8" cy="5" r="2.5"/><path d="M3 14v-1a5 5 0 0 1 10 0v1"/>','<path d="M1.5 3h13v10h-13zM2 3.5l6 5 6-5"/>'];
    doc.querySelector('.dock')?.setAttribute('aria-label','Abdulla Khan portfolio');
    doc.querySelectorAll('.dock-item').forEach((link,i)=>{
      link.dataset.portfolioTarget=destinations[i];link.href='#'+destinations[i];
      link.setAttribute('aria-label',labels[i]);link.title=labels[i];
      if(i&&link.querySelector('svg'))link.querySelector('svg').innerHTML=icons[i];
      if(i)link.querySelector('span:last-child').textContent=labels[i];
    });
    for(const [selector,target,label] of [['.liquid-button--explore','works','Explore my selected work'],['.liquid-button--play','graphics','Explore graphic design'],['.knob--about','graphics','Explore my graphic designs'],['.card--stove .knob','works','Explore UI/UX projects'],['.scroll','works','Discover selected work']]){
      const node=doc.querySelector(selector);if(node){node.dataset.portfolioTarget=target;node.setAttribute('aria-label',label);}
    }
    doc.addEventListener('click',event=>{
      const target=event.target.closest('[data-portfolio-target]');
      if(target){event.preventDefault();go(target.dataset.portfolioTarget);}
    });
    frame.style.visibility='visible';
  },[]);

  useEffect(()=>{
    const root=heroRef.current;
    const personalize=()=>{const frame=root.querySelector("iframe");if(frame)personalizeHero(frame);};
    root.addEventListener("load",personalize,true);personalize();
    return()=>root.removeEventListener("load",personalize,true);
  },[personalizeHero]);

  useEffect(()=>{
    const root=paperRef.current;
    const label=()=>{
      const frame=root.querySelector('iframe');
      if(frame){frame.title='Abdulla Khan — interactive design profile';frame.parentElement.setAttribute('aria-label','Interactive design profile of Abdulla Khan');}
    };
    const scroll=event=>{
      const frame=root.querySelector('iframe');
      if(event.source!==frame?.contentWindow||event.data?.type!=='portfolio-paper-scroll'||typeof event.data.deltaY!=='number'||!Number.isFinite(event.data.deltaY))return;
      window.scrollBy({top:Math.max(-1000,Math.min(1000,event.data.deltaY)),behavior:'instant'});
    };
    root.addEventListener('load',label,true);window.addEventListener('message',scroll);
    return()=>{root.removeEventListener('load',label,true);window.removeEventListener('message',scroll);};
  },[]);

  useEffect(()=>{
    const observer=new IntersectionObserver(([entry])=>setScrolled(!entry.isIntersecting),{threshold:.2});
    observer.observe(heroRef.current);return()=>observer.disconnect();
  },[]);
  useEffect(()=>{
    const close=event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();setSearchOpen(value=>!value);}};
    window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close);
  },[]);
  useEffect(()=>{
    const dialog=dialogRef.current;
    if(selection&&!dialog.open){dialog.showModal();dialog.scrollTop=0;}
    if(!selection&&dialog.open)dialog.close();
    if(selection)document.body.style.overflow='hidden';
    return()=>{document.body.style.overflow='';};
  },[selection]);
  useEffect(()=>{
    const dialog=searchRef.current;
    if(searchOpen&&!dialog.open){dialog.showModal();dialog.querySelector('input')?.focus();}
    if(!searchOpen&&dialog.open)dialog.close();
  },[searchOpen]);
  useEffect(()=>{
    if(!window.gsap||!window.ScrollTrigger||reduced())return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx=gsap.context(()=>{
      gsap.utils.toArray('.reveal').forEach(element=>gsap.from(element,{y:45,opacity:0,duration:1.05,ease:'power3.out',scrollTrigger:{trigger:element,start:'top 92%',once:true}}));
      gsap.utils.toArray('.project-visual').forEach(element=>gsap.fromTo(element.querySelector('img'),{yPercent:3,scale:1.04},{yPercent:-3,scale:1,ease:'none',scrollTrigger:{trigger:element,start:'top bottom',end:'bottom top',scrub:1.3}}));
    });return()=>ctx.revert();
  },[]);

  const matches=query.trim()? [...projects,...artwork].filter(item=>query.toLowerCase().split(/\s+/).every(term=>JSON.stringify(item).toLowerCase().includes(term))):projects;
  function choose(item){setSearchOpen(false);setQuery('');setSelection(item);}
  function tilt(event){if(reduced()||event.pointerType==='touch')return;const box=event.currentTarget.getBoundingClientRect();event.currentTarget.style.setProperty('--tilt-x',`${-(event.clientY-box.top-box.height/2)/box.height*5}deg`);event.currentTarget.style.setProperty('--tilt-y',`${(event.clientX-box.left-box.width/2)/box.width*5}deg`);}

  return <>
    <a className="skip-link" href="#works">Skip to selected work</a>
    <header className={`site-nav ${scrolled?'is-visible':''}`} inert={!scrolled} aria-hidden={!scrolled}>
      <a className="signature" href="#hero" onClick={e=>{e.preventDefault();go('hero');}}>Abdulla<span>®</span></a>
      <nav aria-label="Portfolio"><a href="#works">UI/UX</a><a href="#graphics">Graphics</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
      <button className="search-link" onClick={()=>setSearchOpen(true)} aria-label="Search portfolio">Search <kbd>⌘ K</kbd></button>
    </header>

    <main>
      <section className="hero-section" id="hero" ref={heroRef} aria-label="Abdulla Khan — UI/UX, product and graphic designer">
        <div className="shader-frame hero-frame"><SylvaHero variant="living-green" headingFont="lexend" bodyFont="lexend" headingWeight="300" bodyWeight="300" primaryColor="#ffffff" headingSize={63} bodySize={16.5} headingLetterSpacing={-0.006} applyScene={personalizeHero}/></div>
        <span className="hero-scroll-label">A designer’s world. Scroll to explore.</span>
      </section>

      <section className="work-section section-wrap" id="works" aria-labelledby="work-title">
        <div className="section-meta reveal"><span>SELECTED WORK</span><span>UI/UX · PRODUCT DESIGN</span><span>2025—2026</span></div>
        <div className="section-heading reveal"><h1 id="work-title">Clarity, with<br/><em>character.</em></h1><p>Four design explorations across websites, mobile experiences, and dashboards. Open a project to see the full designs.</p></div>
        <div className="project-list">{projects.map((project,index)=><article className={`project-row project-${project.id}`} key={project.id}>
          <button className="project-visual reveal" onClick={()=>choose(project)} aria-label={`View ${project.title} project`}>
            <img src={project.image} width={project.preview.width} height={project.preview.height} alt={`${project.title} interface preview`} loading="lazy"/><span className="project-open" aria-hidden="true">Explore the design <span>↗</span></span>
          </button>
          <div className="project-info reveal"><span className="project-kind">{project.kind}</span><h2><button onClick={()=>choose(project)}>{project.title}<span aria-hidden="true">↗</span></button></h2><p className="project-tagline">{project.tagline}</p><p className="project-summary">{project.summary}</p><div className="project-tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div><span className="project-number" aria-hidden="true">0{index+1}</span></div>
        </article>)}</div>
      </section>

      <section className="graphic-section section-wrap" id="graphics" aria-labelledby="graphic-title">
        <div className="section-meta reveal"><span>OFF THE GRID</span><span>GRAPHIC DESIGN & VISUAL EXPLORATION</span><span>{artwork.length} PIECES</span></div>
        <div className="section-heading reveal"><h2 id="graphic-title">Permission<br/>to <em>play.</em></h2><p>Surreal worlds. Unapologetic type. Liquid surfaces.<br/>A place for ideas that refuse to sit still.</p></div>
        <div className="gallery-filters" role="group" aria-label="Filter graphic designs">{['All','Posters','Abstract','Surrealism','Brutalism','Neo-futurism'].map(value=><button key={value} aria-pressed={filter===value} onClick={()=>{setFilter(value);setShowAll(false);}}>{value}<span>{value==='All'?artwork.length:artwork.filter(item=>item.style===value||item.collection===value).length}</span></button>)}</div>
        <div className="artwork-grid">{visible.map(item=><button className="artwork-card" key={item.id} onClick={()=>choose(item)} onPointerMove={tilt} onPointerLeave={e=>{e.currentTarget.style.setProperty('--tilt-x','0deg');e.currentTarget.style.setProperty('--tilt-y','0deg');}} aria-label={`View ${item.title}`}>
          <div className="artwork-image"><img src={item.image} width={item.width} height={item.height} alt={item.title} loading="lazy"/><span aria-hidden="true">↗</span></div><div className="artwork-caption"><h3>{item.title}</h3><span>{item.style}</span></div>
        </button>)}</div>
        {filtered.length>12&&<button className="more-link" onClick={()=>setShowAll(value=>!value)}>{showAll?'A little less':'Explore the full collection'} <span>{showAll?'−':`+ ${filtered.length-12}`}</span></button>}
      </section>

      <section className="paper-section" aria-labelledby="paper-title"><div className="paper-intro section-wrap reveal"><span className="eyebrow">A LITTLE MORE ABOUT ME</span><h2 id="paper-title">Curiosity,<br/>in <em>motion.</em></h2><p>A UI/UX & Product Designer, exploring how things look, feel, and work.<br/>Drag to turn my design profile. Scroll to keep exploring.</p></div><div className="shader-frame paper-frame" ref={paperRef}><Suspense fallback={null}><ThreeDPaper variant="original"/></Suspense></div><p className="source-note">Abdulla Khan · UI/UX, Product & Graphic Design</p></section>

      <section className="about-section section-wrap" id="about" aria-labelledby="about-title"><div className="section-meta reveal"><span>THE PERSON BEHIND THE PIXELS</span><span>BENGALURU, INDIA</span></div><div className="about-grid"><div className="reveal"><h2 id="about-title">A curious mind.<br/><em>A considered eye.</em></h2><p className="about-lede">I’m {PERSONAL_INFO.name}, a UI/UX & Product Designer based in Bengaluru. I am building my practice around clear interfaces and thoughtful visual design.</p><p>My work spans website concepts, mobile interfaces, dashboards, and graphic experiments—connecting thoughtful structure with a distinctive visual point of view.</p><p>At Indo-Sakura Software Japan, I work across user flows, wireframes, high-fidelity interfaces, and reusable design systems, taking ideas from the first conversation to developer handoff.</p><a className="underlined-link" href="/resume/Abdulla_Khan_Suri_Resume.pdf" download>Download my resume <span>↗</span></a></div><aside className="practice reveal"><span className="eyebrow">HOW I WORK</span><h3>Think clearly.<br/>Make thoughtfully.</h3><p>I start by understanding the flow, explore layouts and visual directions, then refine the details in Figma. My commerce background helps me connect design choices with business needs.</p><div className="tools-list">{SKILLS.designTools.map(tool=><span key={tool}>{tool}</span>)}</div><div className="career">{EXPERIENCE_EDUCATION.map((item,i)=><div key={i}><span>{item.period}</span><h4>{item.role}</h4><p>{item.company}</p></div>)}</div></aside></div></section>

      <section className="contact-section section-wrap" id="contact" aria-labelledby="contact-title"><div className="contact-top reveal"><div><span className="eyebrow">A LITTLE CURIOSITY GOES A LONG WAY</span><h2 id="contact-title">Have something<br/><em>in mind?</em></h2><p>Let’s give it a thoughtful beginning.</p></div><div className="glass-contact-stage"><a className="glass-contact" href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PERSONAL_INFO.email)}`} target="_blank" rel="noopener noreferrer" aria-label="Let’s connect — compose an email in Gmail"><span className="glass-contact-label">Let’s connect</span><span className="glass-contact-arrow" aria-hidden="true">↗</span></a></div></div><div className="contact-links"><a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={PERSONAL_INFO.behance} target="_blank" rel="noreferrer">Behance ↗</a><a href="/resume/Abdulla_Khan_Suri_Resume.pdf" download="Abdullah_Khan_CV.pdf">Resume ↗</a><button onClick={()=>setSearchOpen(true)}>Search this portfolio ↗</button></div></section>
      <section className="cv-section section-wrap" id="cv" aria-labelledby="cv-title">
        <div><span className="eyebrow">TAKE A CLOSER LOOK</span><h2 id="cv-title">My experience,<br/><em>in one place.</em></h2><p>Explore my skills, experience, and design background.</p></div>
        <a className="cv-download" href="/resume/Abdulla_Khan_Suri_Resume.pdf" download="Abdullah_Khan_CV.pdf"><span>Download my CV<small>PDF · 92 KB</small></span><span aria-hidden="true">↓</span></a>
      </section>
    </main>
    <footer className="site-footer"><span>© {new Date().getFullYear()} Abdulla Khan</span><span>UI/UX · Product · Graphic Design</span><a href="#hero" onClick={e=>{e.preventDefault();go('hero');}}>Back to the living world ↑</a></footer>

    <dialog className={`portfolio-dialog ${selection?.screens?'project-dialog':'art-dialog'}`} ref={dialogRef} onClose={()=>setSelection(null)} onClick={e=>{if(e.target===dialogRef.current)setSelection(null);}} aria-labelledby="dialog-title"><div className="dialog-inner"><button className="dialog-close" onClick={()=>setSelection(null)} aria-label="Close project or artwork">Close <span>×</span></button>{selection&&<><span className="eyebrow">{selection.kind||selection.style}</span><h2 id="dialog-title">{selection.title}</h2><p className="dialog-description">{selection.summary||selection.description}</p>{selection.screens?<><p className="design-scope">Design exploration · UI/UX & visual design</p>{selection.screens.map((screen,i)=><figure className="project-screen" key={screen.image}><img src={screen.image} width={screen.width} height={screen.height} alt={`${selection.title} design — screen ${i+1}`} loading="lazy"/><figcaption>{selection.title} · {selection.screens.length===1?'Full design':`Design exploration ${i+1}`}</figcaption></figure>)}</>:<img className="full-artwork" src={selection.image} width={selection.width} height={selection.height} alt={selection.title}/>}</>}</div></dialog>

    <dialog className="search-dialog" ref={searchRef} onClose={()=>setSearchOpen(false)} onClick={e=>{if(e.target===searchRef.current)setSearchOpen(false);}} aria-label="Search portfolio"><div className="search-top"><input aria-label="Search designs and projects" type="search" placeholder="Find an idea, project, or visual…" value={query} onChange={e=>setQuery(e.target.value)}/><button onClick={()=>setSearchOpen(false)} aria-label="Close search">×</button></div><div className="search-results">{matches.length?matches.slice(0,30).map(item=><button key={item.id} onClick={()=>choose(item)}><span>{item.title}</span><small>{item.kind||item.style}</small><span aria-hidden="true">↗</span></button>):<p>No matches yet. Try ARVEN, fitness, surrealism, or liquid.</p>}</div><p className="search-hint">Escape to close · Select a result to explore</p></dialog>
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);
