(function () {
  const data = window.NOTICEBOARD_DATA;
  const state = {
    mode: 'basic',
    sort: 'category',
    category: 'all',
    place: 'all',
    search: '',
    keywords: new Set()
  };

  const stopWords = new Set([
    'and', 'the', 'for', 'with', 'from', 'into', 'public', 'data', 'notes',
    'updates', 'windows', 'notices', 'links', 'local', 'likely', 'safe',
    'service', 'services', 'community', 'minjerribah', 'stradbroke', 'island'
  ]);

  function make(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function slugify(value) {
    return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function entityCardHref(entity) {
    return 'categories/' + entity.categorySlug + '.html#entity-' + slugify(entity.name);
  }

  function words(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .map((word) => word.trim())
      .filter((word) => word.length > 3 && !stopWords.has(word));
  }

  const entities = data.entityGroups.flatMap((group, groupIndex) =>
    group.entities.map((entity, entityIndex) => ({
      ...entity,
      category: group.label,
      categorySlug: group.slug,
      categoryKind: group.kind,
      groupIndex,
      entityIndex
    }))
  );

  function entityKeywords(entity) {
    return [...new Set([
      entity.category,
      entity.categoryKind,
      entity.name,
      entity.type,
      entity.place,
      entity.share
    ].flatMap(words))].slice(0, 12);
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

  function allPlaces() {
    return [...new Set(entities.flatMap(placeBuckets))].sort((a, b) => a.localeCompare(b));
  }

  function allKeywords() {
    const counts = new Map();
    entities.forEach((entity) => {
      entityKeywords(entity).forEach((keyword) => {
        counts.set(keyword, (counts.get(keyword) || 0) + 1);
      });
    });
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([keyword]) => keyword)
      .slice(0, 48);
  }

  function filteredEntities() {
    const needle = state.search.trim().toLowerCase();
    return entities.filter((entity) => {
      const categoryMatch = state.category === 'all' || entity.categorySlug === state.category;
      const placeMatch = state.place === 'all' || placeBuckets(entity).includes(state.place);
      const haystack = [entity.name, entity.type, entity.place, entity.share, entity.category].join(' ').toLowerCase();
      const searchMatch = !needle || haystack.includes(needle);
      const keywords = entityKeywords(entity);
      const keywordMatch = !state.keywords.size || [...state.keywords].every((keyword) => keywords.includes(keyword));
      return categoryMatch && placeMatch && searchMatch && keywordMatch;
    });
  }

  function sortEntities(list) {
    return [...list].sort((a, b) => {
      if (state.sort === 'name') return a.name.localeCompare(b.name);
      if (state.sort === 'town') return a.place.localeCompare(b.place) || a.name.localeCompare(b.name);
      if (state.sort === 'type') return a.type.localeCompare(b.type) || a.name.localeCompare(b.name);
      return a.groupIndex - b.groupIndex || a.entityIndex - b.entityIndex;
    });
  }

  function renderControls() {
    const mount = document.querySelector('[data-directory-controls]');
    if (!mount) return;
    mount.innerHTML = '';

    const panel = make('section', 'sort-panel directory-controls');
    const mode = make('div', 'mode-toggle');
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
        renderControls();
        renderEntities();
      });
      mode.appendChild(button);
    });
    panel.appendChild(mode);

    const categoryLabel = make('label', 'sort-label', 'Category');
    const categorySelect = make('select');
    const all = make('option', '', 'All categories');
    all.value = 'all';
    all.selected = state.category === 'all';
    categorySelect.appendChild(all);
    data.entityGroups.forEach((group) => {
      const option = make('option', '', group.label);
      option.value = group.slug;
      option.selected = state.category === group.slug;
      categorySelect.appendChild(option);
    });
    categorySelect.addEventListener('change', () => {
      state.category = categorySelect.value;
      renderEntities();
    });
    categoryLabel.appendChild(categorySelect);
    panel.appendChild(categoryLabel);

    const placeLabel = make('label', 'sort-label', 'Place filter');
    const placeSelect = make('select');
    const allPlacesOption = make('option', '', 'All places');
    allPlacesOption.value = 'all';
    allPlacesOption.selected = state.place === 'all';
    placeSelect.appendChild(allPlacesOption);
    allPlaces().forEach((place) => {
      const option = make('option', '', place);
      option.value = place;
      option.selected = state.place === place;
      placeSelect.appendChild(option);
    });
    placeSelect.addEventListener('change', () => {
      state.place = placeSelect.value;
      renderEntities();
    });
    placeLabel.appendChild(placeSelect);
    panel.appendChild(placeLabel);

    const sortLabel = make('label', 'sort-label', 'Sort by');
    const sortSelect = make('select');
    [
      ['category', 'Category order'],
      ['name', 'Name A-Z'],
      ['town', 'Place A-Z'],
      ['type', 'Type / role']
    ].forEach(([value, label]) => {
      const option = make('option', '', label);
      option.value = value;
      option.selected = state.sort === value;
      sortSelect.appendChild(option);
    });
    sortSelect.addEventListener('change', () => {
      state.sort = sortSelect.value;
      renderEntities();
    });
    sortLabel.appendChild(sortSelect);
    panel.appendChild(sortLabel);

    if (state.mode === 'advanced') {
      const searchLabel = make('label', 'sort-label', 'Search all entities');
      const input = make('input');
      input.type = 'search';
      input.placeholder = 'name, town, role, notice idea...';
      input.value = state.search;
      input.addEventListener('input', () => {
        state.search = input.value;
        renderEntities();
      });
      searchLabel.appendChild(input);
      panel.appendChild(searchLabel);

      const details = make('details', 'keyword-drawer');
      details.appendChild(make('summary', '', 'Show keyword filters'));
      const grid = make('div', 'keyword-grid');
      allKeywords().forEach((keyword) => {
        const button = make('button', state.keywords.has(keyword) ? 'is-active' : '', keyword);
        button.type = 'button';
        button.addEventListener('click', () => {
          if (state.keywords.has(keyword)) state.keywords.delete(keyword);
          else state.keywords.add(keyword);
          renderControls();
          renderEntities();
        });
        grid.appendChild(button);
      });
      details.appendChild(grid);
      panel.appendChild(details);
    }

    mount.appendChild(panel);
  }

  function renderEntities() {
    const mount = document.querySelector('[data-directory-results]');
    const count = document.querySelector('[data-directory-count]');
    if (!mount) return;
    const list = sortEntities(filteredEntities());
    mount.innerHTML = '';
    if (count) count.textContent = list.length + ' of ' + entities.length + ' entities showing';

    list.forEach((entity) => {
      const row = make('article', 'entity-row directory-row');
      const nameLink = make('a', 'entity-name-link', entity.name);
      nameLink.href = entityCardHref(entity);
      row.appendChild(nameLink);
      row.appendChild(make('span', '', [entity.place, entity.type].filter(Boolean).join(' | ')));
      const body = make('div');
      if (entity.status) body.appendChild(make('p', 'status-pill compact-status', entity.status));
      body.appendChild(make('p', '', entity.share));
      const cardLink = make('a', 'card-link compact-link', 'Open entity card and draft .md files');
      cardLink.href = entityCardHref(entity);
      body.appendChild(cardLink);
      const category = make('a', 'card-link compact-link', entity.category);
      category.href = 'categories/' + entity.categorySlug + '.html';
      body.appendChild(category);
      if (state.mode === 'advanced') {
        const tags = make('div', 'tag-row entity-tags');
        placeBuckets(entity).forEach((place) => tags.appendChild(make('span', '', place)));
        entityKeywords(entity).slice(0, 8).forEach((keyword) => tags.appendChild(make('span', '', keyword)));
        body.appendChild(tags);
      }
      row.appendChild(body);
      mount.appendChild(row);
    });

    if (!list.length) {
      const empty = make('article', 'entity-row directory-row');
      empty.appendChild(make('strong', '', 'No matches yet'));
      empty.appendChild(make('span', '', 'Try widening the filters'));
      empty.appendChild(make('p', '', 'Clear search, category, place or keyword filters to see more entities.'));
      mount.appendChild(empty);
    }
  }

  const count = document.querySelector('[data-total-entity-count]');
  if (count) count.textContent = entities.length;
  renderControls();
  renderEntities();
})();
