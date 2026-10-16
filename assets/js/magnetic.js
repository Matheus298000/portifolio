/**
 * assets/js/magnetic.js
 * Efeito magnético suave e tátil para botões e links interativos (Desktop)
 */

export function initMagnetic() {
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isFinePointer || prefersReducedMotion) return;

  const magneticElements = document.querySelectorAll('[data-magnetic]');

  magneticElements.forEach((el) => {
    const strength = parseFloat(el.getAttribute('data-magnetic-strength') || '0.24');

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      el.style.transform = `translate3d(${deltaX.toFixed(2)}px, ${deltaY.toFixed(2)}px, 0)`;
    };

    const handleMouseEnter = () => {
      el.style.transition = 'transform 0.12s ease-out';
    };

    const handleMouseLeave = () => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
      el.style.transform = 'translate3d(0, 0, 0)';
    };

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
  });
}
