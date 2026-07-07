# Prathmesh Bhilegaonkar — Portfolio Website

A clean, dark-themed personal portfolio built with plain HTML, CSS, and JavaScript.
No build step, no framework — open `index.html` and it works.

## Structure

```
portfolio/
├── index.html      # all page content/sections
├── style.css        # design tokens, layout, animations
├── script.js        # nav toggle, scroll reveals, typewriter, form
├── assets/
│   ├── favicon.svg
│   └── resume.pdf   # ⚠️ add your actual resume here
└── README.md
```

## Run it locally

Just open `index.html` in a browser. For live-reload while editing, you can
also serve it with any static server, e.g.:

```bash
npx serve .
# or
python -m http.server 8000
```

## Deploy it (free options)

- **GitHub Pages**: push this folder to a repo, then in the repo settings
  enable Pages on the `main` branch (root folder).
- **Netlify**: drag-and-drop the folder onto app.netlify.com/drop.
- **Vercel**: `vercel deploy` from inside this folder (choose "Other" framework preset).

## What to customize

| What | Where |
|---|---|
| Name, role, intro text | `index.html` → `<section class="hero">` |
| About text | `index.html` → `#about` section |
| Skills/tags | `index.html` → `#skills` section |
| Projects | `index.html` → `#projects` section (`.project-card` blocks) |
| Certifications | `index.html` → `#certifications` section |
| Email / social links | Search for `mailto:` and `github.com` / `linkedin.com` links — they appear in the hero, contact section, and footer |
| Colors | `style.css` → `:root` variables at the top (`--bg`, `--accent`, etc.) |
| Fonts | `<link>` tag in `index.html` `<head>` + `--font-*` variables in `style.css` |

## Contact form

The contact form in `#contact` is front-end only right now — submitting it
just shows a confirmation message, it doesn't actually send an email. To make
it functional, wire it up to a service like:

- [Formspree](https://formspree.io) (add their form endpoint as the `action` on `<form id="contactForm">` and remove the JS `preventDefault` handler, or follow their fetch-based docs)
- [EmailJS](https://www.emailjs.com) (send straight from JavaScript, no backend needed)
- Your own backend endpoint

## Still to do (checklist)

- [ ] Add your real **resume.pdf** into `assets/` (the download buttons already point to it)
- [ ] Add a **profile photo** if you want one in the hero or about section
- [ ] Add **live demo links** for any projects that are deployed
- [ ] Double check all GitHub repo links still match your current usernames/repo names
- [ ] Wire up the contact form to Formspree/EmailJS (see above) so messages actually reach your inbox
- [ ] Update meta description/title in `<head>` if you want different SEO text
- [ ] Optional: swap the accent teal/amber colors in `style.css` if you want a different palette
