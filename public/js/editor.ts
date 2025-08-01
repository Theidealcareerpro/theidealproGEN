interface CVData {
  name?: string;
  experience?: any[];
  education?: any[];
}

interface CoverLetterData {
  recipient?: string;
  content?: string;
}

const generateBtn = document.getElementById('generate') as HTMLButtonElement;
const templateSelect = document.getElementById('template') as HTMLSelectElement;
const templateError = document.getElementById('template-error') as HTMLParagraphElement;
const editor = document.getElementById('editor') as HTMLTextAreaElement;
const jsonError = document.getElementById('json-error') as HTMLParagraphElement;
const previewContent = document.getElementById('preview-content') as HTMLDivElement;

if (generateBtn && templateSelect && templateError && editor && jsonError && previewContent) {
  generateBtn.addEventListener('click', () => {
    templateError.classList.add('hidden');
    jsonError.classList.add('hidden');

    // Validate template
    if (!templateSelect.value) {
      templateError.classList.remove('hidden');
      return;
    }

    try {
      const json = JSON.parse(editor.value);
      const isCV = window.location.pathname.includes('cv.html');

      if (isCV) {
        const data = json as CVData;
        previewContent.innerHTML = `
          <h3 class="text-lg font-bold">${data.name || 'Name'}</h3>
          <p>Experience: ${data.experience?.length || 0} entries</p>
          <p>Education: ${data.education?.length || 0} entries</p>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Template: ${templateSelect.value}</p>
        `;
      } else {
        const data = json as CoverLetterData;
        previewContent.innerHTML = `
          <h3 class="text-lg font-bold">Dear ${data.recipient || 'Hiring Manager'}</h3>
          <p>${data.content || 'Your cover letter content will appear here.'}</p>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Template: ${templateSelect.value}</p>
        `;
      }
    } catch {
      jsonError.classList.remove('hidden');
    }
  });
}

// Fade-in animations
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach((el) => observer.observe(el));

// Theme toggle (shared across pages)
const themeToggle = document.getElementById('theme-toggle') as HTMLButtonElement;
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });

  if (
    localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.body.classList.add('dark');
  }
}
