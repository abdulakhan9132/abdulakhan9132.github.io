import { PERSONAL_INFO, PROJECTS, GRAPHIC_DESIGN_ARTWORK, CAPABILITIES, EXPERIENCE_EDUCATION, SKILLS } from './data.js';

const flatten = value => typeof value === 'string' ? value : Array.isArray(value)
  ? value.map(flatten).join(' ') : value && typeof value === 'object'
    ? Object.values(value).map(flatten).join(' ') : '';
const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

// One index, derived from the same data that renders the portfolio.
export function buildSearchIndex() {
  return [
    ...PROJECTS.map(p => ({ id: p.id, type: 'project', title: p.title, desc: p.tagline, category: p.category, badge: 'Project', text: flatten(p), target: p.id })),
    ...GRAPHIC_DESIGN_ARTWORK.map(a => ({ id: a.id, type: 'artwork', title: a.title, desc: a.description, category: 'Graphic Design', badge: 'Artwork', text: flatten(a), image: a.image, caption: `${a.title} — ${a.medium}` })),
    ...CAPABILITIES.map(c => ({ id: c.id, type: 'section', title: c.title, desc: c.summary, category: 'Product & UI/UX', badge: 'Capability', text: `${c.title} ${c.summary}`, target: 'capabilities' })),
    { id: 'profile', type: 'section', title: `About ${PERSONAL_INFO.name}`, desc: `${PERSONAL_INFO.role} · ${PERSONAL_INFO.location}`, category: 'About & Contact', badge: 'Profile', text: flatten(PERSONAL_INFO), target: 'about' },
    { id: 'contact', type: 'section', title: `Contact ${PERSONAL_INFO.name}`, desc: `${PERSONAL_INFO.email} · LinkedIn · Behance`, category: 'About & Contact', badge: 'Contact', text: `contact email hire collaborate ${PERSONAL_INFO.email} ${PERSONAL_INFO.linkedin} ${PERSONAL_INFO.behance}`, target: 'contact' },
    ...EXPERIENCE_EDUCATION.map((e, i) => ({ id: `experience-${i}`, type: 'section', title: `${e.role} · ${e.company}`, desc: `${e.period} · ${e.location}`, category: 'Experience & Education', badge: e.type === 'Education' ? 'Education' : 'Experience', text: flatten(e), target: 'experience' })),
    ...Object.entries(SKILLS).flatMap(([group, skills]) => skills.map((skill, i) => ({ id: `skill-${group}-${i}`, type: 'section', title: skill, desc: `${PERSONAL_INFO.name} · ${group === 'designTools' ? 'Design tool' : group === 'technical' ? 'Technical skill' : 'Design method'}`, category: 'Skills & Tools', badge: 'Skill', text: skill, target: 'about' })))
  ];
}

export function searchPortfolio(index, query = '', category = 'all') {
  const terms = normalize(query).split(' ').filter(Boolean);
  return index.filter(item => category === 'all' || item.category === category)
    .map(item => {
      const title = normalize(item.title);
      const description = normalize(item.desc);
      const text = normalize(`${item.text} ${item.category} ${item.badge}`);
      const matches = terms.every(term => title.includes(term) || description.includes(term) || text.includes(term));
      const score = terms.reduce((sum, term) => sum + (title === term ? 12 : title.includes(term) ? 6 : description.includes(term) ? 3 : 1), 0);
      return { item, matches, score };
    })
    .filter(result => result.matches)
    .sort((a, b) => b.score - a.score)
    .map(result => result.item);
}
