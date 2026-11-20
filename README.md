# Prathmesh Bhilegaonkar — Portfolio (React + Vite)

Dark/red animated portfolio: loading counter, giant PORTFOLIO hero, colourful cursor-arrow
particles, project grid with filters and tilt, wireframe → live drag slider, scroll-drawn
process timeline, journey accordion and contact section.

## Run it

You need Node.js 18 or newer (https://nodejs.org).

```bash
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173).

## Deploy

This repo is deployed on **Vercel**. `vercel.json` tells Vercel to run `npm run build` and serve `dist/`, so every push to `main` redeploys the site.

To build locally: `npm run build` (output goes to `dist/`).

## What's on the page

- **Interactive terminal** in the hero: visitors can type `help`, `projects`, `open 3`, `resume`, `sudo hire prathmesh`…
- **Open to work badge + Resume download** in the nav (`public/Prathmesh_Bhilegaonkar_Resume.pdf`)
- **Project cards** with Live demo / Code buttons and impact numbers
- **Ask KisaanSathi**: a scripted chat demo with cited answers
- **Beat my bot**: playable chess against a minimax + alpha-beta engine (`src/chess/engine.js`)
- **Still shipping**: live GitHub stats, latest commits, contribution chart, LeetCode count

## Switch features on (in `src/data.js`)

| Setting | What it does |
|---|---|
| `PHOTO = './me.png'` | Shows your photo in the hero card (put the file in `public/`) |
| `LEETCODE_USER = 'yourname'` | Shows your LeetCode solved count |
| `demo: 'https://…'` on a project | Adds a red **Live demo** button |
| `impact: [{ v: '500+', l: 'Users' }]` | Adds big impact numbers to a project card |
| `RESUME` | Swap the PDF in `public/` to update your resume |

Live GitHub data comes from the public GitHub API and loads in the visitor's browser.

## Edit content

Almost everything (projects, links, skills, experience, stats) lives in `src/data.js`.

| What | Where |
|---|---|
| Text, projects, links | `src/data.js` |
| Colours & fonts | top of `src/index.css` (`:root` tokens) |
| Project thumbnails | `src/components/Thumbs.jsx` |
| Terminal commands | `src/components/Terminal.jsx` |
| Chat demo questions | `src/components/AskDemo.jsx` |
| Chess engine | `src/chess/engine.js` |

