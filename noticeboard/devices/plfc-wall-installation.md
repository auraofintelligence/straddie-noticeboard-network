---
device_id: plfc-wall-installation-01
device_type: wall_installation
screen_shape: custom_16x9_or_wider
location_hint: Point Lookout
sync_mode: local_first
asset_cache: noticeboard/assets/plfc-wall-installation-01
fallback_mode: text_cards
accepted_targets:
  - wall_16x9
  - wide_leaderboard
  - event_rotation
refresh_minutes: 15
---

# PLFC Wall Installation Device

This device can use a custom fishing-club art skin, but the feed still arrives as plain markdown.

It should prefer:

- big type
- rotating cards
- public catch summaries
- sponsor thanks
- event dates
- safety reminders

It should reject:

- private member records
- exact fishing GPS
- private payments
- unapproved photos

