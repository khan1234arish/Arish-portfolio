# Arish — Web & App Developer Portfolio & Admin Engine

A high-performance personal developer portfolio website and private content management system for **Arish** (Web & App Developer: Websites, Web Applications, iOS Applications), engineered with Next.js 14 (App Router), Tailwind CSS, Framer Motion, and TypeScript.

---

## Brand Visual Identity
- **Palette**: Dark (`#050505`, `#0A0A0A`, `#121212`), Crisp White Typography (`#FFFFFF`, `#A1A1AA`), and Crimson Red accents (`#E50914`, `#DC2626`).
- **Design Philosophy**: Minimal, technical, sophisticated, high-contrast, sub-second performance, and purposeful 60fps micro-motion.
- **Featured Flagship**: Features **MEHAR** (B2B Battery & Clean Energy Platform: [meharbatteries.com](https://www.meharbatteries.com/)) as the core showcase with a dedicated deep-dive case study route (`/work/mehar`).

---

## Architecture & Features

1. **Public Portfolio Website (`/`)**:
   - **Hero Section**: Cinematic typography entrance, live availability badge, and dual CTAs.
   - **Navigation**: Intelligent sticky backdrop blur, active section indicator, availability pulse, and animated mobile drawer.
   - **Selected Work**: Editorial showcase featuring MEHAR as project #1, category filter, and rich interactive cards.
   - **Case Study Deep Dives (`/work/[slug]`)**: Detailed architectural breakdowns, technical metrics, problem & context, solution & design, and live platform links.
   - **Services (What I Build)**: 01 Websites, 02 Web Apps, 03 iOS Apps.
   - **Process (Idea to Launch)**: 4-stage engineering lifecycle (Discover, Design, Build, Launch).
   - **Technology**: Restrained, verified technical arsenal grouped by discipline.
   - **About (The Developer Behind The Work)**: Craft narrative, developer monogram terminal, and core principles.
   - **Experiments**: Interactive UI prototypes and code lab demos.
   - **Contact & Footer**: Interactive dispatch form, one-click email copy, social links, and identity footer.
   - **Custom Cursor**: Desktop follower ring and crimson dot with interactive hover states.

2. **Private Admin Platform (`/admin`)**:
   - Strictly private authenticated route (hidden from public navigation).
   - **Authentication**: Session cookie + PIN/password validation (Default PIN: `arish2025`).
   - **Dashboard**: High-level platform health, live availability toggle, and quick stats.
   - **Project Manager**: Full CRUD for adding/editing projects, ordering, tags, and case study details.
   - **Services & Technologies**: Modify service offerings and verified tech stack.
   - **About & Bio**: Update narrative, tagline, and contact links.
   - **Settings & Security**: Update contact section copy, SEO metadata, and change Admin PIN.

3. **Data Layer**:
   - File-based JSON persistence (`src/data/site-content.json`) with in-memory caching and fallback to `initialData.ts`.
   - Dynamic real-time synchronization between Admin updates and public pages.

---

## Getting Started

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public website.

### Private Admin Access
1. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin).
2. Enter the admin PIN: `arish2025` (changeable anytime under **Site Settings**).
3. Update content, toggle availability, and changes will immediately reflect on the public site.

### Production Build
```bash
npm run build
npm run start
```
