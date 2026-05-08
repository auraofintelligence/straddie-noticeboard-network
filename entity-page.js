(function () {
  const data = window.NOTICEBOARD_DATA;
  const targetSlug = document.body.dataset.entity;

  function make(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function slugify(value) {
    return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function flattenEntities() {
    return data.entityGroups.flatMap((group, groupIndex) =>
      group.entities.map((entity, entityIndex) => ({
        ...entity,
        category: group.label,
        categorySlug: group.slug,
        categoryKind: group.kind,
        groupIndex,
        entityIndex,
        slug: slugify(entity.name)
      }))
    );
  }

  function yamlList(items, indent) {
    if (!items || !items.length) return indent + '- TODO\n';
    return items.map((item) => indent + '- ' + item).join('\n') + '\n';
  }

  function yamlMap(items, indent) {
    if (!items) return indent + 'facebook: TODO\n' + indent + 'instagram: TODO\n' + indent + 'linkedin: TODO\n';
    return Object.entries(items).map(([key, value]) => indent + key + ': ' + (value || 'TODO')).join('\n') + '\n';
  }

  function sourceStatus(entity) {
    const profile = entity.profile || {};
    if (profile.sources && profile.sources.length) return 'public sources found; still needs owner approval';
    return 'research hypothesis; needs public source pass';
  }

  function exampleNoticeMarkdown(entity) {
    return '---\n' +
      'schema: public_notice.v0\n' +
      'id: ' + entity.slug + '-notice-draft\n' +
      'publisher: ' + entity.name + '\n' +
      'publisher_type: ' + entity.category + '\n' +
      'place: ' + entity.place + '\n' +
      'notice_type: public_update\n' +
      'visibility: public\n' +
      'status: draft\n' +
      'approval_owner: TODO\n' +
      'starts: TODO\n' +
      'expires: TODO\n' +
      'screen_targets: [kiosk_portrait, phone_story, wall_16x9]\n' +
      'privacy_checked: false\n' +
      'source_checked: false\n' +
      '---\n\n' +
      '# Public update\n\n' +
      entity.share + '\n';
  }

  function businessProfileMarkdown(entity) {
    const profile = entity.profile || {};
    const status = entity.status || profile.public_status || 'needs direct confirmation';
    return '---\n' +
      'schema: business_profile.v0\n' +
      'business_profile_id: ' + (profile.business_profile_id || entity.slug) + '\n' +
      'public_name: ' + (profile.public_name || entity.name) + '\n' +
      'category: ' + entity.category + '\n' +
      'place: ' + entity.place + '\n' +
      'status: ' + status + '\n' +
      'source_status: ' + sourceStatus(entity) + '\n' +
      'last_source_check: 2026-05-08\n' +
      'registered_identity:\n' +
      '  abn: ' + (profile.abn || 'TODO') + '\n' +
      '  acn: ' + (profile.acn || 'TODO') + '\n' +
      '  registered_entity: ' + (profile.registered_entity || 'TODO') + '\n' +
      '  abr_lookup: ' + (profile.abr_lookup || 'TODO') + '\n' +
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
      'noticeboard_fit:\n' +
      '  likely_public_updates: ' + entity.share + '\n' +
      '  allowed_notice_types:\n' +
      '    - opening_hours\n' +
      '    - public_update\n' +
      '    - event_or_special\n' +
      '  screen_targets:\n' +
      '    - kiosk_portrait\n' +
      '    - phone_story\n' +
      '    - wall_16x9\n' +
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
      '  - Which public contact details are approved for screens?\n' +
      '  - Does the entity have a current Google Business Profile or Google Maps listing?\n' +
      '  - Which website and social links should be treated as official?\n' +
      '  - Is the ABN or ACN current, cancelled, not applicable or unknown?\n' +
      '  - Which notices should expire daily, weekly or monthly?\n' +
      '---\n\n' +
      '# ' + (profile.public_name || entity.name) + '\n\n' +
      'Supposed public noticeboard role: ' + entity.share + '\n';
  }

  function renderSources(entity) {
    const mount = document.querySelector('[data-entity-sources]');
    if (!mount) return;
    const profile = entity.profile || {};
    mount.innerHTML = '';

    const rows = [
      ['Source status', sourceStatus(entity)],
      ['Public status', entity.status || profile.public_status || 'needs direct confirmation'],
      ['Website', profile.website || 'TODO'],
      ['Google Business Profile', profile.google_business_profile || 'TODO'],
      ['Google Maps', profile.google_maps || 'TODO'],
      ['ABN', profile.abn || 'TODO'],
      ['ACN', profile.acn || 'TODO'],
      ['Phone', profile.phone || 'TODO'],
      ['Email', profile.email || 'TODO'],
      ['Address', profile.address || entity.place || 'TODO']
    ];

    rows.forEach(([label, value]) => {
      const row = make('div', 'source-row');
      row.appendChild(make('strong', '', label));
      if (String(value).startsWith('http')) {
        const link = make('a', '', value);
        link.href = value;
        row.appendChild(link);
      } else {
        row.appendChild(make('span', '', value));
      }
      mount.appendChild(row);
    });

    const sources = make('div', 'source-list');
    sources.appendChild(make('strong', '', 'Public sources'));
    const list = make('ul');
    (profile.sources || []).forEach((source) => {
      const item = make('li');
      const link = make('a', '', source);
      link.href = source;
      item.appendChild(link);
      list.appendChild(item);
    });
    if (!profile.sources || !profile.sources.length) {
      const item = make('li', '', 'TODO - source pass needed: official website, Google/Maps, ABR/ASIC where relevant and public socials.');
      list.appendChild(item);
    }
    sources.appendChild(list);
    mount.appendChild(sources);
  }

  function renderMarkdown(entity) {
    const notice = document.querySelector('[data-notice-md]');
    const profile = document.querySelector('[data-profile-md]');
    if (notice) notice.textContent = exampleNoticeMarkdown(entity);
    if (profile) profile.textContent = businessProfileMarkdown(entity);
  }

  function renderEntity(entity, all) {
    document.title = entity.name + ' | Straddie Noticeboard Network';
    const title = document.querySelector('[data-entity-title]');
    const eyebrow = document.querySelector('[data-entity-eyebrow]');
    const lede = document.querySelector('[data-entity-lede]');
    const category = document.querySelector('[data-entity-category]');
    const directory = document.querySelector('[data-entity-directory]');
    if (title) title.textContent = entity.name;
    if (eyebrow) eyebrow.textContent = entity.category;
    if (lede) lede.textContent = entity.share;
    if (category) category.href = '../categories/' + entity.categorySlug + '.html#entity-' + entity.slug;
    if (directory) directory.href = '../entities.html';

    const index = all.findIndex((item) => item.slug === entity.slug);
    const prev = all[(index - 1 + all.length) % all.length];
    const next = all[(index + 1) % all.length];
    const prevLink = document.querySelector('[data-prev-entity]');
    const nextLink = document.querySelector('[data-next-entity]');
    if (prevLink) {
      prevLink.href = prev.slug + '.html';
      prevLink.textContent = 'Previous: ' + prev.name;
    }
    if (nextLink) {
      nextLink.href = next.slug + '.html';
      nextLink.textContent = 'Next: ' + next.name;
    }

    const summary = document.querySelector('[data-entity-summary]');
    if (summary) {
      summary.innerHTML = '';
      summary.appendChild(make('p', 'eyebrow', entity.place));
      summary.appendChild(make('h2', '', 'Entity data scope'));
      summary.appendChild(make('p', '', entity.categoryKind));
      summary.appendChild(make('p', 'card-meta', entity.type));
      if (entity.status) summary.appendChild(make('p', 'status-pill', entity.status));
    }

    renderSources(entity);
    renderMarkdown(entity);
  }

  const all = flattenEntities();
  const entity = all.find((item) => item.slug === targetSlug);
  if (entity) {
    renderEntity(entity, all);
  } else {
    const title = document.querySelector('[data-entity-title]');
    if (title) title.textContent = 'Entity not found';
  }
})();
