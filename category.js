(function () {
  const data = window.NOTICEBOARD_DATA;
  const slug = document.body.dataset.category;

  function slugify(value) {
    return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function make(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function renderSharedQuestions() {
    const mount = document.querySelector('[data-category-questions]');
    if (!mount) return;
    [
      'Who inside this entity can approve a public notice?',
      'Which fields can be public, and which must stay private?',
      'What expiry date or review rhythm should this notice use?',
      'Which screen shapes matter: wall, kiosk, phone, counter tablet or text fallback?',
      "Who owns this entity's public_noticeboard.md contract?",
      'Which monthly, seasonal, local or UN-style themes align with this entity?'
    ].forEach((question) => mount.appendChild(make('li', '', question)));
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

  const group = data.entityGroups.find((item) => slugify(item.label) === slug);
  if (!group) return;

  document.querySelector('[data-category-title]').textContent = group.label;
  document.querySelector('[data-category-note]').textContent = group.note;

  const mount = document.querySelector('[data-category-cards]');
  group.entities.forEach((entity) => {
    const card = make('article', 'entity-card');
    card.appendChild(make('p', 'eyebrow', entity.type));
    card.appendChild(make('h3', '', entity.name));
    card.appendChild(make('p', 'card-meta', entity.place));
    card.appendChild(make('p', '', 'Supposed public data: ' + entity.share));

    const pre = make('pre', 'entity-md');
    pre.appendChild(make('code', '', exampleMarkdown(entity, group)));
    card.appendChild(pre);
    mount.appendChild(card);
  });

  renderSharedQuestions();
})();
