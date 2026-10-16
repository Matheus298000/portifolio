/**
 * assets/js/nav.js
 * Navbar reativa ao scroll e Menu Mobile em tela cheia com acessibilidade (ARIA/Keyboard)
 */

export function initNav() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // 1. Transição da Navbar no Scroll (Transparente -> Vidro Fosco)
  const handleScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 24) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Executa na montagem inicial

  // 2. Controle do Menu Mobile
  if (!mobileToggle || !mobileMenu) return;

  const openMenu = () => {
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileToggle.setAttribute('aria-label', 'Fechar menu de navegação');
    mobileMenu.classList.remove('pointer-events-none', 'opacity-0');
    mobileMenu.classList.add('pointer-events-auto', 'opacity-100');
    document.body.classList.add('overflow-hidden');
    mobileToggle.classList.add('is-active');
  };

  const closeMenu = () => {
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.setAttribute('aria-label', 'Abrir menu de navegação');
    mobileMenu.classList.add('pointer-events-none', 'opacity-0');
    mobileMenu.classList.remove('pointer-events-auto', 'opacity-100');
    document.body.classList.remove('overflow-hidden');
    mobileToggle.classList.remove('is-active');
  };

  const toggleMenu = () => {
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  mobileToggle.addEventListener('click', toggleMenu);

  // Fecha ao clicar em qualquer link interno
  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Fecha com a tecla ESC para acessibilidade
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      mobileToggle.focus();
    }
  });

  // Fecha se a janela for redimensionada para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && mobileToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });
}
