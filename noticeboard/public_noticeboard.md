---
schema: public_noticeboard.v0
publisher_name: Example Publisher
publisher_type: club | business | artist | event | service | device_location
public_profile: profiles/example/profile.md
private_aura: not_public
approval_owner: TODO
device_location_ids:
  - TODO
theme_preferences:
  local: []
  global: []
screen_targets:
  - kiosk_portrait
  - phone_story
  - wall_16x9
allowed_notice_types:
  - event
  - opening_hours
  - special
  - safety_note
  - volunteer_call
  - artist_window
must_not_publish:
  - private records
  - exact private addresses
  - private payments
  - emergency contacts
  - unapproved photos
  - private aura.md material
review_rhythm: monthly
last_reviewed: TODO
---

# Public Noticeboard Contract

This file describes what this publisher is happy to show on public screens.

It sits beside:

- `profile.md` for public identity and contribution context
- `aura.md` for private or trusted AI context

It does not automatically publish anything from `aura.md`.

## What We Want To Publish

- TODO

## Themes That Fit Our Values

- TODO

## Questions Still Needing Real Answers

- Who can approve public notices?
- Which notice types are allowed?
- Which screen locations should receive updates?
- Which images or logos are approved for public display?
- How often should this file be reviewed?
- What should expire automatically?
