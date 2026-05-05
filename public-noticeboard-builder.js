(function () {
  const storageKey = "straddiePublicNoticeboardBuilder";
  const form = document.querySelector("[data-public-noticeboard-form]");
  const output = document.querySelector("[data-public-noticeboard-output]");
  const status = document.querySelector("[data-public-noticeboard-status]");
  const copyButton = document.querySelector("[data-copy-public-noticeboard]");
  const downloadButton = document.querySelector("[data-download-public-noticeboard]");
  const clearButton = document.querySelector("[data-clear-public-noticeboard]");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

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

  function getState() {
    return Object.fromEntries(new FormData(form).entries());
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

  function buildMarkdown(state) {
    const publisherName = state.publisher_name || "Example Publisher";
    const publisherType = state.publisher_type || "club | business | artist | event | service | device_location";
    const publicProfile = state.public_profile || "profiles/example/profile.md";
    const approvalOwner = state.approval_owner || "TODO";
    const assetPack = state.asset_pack || "TODO";
    const reviewRhythm = state.review_rhythm || "monthly";
    const today = new Date().toLocaleDateString("en-AU", { year: "numeric", month: "2-digit", day: "2-digit" });

    return [
      "---",
      "schema: public_noticeboard.v0",
      "publisher_name: " + yamlScalar(publisherName),
      "publisher_type: " + yamlScalar(publisherType),
      "public_profile: " + yamlScalar(publicProfile),
      "private_aura: not_public",
      "approval_owner: " + yamlScalar(approvalOwner),
      "local_asset_pack: " + yamlScalar(assetPack),
      "device_location_ids:",
      yamlList(lines(state.device_location_ids), "  "),
      "theme_preferences:",
      "  local:",
      yamlList(lines(state.local_themes), "    "),
      "  global:",
      yamlList(lines(state.global_themes), "    "),
      "screen_targets:",
      yamlList(lines(state.screen_targets), "  "),
      "allowed_notice_types:",
      yamlList(lines(state.allowed_notice_types), "  "),
      "must_not_publish:",
      yamlList(lines(state.must_not_publish), "  "),
      "review_rhythm: " + yamlScalar(reviewRhythm),
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
      yamlList(lines(state.want_publish), ""),
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

  function hydrate() {
    const state = readState();
    [...form.elements].forEach((element) => {
      if (element.name && state[element.name] !== undefined) element.value = state[element.name];
    });
    output.value = buildMarkdown(getState());
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
    output.value = buildMarkdown({});
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
