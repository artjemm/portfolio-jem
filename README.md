# Jem Teraoka — Portfolio

Personal portfolio of **Jem Teraoka**, Product Designer based in São Paulo.

**Live:** https://jemteraoka.com

## Overview

A handcrafted, dependency-free static site (HTML, CSS, vanilla JavaScript) with a
bilingual interface (PT / EN), custom cursor and canvas interactions, and a set of
in-depth product design case studies.

## Structure

```
.
├── index.html        # Home
├── cases/            # Case studies — one HTML page each
├── resume/           # Résumé / CV page
├── css/              # Styles (style.css, case.css)
├── js/               # Interactions (app.js, case.js, wip-game.js)
├── assets/           # Images and video
├── wip.html          # Work-in-progress page
├── upload.html       # Local-only asset upload UI
└── upload_server.py  # Local-only Flask helper (127.0.0.1:5450) for dropping
                      # images into assets/ — not required to run or deploy
```

## Local preview

No build step and no dependencies. Serve the folder with any static file server:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deployment

Served as static files behind nginx. CSS and JS links are cache-busted with a
`?v=N` query string, so bump the version when an asset changes.

---

© Jem Teraoka. All rights reserved.
