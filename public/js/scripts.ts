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

const subscribeBtn = document.getElementById('subscribe-btn') as HTMLButtonElement;
const emailInput = document.getElementById('email-input') as HTMLInputElement;
if (subscribeBtn && emailInput) {
  subscribeBtn.addEventListener('click', () => {
    if (emailInput.value) {
      alert('Thank you for subscribing!'); // Replace with actual subscription logic
      emailInput.value = '';
    }
  });
}
