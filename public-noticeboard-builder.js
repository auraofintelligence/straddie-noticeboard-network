(function () {
  const storageKey = "straddiePublicNoticeboardBuilder";
  const data = window.NOTICEBOARD_DATA || {};
  const form = document.querySelector("[data-public-noticeboard-form]");
  const output = document.querySelector("[data-public-noticeboard-output]");
  const status = document.querySelector("[data-public-noticeboard-status]");
  const copyButton = document.querySelector("[data-copy-public-noticeboard]");
  const downloadButton = document.querySelector("[data-download-public-noticeboard]");
  const clearButton = document.querySelector("[data-clear-public-noticeboard]");
  const newCategoryField = document.querySelector("[data-new-category-field]");
  const exclusionsList = document.querySelector("[data-default-exclusions]");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  const publicUpdateOptions = [
    ["opening_or_availability", "Opening hours, availability or service area"],
    ["events_or_workshops", "Events, workshops, classes or meetings"],
    ["offers_or_stock", "Specials, stock, tickets or booking notes"],
    ["volunteers_or_rosters", "Volunteer calls, rosters or help needed"],
    ["safety_or_disruption", "Safety notes, weather changes or disruptions"],
    ["creative_or_story", "Artist statements, public stories or cultural notes"],
    ["fundraising_or_thanks", "Fundraisers, sponsor thanks or public acknowledgements"],
    ["community_question", "A question or invitation for community input"]
  ];

  const themeFamilyOptions = [
    ["local_events", "Local events and monthly planning"],
    ["local_seasons", "Local seasons, weather and visitor rhythm"],
    ["global_observances", "UN/global observances or world days"],
    ["care_and_wellbeing", "Care, inclusion and wellbeing"],
    ["arts_culture_language", "Arts, culture, language and story"],
    ["sport_youth_families", "Sport, youth and families"],
    ["food_local_economy", "Food, local producers and local economy"],
    ["environment_country_wildlife", "Environment, Country, wildlife and waste"],
    ["resilience_readiness", "Storm, fire, ferry, power or disaster readiness"],
    ["learning_training", "Learning, training, skills and small business support"]
  ];

  const defaultExclusions = [
    "Private contact details",
    "Private member, client or customer records",
    "Private aura.md material",
    "Payments, balances, accounts or access details",
    "Names or photos without approval",
    "Exact private GPS, protected places or sensitive locations",
    "Sensitive safety, emergency or security details",
    "Cultural, sacred or permission-needed material"
  ];

  const screenOptions = [
    ["wall_16x9", "Wall screen"],
    ["kiosk_portrait", "Portrait kiosk"],
    ["counter_tablet", "Counter tablet"],
    ["phone_story", "Phone story"],
    ["ticker", "Ticker strip"],
    ["offline_fallback", "Offline text fallback"]
  ];

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

  function getCategoryLabel(slug, requested) {
    if (slug === "request-new-category") return requested || "Requested new category";
    const categories = (data.project && data.project.categoryPages) || [];
    const match = categories.find((category) => category.slug === slug);
    return match ? match.label : titleCase(slug || "Unchosen category");
  }

  function makeOption(name, value, label, checked) {
    const wrapper = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
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
    options.forEach(([value, label]) => mount.appendChild(makeOption(name, value, label, selected.includes(value))));
  }

  function checkedValues(name) {
    return [...form.querySelectorAll('input[name="' + name + '"]:checked')].map((input) => input.value);
  }

  function labelsFor(options, values) {
    const map = new Map(options.map(([value, label]) => [value, label]));
    return values.map((value) => map.get(value) || value);
  }

  function radioValue(name) {
    const input = form.querySelector('input[name="' + name + '"]:checked');
    return input ? input.value : "";
  }

  function fieldValue(name) {
    return form.elements[name] ? form.elements[name].value : "";
  }

  function setRadio(name, value) {
    const input = form.querySelector('input[name="' + name + '"][value="' + value + '"]');
    if (input) input.checked = true;
  }

  function getState() {
    return {
      category: fieldValue("category"),
      requested_category: fieldValue("requested_category"),
      publisher_name: fieldValue("publisher_name"),
      place: fieldValue("place"),
      public_role: fieldValue("public_role"),
      public_profile: fieldValue("public_profile"),
      approval_owner: fieldValue("approval_owner"),
      contact_preference: radioValue("contact_preference"),
      review_rhythm: fieldValue("review_rhythm"),
      public_updates: checkedValues("public_updates"),
      public_updates_other: fieldValue("public_updates_other"),
      theme_families: checkedValues("theme_families"),
      known_themes: fieldValue("known_themes"),
      must_not_publish_other: fieldValue("must_not_publish_other"),
      open_questions: fieldValue("open_questions"),
      screen_targets: checkedValues("screen_targets"),
      device_location_ids: fieldValue("device_location_ids"),
      asset_status: radioValue("asset_status"),
      asset_pack: fieldValue("asset_pack"),
      sync_notes: fieldValue("sync_notes")
    };
  }

  function readState() {
    try {
      return JSON.parse(sessionStorage.getItem(storageKey) || "{}");
    } catch (error) {
      return {};
    }
  }

  function saveState() {
    sessionStorage.setItem(storageKey, JSON.stringify(getState()));
  }

  function setStatus(message) {
    status.textContent = message;
    window.clearTimeout(setStatus.timer);
    setStatus.timer = window.setTimeout(() => {
      status.textContent = "";
    }, 2800);
  }

  function updateConditionalFields() {
    newCategoryField.classList.toggle("is-hidden", fieldValue("category") !== "request-new-category");
  }

  function buildMarkdown(state) {
    const publisherName = state.publisher_name || "Example Publisher";
    const publicProfile = state.public_profile || "profiles/" + slugify(publisherName) + "/profile.md";
    const categoryLabel = getCategoryLabel(state.category, state.requested_category);
    const publicUpdates = labelsFor(publicUpdateOptions, state.public_updates).concat(lines(state.public_updates_other));
    const themeFamilies = labelsFor(themeFamilyOptions, state.theme_families);
    const privacyBoundaries = defaultExclusions.concat(lines(state.must_not_publish_other));
    const today = new Date().toLocaleDateString("en-AU", { year: "numeric", month: "2-digit", day: "2-digit" });

    return [
      "---",
      "schema: public_noticeboard.v0",
      "status: draft_for_human_review",
      "publisher_name: " + yamlScalar(publisherName),
      "category: " + yamlScalar(categoryLabel),
      state.category === "request-new-category" ? "requested_category: " + yamlScalar(state.requested_category) : "category_slug: " + yamlScalar(state.category),
      "place_or_service_area: " + yamlScalar(state.place),
      "public_profile: " + yamlScalar(publicProfile),
      "private_aura: not_public",
      "approval_owner: " + yamlScalar(state.approval_owner),
      "contact_preference: " + yamlScalar(state.contact_preference || "ask_before_displaying_contact"),
      "review_rhythm: " + yamlScalar(state.review_rhythm || "not_sure_yet"),
      "last_reviewed: " + yamlScalar(today),
      "screen_targets:",
      yamlList(state.screen_targets, "  "),
      "device_location_ids:",
      yamlList(lines(state.device_location_ids), "  "),
      "asset_status: " + yamlScalar(state.asset_status || "not_sure"),
      "asset_pack_notes: " + yamlScalar(state.asset_pack),
      "---",
      "",
      "# Public Noticeboard Contract",
      "",
      "This file follows `profile.md` as the public identity layer and treats `aura.md` as private context that must not be copied onto public screens.",
      "",
      "## Part A - Basic Public Layer",
      "",
      "**Plain-language role:** " + (state.public_role || "TODO"),
      "",
      "**Approval owner:** " + (state.approval_owner || "TODO"),
      "",
      "## Part B - Advanced Publishing Choices",
      "",
      "### Public updates we might share",
      "",
      yamlList(publicUpdates, ""),
      "",
      "### Theme families to explore",
      "",
      yamlList(themeFamilies, ""),
      "",
      "### Known dates, seasons or global themes",
      "",
      yamlList(lines(state.known_themes), ""),
      "",
      "### Must not publish",
      "",
      yamlList(privacyBoundaries, ""),
      "",
      "### Questions still needing real answers",
      "",
      yamlList(lines(state.open_questions), ""),
      "",
      "## Part C - Technical Pipeline Notes",
      "",
      yamlList(lines(state.sync_notes), ""),
      "",
      "## Ready S.E.T. Media Notes",
      "",
      "- Ask missing-data questions before publishing.",
      "- Treat selected prompts as prompts, not consent.",
      "- Check privacy, expiry, cultural care and source approval.",
      "- Render only to approved device location IDs.",
      ""
    ].join("\n");
  }

  function applyState(state) {
    Object.entries(state).forEach(([name, value]) => {
      const element = form.elements[name];
      if (!element || Array.isArray(value) || element instanceof RadioNodeList) return;
      element.value = value;
    });
    setRadio("contact_preference", state.contact_preference || "ask_before_displaying_contact");
    setRadio("asset_status", state.asset_status || "not_sure");
    renderCheckboxGroup("public_updates", publicUpdateOptions, state.public_updates || []);
    renderCheckboxGroup("theme_families", themeFamilyOptions, state.theme_families || []);
    renderCheckboxGroup("screen_targets", screenOptions, state.screen_targets || []);
    renderDefaultExclusions();
    updateConditionalFields();
    output.value = buildMarkdown(getState());
  }

  function renderDefaultExclusions() {
    if (!exclusionsList || exclusionsList.children.length) return;
    defaultExclusions.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      exclusionsList.appendChild(li);
    });
  }

  function hydrate() {
    applyState(readState());
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

  form.addEventListener("input", () => {
    updateConditionalFields();
    saveState();
    output.value = buildMarkdown(getState());
  });

  form.addEventListener("change", () => {
    updateConditionalFields();
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
    applyState({});
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
