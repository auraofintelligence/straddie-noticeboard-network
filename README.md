# Straddie Noticeboard Network

<!-- github-organisation:start -->

## Project links and history

- First substantive build: 5 May 2026.
- GitHub repository: [straddie-noticeboard-network](https://github.com/auraofintelligence/straddie-noticeboard-network).
- Public site: [visit the public site](https://auraofintelligence.github.io/straddie-noticeboard-network/).

## Related public projects

Each link below reflects an evidenced family, lineage or direct connection. This project has 12 relevant public connections.

### Direct and other supported connections

- [straddie-tip-loop-lab](https://github.com/auraofintelligence/straddie-tip-loop-lab) - [public page](https://auraofintelligence.github.io/straddie-tip-loop-lab/) - explicit cross-reference.
- [straddie-vitality-network-builders](https://github.com/auraofintelligence/straddie-vitality-network-builders) - [public page](https://auraofintelligence.github.io/straddie-vitality-network-builders/) - explicit cross-reference.

### Island publication and community operations

- [ballow-road-sand-screen-hub](https://github.com/auraofintelligence/ballow-road-sand-screen-hub) - [public page](https://auraofintelligence.github.io/ballow-road-sand-screen-hub/) - shared community programme.
- [community-club-builder-sandy-sports](https://github.com/auraofintelligence/community-club-builder-sandy-sports) - [public page](https://auraofintelligence.github.io/community-club-builder-sandy-sports/) - explicit cross-reference, shared community programme.
- [ready-set-co-op-hyperlocal-media](https://github.com/auraofintelligence/ready-set-co-op-hyperlocal-media) - [public page](https://auraofintelligence.github.io/ready-set-co-op-hyperlocal-media/) - explicit cross-reference, shared community programme.
- [ready-set-co-op-trust-hub](https://github.com/auraofintelligence/ready-set-co-op-trust-hub) - [public page](https://auraofintelligence.github.io/ready-set-co-op-trust-hub/) - shared community programme.
- [shared-table-initiative](https://github.com/auraofintelligence/shared-table-initiative) - [public page](https://auraofintelligence.github.io/shared-table-initiative/) - explicit cross-reference, shared community programme.
- [stradbroke-grants-lab](https://github.com/auraofintelligence/stradbroke-grants-lab) - [public page](https://auraofintelligence.github.io/stradbroke-grants-lab/) - explicit cross-reference, shared community programme.
- [straddie-content-assets-kit](https://github.com/auraofintelligence/straddie-content-assets-kit) - [public page](https://auraofintelligence.github.io/straddie-content-assets-kit/) - explicit cross-reference, shared community programme.
- [straddie-disaster-kiosks](https://github.com/auraofintelligence/straddie-disaster-kiosks) - [public page](https://auraofintelligence.github.io/straddie-disaster-kiosks/) - explicit cross-reference, shared community programme.
- [straddie-news](https://github.com/auraofintelligence/straddie-news) - [public page](https://auraofintelligence.github.io/straddie-news/) - explicit cross-reference, shared community programme.
- [straddie-night-market-lab](https://github.com/auraofintelligence/straddie-night-market-lab) - [public page](https://auraofintelligence.github.io/straddie-night-market-lab/) - explicit cross-reference, shared community programme.

<!-- github-organisation:end -->

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

## Public page and related work

- [Open the Straddie Noticeboard Network](https://auraofintelligence.github.io/straddie-noticeboard-network/)
- [Browse the source repository](https://github.com/auraofintelligence/straddie-noticeboard-network)
- [Straddie Content Assets Kit](https://auraofintelligence.github.io/straddie-content-assets-kit/)
- [Straddie Shared Table](https://auraofintelligence.github.io/shared-table-initiative/)
- [Ready S.E.T. Co-op and Hyperlocal Media](https://auraofintelligence.github.io/ready-set-co-op-hyperlocal-media/)
