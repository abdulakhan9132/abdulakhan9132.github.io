/** Abdulla Khan — UI/UX, product and graphic design portfolio content. */

export const PERSONAL_INFO = {
  "name": "Abdulla Khan",
  "creditName": "Abdullah Khan Suri",
  "role": "UI/UX Designer, Product Designer & Graphic Designer",
  "location": "Bengaluru, India",
  "headline": "I design thoughtful digital experiences with character.",
  "subheadline": "Blending human-centered design, visual systems, and thoughtful interaction into intuitive digital products.",
  "email": "abdullakhan9132@gmail.com",
  "linkedin": "https://linkedin.com/in/abdulla-khan-suri",
  "behance": "https://behance.net/abdullakhan68",
  "meta": [
    {
      "label": "Role",
      "value": "UI/UX & Product Designer"
    },
    {
      "label": "Current",
      "value": "Indo-Sakura Software Japan"
    },
    {
      "label": "Base",
      "value": "Bengaluru, IND"
    }
  ]
};

export const CAPABILITIES = [
  {
    "id": "product-design",
    "title": "Product Design",
    "summary": "Translating complex operational problems into scalable, production-ready product architectures and design systems.",
    "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5\"/></svg>"
  },
  {
    "id": "ui-ux",
    "title": "UI/UX Design",
    "summary": "Crafting wireframes, responsive 12-column layouts, micro-interactions, and high-fidelity prototypes ready for developer handoff.",
    "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><line x1=\"3\" y1=\"9\" x2=\"21\" y2=\"9\"/><line x1=\"9\" y1=\"21\" x2=\"9\" y2=\"9\"/></svg>"
  },
  {
    "id": "graphic-design",
    "title": "Graphic Design & Identity",
    "summary": "Brutalism, experimental typography, brand identity, and expressive digital visual art with Photoshop & Illustrator.",
    "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M8 14s1.5 2 4 2 4-2 4-2\"/><line x1=\"9\" y1=\"9\" x2=\"9.01\" y2=\"9\"/><line x1=\"15\" y1=\"9\" x2=\"15.01\" y2=\"9\"/></svg>"
  }
];

export const PROJECTS = [
  {
    "id": "caseform-3d",
    "title": "Caseform — 3D Product & Motion Website",
    "tagline": "An interactive 3D product website for iPhone 17, iPhone 17 Pro, and iPhone 17 Pro Max back covers",
    "category": "Product & UI/UX",
    "badge": "3D Motion Website",
    "timeline": "Independent Concept",
    "role": "Design & Frontend Development",
    "tools": ["Three.js", "GSAP", "ScrollTrigger", "WebGL"],
    "image": "assets/projects/caseform/site-preview.png",
    "website": "assets/projects/caseform/site/index.html",
    "summary": "A cinematic 3D product website with modeled camera optics, textured silicone, studio reflections, and an interactive case configurator for iPhone 17, 17 Pro, and 17 Pro Max.",
    "caseStudy": {
      "problem": "Flat product cards do not communicate how a case feels in space. This independent website explores a SaaS-style product experience where people can see real back-cover imagery, rotate the product, and explore an animated interpretation of its layers.",
      "role": "Designed and built a standalone responsive website with custom case geometry, physical materials, studio lighting, and GSAP choreography. Modeled the camera openings, raised lips, optical assemblies, side controls, ports, and device layers from product references.",
      "process": [
        {"phase": "01. Sculpting the Product", "detail": "Built hollow case shells with true camera cutouts, layered optical assemblies, rounded protective rims, and separate device and screen geometry. Official product photographs guide proportions and supply optical detail."},
        {"phase": "02. Motion Direction", "detail": "Choreographed a floating product hero and a pinned scroll sequence that separates the shell, magnetic ring, and device before rotating the assembly."},
        {"phase": "03. Interactive Studio", "detail": "Built model and finish switching, animated macro and reverse views, pointer and keyboard rotation, reset, and PNG export. Added reduced-motion support, lazy scene initialization, and a photo fallback."}
      ],
      "designDecisions": [
        "Material realism: fine silicone grain, transparent polycarbonate, coated optical detail, metal rings, studio environment reflections, and soft shadows respond to changes in angle.",
        "Motion with control: the 3D chapter responds to scroll, can be paused, and respects the operating system's reduced-motion preference.",
        "An accessible studio: device names accompany radio controls, rotation has a labeled slider and keyboard support, and the selected perspective can be saved as a PNG.",
        "Original interpretation: custom Canyon, Graphite, and Chalk finishes belong to this independent concept; geometry and exploded layers are modeled interpretations rather than scanned or manufacturing data."
      ],
      "screens": [
        {"title": "Product Website / Less ordinary. More you.", "desc": "Cinematic product presentation with custom case models, coated optics, and physical lighting.", "image": "assets/projects/caseform/site-preview.png"},
        {"title": "Motion Graphics / Every angle considered", "desc": "Screenshot of the pinned, scroll-driven exploded product sequence.", "image": "assets/projects/caseform/motion-preview.png"},
        {"title": "Interactive Studio / Make it your angle", "desc": "Model and finish selection, animated detail views, 3D rotation, and perspective export.", "image": "assets/projects/caseform/studio-preview.png"}
      ],
      "outcome": "A complete standalone 3D motion website linked from the portfolio, with three selectable models, live rotation, an exploded product animation, and image export. Independent concept; no checkout or sales metrics are claimed.",
      "independentConcept": true
    }
  },
  {
    "id": "supplier-intelligence",
    "title": "Supplier Intelligence & Risk Command Center",
    "tagline": "Real-time supplier exposure, PPM quality, and OTIF analytics platform",
    "category": "Enterprise Systems",
    "badge": "Supply Chain",
    "timeline": "2.5 Months",
    "role": "Principal UI/UX Architect",
    "tools": [
      "Figma",
      "Enterprise Design System",
      "Chart Telemetry",
      "Data Grids"
    ],
    "image": "assets/projects/supplier_intelligence.png",
    "summary": "Procurement executives lacked real-time visibility into supplier defect rates (PPM) and PPAP rejection statuses, leading to surprise assembly line stoppages.",
    "caseStudy": {
      "problem": "Procurement executives lacked real-time visibility into supplier defect rates (PPM) and PPAP rejection statuses, leading to surprise assembly line stoppages.",
      "role": "Architected the information architecture, 12-column responsive layout, tabular data sorting ergonomics, and status token system.",
      "process": [
        {
          "phase": "01. Telemetry Audit",
          "detail": "Analyzed supply chain telemetry data and shadowed procurement leads during monthly risk reviews to identify primary KPI bottlenecks."
        },
        {
          "phase": "02. Grid Iteration",
          "detail": "Iterated through 8 grid variations balancing top-level KPI metric cards with dense tabular rows."
        },
        {
          "phase": "03. Component Governance",
          "detail": "Created reusable table headers, sortable pills, and drilldown slide-over drawers."
        }
      ],
      "designDecisions": [
        "Scannable Risk Scoring: Combined numeric PPM defect rates with high-visibility status badges (Extreme, Medium, Safe).",
        "Row Hover Depth: Subtle contrast shifts and sticky column headers preserve user context when auditing 50+ row datasets.",
        "Direct Plant Mapping: Embedded affected assembly plant chips directly beside supplier names."
      ],
      "screens": [
        {
          "title": "Command Center Overview",
          "desc": "Top-level KPI cards with interactive supplier risk list and delivery status",
          "image": "assets/projects/supplier_intelligence.png"
        }
      ],
      "outcome": "Decreased supplier defect escalation turnaround by 45% across 12 assembly facilities.",
      "independentConcept": false
    }
  },
  {
    "id": "gitfit-mobile",
    "title": "GitFit 2.0 — Mobile Fitness Experience",
    "tagline": "Gamified workout streaks, progressive overload logging, and community challenges",
    "category": "Product & UI/UX",
    "badge": "Mobile App",
    "timeline": "2 Months",
    "role": "Lead UI/UX Designer & Visual Lead",
    "tools": [
      "Figma",
      "Adobe Photoshop",
      "Illustrator",
      "Rive"
    ],
    "image": "assets/gitfit/Gitfit.png",
    "summary": "Traditional fitness trackers overload gym-goers with complicated setup flows during high-intensity training. GitFit 2.0 streamlines set logging to two taps.",
    "caseStudy": {
      "problem": "Gym-goers drop off from workout tracking apps because logging sets, reps, and RPE during intense sessions requires too many taps and complex navigation.",
      "role": "Designed end-to-end mobile experience, typography hierarchy, high-contrast dark theme for low-light gym floors, and gamified streak visuals.",
      "process": [
        {
          "phase": "01. Gym Floor Ergonomics",
          "detail": "Observed users mid-workout; users only have one thumb available between sets and need high-contrast buttons."
        },
        {
          "phase": "02. One-Thumb Zone",
          "detail": "Anchored primary counter buttons within the bottom 40% of the mobile viewport."
        },
        {
          "phase": "03. Visual Polish",
          "detail": "Constructed bold typography with vibrant neon accents and tactile haptic-inspired feedback states."
        }
      ],
      "designDecisions": [
        "Rapid Rest Timer: Auto-starting rest countdown ring with audio chime toggle.",
        "High-Contrast Gym Mode: Pitch black foundation with vibrant yellow/orange accents to remain readable under harsh gym spotlights.",
        "Visual Streak Celebrations: Dynamic badge unlocking upon completing weekly workout goals."
      ],
      "screens": [
        {
          "title": "GitFit Mobile App",
          "desc": "High-fidelity mockups of workout logger, streak counter, and exercise library",
          "image": "assets/gitfit/Gitfit.png"
        }
      ],
      "outcome": "Designed an intuitive, 2-tap set logging experience that cuts mid-workout tracking time in half.",
      "independentConcept": true
    }
  },
  {
    "id": "knowledge-explorer",
    "title": "Knowledge Explorer & Visual Node Graph",
    "tagline": "Interactive graph visualization for complex enterprise bill of materials",
    "category": "Enterprise Systems",
    "badge": "Knowledge Graph",
    "timeline": "2 Months",
    "role": "Senior Interaction Designer",
    "tools": [
      "Figma",
      "Node Graph Architecture",
      "Interaction Specs",
      "D3 Models"
    ],
    "image": "assets/projects/knowledge_explorer.png",
    "summary": "Engineering teams struggled to trace how a drawing revision change in a single battery module impacted downstream purchase orders, plants, and supplier agreements.",
    "caseStudy": {
      "problem": "Engineering teams struggled to trace how a drawing revision change in a single battery module impacted downstream purchase orders, plants, and supplier agreements.",
      "role": "Designed interactive node graph controls, zoom/pan navigation physics, multi-entity search filtering, and contextual inspection panels.",
      "process": [
        {
          "phase": "01. Graph Discovery",
          "detail": "Researched dependency paths across 120+ vehicle sub-assemblies to define component hierarchies."
        },
        {
          "phase": "02. Spatial Ergonomics",
          "detail": "Designed radial clustering so related components stay grouped without visual collision."
        },
        {
          "phase": "03. Inspector Drawer",
          "detail": "Built a contextual slide-out drawer revealing BOM revisions when clicking any node."
        }
      ],
      "designDecisions": [
        "Radial Cluster Grouping: Related parts stay connected via curved spline connectors with directional flow indicators.",
        "Fast Entity Search: Instant node highlighting when typing part numbers or engineer names.",
        "Contextual Inspector: Seamless side drawer providing full documentation without leaving the spatial canvas."
      ],
      "screens": [
        {
          "title": "Visual Node Graph",
          "desc": "Interactive enterprise graph connecting component drawings, suppliers, and purchase orders",
          "image": "assets/projects/knowledge_explorer.png"
        }
      ],
      "outcome": "Increased entity retrieval speed by 62% and reduced task backlog across cross-functional engineering teams.",
      "independentConcept": false
    }
  },
  {
    "id": "executive-dashboard",
    "title": "Executive Risk & Portfolio Health Dashboard",
    "tagline": "VP & C-level portfolio risk forecasting and revenue tracking cockpit",
    "category": "Enterprise Systems",
    "badge": "Executive UX",
    "timeline": "2 Months",
    "role": "Lead Systems Designer",
    "tools": [
      "Figma",
      "Horizon Pro Design System",
      "Executive Data Architecture"
    ],
    "image": "assets/projects/executive_dashboard.png",
    "summary": "VPs and C-level executives lacked a single source of truth for portfolio-wide risk, monthly revenue targets, and critical engineering blockers.",
    "caseStudy": {
      "problem": "VPs and C-level executives lacked a single source of truth for portfolio-wide risk, monthly revenue targets, and critical engineering blockers.",
      "role": "Designed executive KPI summaries, risk forecasting time horizon filters (30/60/90 days), and cross-functional progress charts.",
      "process": [
        {
          "phase": "01. Executive Interviews",
          "detail": "Shadowed weekly steering committee meetings to determine the primary 5-second decision triggers."
        },
        {
          "phase": "02. Tiered Hierarchy",
          "detail": "Formulated a 3-tier card structure: Top KPIs -> Strategic Outlook Charts -> Operational Action Rows."
        },
        {
          "phase": "03. Micro-Interaction Polish",
          "detail": "Engineered smooth hover states and responsive breakdowns for tablet executive reviews."
        }
      ],
      "designDecisions": [
        "5-Second Scannability: High-contrast large numeral typography for active projects and target revenue.",
        "Time-Horizon Toggle: Instant filtering across 30, 60, and 90-day risk windows.",
        "Outlier Highlighting: Red risk flags immediately pinpoint stalled programs."
      ],
      "screens": [
        {
          "title": "Executive Dashboard",
          "desc": "Strategic portfolio health cockpit with revenue forecast curves and active project status",
          "image": "assets/projects/executive_dashboard.png"
        }
      ],
      "outcome": "Streamlined executive review meetings from 90 minutes down to 30 minutes with real-time decision clarity.",
      "independentConcept": false
    }
  }
];

export const GRAPHIC_DESIGN_ARTWORK = [
  {
    "id": "brutalism",
    "title": "Brutalism",
    "category": "Graphic Design / Poster",
    "medium": "Adobe Photoshop & Illustrator",
    "image": "assets/graphics/Brutalism.png",
    "description": "Monolithic typographic brutalist exploration examining architectural tension, raw geometric grids, and high-impact visual rhythm."
  },
  {
    "id": "unseen-dark",
    "title": "UNSEEN (Monochrome)",
    "category": "Graphic Design / Editorial Art",
    "medium": "Photoshop & Digital Compositing",
    "image": "assets/graphics/UNSEEN.png",
    "description": "High-contrast dark surrealist composition exploring concealment, silhouette, and tactile grain textures."
  },
  {
    "id": "unseen-red",
    "title": "UNSEEN (Red Edition)",
    "category": "Graphic Design / Experimental",
    "medium": "Photoshop & Color Grading",
    "image": "assets/graphics/UNSEEN red.png",
    "description": "Intense monochromatic crimson study emphasizing psychological tension, raw contrast, and evocative lighting."
  },
  {
    "id": "for-you",
    "title": "For You, I'd Risk It All",
    "category": "Graphic Design / Visual Narrative",
    "medium": "Digital Illustration & Photoshop",
    "image": "assets/graphics/For You, I’d Risk It All.png",
    "description": "Narrative-driven visual composition blending expressive character art with poignant editorial typography."
  },
  {
    "id": "walk",
    "title": "Walk",
    "category": "Graphic Design / Art",
    "medium": "Digital Compositing & Texture Design",
    "image": "assets/graphics/walk.png",
    "description": "Minimalist atmospheric silhouette exploring solitary motion, deep spatial scale, and textured grain gradients."
  },
  {
    "id": "fall-in-love",
    "title": "Fall in Love",
    "category": "Graphic Design / Typographic Poster",
    "medium": "Illustrator & Photoshop",
    "image": "assets/graphics/Fall in love.png",
    "description": "Subtle tone study balancing delicate typographic hierarchy with ambient emotional gradients."
  },
  {
    "id": "love",
    "title": "Love",
    "category": "Graphic Design / Minimalist Poster",
    "medium": "Vector & Photoshop",
    "image": "assets/graphics/love.png",
    "description": "Modern symbolic graphic poster focusing on balanced negative space and restrained color accents."
  },
  {
    "id": "tree-sky",
    "title": "Tree Sky",
    "category": "Graphic Design / Landscape Art",
    "medium": "Atmospheric Digital Matte Painting",
    "image": "assets/graphics/tree sky.png",
    "description": "Expansive atmospheric twilight study capturing organic silhouettes against dramatic ethereal cloudscapes."
  }
];

export const EXPERIENCE_EDUCATION = [
  {
    "period": "September 2025 – Present",
    "role": "UI/UX & Graphic Designer",
    "company": "Indo-Sakura Software Japan",
    "location": "Bengaluru, India",
    "type": "Work Experience",
    "points": [
      "Owned end-to-end design for web and mobile features: user flows, wireframes, high-fidelity UI, and interactive prototypes for stakeholder review.",
      "Built reusable Figma components, variants, and design system token architectures for scalable enterprise UI.",
      "Improved information architecture, navigation structures, and responsive layouts across active product interfaces.",
      "Prepared structured design specifications, tokens, and redlines to ensure zero-friction developer handoffs."
    ]
  },
  {
    "period": "Undergraduate Degree",
    "role": "Bachelor of Commerce (B.Com)",
    "company": "Sahyadri Commerce and Management College",
    "location": "Shivamogga, Karnataka, India",
    "type": "Education",
    "points": [
      "Focused on business operations, organizational strategy, and commercial systems.",
      "Provides a strong business acumen foundation that bridges user needs with measurable product viability."
    ]
  }
];

export const SKILLS = {
  "designTools": [
    "Figma",
    "Framer",
    "Adobe XD",
    "Photoshop",
    "Illustrator",
    "Affinity",
    "CorelDRAW",
    "Canva",
    "Rive"
  ],
  "capabilities": [
    "Product Design",
    "UI/UX Design",
    "Graphic Design",
    "Interaction Design",
    "Design Systems",
    "User Flows",
    "Wireframing",
    "Responsive Web Design",
    "Developer Handoff",
    "Information Architecture"
  ]
};
