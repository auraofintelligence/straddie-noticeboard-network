(function () {
  const data = window.NOTICEBOARD_DATA;

  function make(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function renderBasics() {
    const deck = document.querySelector('[data-project-deck]');
    const source = document.querySelector('[data-project-source]');
    const boundary = document.querySelector('[data-boundary]');
    const entityCount = document.querySelector('[data-entity-count]');
    if (deck) deck.textContent = data.project.deck;
    if (source) source.textContent = 'Source brief: ' + data.project.source;
    if (boundary) boundary.textContent = data.project.boundary;
    if (entityCount) entityCount.textContent = data.project.entityCount;

    const principles = document.querySelector('[data-principles]');
    if (!principles) return;
    data.project.principles.forEach((item) => principles.appendChild(make('li', '', item)));
  }

  function renderPipeline() {
    const mount = document.querySelector('[data-pipeline]');
    if (!mount) return;
    data.pipeline.forEach((step, index) => {
      const card = make('article', 'notice-step');
      card.appendChild(make('span', '', String(index + 1).padStart(2, '0')));
      card.appendChild(make('h3', '', step.name));
      card.appendChild(make('p', '', step.detail));
      mount.appendChild(card);
    });
  }

  function renderScreens() {
    const mount = document.querySelector('[data-screens]');
    if (!mount) return;
    data.screenProfiles.forEach((screen) => {
      const card = make('article', 'screen-card');
      card.appendChild(make('h3', '', screen.name));
      card.appendChild(make('p', 'card-meta', screen.shape));
      card.appendChild(make('p', '', screen.rule));
      mount.appendChild(card);
    });
  }

  function renderEntities() {
    const tabs = document.querySelector('[data-entity-tabs]');
    const detail = document.querySelector('[data-entity-detail]');
    if (!tabs || !detail) return;

    data.entityGroups.forEach((group, index) => {
      const button = make('button', 'entity-tab', group.label);
      button.type = 'button';
      button.addEventListener('click', () => setGroup(index));
      tabs.appendChild(button);
    });

    function setGroup(index) {
      const group = data.entityGroups[index];
      [...tabs.children].forEach((button) => button.classList.remove('is-active'));
      tabs.children[index].classList.add('is-active');
      detail.innerHTML = '';
      detail.appendChild(make('p', 'eyebrow', group.kind));
      detail.appendChild(make('h3', '', group.label));
      detail.appendChild(make('p', '', group.note));

      const list = make('div', 'entity-list');
      group.entities.forEach((entity) => {
        const row = make('div', 'entity-row');
        row.appendChild(make('strong', '', entity.name));
        row.appendChild(make('span', '', [entity.place, entity.type].filter(Boolean).join(' | ')));
        if (entity.status) row.appendChild(make('p', 'status-pill compact-status', entity.status));
        row.appendChild(make('p', '', entity.share));
        list.appendChild(row);
      });
      detail.appendChild(list);
    }

    setGroup(0);
  }

  function renderCategoryPages() {
    const mount = document.querySelector('[data-category-pages]');
    if (!mount) return;
    data.project.categoryPages.forEach((category) => {
      const card = make('article', 'category-card');
      card.appendChild(make('p', 'eyebrow', category.kind));
      card.appendChild(make('h3', '', category.label));
      card.appendChild(make('p', 'card-meta', category.count + ' entity cards'));
      card.appendChild(make('p', '', category.note));
      const link = make('a', 'card-link', 'Open category page');
      link.href = category.href;
      card.appendChild(link);
      mount.appendChild(card);
    });
  }

  function renderThemes() {
    const globalMount = document.querySelector('[data-theme-calendar]');
    const localMount = document.querySelector('[data-local-themes]');
    if (!globalMount || !localMount) return;

    data.themeCalendar.forEach((theme) => {
      const card = make('article', 'theme-card');
      card.appendChild(make('p', 'eyebrow', theme.dateRule));
      card.appendChild(make('h3', '', theme.title));
      card.appendChild(make('p', '', theme.prompt));
      const tags = make('div', 'tag-row');
      theme.alignments.forEach((tag) => tags.appendChild(make('span', '', tag)));
      card.appendChild(tags);
      globalMount.appendChild(card);
    });

    data.localThemePrompts.forEach((theme) => {
      const card = make('article', 'theme-card local');
      card.appendChild(make('p', 'eyebrow', theme.cadence));
      card.appendChild(make('h3', '', theme.title));
      card.appendChild(make('p', '', theme.prompt));
      const tags = make('div', 'tag-row');
      theme.alignments.forEach((tag) => tags.appendChild(make('span', '', tag)));
      card.appendChild(tags);
      localMount.appendChild(card);
    });
  }

  function renderAgents() {
    const mount = document.querySelector('[data-agent-pipelines]');
    if (!mount) return;
    data.agentPipelines.forEach((agent) => {
      const card = make('article', 'agent-card');
      card.appendChild(make('p', 'eyebrow', agent.id));
      card.appendChild(make('h3', '', agent.name));
      card.appendChild(make('p', '', agent.role));

      const io = make('div', 'io-grid');
      const inputs = make('div');
      inputs.appendChild(make('strong', '', 'Inputs'));
      agent.inputs.forEach((item) => inputs.appendChild(make('span', '', item)));
      const outputs = make('div');
      outputs.appendChild(make('strong', '', 'Outputs'));
      agent.outputs.forEach((item) => outputs.appendChild(make('span', '', item)));
      io.append(inputs, outputs);
      card.appendChild(io);
      mount.appendChild(card);
    });
  }

  function renderDevices() {
    const mount = document.querySelector('[data-device-locations]');
    if (!mount) return;
    data.deviceLocations.forEach((device) => {
      const card = make('article', 'device-card');
      card.appendChild(make('p', 'eyebrow', device.id));
      card.appendChild(make('h3', '', device.label));
      card.appendChild(make('p', 'card-meta', device.place + ' | ' + device.shape));
      card.appendChild(make('p', '', device.role));
      mount.appendChild(card);
    });
  }

  function renderMarkdown() {
    const mount = document.querySelector('[data-markdown-examples]');
    if (!mount) return;
    data.markdownExamples.forEach((example) => {
      const card = make('article', 'md-card');
      card.appendChild(make('h3', '', example.title));
      const pre = make('pre');
      pre.appendChild(make('code', '', example.code));
      card.appendChild(pre);
      mount.appendChild(card);
    });
  }

  function renderFiles() {
    const mount = document.querySelector('[data-file-grid]');
    if (!mount) return;
    [...data.sampleFeeds, ...data.deviceManifests].forEach((file) => {
      const card = make('a', 'file-card', file);
      card.href = file;
      mount.appendChild(card);
    });
  }

  function wireNav() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  function normaliseNav() {
    const links = document.querySelector('.nav-links');
    const nav = document.querySelector('.nav');
    if (!links || !nav) return;
    const nestedPage = document.body.dataset.category || document.body.dataset.entity || location.pathname.includes('/categories/') || location.pathname.includes('/entities/');
    const prefix = nestedPage ? '../' : '';
    const items = [
      ['Home', prefix + 'index.html'],
      ['Categories', prefix + 'categories/index.html'],
      ['Entities', prefix + 'entities.html'],
      ['Pipeline', prefix + 'index.html#pipeline'],
      ['Themes', prefix + 'index.html#themes'],
      ['Agents', prefix + 'index.html#agents'],
      ['Builder', prefix + 'public-noticeboard-builder.html'],
      ['Assets', 'https://auraofintelligence.github.io/straddie-content-assets-kit/'],
      ['public_noticeboard.md', prefix + 'public-noticeboard.html']
    ];
    links.classList.remove('static-links');
    links.innerHTML = '';
    items.forEach(([label, href]) => {
      const link = make('a', '', label);
      link.href = href;
      links.appendChild(link);
    });
    if (!nav.querySelector('.nav-toggle')) {
      const toggle = make('button', 'nav-toggle');
      toggle.type = 'button';
      toggle.setAttribute('aria-label', 'Open menu');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.append(make('span'), make('span'), make('span'));
      nav.insertBefore(toggle, links);
    }
  }

  renderBasics();
  renderPipeline();
  renderScreens();
  renderThemes();
  renderCategoryPages();
  renderEntities();
  renderAgents();
  renderDevices();
  renderMarkdown();
  renderFiles();
  normaliseNav();
  wireNav();
})();
