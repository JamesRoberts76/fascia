document.addEventListener('DOMContentLoaded', () => {
  const dataElement = document.getElementById('site-data');
  if (!dataElement) return;

  const data = JSON.parse(dataElement.textContent);
  const panel = document.getElementById('field-note-panel');
  const controls = document.querySelector('.node-controls');

  // Verify data is a valid object
  if (data && typeof data === 'object') {
    Object.keys(data).forEach(key => {
      const node = data[key];
      
      // ONLY create a button if the object has the required 'id' and 'condition' properties
      if (node && node.id && node.condition) {
        const btn = document.createElement('button');
        btn.className = 'node-trigger';
        btn.dataset.nodeId = node.id;
        btn.innerText = node.condition;
        controls.appendChild(btn);
      }
    });
  }

  // Delegated click handler
  controls.addEventListener('click', (e) => {
    const trigger = e.target.closest('.node-trigger');
    if (!trigger) return;
    
    // Find node by ID within our data object
    const nodeId = trigger.dataset.nodeId;
    const node = Object.values(data).find(n => n.id === nodeId);
    
    if (node) {
      panel.innerHTML = `
        <div class="field-note">
          <h3>${node.condition}</h3>
          <p><strong>Signal:</strong> ${node.signal}</p>
          <p><strong>Consequence:</strong> ${node.consequence}</p>
          <p><strong>Ritual:</strong> ${node.ritual}</p>
        </div>
      `;
    }
  });
});
