// main.ts
// Global UI Interactions for Document Generator

// ===========================
// Navigation Highlighting
// ===========================
function initNavigationHighlight(): void {
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link');
  const currentPath = window.location.pathname;

  navLinks.forEach(link => {
    const isActive = currentPath === link.getAttribute('href');
    if (isActive) {
      link.classList.add('bg-blue-800', 'text-white');
    } else {
      link.classList.remove('bg-blue-800', 'text-white');
    }

    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('bg-blue-800', 'text-white'));
      link.classList.add('bg-blue-800', 'text-white');
    });
  });
}

// ===========================
// Scroll Fade-In Animation
// ===========================
function initScrollAnimations(): void {
  const fadeElements = document.querySelectorAll<HTMLElement>('.fade-in');

  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    fadeElements.forEach(el => observer.observe(el));
  }
}

// ===========================
// Skip Link Accessibility
// ===========================
function initSkipLinkFocus(): void {
  const skipLink = document.querySelector<HTMLAnchorElement>('a[href="#main-content"]');
  if (skipLink) {
    skipLink.addEventListener('focus', () => {
      skipLink.classList.remove('sr-only');
    });
    skipLink.addEventListener('blur', () => {
      skipLink.classList.add('sr-only');
    });
  }
}

// ===========================
// Initialize UI Components
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  initNavigationHighlight();
  initScrollAnimations();
  initSkipLinkFocus();
});
