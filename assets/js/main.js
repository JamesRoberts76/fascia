document.addEventListener('DOMContentLoaded', () => {
  const dataElement = document.getElementById('site-data');
  if (!dataElement) {
    console.error("site-data script block not found.");
    return;
  }

  const data = JSON.parse(dataElement.textContent);

  // DIAGNOSTIC LOG
  console.log("Hugo Data structure:", data);

  const panel = document.getElementById('field-note-panel');
  const controls = document.querySelector('.node-controls');
});
