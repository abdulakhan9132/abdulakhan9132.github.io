// Original motion composition; all imagery and copy belong to this portfolio.
export function initMotion() {
  createPixelName();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger || reduced.matches) return;
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.graphic-img').forEach(img => { img.loading = 'eager'; });

  const lenis = window.Lenis ? new window.Lenis({
    duration: 1.35,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: .85,
    smoothWheel: true,
    syncTouch: false,
    anchors: false,
    prevent: node => !!node.closest('.search-dialog, .case-modal-panel, .lightbox-content, .mobile-drawer, .graphics-grid')
  }) : null;
  const tick = time => lenis?.raf(time * 1000);
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    new MutationObserver(() => {
      document.body.style.overflow === 'hidden' ? lenis.stop() : lenis.start();
    }).observe(document.body, { attributes: true, attributeFilter: ['style'] });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey) return;
      const target = document.getElementById(link.hash.slice(1));
      if (!target) return;
      if (lenis) {
        event.preventDefault();
        lenis.start();
        lenis.scrollTo(target, { offset: -100, duration: 1.4, easing: t => 1 - Math.pow(1 - t, 4), onComplete: () => {
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        } });
      }
    });
  });

  // Keep the content visible if a library fails: hiding begins only once GSAP runs.
  const splitTargets = document.querySelectorAll('[data-split]');
  splitTargets.forEach(element => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const fragment = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(word => {
        if (!word.trim()) { fragment.append(document.createTextNode(word)); return; }
        const wrap = document.createElement('span');
        wrap.className = 'split-word';
        const inner = document.createElement('span');
        inner.textContent = word;
        wrap.append(inner);
        fragment.append(wrap);
      });
      node.replaceWith(fragment);
    });
  });

  const heroWords = document.querySelectorAll('.hero-lede .split-word>span');
  const nameColumns = document.querySelectorAll('.pixel-column');
  document.documentElement.classList.add('motion-ready');
  const loaderNumber = document.getElementById('loader-number');
  const loaderProgress = { value: 0 };
  const introRegions = [document.getElementById('site-header'), document.getElementById('main-content')];
  introRegions.forEach(region => { region.inert = true; });
  lenis?.stop();
  const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
  intro.from('.loader-top, .loader-caption, .loader-bottom', { y: 12, opacity: 0, duration: .4, stagger: .04 }, 0)
    .to(loaderProgress, { value: 100, duration: 1.1, ease: 'power2.inOut', onUpdate: () => { loaderNumber.textContent = String(Math.round(loaderProgress.value)); }, onComplete: () => { loaderNumber.textContent = '100'; } }, 0)
    .fromTo('.loader-fill', { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, 0)
    .to('.intro-cover', { yPercent: -100, duration: .55, ease: 'power3.inOut', delay: .12, onComplete: () => {
      document.querySelector('.intro-cover').hidden = true;
      introRegions.forEach(region => { region.inert = false; });
      lenis?.start();
    } })
    .from(heroWords, { yPercent: 115, rotation: 3, duration: 1, stagger: .045 }, '-=.25')
    .from('.hero-art', { y: 55, rotation: -6, opacity: 0, duration: 1.1 }, '<')
    .from('.hero-meta>span', { y: 18, opacity: 0, stagger: .06, duration: .8 }, '-=.7')
    .from(nameColumns, { y: 28, scaleY: .3, opacity: 0, duration: 1, stagger: .008 }, '-=.8')
    .from('.hero-bottom>*', { y: 18, opacity: 0, duration: .8, stagger: .08 }, '-=.7');
  intro.eventCallback('onComplete', () => {
    document.querySelector('.intro-cover').hidden = true;
    ScrollTrigger.refresh();
  });

  splitTargets.forEach(el => {
    if (el.closest('.hero')) return;
    gsap.from(el.querySelectorAll('.split-word>span'), {
      yPercent: 110, rotation: 2, duration: 1, stagger: .045, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true }
    });
  });
  gsap.to('.marquee-track', { xPercent: -50, duration: 38, repeat: -1, ease: 'none' });
  gsap.from('.pillar-card', { y: 45, opacity: 0, duration: 1.1, stagger: .09, ease: 'power3.out', scrollTrigger: { trigger: '.pillars-grid', start: 'top 88%', once: true } });

  const media = gsap.matchMedia();
  media.add('(min-width: 768px)', () => {
    gsap.to('.pixel-name', { y: 35, opacity: .35, ease: 'none', scrollTrigger: { trigger: '.hero-name-row', start: 'top 24%', end: 'bottom top', scrub: 1 } });
    document.querySelectorAll('.work-card').forEach(card => {
      gsap.from(card.querySelector('.work-col-mid'), { scale: .93, y: 40, ease: 'none', scrollTrigger: { trigger: card, start: 'top 92%', end: 'center 60%', scrub: 1 } });
      gsap.from(card.querySelectorAll('.work-col-left, .work-col-right'), { y: 35, opacity: 0, duration: 1.1, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 85%', once: true } });
    });
    const rail = document.querySelector('.graphics-grid');
    const viewport = document.querySelector('.gallery-window');
    const runway = document.createElement('div');
    runway.className = 'gallery-runway';
    viewport.before(runway);
    runway.append(viewport);
    const distance = () => Math.max(0, rail.scrollWidth - viewport.clientWidth);
    const sizeRunway = () => { runway.style.height = (viewport.offsetHeight + distance()) + 'px'; };
    sizeRunway();
    const focusArtwork = event => {
      const card = event.target.closest('.graphic-card');
      if (!card || !card.matches(':focus-visible')) return;
      const target = runway.getBoundingClientRect().top + window.scrollY - window.innerHeight * .14 + Math.min(card.offsetLeft, distance());
      if (lenis) lenis.scrollTo(target, { duration: .7 });
      else window.scrollTo({ top: target, behavior: 'smooth' });
    };
    rail.addEventListener('focusin', focusArtwork);
    gsap.fromTo(rail, { x: 0 }, { x: () => -distance(), ease: 'none', scrollTrigger: {
      trigger: runway, start: 'top 14%', end: () => '+=' + distance(), scrub: 1.1, invalidateOnRefresh: true, onRefreshInit: sizeRunway
    } });
    ScrollTrigger.create({ trigger: '.experience-heading', start: 'top 22%', endTrigger: '.timeline', end: 'bottom 65%', pin: true, pinSpacing: false });
    return () => { rail.removeEventListener('focusin', focusArtwork); runway.before(viewport); runway.remove(); };
  });
  media.add('(max-width: 767px)', () => {
    document.querySelectorAll('.work-col-mid').forEach(el => gsap.from(el, { y: 30, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } }));
  });

  const statement = document.querySelector('[data-word-reveal]');
  if (statement) {
    const words = statement.textContent.split(/\s+/);
    statement.textContent = '';
    words.forEach(word => {
      const span = document.createElement('span');
      span.textContent = word + ' ';
      statement.append(span);
    });
    gsap.from(statement.children, { opacity: .22, stagger: .12, ease: 'none', scrollTrigger: { trigger: statement, start: 'top 85%', end: 'bottom 45%', scrub: .7 } });
  }
  gsap.utils.toArray('.timeline-item, .skills-wrapper, .about-copy p').forEach(el => {
    gsap.from(el, { y: 28, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      el.addEventListener('pointermove', e => {
        const box = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - box.left - box.width / 2) * .12, y: (e.clientY - box.top - box.height / 2) * .2, duration: .6, ease: 'power3.out' });
      });
      el.addEventListener('pointerleave', () => gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1,.4)' }));
    });
    const letters = [...document.querySelectorAll('.pixel-letter')];
    document.getElementById('pixel-name').addEventListener('pointermove', e => {
      letters.forEach(letter => {
        const bounds = letter.getBoundingClientRect();
        const proximity = Math.max(0, 1 - Math.abs(e.clientX - (bounds.left + bounds.width / 2)) / 180);
        gsap.to(letter, { y: -proximity * 6, duration: .65, ease: 'power3.out' });
      });
    });
    document.getElementById('pixel-name').addEventListener('pointerleave', () => gsap.to(letters, { y: 0, duration: .9, ease: 'elastic.out(1,.4)' }));
  }
  const refresh = () => { lenis?.resize(); ScrollTrigger.refresh(); };
  document.fonts.ready.then(refresh);
  document.querySelectorAll('img').forEach(img => { if (!img.complete) img.addEventListener('load', refresh, { once: true }); });
  reduced.addEventListener('change', () => location.reload(), { once: true });
}

function createPixelName() {
  const host = document.getElementById('pixel-name');
  if (!host) return;
  const glyphs = {
    A: ['01110','11011','11011','11111','11011','11011','11011'],
    B: ['11110','11011','11011','11110','11011','11011','11110'],
    D: ['11110','11011','11011','11011','11011','11011','11110'],
    U: ['11011','11011','11011','11011','11011','11011','01110'],
    L: ['11000','11000','11000','11000','11000','11000','11111'],
    K: ['11011','11011','11110','11100','11110','11011','11011'],
    H: ['11011','11011','11011','11111','11011','11011','11011'],
    N: ['11001','11101','11101','11011','11011','11011','11001']
  };
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 640 70');
  svg.setAttribute('aria-hidden', 'true');
  let x = 0;
  for (const char of 'ABDULLA KHAN') {
    if (char === ' ') { x += 12; continue; }
    const letter = document.createElementNS(ns, 'g');
    letter.classList.add('pixel-letter');
    const glyph = glyphs[char];
    for (let col = 0; col < 5; col++) {
      const column = document.createElementNS(ns, 'g');
      column.classList.add('pixel-column');
      glyph.forEach((row, y) => {
        if (row[col] !== '1') return;
        const rect = document.createElementNS(ns, 'rect');
        for (const [key,value] of Object.entries({ x: x + col * 10, y: y * 10, width: 8.6, height: 8.6, rx: 1.5, fill: 'currentColor' })) rect.setAttribute(key, value);
        column.append(rect);
      });
      letter.append(column);
    }
    svg.append(letter);
    x += 58;
  }
  svg.setAttribute('viewBox', '0 0 ' + (x - 8) + ' 70');
  host.replaceChildren(svg);
}
