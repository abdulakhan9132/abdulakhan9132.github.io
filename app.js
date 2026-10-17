import { initMotion } from './motion.js';
import { buildSearchIndex, searchPortfolio } from './search.js';
/**
 * Abdulla Khan Portfolio Application
 * Logic: Command Palette Search, Case Studies, Lightbox, Audio Synthesizer & Cursor
 */

import {
  PERSONAL_INFO,
  CAPABILITIES,
  PROJECTS,
  GRAPHIC_DESIGN_ARTWORK,
  EXPERIENCE_EDUCATION,
  SKILLS
} from './data.js';

/* ==========================================================================
   STATE MANAGEMENT
   ========================================================================== */
const state = {
  soundEnabled: false,
  activeFilter: 'all',
  searchQuery: '',
  selectedIndex: 0,
  searchResults: [],
  audioCtx: null
};

/* ==========================================================================
   AUDIO SYNTHESIZER (Tactile Clicks & Pops)
   ========================================================================== */
function initAudio() {
  if (!state.audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      state.audioCtx = new AudioContext();
    }
  }
}

function playHapticSound(type = 'click') {
  if (!state.soundEnabled || !state.audioCtx) return;
  try {
    if (state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }

    const osc = state.audioCtx.createOscillator();
    const gain = state.audioCtx.createGain();
    const now = state.audioCtx.currentTime;

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(state.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'open') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.08);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(state.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'close') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.06);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(state.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    }
  } catch (err) {
    console.warn('Audio playback error:', err);
  }
}

/* ==========================================================================
   DOM INITIALIZATION & CONTENT INJECTION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  renderCapabilities();
  renderSelectedWorks();
  renderGraphicArt();
  renderSkills();
  renderTimeline();
  setupNavigation();
  setupCommandPalette();
  setupCaseStudyModal();
  setupLightbox();
  setupCursor();
  setupSoundToggle();
  setupModalAccessibility();
  startBengaluruClock();
  initMotion();
});

/* ==========================================================================
   1. RENDER CAPABILITIES
   ========================================================================== */
function renderCapabilities() {
  const container = document.getElementById('pillars-container');
  if (!container) return;

  container.innerHTML = CAPABILITIES.map(cap => `
    <article class="pillar-card" data-cursor-pill="${cap.title}">
      <div>
        <div class="pillar-icon">${cap.icon}</div>
        <h3 class="pillar-title">${cap.title}</h3>
        <p class="pillar-body">${cap.summary}</p>
      </div>
    </article>
  `).join('');
}

/* ==========================================================================
   2. RENDER SELECTED WORKS (3-Column Layout)
   ========================================================================== */
function renderSelectedWorks() {
  const container = document.getElementById('works-container');
  if (!container) return;

  container.innerHTML = PROJECTS.map(project => `
    <article role="button" aria-label="Open case study: ${project.title}" class="work-card" data-project-id="${project.id}" data-cursor-pill="View Study" tabindex="0">
      <div class="work-grid">
        <!-- Col Left: Context & Title -->
        <div class="work-col-left">
          <div>
            <span class="work-badge">${project.badge}</span>
            <h3 class="work-title">${project.title}</h3>
            <p class="work-summary">${project.summary}</p>
          </div>
          <div>
            <span class="work-timeline-label">Project Timeline</span>
            <p class="work-timeline-val">${project.timeline}</p>
          </div>
        </div>

        <!-- Col Mid: Preview Media -->
        <div class="work-col-mid">
          <div class="device-toolbar" aria-hidden="true"><i></i><i></i><i></i><span>${project.badge} / Design study</span></div><img class="work-media-img" src="${project.image}" alt="${project.title} preview" loading="lazy" />
          <div class="work-hover-overlay">
            <span class="work-action-pill">
              <span>View Case Study</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </span>
          </div>
        </div>

        <!-- Col Right: Role & Tools -->
        <div class="work-col-right">
          <div class="work-meta-block">
            <p class="work-meta-label">Role</p>
            <p class="work-meta-val">${project.role}</p>
          </div>
          <div class="work-meta-block">
            <p class="work-meta-label">Tools &amp; Stack</p>
            <div class="work-tools-list">
              ${project.tools.map(tool => `<span class="work-tool-tag">${tool}</span>`).join('')}
            </div>
          </div>
          ${project.caseStudy.independentConcept ? `
            <div class="work-meta-block">
              <span style="font-family:var(--font-mono); font-size:0.7rem; color:var(--accent-amber); padding:0.2rem 0.5rem; background:rgba(245,158,11,0.1); border-radius:4px; border:1px solid rgba(245,158,11,0.3);">Independent Concept</span>
            </div>
          ` : ''}
        </div>
      </div>
    </article>
  `).join('');

  // Add click & keyboard listeners to open case studies
  container.querySelectorAll('.work-card').forEach(card => {
    const projectId = card.dataset.projectId;
    card.addEventListener('click', () => {
      openCaseStudy(projectId);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCaseStudy(projectId);
      }
    });
  });
}

/* ==========================================================================
   3. RENDER GRAPHIC DESIGN ARTWORKS
   ========================================================================== */
function renderGraphicArt() {
  const container = document.getElementById('graphics-container');
  if (!container) return;

  container.innerHTML = GRAPHIC_DESIGN_ARTWORK.map(art => `
    <article role="button" aria-label="View artwork: ${art.title}" class="graphic-card" data-art-id="${art.id}" data-cursor-pill="View Art" tabindex="0">
      <div class="graphic-img-wrap">
        <img class="graphic-img" src="${art.image.replace('assets/graphics/', 'assets/previews/').replace(/\.png$/i, '.jpg')}" alt="${art.title}" loading="lazy" />
      </div>
      <div class="graphic-info">
        <p class="graphic-cat">${art.category}</p>
        <h3 class="graphic-title">${art.title}</h3>
        <p class="graphic-medium">${art.medium}</p>
      </div>
    </article>
  `).join('');

  container.querySelectorAll('.graphic-card').forEach(card => {
    const artId = card.dataset.artId;
    const art = GRAPHIC_DESIGN_ARTWORK.find(a => a.id === artId);
    if (!art) return;

    card.addEventListener('click', () => {
      openLightbox(art.image, `${art.title} — ${art.medium}`);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(art.image, `${art.title} — ${art.medium}`);
      }
    });
  });
}

/* ==========================================================================
   4. RENDER SKILLS & TOOLSETS
   ========================================================================== */
function renderSkills() {
  const toolsEl = document.getElementById('tools-tags');
  const methodsEl = document.getElementById('methods-tags');


  if (toolsEl) {
    toolsEl.innerHTML = SKILLS.designTools.map(t => `<span class="skill-chip">${t}</span>`).join('');
  }
  if (methodsEl) {
    methodsEl.innerHTML = SKILLS.capabilities.map(m => `<span class="skill-chip">${m}</span>`).join('');
  }
}

/* ==========================================================================
   5. RENDER CAREER & EDUCATION TIMELINE
   ========================================================================== */
function renderTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  container.innerHTML = EXPERIENCE_EDUCATION.map(item => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <p class="timeline-period">${item.period}</p>
      <h3 class="timeline-role">${item.role}</h3>
      <p class="timeline-company">${item.company} • ${item.location}</p>
      <ul class="timeline-bullets">
        ${item.points.map(pt => `<li>${pt}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

/* ==========================================================================
   6. COMMAND PALETTE & FUZZY SEARCH SYSTEM
   ========================================================================== */
function setupCommandPalette() {
  const modal = document.getElementById('search-modal');
  const input = document.getElementById('search-input');
  const list = document.getElementById('search-results-list');
  const chips = document.getElementById('search-chips');
  const status = document.getElementById('search-status');
  const index = buildSearchIndex();
  let returnFocus;
  let previousOverflow = '';
  const background = [...document.body.children].filter(el => !el.contains(modal) && el.tagName !== 'SCRIPT');
  const previousInert = new Map();

  function closeSearch(restoreFocus = true) {
    modal.classList.remove('active');
    modal.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = previousOverflow;
    background.forEach(el => { el.inert = previousInert.get(el) || false; });
    if (restoreFocus && returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    playHapticSound('close');
  }

  function openSearch() {
    if (!modal.hidden) return;
    returnFocus = document.activeElement;
    previousOverflow = document.body.style.overflow;
    background.forEach(el => { previousInert.set(el, el.inert); el.inert = true; });
    initAudio();
    playHapticSound('open');
    modal.hidden = false;
    void modal.offsetWidth;
    modal.classList.add('active');
    input.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    input.value = '';
    state.searchQuery = '';
    state.activeFilter = 'all';
    state.selectedIndex = 0;
    updateChips();
    render();
    input.focus();
  }

  function activate(item) {
    closeSearch(false);
    if (item.type === 'project') {
      openCaseStudy(item.target);
      document.getElementById('case-modal-close-btn').focus();
    } else if (item.type === 'artwork') {
      openLightbox(item.image, item.caption);
      document.getElementById('lightbox-close-btn').focus();
    } else {
      const target = document.getElementById(item.target);
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      }
    }
  }

  function select(scroll = false) {
    const options = list.querySelectorAll('[role="option"]');
    options.forEach((el, i) => {
      const selected = i === state.selectedIndex;
      el.classList.toggle('selected', selected);
      el.setAttribute('aria-selected', String(selected));
      if (selected) {
        input.setAttribute('aria-activedescendant', el.id);
        if (scroll) el.scrollIntoView({ block: 'nearest' });
      }
    });
    if (!options.length) input.removeAttribute('aria-activedescendant');
  }

  function render() {
    const items = searchPortfolio(index, state.searchQuery, state.activeFilter);
    state.searchResults = items;
    status.textContent = items.length + (items.length === 1 ? ' result' : ' results') + (state.searchQuery ? ' for “' + state.searchQuery + '”' : ' · Explore Abdulla’s portfolio');
    list.innerHTML = items.length ? items.map((item, i) =>
      '<li class="search-item" id="search-result-' + i + '" role="option" aria-selected="false" data-index="' + i + '">' +
      '<div class="search-item-info"><span class="search-item-title">' + escapeHtml(item.title) + '</span>' +
      '<span class="search-item-desc">' + escapeHtml(item.desc) + '</span></div>' +
      '<span class="search-item-badge">' + escapeHtml(item.badge) + '</span></li>'
    ).join('') : '<li class="search-empty-state" role="presentation">No matches. Try Figma, GitFit, graphic design, or Bengaluru. Choose All to search every category.</li>';
    select();
    list.scrollTop = 0;
  }

  function updateChips() {
    chips.querySelectorAll('button').forEach(chip => {
      const active = chip.dataset.filter === state.activeFilter;
      chip.classList.toggle('active', active);
      chip.setAttribute('aria-pressed', String(active));
    });
  }

  ['open-search-btn', 'hero-search-btn', 'mobile-search-trigger'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => {
      if (id === 'mobile-search-trigger') toggleMobileDrawer(false);
      openSearch();
    });
  });
  document.getElementById('search-close-btn').addEventListener('click', () => closeSearch());
  modal.addEventListener('click', e => { if (e.target === modal) closeSearch(); });
  chips.addEventListener('click', e => {
    const chip = e.target.closest('button');
    if (!chip) return;
    state.activeFilter = chip.dataset.filter;
    state.selectedIndex = 0;
    updateChips();
    render();
  });
  input.addEventListener('input', () => {
    state.searchQuery = input.value.trim();
    state.selectedIndex = 0;
    render();
  });
  list.addEventListener('click', e => {
    const option = e.target.closest('[data-index]');
    if (option) activate(state.searchResults[Number(option.dataset.index)]);
  });
  input.addEventListener('keydown', e => {
    const count = state.searchResults.length;
    if (!count) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      state.selectedIndex = (state.selectedIndex + (e.key === 'ArrowDown' ? 1 : -1) + count) % count;
      select(true);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      activate(state.searchResults[state.selectedIndex]);
    }
  });
  window.addEventListener('keydown', e => {
    const editing = e.target.closest('input, textarea, select, [contenteditable="true"]');
    const otherModal = document.querySelector('.case-modal-backdrop.active, .lightbox-backdrop.active');
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && !otherModal) {
      e.preventDefault();
      modal.hidden ? openSearch() : closeSearch();
    } else if (e.key === '/' && !editing && !otherModal && modal.hidden) {
      e.preventDefault();
      openSearch();
    } else if (!modal.hidden && e.key === 'Escape') {
      e.preventDefault();
      closeSearch();
    } else if (!modal.hidden && e.key === 'Tab') {
      const controls = [input, document.getElementById('search-close-btn'), ...chips.querySelectorAll('button')];
      const first = controls[0], last = controls[controls.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    } else if (e.key.toLowerCase() === 'm' && !editing && modal.hidden && !e.metaKey && !e.ctrlKey && !e.altKey) {
      toggleSound();
    }
  });
}

/* ==========================================================================
   7. CASE STUDY DEEP-DIVE MODAL SYSTEM
   ========================================================================== */
function setupCaseStudyModal() {
  const caseModal = document.getElementById('case-study-modal');
  const closeBtn = document.getElementById('case-modal-close-btn');

  if (!caseModal) return;

  function closeModal() {
    playHapticSound('close');
    caseModal.classList.remove('active');
    setTimeout(() => {
      caseModal.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }, 250);
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  caseModal.addEventListener('click', (e) => {
    if (e.target === caseModal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && caseModal.classList.contains('active')) {
      closeModal();
    }
  });
}

function openCaseStudy(projectId) {
  initAudio();
  playHapticSound('open');
  const project = PROJECTS.find(p => p.id === projectId);
  if (!project) return;

  const caseModal = document.getElementById('case-study-modal');
  const modalBody = document.getElementById('case-modal-body');
  if (!caseModal || !modalBody) return;

  const study = project.caseStudy;

  modalBody.innerHTML = `
    <span class="case-eyebrow">${project.badge} • ${project.timeline}</span>
    <h2 class="case-modal-title" id="case-modal-title">${project.title}</h2>
    <p class="case-text" style="font-size:1.15rem; color:var(--text-primary); font-weight:500;">${project.tagline}</p>

    <!-- Hero Media -->
    <div class="case-hero-media">
      <img src="${project.image}" alt="${project.title} case study screen" />
    </div>

    <!-- The Problem -->
    <section class="case-section">
      <h3 class="case-section-title">The Problem &amp; Context</h3>
      <p class="case-text">${study.problem}</p>
    </section>

    <!-- Role & Responsibilities -->
    <section class="case-section">
      <h3 class="case-section-title">My Role: ${project.role}</h3>
      <p class="case-text">${study.role}</p>
    </section>

    <!-- Process Breakdown -->
    <section class="case-section">
      <h3 class="case-section-title">Design Process</h3>
      <div class="case-process-grid">
        ${study.process.map(st => `
          <div class="case-step-card">
            <p class="case-step-phase">${st.phase}</p>
            <p class="case-step-detail">${st.detail}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Key Design Decisions -->
    <section class="case-section">
      <h3 class="case-section-title">Key Design Decisions</h3>
      <ul class="case-decisions-list">
        ${study.designDecisions.map(d => `<li>${d}</li>`).join('')}
      </ul>
    </section>

    <!-- High-Fidelity Screens Gallery -->
    <section class="case-section">
      <h3 class="case-section-title">Production Screens</h3>
      <div style="display:flex; flex-direction:column; gap:1.5rem; margin-top:1rem;">
        ${study.screens.map(s => `
          <div style="border-radius:var(--radius-sm); overflow:hidden; border:1px solid var(--border-subtle); background:#000;">
            <img src="${s.image}" alt="${s.title}" style="width:100%; height:auto;" />
            <div style="padding:1rem; background:rgba(255,255,255,0.03);">
              <h4 style="font-size:0.95rem; font-weight:700; color:var(--text-primary);">${s.title}</h4>
              <p style="font-size:0.85rem; color:var(--text-secondary);">${s.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Measurable Outcome -->
    <div class="case-outcome-box">
      <h4 class="case-outcome-title">Outcome &amp; Impact</h4>
      <p class="case-text" style="color:var(--text-primary); font-weight:500;">${study.outcome}</p>
      ${study.independentConcept ? `
        <p style="font-size:0.8rem; color:var(--accent-amber); margin-top:0.6rem; font-family:var(--font-mono);">
          * Note: This project was designed as an independent product concept to demonstrate high-intensity mobile UX ergonomics and visual identity craft.
        </p>
      ` : ''}
    </div>
  `;

  caseModal.removeAttribute('hidden');
  void caseModal.offsetWidth;
  caseModal.classList.add('active');
  caseModal.querySelector('.case-modal-panel').scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   8. GRAPHIC DESIGN LIGHTBOX SYSTEM
   ========================================================================== */
function setupLightbox() {
  const lightboxModal = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close-btn');

  if (!lightboxModal) return;

  function closeLightbox() {
    playHapticSound('close');
    lightboxModal.classList.remove('active');
    setTimeout(() => {
      lightboxModal.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }, 250);
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });
}

function openLightbox(imgSrc, captionText) {
  initAudio();
  playHapticSound('open');
  const lightboxModal = document.getElementById('lightbox-modal');
  const imgEl = document.getElementById('lightbox-img');
  const captionEl = document.getElementById('lightbox-caption');

  if (!lightboxModal || !imgEl) return;

  imgEl.src = imgSrc;
  imgEl.alt = captionText;
  captionEl.textContent = captionText;

  lightboxModal.removeAttribute('hidden');
  void lightboxModal.offsetWidth;
  lightboxModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   9. CUSTOM MAGNETIC CURSOR
   ========================================================================== */
function setupCursor() {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  let mouseX = -100;
  let mouseY = -100;
  let cursorX = -100;
  let cursorY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Check for data-cursor-pill
    const targetWithPill = e.target.closest('[data-cursor-pill]');
    if (targetWithPill) {
      const pillText = targetWithPill.getAttribute('data-cursor-pill');
      cursor.textContent = pillText;
      cursor.classList.add('active');
    } else {
      cursor.textContent = '';
      cursor.classList.remove('active');
    }
  });

  function renderCursor() {
    // Smooth linear interpolation (lerp)
    cursorX += (mouseX - cursorX) * 0.22;
    cursorY += (mouseY - cursorY) * 0.22;

    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }

  requestAnimationFrame(renderCursor);
}

/* ==========================================================================
   10. SOUND TOGGLE
   ========================================================================== */
function setupSoundToggle() {
  const btn = document.getElementById('sound-toggle-btn');
  if (!btn) return;

  btn.addEventListener('click', toggleSound);
}

function toggleSound() {
  const btn = document.getElementById('sound-toggle-btn');
  const label = document.getElementById('sound-toggle-label');
  if (!btn) return;

  initAudio();
  state.soundEnabled = !state.soundEnabled;

  if (state.soundEnabled) {
    btn.classList.add('sound-on');
    if (label) label.textContent = 'Sound on';
    btn.setAttribute('aria-pressed', 'true');
    playHapticSound('click');
  } else {
    btn.classList.remove('sound-on');
    if (label) label.textContent = 'Sound off';
    btn.setAttribute('aria-pressed', 'false');
  }
}

/* ==========================================================================
   11. NAVIGATION, SCROLL SPY & MOBILE DRAWER
   ========================================================================== */
function setupNavigation() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      toggleMobileDrawer(!isOpen);
    });

    mobileDrawer.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggleMobileDrawer(false);
      });
    });
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('active', link.hash === '#' + entry.target.id));
    });
  }, { rootMargin: '-20% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}

function toggleMobileDrawer(open) {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (!mobileDrawer || !mobileBtn) return;

  if (open) {
    mobileDrawer.classList.add('open');
    mobileDrawer.removeAttribute('aria-hidden');
    mobileDrawer.inert = false;
    mobileBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  } else {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileDrawer.inert = true;
    mobileBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   12. BENGALURU LOCAL TIME CLOCK
   ========================================================================== */
function startBengaluruClock() {
  const clockEl = document.getElementById('local-time-display');
  if (!clockEl) return;

  function update() {
    try {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat([], options);
      clockEl.textContent = `Bengaluru ${formatter.format(new Date())} IST`;
    } catch {
      clockEl.textContent = 'Bengaluru, India';
    }
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   UTILITY HELPERS
   ========================================================================== */
function setupModalAccessibility() {
  for (const id of ['case-study-modal', 'lightbox-modal']) {
    const modal = document.getElementById(id);
    let opener;
    const saved = new Map();
    new MutationObserver(() => {
      const siblings = [...document.body.children].filter(el => el !== modal && el.tagName !== 'SCRIPT');
      if (!modal.hidden) {
        opener = document.activeElement.closest('[hidden]') ? document.getElementById('open-search-btn') : document.activeElement;
        siblings.forEach(el => { saved.set(el, el.inert); el.inert = true; });
        modal.querySelector('button')?.focus({ preventScroll: true });
      } else {
        siblings.forEach(el => { el.inert = saved.get(el) || false; });
        if (opener?.isConnected) opener.focus({ preventScroll: true });
      }
    }).observe(modal, { attributes: true, attributeFilter: ['hidden'] });
    modal.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const controls = [...modal.querySelectorAll('button, a[href], [tabindex="0"]')];
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
