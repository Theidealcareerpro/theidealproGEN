interface CVData {
  name?: string;
  experience?: any[];
  education?: any[];
}

interface CoverLetterData {
  recipient?: string;
  content?: string;
}

interface PortfolioData {
  title?: string;
  projects?: string[];
  skills?: string[];
  image?: string;
}

const generateBtn = document.getElementById('generate') as HTMLButtonElement;
const templateSelect = document.getElementById('template') as HTMLSelectElement;
const templateError = document.getElementById('template-error') as HTMLParagraphElement;
const editor = document.getElementById('editor') as HTMLTextAreaElement;
const jsonError = document.getElementById('json-error') as HTMLParagraphElement;
const previewContent = document.getElementById('preview-content') as HTMLDivElement;
const imageUpload = document.getElementById('image-upload') as HTMLInputElement | null;
const imageError = document.getElementById('image-error') as HTMLParagraphElement | null;
const imagePreview = document.getElementById('image-preview') as HTMLDivElement | null;
const cvUpload = document.getElementById('cv-upload') as HTMLInputElement | null;
const cvError = document.getElementById('cv-error') as HTMLParagraphElement | null;
const extendHosting = document.getElementById('extend-hosting') as HTMLButtonElement | null;

if (generateBtn && templateSelect && templateError && editor && jsonError && previewContent) {
  // Image upload handling
  let uploadedImage: string | null = null;
  if (imageUpload && imageError && imagePreview) {
    imageUpload.addEventListener('change', () => {
      const file = imageUpload.files?.[0];
      if (file && ['image/jpeg', 'image/png'].includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          uploadedImage = reader.result as string;
          imagePreview.innerHTML = `<img src="${uploadedImage}" alt="Uploaded portfolio image preview" class="max-w-full h-auto rounded-md" loading="lazy">`;
          imagePreview.classList.remove('hidden');
          imageError.classList.add('hidden');
        };
        reader.readAsDataURL(file);
      } else {
        imageError.classList.remove('hidden');
        imagePreview.classList.add('hidden');
        uploadedImage = null;
      }
    });
  }

  // CV upload handling
  if (cvUpload && cvError) {
    cvUpload.addEventListener('change', () => {
      const file = cvUpload.files?.[0];
      if (file && file.type === 'application/pdf') {
        cvError.classList.add('hidden');
        // Placeholder for CV parsing logic (e.g., send to backend)
        console.log('CV uploaded:', file.name);
      } else {
        cvError.classList.remove('hidden');
      }
    });
  }

  // Generate button logic
  generateBtn.addEventListener('click', () => {
    templateError.classList.add('hidden');
    jsonError.classList.add('hidden');
    if (extendHosting) extendHosting.classList.add('hidden');

    // Validate template
    if (!templateSelect.value) {
      templateError.classList.remove('hidden');
      return;
    }

    try {
      const json = JSON.parse(editor.value);
      const page = window.location.pathname;

      if (page.includes('cv.html')) {
        const data = json as CVData;
        previewContent.innerHTML = `
          <h3 class="text-lg font-bold">${data.name || 'Name'}</h3>
          <p>Experience: ${data.experience?.length || 0} entries</p>
          <p>Education: ${data.education?.length || 0} entries</p>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Template: ${templateSelect.value}</p>
        `;
      } else if (page.includes('cover-letter.html')) {
        const data = json as CoverLetterData;
        previewContent.innerHTML = `
          <h3 class="text-lg font-bold">Dear ${data.recipient || 'Hiring Manager'}</h3>
          <p>${data.content || 'Your cover letter content will appear here.'}</p>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Template: ${templateSelect.value}</p>
        `;
      } else if (page.includes('portfolio.html')) {
        const data = json as PortfolioData;
        const projectsList = data.projects?.length
          ? `<ul class="list-disc pl-5">${data.projects.map((p) => `<li>${p}</li>`).join('')}</ul>`
          : '<p class="text-gray-500 dark:text-gray-400">No projects added.</p>';
        const skillsList = data.skills?.length
          ? `<ul class="list-disc pl-5">${data.skills.map((s) => `<li>${s}</li>`).join('')}</ul>`
          : '<p class="text-gray-500 dark:text-gray-400">No skills listed.</p>';
        previewContent.innerHTML = `
          ${uploadedImage ? `<img src="${uploadedImage}" alt="Portfolio image" class="max-w-full h-auto rounded-md mb-4" loading="lazy">` : ''}
          <h3 class="text-lg font-bold">${data.title || 'Portfolio Title'}</h3>
          <h4 class="mt-4 font-semibold">Projects</h4>
          ${projectsList}
          <h4 class="mt-4 font-semibold">Skills</h4>
          ${skillsList}
          <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">Template: ${templateSelect.value}</p>
        `;
        if (extendHosting) extendHosting.classList.remove('hidden');
      }
    } catch {
      jsonError.classList.remove('hidden');
    }
  });

  // Extend hosting button
  if (extendHosting) {
    extendHosting.addEventListener('click', () => {
      alert('Redirecting to payment gateway for hosting extension (£10)'); // Replace with actual payment logic
    });
  }
}

// Fade-in animations
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
fadeElements.forEach((el) => observer.observe(el));

// Theme toggle
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
