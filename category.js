(function () {
  const data = window.NOTICEBOARD_DATA;
  const slug = document.body.dataset.category;
  const state = {
    mode: 'basic',
    sort: 'recommended',
    place: 'all',
    search: '',
    keywords: new Set()
  };

  const stopWords = new Set([
    'and', 'the', 'for', 'with', 'from', 'into', 'public', 'data', 'notes',
    'updates', 'windows', 'notices', 'links', 'local', 'likely', 'safe',
    'service', 'services', 'community', 'minjerribah', 'stradbroke', 'island'
  ]);

  function slugify(value) {
    return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function make(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function words(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .map((word) => word.trim())
      .filter((word) => word.length > 3 && !stopWords.has(word));
  }

  function entityKeywords(entity, group) {
    const raw = [
      group.label,
      group.kind,
      entity.name,
      entity.type,
      entity.place,
      entity.share
    ].flatMap(words);
    return [...new Set(raw)].slice(0, 12);
  }

  function placeBuckets(entity) {
    const place = String(entity.place || '').toLowerCase();
    const buckets = new Set();
    if (place.includes('amity')) buckets.add('Amity Point');
    if (place.includes('dunwich') || place.includes('goompi')) buckets.add('Dunwich / Goompi');
    if (place.includes('point lookout') || place.includes('cylinder beach')) buckets.add('Point Lookout');
    if (place.includes('one mile')) buckets.add('One Mile');
    if (place.includes('cleveland')) buckets.add('Cleveland');
    if (place.includes('online')) buckets.add('Online');
    if (place.includes('quandamooka')) buckets.add('Quandamooka Country');
    if (place.includes('redlands') || place.includes('birkdale') || place.includes('ormiston') || place.includes('wellington point') || place.includes('southern moreton bay')) buckets.add('Redlands / mainland');
    if (place.includes('minjerribah') || place.includes('island-wide') || place.includes('moongalba')) buckets.add('Minjerribah / island-wide');
    if (!buckets.size && entity.place) buckets.add(entity.place);
    return [...buckets];
  }

  function allPlaces(group) {
    return [...new Set(group.entities.flatMap(placeBuckets))].sort((a, b) => a.localeCompare(b));
  }

  function allKeywords(group) {
    const counts = new Map();
    group.entities.forEach((entity) => {
      entityKeywords(entity, group).forEach((keyword) => {
        counts.set(keyword, (counts.get(keyword) || 0) + 1);
      });
    });
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([keyword]) => keyword)
      .slice(0, 36);
  }

  function openTargetCard() {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    if (!target) return;
    target.classList.add('is-targeted');
    target.querySelectorAll('details').forEach((details) => {
      details.open = true;
    });
    requestAnimationFrame(() => {
      target.scrollIntoView({ block: 'start' });
    });
  }

  function exampleMarkdown(entity, group) {
    const id = slugify(entity.name) + '-notice-draft';
    return '---\n' +
      'id: ' + id + '\n' +
      'publisher: ' + entity.name + '\n' +
      'publisher_type: ' + group.label + '\n' +
      'place: ' + entity.place + '\n' +
      'notice_type: public_update\n' +
      'theme_tags: []\n' +
      'screen_targets: [kiosk_portrait, phone_story, wall_16x9]\n' +
      'status: draft\n' +
      'approval_owner: TODO\n' +
      'expires: TODO\n' +
      'privacy_checked: false\n' +
      '---\n\n' +
      '# Public update\n\n' +
      entity.share + '\n';
  }

  function yamlList(items, indent) {
    if (!items || !items.length) return indent + '- TODO\n';
    return items.map((item) => indent + '- ' + item).join('\n') + '\n';
  }

  function yamlMap(items, indent) {
    if (!items) return indent + 'facebook: TODO\n' + indent + 'instagram: TODO\n' + indent + 'linkedin: TODO\n';
    return Object.entries(items).map(([key, value]) => indent + key + ': ' + (value || 'TODO')).join('\n') + '\n';
  }

  function businessProfileMarkdown(entity, group) {
    const profile = entity.profile || {};
    const status = entity.status || profile.public_status || 'needs direct confirmation';
    return '---\n' +
      'schema: business_profile.v0\n' +
      'business_profile_id: ' + (profile.business_profile_id || slugify(entity.name)) + '\n' +
      'public_name: ' + (profile.public_name || entity.name) + '\n' +
      'category: ' + group.label + '\n' +
      'place: ' + entity.place + '\n' +
      'status: ' + status + '\n' +
      'source_status: ' + (profile.sources && profile.sources.length ? 'public sources found; still needs owner approval' : 'research hypothesis; needs public source pass') + '\n' +
      'last_source_check: 2026-05-08\n' +
      'registered_identity:\n' +
      '  abn: ' + (profile.abn || 'TODO') + '\n' +
      '  acn: ' + (profile.acn || 'TODO') + '\n' +
      '  registered_entity: ' + (profile.registered_entity || 'TODO') + '\n' +
      'public_contact:\n' +
      '  phone: ' + (profile.phone || 'TODO') + '\n' +
      '  email: ' + (profile.email || 'TODO') + '\n' +
      '  address: ' + (profile.address || entity.place || 'TODO') + '\n' +
      'online_presence:\n' +
      '  website: ' + (profile.website || 'TODO') + '\n' +
      '  google_business_profile: ' + (profile.google_business_profile || 'TODO') + '\n' +
      '  google_maps: ' + (profile.google_maps || 'TODO') + '\n' +
      'socials:\n' +
      yamlMap(profile.socials, '  ') +
      'hours_public_note: ' + (profile.hours_public_note || 'TODO - confirm current public hours before publishing') + '\n' +
      'allowed_notice_types:\n' +
      '  - opening_hours\n' +
      '  - public_update\n' +
      '  - event_or_special\n' +
      'must_not_publish:\n' +
      '  - private staff, member, client or customer records\n' +
      '  - private payment, account or access details\n' +
      '  - exact sensitive locations or unapproved photos\n' +
      'source_notes:\n' +
      yamlList(profile.source_notes, '  ') +
      'sources:\n' +
      yamlList(profile.sources, '  ') +
      'questions_still_open:\n' +
      '  - Who approves this profile before it becomes public?\n' +
      '  - Which notices should expire daily, weekly or monthly?\n' +
      "  - Which screen locations should receive this entity's notices?\n" +
      '---\n\n' +
      '# ' + (profile.public_name || entity.name) + '\n\n' +
      'Supposed public noticeboard role: ' + entity.share + '\n';
  }

  function renderSharedQuestions() {
    const mount = document.querySelector('[data-category-questions]');
    if (!mount) return;
    mount.innerHTML = '';
    [
      'Who inside this entity can approve a public notice?',
      'Which fields can be public, and which must stay private?',
      'What expiry date or review rhythm should this notice use?',
      'Which screen shapes matter: wall, kiosk, phone, counter tablet or text fallback?',
      "Who owns this entity's public_noticeboard.md contract?",
      'Which monthly, seasonal, local or global themes align with this entity?'
    ].forEach((question) => mount.appendChild(make('li', '', question)));
  }

  function sortEntities(entities) {
    return [...entities].sort((a, b) => {
      if (state.sort === 'name') return a.name.localeCompare(b.name);
      if (state.sort === 'town') return a.place.localeCompare(b.place) || a.name.localeCompare(b.name);
      if (state.sort === 'type') return a.type.localeCompare(b.type) || a.name.localeCompare(b.name);
      return (a._index || 0) - (b._index || 0);
    });
  }

  function filterEntities(group) {
    const needle = state.search.trim().toLowerCase();
    return group.entities
      .map((entity, index) => ({ ...entity, _index: index }))
      .filter((entity) => {
        const haystack = [entity.name, entity.type, entity.place, entity.share, group.label].join(' ').toLowerCase();
        const matchesSearch = !needle || haystack.includes(needle);
        const matchesPlace = state.place === 'all' || placeBuckets(entity).includes(state.place);
        const keywords = entityKeywords(entity, group);
        const matchesKeywords = !state.keywords.size || [...state.keywords].every((keyword) => keywords.includes(keyword));
        return matchesSearch && matchesPlace && matchesKeywords;
      });
  }

  function renderControls(group) {
    const mount = document.querySelector('[data-entity-controls]');
    if (!mount) return;
    mount.innerHTML = '';

    const panel = make('section', 'sort-panel');
    const mode = make('div', 'mode-toggle');
    mode.setAttribute('aria-label', 'Sorting mode');
    [
      ['basic', 'Basic sorting'],
      ['advanced', 'Advanced sorting']
    ].forEach(([value, label]) => {
      const button = make('button', value === state.mode ? 'is-active' : '', label);
      button.type = 'button';
      button.addEventListener('click', () => {
        state.mode = value;
        if (value === 'basic') {
          state.search = '';
          state.keywords.clear();
        }
        renderControls(group);
        renderCards(group);
      });
      mode.appendChild(button);
    });
    panel.appendChild(mode);

    const sortLabel = make('label', 'sort-label', 'Sort by');
    const select = make('select');
    [
      ['recommended', 'Recommended order'],
      ['name', 'Name A-Z'],
      ['town', 'Town / place'],
      ['type', 'Type / role']
    ].forEach(([value, label]) => {
      const option = make('option', '', label);
      option.value = value;
      option.selected = state.sort === value;
      select.appendChild(option);
    });
    select.addEventListener('change', () => {
      state.sort = select.value;
      renderCards(group);
    });
    sortLabel.appendChild(select);
    panel.appendChild(sortLabel);

    const placeLabel = make('label', 'sort-label', 'Place filter');
    const placeSelect = make('select');
    const allPlacesOption = make('option', '', 'All places');
    allPlacesOption.value = 'all';
    allPlacesOption.selected = state.place === 'all';
    placeSelect.appendChild(allPlacesOption);
    allPlaces(group).forEach((place) => {
      const option = make('option', '', place);
      option.value = place;
      option.selected = state.place === place;
      placeSelect.appendChild(option);
    });
    placeSelect.addEventListener('change', () => {
      state.place = placeSelect.value;
      renderCards(group);
    });
    placeLabel.appendChild(placeSelect);
    panel.appendChild(placeLabel);

    if (state.mode === 'advanced') {
      const searchLabel = make('label', 'sort-label', 'Search this category');
      const input = make('input');
      input.type = 'search';
      input.placeholder = 'name, town, role, notice idea...';
      input.value = state.search;
      input.addEventListener('input', () => {
        state.search = input.value;
        renderCards(group);
      });
      searchLabel.appendChild(input);
      panel.appendChild(searchLabel);

      const details = make('details', 'keyword-drawer');
      const summary = make('summary', '', 'Show keyword filters');
      const grid = make('div', 'keyword-grid');
      allKeywords(group).forEach((keyword) => {
        const button = make('button', state.keywords.has(keyword) ? 'is-active' : '', keyword);
        button.type = 'button';
        button.addEventListener('click', () => {
          if (state.keywords.has(keyword)) state.keywords.delete(keyword);
          else state.keywords.add(keyword);
          renderControls(group);
          renderCards(group);
        });
        grid.appendChild(button);
      });
      details.append(summary, grid);
      panel.appendChild(details);
    }

    mount.appendChild(panel);
  }

  function renderCards(group) {
    const mount = document.querySelector('[data-category-cards]');
    const count = document.querySelector('[data-result-count]');
    if (!mount) return;
    mount.innerHTML = '';
    const entities = sortEntities(filterEntities(group));
    if (count) count.textContent = entities.length + ' of ' + group.entities.length + ' showing';

    entities.forEach((entity) => {
      const card = make('article', 'entity-card');
      card.id = 'entity-' + slugify(entity.name);
      card.appendChild(make('p', 'eyebrow', entity.type));
      card.appendChild(make('h3', '', entity.name));
      card.appendChild(make('p', 'card-meta', entity.place));
      if (entity.status) card.appendChild(make('p', 'status-pill', entity.status));
      card.appendChild(make('p', '', 'Supposed public data: ' + entity.share));
      const entityPage = make('a', 'card-link compact-link', 'Open full entity data page');
      entityPage.href = '../entities/' + slugify(entity.name) + '.html';
      card.appendChild(entityPage);

      if (state.mode === 'advanced') {
        const tags = make('div', 'tag-row entity-tags');
        placeBuckets(entity).forEach((place) => tags.appendChild(make('span', '', place)));
        entityKeywords(entity, group).slice(0, 8).forEach((tag) => tags.appendChild(make('span', '', tag)));
        card.appendChild(tags);
      }

      const details = make('details', 'md-details');
      details.appendChild(make('summary', '', 'Example .md notice'));
      const pre = make('pre', 'entity-md');
      pre.appendChild(make('code', '', exampleMarkdown(entity, group)));
      details.appendChild(pre);
      card.appendChild(details);
      const profileDetails = make('details', 'md-details');
      profileDetails.appendChild(make('summary', '', 'Draft business_profile.md'));
      const profilePre = make('pre', 'entity-md');
      profilePre.appendChild(make('code', '', businessProfileMarkdown(entity, group)));
      profileDetails.appendChild(profilePre);
      card.appendChild(profileDetails);
      mount.appendChild(card);
    });

    if (!entities.length) {
      const empty = make('article', 'entity-card empty-card');
      empty.appendChild(make('h3', '', 'No matches yet'));
      empty.appendChild(make('p', '', 'Clear the search, place or keyword filters to widen the view.'));
      mount.appendChild(empty);
    }

    openTargetCard();
  }

  function renderFallback() {
    const title = document.querySelector('[data-category-title]');
    const note = document.querySelector('[data-category-note]');
    const mount = document.querySelector('[data-category-cards]');
    if (title) title.textContent = 'Category reorganised';
    if (note) note.textContent = 'The entity categories have been split into a cleaner set. Use the current category links below.';
    if (!mount) return;
    mount.innerHTML = '';
    data.project.categoryPages.forEach((category) => {
      const card = make('article', 'category-card');
      card.appendChild(make('p', 'eyebrow', category.kind));
      card.appendChild(make('h3', '', category.label));
      card.appendChild(make('p', 'card-meta', category.count + ' entity cards'));
      const link = make('a', 'card-link', 'Open category');
      link.href = category.href.replace('categories/', '');
      card.appendChild(link);
      mount.appendChild(card);
    });
  }

  const group = data.entityGroups.find((item) => item.slug === slug || slugify(item.label) === slug);
  if (!group) {
    renderSharedQuestions();
    renderFallback();
    return;
  }

  document.querySelector('[data-category-title]').textContent = group.label;
  document.querySelector('[data-category-note]').textContent = group.note;
  renderSharedQuestions();
  renderControls(group);
  renderCards(group);
})();
