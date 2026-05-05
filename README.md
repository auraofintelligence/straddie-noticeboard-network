# Straddie Noticeboard Network

Standalone static-site prototype for a public noticeboard network across Minjerribah / North Stradbroke Island.

The project tests a simple idea: every publisher keeps their own look and feel, while the shared pipeline stays boring and reliable.

## Open Locally

Run from this folder:

```powershell
python -m http.server 4185
```

Then open:

```text
http://localhost:4185
```

## What Is In Here

- `index.html` is the standalone site.
- `data.js` contains the hypothesised entity catalogue and pipeline model.
- `app.js` renders the interactive publisher browser.
- `styles.css` holds the new Noticeboard Network identity.
- `categories/` contains one page per Straddie research entity category.
- `category.js` renders the entity cards with starter `.md` data and discovery questions.
- `public-noticeboard.html` explains the `public_noticeboard.md` layer beside `profile.md` and `aura.md`.
- `noticeboard/feeds` contains sample markdown notice files.
- `noticeboard/devices` contains sample device manifests.
- `noticeboard/public_noticeboard.md` is the starter public publisher and screen contract.

## Main Concepts

- Category pages for every entity group in the research document.
- Cards for every named entity, each with example `.md` frontmatter and questions to find the real data.
- A theme calendar that can use local seasonal prompts and global observances such as UN days.
- Ready S.E.T. media agents that draft notices, ask missing-data questions, check privacy, and render device-specific outputs.
- Device location IDs so each public screen knows its place, shape, asset cache and fallback behaviour.
- `public_noticeboard.md` as the file that says what a publisher can show publicly, without exposing private `aura.md` context.

## Important Boundary

The entity catalogue is a supposition layer based on the Stradbroke research document. It is not consent, endorsement, or a live public directory.

Before any real use, each business, artist, club or service would need direct contact, consent, source checking, expiry rules, and privacy review.
