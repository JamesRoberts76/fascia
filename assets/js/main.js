document.addEventListener('DOMContentLoaded', () => {
  const dataElement = document.getElementById('site-data');
  const controls = document.querySelector('.node-controls');
  const panel = document.getElementById('field-note-panel');

  if (!dataElement || !controls || !panel) return;

  const data = JSON.parse(dataElement.textContent);

  Object.keys(data).forEach((key) => {
    const node = data[key];
    if (!node || !node.condition) return;

    const btn = document.createElement('button');
    btn.className = 'node-trigger';
    btn.dataset.nodeId = key;
    btn.textContent = node.condition;
    controls.appendChild(btn);
  });

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
