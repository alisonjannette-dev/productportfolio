# Product Portfolio

A simple static portfolio site: plain HTML, CSS, and a little JavaScript. There's no build step.

- `index.html`: bio, launches, artifact library, and contact
- `resume.html`: the resume page. It embeds `Alison_Morgan_Resume.pdf` and offers it as a download. To update it, replace that PDF and the page images in `assets/resume/` (phones and browsers without a PDF viewer show the images).
- `assets/styles.css`: all styling. Colors are set as variables at the top.
- `assets/script.js`: the light/dark toggle, after-hours mode, artifact filters, and easter eggs
- `artifacts/`: put your PDFs and other work samples here

## Editing content

Content comes from Alison's Google Site and resume. These are still open:
- **Photo**: save your headshot as `assets/headshot.jpg`. It replaces the `AJ` initials automatically.
- **Launches**: copy or edit an `<article class="launch">` block
- **Artifacts**: copy or edit an `<a class="artifact">` block. Set `href` to a file in `artifacts/` or to a link (Google Doc, Notion, Figma). Set `data-type` to `deck`, `prd`, `writing`, or `talk`. If you leave `href="#"`, clicking it shows "available on request."
- **Resume**: edit the `<div class="job">` blocks in `resume.html`

## Light and dark mode

The site follows the visitor's system setting. The sun/moon button in the menu switches modes and remembers the choice.

## The weird part

Content in elements with the class `after-hours` only appears in after-hours mode. Visitors turn it on by typing the Konami code (↑ ↑ ↓ ↓ ← → ← → b a), or clicking the logo five times. Put your fun facts there.

## Updating CSS or JavaScript

`index.html` and `resume.html` load `assets/styles.css?v=…` and `assets/script.js?v=…`. When you change either file, bump the `v=` value in both pages so browsers load the new version right away.

## Preview locally

Run `npx serve .` in this folder and open the address it prints. It serves clean URLs like `/resume`, the same way GitHub Pages does. (`python3 -m http.server` and opening `index.html` directly don't support clean URLs, so the Resume link won't resolve there.)

## Publish (GitHub Pages)

In the repo, go to **Settings → Pages**. Under **Build and deployment**, pick **Deploy from a branch**, then choose your branch and `/ (root)`. The site will be live at `https://<username>.github.io/productportfolio/`.
