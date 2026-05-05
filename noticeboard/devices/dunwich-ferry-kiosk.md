---
device_id: dunwich-ferry-kiosk-01
device_type: public_kiosk
screen_shape: portrait_9x16
location_hint: Dunwich ferry arrival point
sync_mode: local_first
asset_cache: noticeboard/assets/dunwich-ferry-kiosk-01
fallback_mode: text_only
accepted_targets:
  - kiosk_portrait
  - emergency_card
  - transport_ticker
refresh_minutes: 5
---

# Dunwich Ferry Kiosk Device

This device cares about fast public usefulness.

It should prioritise:

- ferry status
- visitor guidance
- public events
- food and service availability
- heat, storm or fire notices
- emergency fallback notices

It does not need every publisher's full visual identity. If an asset is missing, it should show a clean text card.

