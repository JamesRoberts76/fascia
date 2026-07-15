document.addEventListener('DOMContentLoaded', () => {
  const dataElement = document.getElementById('site-data');
  if (!dataElement) {
    console.error("site-data script block not found.");
    return;
  }

  const data = JSON.parse(dataElement.textContent);
  console.log("Hugo Data structure:", data);

  const panel = document.getElementById('field-note-panel');
  const controls = document.querySelector('.node-controls');

  if (!controls || !panel) {
    console.error("Missing node-controls or field-note-panel.");
    return;
  }

  // Build buttons from keyed object (gatekeeper, traps)
  Object.keys(data).forEach((key) => {
    const node = data[key];
    if (!node || !node.condition) return;

    const btn = document.createElement('button');
    btn.className = 'node-trigger';
    btn.dataset.nodeId = key;
    btn.innerText = node.condition;
    controls.appendChild(btn);
  });

  // Click handler: update Field Note panel
  controls.addEventListener('click', (e) => {
    const trigger = e.target.closest('.node-trigger');
    if (!trigger) return;

    const node = data[trigger.dataset.nodeId];
    if (!node) return;

    panel.innerHTML = `
      <div class="field-note">
        <h3>${node.condition}</h3>
        <p><strong>Signal:</strong> ${node.signal}</p>
        <p><strong>Consequence:</strong> ${node.consequence}</p>
        <p><strong>Ritual:</strong> ${node.ritual}</p>
      </div>
    `;
  });
});
