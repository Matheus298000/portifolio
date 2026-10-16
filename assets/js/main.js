/**
 * assets/js/main.js
 * Ponto de entrada (ES Modules) — Inicialização de Cursor, Smooth Scroll e Componentes
 */

import { initReveal } from './reveal.js';
import { initNav } from './nav.js';
import { initMagnetic } from './magnetic.js';
import { initCertificacoes } from './certificacoes.js';

// 1. Smooth Scroll de Alta Precisão (Lenis via CDN, com fallback e respeito a reduced-motion)
function initSmoothScroll() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  if (typeof window.Lenis !== 'undefined') {
    const lenis = new window.Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

// 2. Cursor Customizado Discreto (Apenas dispositivos Desktop com ponteiro fino)
function initCustomCursor() {
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isFinePointer || prefersReducedMotion) return;

  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'custom-cursor-dot';
  ring.className = 'custom-cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  }, { passive: true });

  // Interpolação suave do anel externo (lerp)
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Estados de hover em links e botões interativos
  const interactiveTargets = document.querySelectorAll('a, button, input, [data-magnetic]');
  interactiveTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    target.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

// Inicialização após carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initCustomCursor();
  initNav();
  initCertificacoes();
  initReveal();
  initMagnetic();
});
