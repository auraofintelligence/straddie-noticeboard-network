(function () {
  const data = window.NOTICEBOARD_DATA;
  const state = {
    mode: 'basic',
    sort: 'category',
    category: 'all',
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
      const haystack = [entity.name, entity.type, entity.place, entity.share, entity.category].join(' ').toLowerCase();
      const searchMatch = !needle || haystack.includes(needle);
      const keywords = entityKeywords(entity);
      const keywordMatch = !state.keywords.size || [...state.keywords].every((keyword) => keywords.includes(keyword));
      return categoryMatch && searchMatch && keywordMatch;
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

    const sortLabel = make('label', 'sort-label', 'Sort by');
    const sortSelect = make('select');
    [
      ['category', 'Category order'],
      ['name', 'Name A-Z'],
      ['town', 'Town / place'],
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
      row.appendChild(make('strong', '', entity.name));
      row.appendChild(make('span', '', [entity.place, entity.type].filter(Boolean).join(' | ')));
      const body = make('div');
      body.appendChild(make('p', '', entity.share));
      const category = make('a', 'card-link compact-link', entity.category);
      category.href = 'categories/' + entity.categorySlug + '.html';
      body.appendChild(category);
      if (state.mode === 'advanced') {
        const tags = make('div', 'tag-row entity-tags');
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
      empty.appendChild(make('p', '', 'Clear search, category or keyword filters to see more entities.'));
      mount.appendChild(empty);
    }
  }

  const count = document.querySelector('[data-total-entity-count]');
  if (count) count.textContent = entities.length;
  renderControls();
  renderEntities();
})();
