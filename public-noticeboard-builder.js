(function () {
  const storageKey = "straddiePublicNoticeboardBuilder";
  const data = window.NOTICEBOARD_DATA || {};
  const form = document.querySelector("[data-public-noticeboard-form]");
  const output = document.querySelector("[data-public-noticeboard-output]");
  const status = document.querySelector("[data-public-noticeboard-status]");
  const copyButton = document.querySelector("[data-copy-public-noticeboard]");
  const downloadButton = document.querySelector("[data-download-public-noticeboard]");
  const clearButton = document.querySelector("[data-clear-public-noticeboard]");
  const categorySelect = document.querySelector("[data-category-select]");
  const publisherTypeSelect = document.querySelector("[data-publisher-type-select]");
  const newCategoryField = document.querySelector("[data-new-category-field]");
  const approvalOtherField = document.querySelector("[data-approval-other-field]");
  const assetPackCustomField = document.querySelector("[data-asset-pack-custom-field]");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  const screenOptions = [
    ["wall_16x9", "Wall screen 16:9"],
    ["kiosk_portrait", "Portrait kiosk"],
    ["counter_tablet", "Counter tablet"],
    ["phone_story", "Phone story"],
    ["offline_fallback", "Offline text fallback"],
    ["ticker", "Ticker strip"]
  ];

  const mustNotPublish = [
    ["private_contact_details", "Private contact details"],
    ["private_member_or_customer_records", "Private member or customer records"],
    ["payments_or_account_access", "Payments, balances or account access"],
    ["private_aura_material", "Private aura.md material"],
    ["unapproved_photos", "Unapproved photos or names"],
    ["sensitive_safety_details", "Sensitive emergency or safety details"],
    ["exact_private_gps", "Exact private GPS or protected location details"]
  ];

  const templates = {
    "hospitality-and-retail": {
      publisherTypes: ["cafe_or_food", "retail_shop", "bar_or_venue", "market_stall", "accommodation_hospitality", "other"],
      planning: "monthly_local_event",
      review: "weekly",
      screens: ["counter_tablet", "phone_story", "kiosk_portrait"],
      localThemes: ["whale-season", "shared-table-week", "low-waste-island"],
      globalThemes: ["world-food-day", "world-tourism-day", "msme-day"],
      noticeTypes: ["opening_hours", "daily_special", "live_music", "stock_update", "booking_alert", "fundraiser", "food_safety_note"],
      publish: ["opening hours and changes", "daily specials or local produce", "live music and small events", "booking links", "low-waste or refill notes", "fundraising and community support"]
    },
    "trades-and-services": {
      publisherTypes: ["trade_business", "repair_service", "professional_service", "emergency_repair", "supplier", "other"],
      planning: "local_seasonal",
      review: "fortnightly",
      screens: ["phone_story", "counter_tablet", "offline_fallback"],
      localThemes: ["storm-and-fire-ready", "low-waste-island"],
      globalThemes: ["msme-day", "world-water-day", "world-environment-day"],
      noticeTypes: ["availability_window", "service_area", "weather_delay", "repair_tip", "apprenticeship_call", "community_job_done"],
      publish: ["availability windows", "service areas", "weather delays", "repair tips", "apprenticeship or hiring calls", "completed community work"]
    },
    "tourism-property-and-transport": {
      publisherTypes: ["tour_operator", "accommodation", "transport_service", "property_service", "visitor_information", "other"],
      planning: "local_seasonal",
      review: "weekly",
      screens: ["kiosk_portrait", "phone_story", "ticker", "offline_fallback"],
      localThemes: ["whale-season", "storm-and-fire-ready", "low-waste-island"],
      globalThemes: ["world-tourism-day", "world-water-day", "mother-earth-day"],
      noticeTypes: ["tour_time", "visitor_pressure", "booking_pathway", "open_home", "transport_update", "weather_change"],
      publish: ["tour times", "visitor guidance", "booking pathways", "transport pressure", "weather changes", "open homes or inspection windows"]
    },
    "community-safety-and-sport": {
      publisherTypes: ["club", "community_group", "safety_service", "sporting_club", "volunteer_group", "other"],
      planning: "quarterly_mixed",
      review: "monthly",
      screens: ["wall_16x9", "kiosk_portrait", "phone_story", "offline_fallback"],
      localThemes: ["junior-sport-week", "storm-and-fire-ready", "shared-table-week"],
      globalThemes: ["world-environment-day", "world-water-day", "science-day"],
      noticeTypes: ["event", "training_day", "safety_note", "volunteer_call", "fundraiser", "sponsor_thanks", "facility_status"],
      publish: ["training days", "fixtures or events", "safety notes", "volunteer calls", "fundraisers", "sponsor thanks", "facility status"]
    },
    "events": {
      publisherTypes: ["event", "festival", "market", "workshop", "community_gathering", "other"],
      planning: "monthly_local_event",
      review: "per_notice",
      screens: ["kiosk_portrait", "phone_story", "counter_tablet", "ticker"],
      localThemes: ["straddie-arts-trail-window", "shared-table-week", "whale-season"],
      globalThemes: ["world-food-day", "creativity-and-innovation-day", "world-tourism-day"],
      noticeTypes: ["date_and_time", "venue", "ticket_link", "volunteer_call", "weather_change", "accessibility_note", "post_event_memory"],
      publish: ["dates and times", "locations", "ticket links", "volunteer calls", "weather changes", "accessibility notes", "post-event public memory"]
    },
    "artists-and-creative-hubs": {
      publisherTypes: ["artist", "studio", "gallery", "workshop", "creative_collective", "maker", "other"],
      planning: "quarterly_mixed",
      review: "monthly",
      screens: ["phone_story", "counter_tablet", "kiosk_portrait"],
      localThemes: ["straddie-arts-trail-window", "whale-season", "low-waste-island"],
      globalThemes: ["creativity-and-innovation-day", "mother-language-day", "world-bee-day"],
      noticeTypes: ["studio_opening", "workshop", "exhibition_window", "artist_statement", "available_works", "collaboration_call", "accessibility_note"],
      publish: ["studio opening hours", "workshops", "exhibition windows", "artist statements", "available works", "collaboration calls", "accessibility notes"]
    },
    "request-new-category": {
      publisherTypes: ["new_category_request", "other"],
      planning: "quarterly_mixed",
      review: "monthly",
      screens: ["phone_story", "counter_tablet", "offline_fallback"],
      localThemes: ["shared-table-week", "storm-and-fire-ready"],
      globalThemes: ["msme-day", "science-day"],
      noticeTypes: ["notice", "event", "resource", "availability", "question_for_real_data"],
      publish: ["public notices", "events", "resources", "availability", "questions for real data"]
    }
  };

  function slugify(value) {
    return String(value || "example")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "example";
  }

  function titleCase(value) {
    return String(value || "")
      .replace(/[_-]+/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function lines(value) {
    return String(value || "")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }

  function yamlScalar(value) {
    const text = String(value || "TODO").replace(/"/g, '\\"');
    return '"' + text + '"';
  }

  function yamlList(items, indent) {
    if (!items.length) return indent + "- TODO";
    return items.map((item) => indent + "- " + yamlScalar(item)).join("\n");
  }

  function getCategoryLabel(slug) {
    const categories = (data.project && data.project.categoryPages) || [];
    const match = categories.find((category) => category.slug === slug);
    return match ? match.label : titleCase(slug);
  }

  function themeOptions(key) {
    const items = key === "local_themes" ? data.localThemePrompts || [] : data.themeCalendar || [];
    return items.map((item) => [
      item.id,
      item.title + (item.cadence ? " - " + item.cadence : item.dateRule ? " - " + item.dateRule : "")
    ]);
  }

  function getTemplate(category) {
    return templates[category] || templates["request-new-category"];
  }

  function makeOptionControl(type, name, value, label, checked) {
    const wrapper = document.createElement("label");
    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.value = value;
    input.checked = checked;
    wrapper.append(input, " " + label);
    return wrapper;
  }

  function renderCheckboxGroup(name, options, selected) {
    const mount = document.querySelector('[data-checkbox-group="' + name + '"]');
    if (!mount) return;
    mount.innerHTML = "";
    options.forEach(([value, label]) => {
      mount.appendChild(makeOptionControl("checkbox", name, value, label, selected.includes(value)));
    });
  }

  function renderRadioDefaults(state) {
    ["approval_owner", "asset_pack_mode", "planning_mode"].forEach((name) => {
      const value = state[name];
      if (!value) return;
      const input = form.querySelector('input[name="' + name + '"][value="' + value + '"]');
      if (input) input.checked = true;
    });
  }

  function renderPublisherTypes(category, selected) {
    const template = getTemplate(category);
    publisherTypeSelect.innerHTML = "";
    template.publisherTypes.forEach((type) => {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = titleCase(type);
      option.selected = type === selected;
      publisherTypeSelect.appendChild(option);
    });
  }

  function renderAdaptiveControls(category, savedState) {
    const template = getTemplate(category);
    const state = savedState || {};
    renderPublisherTypes(category, state.publisher_type || template.publisherTypes[0]);
    renderCheckboxGroup("screen_targets", screenOptions, state.screen_targets || template.screens);
    renderCheckboxGroup("local_themes", themeOptions("local_themes"), state.local_themes || template.localThemes);
    renderCheckboxGroup("global_themes", themeOptions("global_themes"), state.global_themes || template.globalThemes);
    renderCheckboxGroup("allowed_notice_types", template.noticeTypes.map((item) => [item, titleCase(item)]), state.allowed_notice_types || template.noticeTypes);
    renderCheckboxGroup("want_publish", template.publish.map((item) => [item, item]), state.want_publish || template.publish);
    renderCheckboxGroup("must_not_publish", mustNotPublish, state.must_not_publish || ["private_contact_details", "private_aura_material", "unapproved_photos"]);
    renderRadioDefaults({
      approval_owner: state.approval_owner || "owner",
      asset_pack_mode: state.asset_pack_mode || "category_default",
      planning_mode: state.planning_mode || template.planning
    });
    form.elements.review_rhythm.value = state.review_rhythm || template.review;
    toggleConditionalFields();
  }

  function checkedValues(name) {
    return [...form.querySelectorAll('input[name="' + name + '"]:checked')].map((input) => input.value);
  }

  function radioValue(name) {
    const input = form.querySelector('input[name="' + name + '"]:checked');
    return input ? input.value : "";
  }

  function fieldValue(name) {
    return form.elements[name] ? form.elements[name].value : "";
  }

  function getState() {
    return {
      category: fieldValue("category"),
      requested_category: fieldValue("requested_category"),
      publisher_name: fieldValue("publisher_name"),
      publisher_type: fieldValue("publisher_type"),
      public_profile: fieldValue("public_profile"),
      approval_owner: radioValue("approval_owner"),
      approval_owner_other: fieldValue("approval_owner_other"),
      device_location_ids: fieldValue("device_location_ids"),
      screen_targets: checkedValues("screen_targets"),
      asset_pack_mode: radioValue("asset_pack_mode"),
      asset_pack_custom: fieldValue("asset_pack_custom"),
      planning_mode: radioValue("planning_mode"),
      local_themes: checkedValues("local_themes"),
      global_themes: checkedValues("global_themes"),
      custom_themes: fieldValue("custom_themes"),
      allowed_notice_types: checkedValues("allowed_notice_types"),
      want_publish: checkedValues("want_publish"),
      want_publish_custom: fieldValue("want_publish_custom"),
      must_not_publish: checkedValues("must_not_publish"),
      must_not_publish_custom: fieldValue("must_not_publish_custom"),
      open_questions: fieldValue("open_questions"),
      review_rhythm: fieldValue("review_rhythm")
    };
  }

  function saveState() {
    sessionStorage.setItem(storageKey, JSON.stringify(getState()));
  }

  function readState() {
    try {
      return JSON.parse(sessionStorage.getItem(storageKey) || "{}");
    } catch (error) {
      return {};
    }
  }

  function setStatus(message) {
    status.textContent = message;
    window.clearTimeout(setStatus.timer);
    setStatus.timer = window.setTimeout(() => {
      status.textContent = "";
    }, 2800);
  }

  function approvalOwner(state) {
    return state.approval_owner === "other" ? state.approval_owner_other || "other" : state.approval_owner || "TODO";
  }

  function assetPack(state) {
    const publisherSlug = slugify(state.publisher_name);
    if (state.asset_pack_mode === "text_only") return "text_only";
    if (state.asset_pack_mode === "entity_custom") return state.asset_pack_custom || publisherSlug + "/default";
    return slugify(state.category === "request-new-category" ? state.requested_category : state.category) + "/default";
  }

  function buildMarkdown(state) {
    const publisherName = state.publisher_name || "Example Publisher";
    const categoryLabel = state.category === "request-new-category" ? state.requested_category || "Requested new category" : getCategoryLabel(state.category);
    const publicProfile = state.public_profile || "profiles/" + slugify(publisherName) + "/profile.md";
    const today = new Date().toLocaleDateString("en-AU", { year: "numeric", month: "2-digit", day: "2-digit" });
    const customThemes = lines(state.custom_themes);
    const publishItems = state.want_publish.concat(lines(state.want_publish_custom));
    const privateItems = state.must_not_publish.concat(lines(state.must_not_publish_custom));

    return [
      "---",
      "schema: public_noticeboard.v0",
      "publisher_name: " + yamlScalar(publisherName),
      "publisher_type: " + yamlScalar(state.publisher_type),
      "category: " + yamlScalar(categoryLabel),
      state.category === "request-new-category" ? "requested_category: " + yamlScalar(state.requested_category) : "category_slug: " + yamlScalar(state.category),
      "public_profile: " + yamlScalar(publicProfile),
      "private_aura: not_public",
      "approval_owner: " + yamlScalar(approvalOwner(state)),
      "planning_mode: " + yamlScalar(state.planning_mode),
      "local_asset_pack: " + yamlScalar(assetPack(state)),
      "device_location_ids:",
      yamlList(lines(state.device_location_ids), "  "),
      "screen_targets:",
      yamlList(state.screen_targets, "  "),
      "theme_preferences:",
      "  local:",
      yamlList(state.local_themes, "    "),
      "  global:",
      yamlList(state.global_themes, "    "),
      "  custom:",
      yamlList(customThemes, "    "),
      "allowed_notice_types:",
      yamlList(state.allowed_notice_types, "  "),
      "must_not_publish:",
      yamlList(privateItems, "  "),
      "review_rhythm: " + yamlScalar(state.review_rhythm),
      "last_reviewed: " + yamlScalar(today),
      "---",
      "",
      "# Public Noticeboard Contract",
      "",
      "This file describes what " + publisherName + " is happy to show on public screens.",
      "",
      "It can link to `profile.md` for public identity. It must not publish private `aura.md` material.",
      "",
      "## What We Want To Publish",
      "",
      yamlList(publishItems, ""),
      "",
      "## Questions Still Needing Real Answers",
      "",
      yamlList(lines(state.open_questions), ""),
      "",
      "## Ready S.E.T. Media Notes",
      "",
      "- Draft notices from this contract before choosing layouts.",
      "- Ask missing-data questions before publishing.",
      "- Check privacy, expiry, cultural care and source approval.",
      "- Render only to approved device location IDs.",
      ""
    ].join("\n");
  }

  function toggleConditionalFields() {
    newCategoryField.classList.toggle("is-hidden", fieldValue("category") !== "request-new-category");
    approvalOtherField.classList.toggle("is-hidden", radioValue("approval_owner") !== "other");
    assetPackCustomField.classList.toggle("is-hidden", radioValue("asset_pack_mode") !== "entity_custom");
  }

  function applyState(state) {
    Object.entries(state).forEach(([name, value]) => {
      const element = form.elements[name];
      if (!element || Array.isArray(value)) return;
      if (element instanceof RadioNodeList) return;
      element.value = value;
    });
    renderRadioDefaults(state);
    toggleConditionalFields();
    output.value = buildMarkdown(getState());
  }

  function hydrate() {
    const state = readState();
    const category = state.category || fieldValue("category") || "hospitality-and-retail";
    categorySelect.value = category;
    renderAdaptiveControls(category, state);
    applyState(state);
    if (!state.category) output.value = buildMarkdown(getState());
  }

  function downloadText(filename, text) {
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  categorySelect.addEventListener("change", () => {
    const keep = getState();
    keep.category = fieldValue("category");
    keep.screen_targets = undefined;
    keep.local_themes = undefined;
    keep.global_themes = undefined;
    keep.allowed_notice_types = undefined;
    keep.want_publish = undefined;
    renderAdaptiveControls(keep.category, keep);
    saveState();
    output.value = buildMarkdown(getState());
    setStatus("Category template updated.");
  });

  form.addEventListener("input", () => {
    toggleConditionalFields();
    saveState();
    output.value = buildMarkdown(getState());
  });

  form.addEventListener("change", () => {
    toggleConditionalFields();
    saveState();
    output.value = buildMarkdown(getState());
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    saveState();
    output.value = buildMarkdown(getState());
    setStatus("Markdown updated.");
  });

  output.addEventListener("input", () => {
    setStatus("Manual edits are in the output box. Download when ready.");
  });

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(output.value);
      setStatus("Markdown copied.");
    } catch (error) {
      output.select();
      document.execCommand("copy");
      setStatus("Markdown copied.");
    }
  });

  downloadButton.addEventListener("click", () => {
    downloadText("public_noticeboard.md", output.value);
    setStatus("public_noticeboard.md is ready.");
  });

  clearButton.addEventListener("click", () => {
    sessionStorage.removeItem(storageKey);
    form.reset();
    renderAdaptiveControls(fieldValue("category") || "hospitality-and-retail", {});
    output.value = buildMarkdown(getState());
    setStatus("Answers cleared.");
  });

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  hydrate();
})();
