export function renderPreview(content: string, templateId: string) {
  const preview = document.getElementById('preview') as HTMLDivElement;
  try {
    // Simplified preview: render content as HTML
    // In a real implementation, fetch template HTML and apply content
    const parsed = JSON.parse(content || '{}');
    preview.innerHTML = `
      <h2>Preview</h2>
      <p>Template ID: ${templateId}</p>
      <pre>${JSON.stringify(parsed, null, 2)}</pre>
    `;
  } catch (error) {
    preview.innerHTML = '<p>Invalid content format. Please enter valid JSON.</p>';
  }
}
