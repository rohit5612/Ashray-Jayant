# Ashray Jayant · Zeerax — Portfolio

Premium game developer portfolio built with React 19, Vite 8, Tailwind CSS 4, GSAP, and Lenis.

## Quick Start

```bash
npm install
npm run dev
```

## Content Updates (no component edits)

### Formspree setup

1. Create a form at [formspree.io](https://formspree.io)
2. Set `formspreeEndpoint` in `src/data/contact.js` to your form URL (e.g. `https://formspree.io/f/abcdefgh`)
3. Edit form labels and messages in the same file under `form`

### Profile photo

Replace `src/assets/profile/avatar.svg` with your photo (`avatar.webp` or `.jpg`) and update the import in `src/data/profile.js`.

### Add a project

1. Create a folder: `src/assets/projects/your-project-name/`
   - Add `cover.webp` (or `.svg`), `thumb.webp`, `gallery/`, optional `demo.mp4`
2. Copy a project object in `src/data/projects.js` and update all fields
3. Assign tags (`PRIMARY_PROJECT`, `SECONDARY_PROJECT`, etc.)
4. Push to deploy

### Edit profile, journey, contact

- `src/data/profile.js` — name, title, hero text, skills
- `src/data/journey.js` — timeline milestones
- `src/data/contact.js` — email, GitHub, LinkedIn

## Deploy (Netlify)

Connect this repo to Netlify. Build settings are in `netlify.toml`:

- Build: `npm run build`
- Publish: `dist`

## Stack

- React 19 + Vite 8
- Tailwind CSS 4
- React Router DOM
- GSAP + ScrollTrigger
- Lenis smooth scroll
