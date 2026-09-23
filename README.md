# Product Portfolio

A simple static portfolio site: plain HTML, CSS, and a little JavaScript. There's no build step.

- `index.html`: bio, launches, artifact library, and contact
- `resume.html`: the resume page. Click **Download PDF** to print it cleanly.
- `assets/styles.css`: all styling. Colors are set as variables at the top.
- `assets/script.js`: the after-hours mode, artifact filters, and easter eggs
- `artifacts/`: put your PDFs and other work samples here

## Editing content

Content comes from Alison's Google Site. These are still placeholders:
- **Name and contact details**: `Alison Jannette`, `hello@example.com`, the LinkedIn URL
- **Photo**: save your headshot as `assets/headshot.jpg`. It replaces the `AJ` initials automatically.
- **Launches**: copy or edit an `<article class="launch">` block
- **Artifacts**: copy or edit an `<a class="artifact">` block. Set `href` to a file in `artifacts/` or to a link (Google Doc, Notion, Figma). Set `data-type` to `deck`, `prd`, `writing`, or `talk`. If you leave `href="#"`, clicking it shows "available on request."
- **Resume**: add job titles and dates in the `<div class="job">` blocks in `resume.html` (currently `Your title` / `Dates`)

## The weird part

Content in elements with the class `after-hours` only appears when a visitor turns on the **After hours** switch in the nav. It also turns on with the Konami code (↑ ↑ ↓ ↓ ← → ← → b a) or by clicking the logo five times. Put your fun facts there.

## Preview locally

Open `index.html` in a browser, or run `python3 -m http.server` and go to http://localhost:8000.

## Publish (GitHub Pages)

In the repo, go to **Settings → Pages**. Under **Build and deployment**, pick **Deploy from a branch**, then choose your branch and `/ (root)`. The site will be live at `https://<username>.github.io/productportfolio/`.
