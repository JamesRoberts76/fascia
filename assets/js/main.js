// Grab bridge content, data, and containers
const siteDataEl = document.getElementById('site-data');
const mapEl = document.getElementById('network-map');
const notePanel = document.getElementById('field-note-panel');

if (!siteDataEl || !mapEl || !notePanel) {
  console.warn('Fascia: required DOM elements not found');
} else {
  let nodes = [];

  try {
    nodes = JSON.parse(siteDataEl.textContent || '[]');
  } catch (err) {
    console.error('Fascia: failed to parse site data JSON', err);
  }

  // Basic layout: simple vertical list for now (we can upgrade to SVG later)
  mapEl.classList.add('fascia-map');
  notePanel.classList.add('fascia-note-panel');

  if (!Array.isArray(nodes) || nodes.length === 0) {
    mapEl.textContent = 'No nodes yet. Add places to data/nodes.json.';
  } else {
    const list = document.createElement('ul');
    list.className = 'fascia-node-list';

    nodes.forEach((node, index) => {
      const item = document.createElement('li');
      item.className = 'fascia-node';
      item.tabIndex = 0;

      const label = node.label || node.name || `Node ${index + 1}`;
      item.textContent = label;

      item.addEventListener('mouseenter', () => {
        updateNotePanel(node);
      });

      item.addEventListener('focus', () => {
        updateNotePanel(node);
      });

      item.addEventListener('click', () => {
        updateNotePanel(node, true);
      });

      list.appendChild(item);
    });

    mapEl.appendChild(list);
  }
}

function updateNotePanel(node, focus = false) {
  const parts = [];

  if (node.label || node.name) {
    parts.push(`<strong>${escapeHtml(node.label || node.name)}</strong>`);
  }

  if (node.description) {
    parts.push(escapeHtml(node.description));
  }

  if (node.location) {
    parts.push(`Location: ${escapeHtml(node.location)}`);
  }

  if (node.tags && Array.isArray(node.tags) && node.tags.length > 0) {
    parts.push(`Tags: ${node.tags.map(escapeHtml).join(', ')}`);
  }

  notePanel.innerHTML = parts.join('<br>');
  if (focus) notePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
