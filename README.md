# kunalashar25.github.io

Personal website of **Kunal Ashar** — Senior Test Automation Engineer & Testing
Solution Architect. Live at **https://kunalashar25.github.io**.

Static, dependency-free, and content-driven: the markup is a thin shell, all
copy lives in JSON, and a small vanilla-JS renderer builds the pages.

## Structure

```
index.html              # shell: <head>, header, footer, empty <main id="app">
assets/
  fonts.css             # @font-face (Archivo, Bricolage Grotesque, Space Mono) as data-URIs
  styles.css            # all styling (design tokens + components)
  app.js                # fetches data/*.json, renders each page, wires routing + interactions
data/
  home.json             # hero, stats, badges, explore cards
  experience.json       # timeline of roles (metrics + awards)
  skills.json           # skill cards + grouped tool chips
  speaking.json         # talks, recordings, communities, training
  about.json            # bio, quote, education, certifications
  contact.json          # contact card + links
.github/workflows/deploy.yml   # builds & deploys to GitHub Pages on push to main
```

## Editing content

**You never need to touch HTML to update the site** — edit the relevant file in
`data/`. For example, to add a job, append an object to `jobs` in
`data/experience.json`; to add a talk, append to `talks` in
`data/speaking.json`. Commit and push — the deploy workflow does the rest.

Colours reference CSS custom properties (`var(--blue)`, `var(--teal)`, …)
defined in `assets/styles.css`.

## Local development

Content is loaded with `fetch`, so open it through a server (not `file://`):

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which publishes the
repo to GitHub Pages.

> **One-time setup:** in the repo, go to **Settings → Pages → Build and
> deployment → Source** and select **GitHub Actions**.

## Routing

Client-side hash routing (`#/home`, `#/work`, `#/skills`, `#/speaking`,
`#/about`, `#/contact`). No build step, no framework.
