---
title: Public Noticeboard Network Pipeline
status: concept
visibility: public
source_docs:
  - Stradbroke Island Research Project.pdf
  - Straddie_Disaster_Kiosk_Pitch.pdf
  - Community Co-op Blueprint Development.docx
  - Shared Table Initiative.md
---

# Public Noticeboard Network Pipeline

This folder is the plain-file version of the idea.

Each public notice is just a `.md` file with frontmatter at the top. The file can travel between laptops, phones, kiosks, club screens and public displays. Each screen keeps its own local asset folder and decides how to dress the same data for its shape.

The rule is simple:

1. The data is shared.
2. The look and feel belongs to the publisher.
3. Private records stay out of the feed.
4. Devices can still render a text-only notice if assets are missing.

## Folder Shape

- `feeds/` contains example notices.
- `devices/` contains example device manifests.
- `assets/` is the placeholder for local screen assets, arranged per device or per publisher.

## Privacy Boundary

Good public data:

- event dates
- broad location
- public opening changes
- specials
- public safety notes
- volunteer calls
- sponsor thanks
- approved artwork or media
- public contact pathways

Keep out:

- private member records
- exact private addresses
- precise fishing GPS
- emergency contacts
- private payments
- private health notes
- unapproved photos
- private cultural material

