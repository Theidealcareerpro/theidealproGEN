import { renderPreview } from './preview.js';

export function initEditor(documentType: string) {
  const editor = document.getElementById('editor') as HTMLTextAreaElement;
  const templateSelect = document.getElementById('template') as HTMLSelectElement;
  const generateBtn = document.getElementById('generate') as HTMLButtonElement;

  // Load templates
  fetch('/api/templates?type=' + documentType)
    .then(res => res.json())
    .then(templates => {
      templates.forEach((t: { id: string; name: string }) => {
        const option = document.createElement('option');
        option.value = t.id;
        option.textContent = t.name;
        templateSelect.appendChild(option);
      });
    });

  // Real-time preview
  editor.addEventListener('input', () => {
    renderPreview(editor.value, templateSelect.value);
  });

  // Generate document
  generateBtn.addEventListener('click', async () => {
    const response = await fetch(`/api/generate/${documentType}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: editor.value, templateId: templateSelect.value }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${documentType}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      alert('Generation failed: ' + await response.text());
    }
  });
}
