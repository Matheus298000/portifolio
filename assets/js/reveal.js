/**
 * assets/js/reveal.js
 * Reveal on Scroll com IntersectionObserver e suporte a prefers-reduced-motion
 */

export function initReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = document.querySelectorAll('[data-reveal]');

  if (!elements.length) return;

  // Se o usuário prefere movimento reduzido, revela imediatamente sem animação
  if (prefersReducedMotion) {
    elements.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elements.forEach((el) => observer.observe(el));
}
