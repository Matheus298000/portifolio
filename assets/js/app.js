/**
 * assets/js/app.js
 * Script otimizado e de alta resposta para o Portfólio de Matheus Giovanni.
 * 
 * Funciona universalmente:
 * - Localmente via protocolo file:/// (sem erros de CORS)
 * - Online via GitHub Pages / HTTPS
 * 
 * Rolagem 100% nativa e veloz: zero arrasto artificial de joystick ou roda do mouse.
 */

// ============================================================================
// DADOS REAIS DAS CERTIFICAÇÕES
// ============================================================================
const certificacoesData = [
  {
    id: "01",
    instituicao: "USP",
    curso: "Java Básico (20h) & Java Orientado a Objetos (8h)",
    detalhes: "Projeto COMPETEC / EACH USP",
    cargaHoraria: "28 horas",
    ano: "2026",
    link: null
  },
  {
    id: "02",
    instituicao: "PET USP",
    curso: "Montagem de Circuitos no Tinkercad e Programação em C++",
    detalhes: "Projeto Conhecendo a Mecatrônica / PET Mecatrônica",
    cargaHoraria: "10 horas",
    ano: "2026",
    link: null
  },
  {
    id: "03",
    instituicao: "Accenture",
    curso: "Java e Cloud",
    detalhes: "Visão corporativa de computação em nuvem",
    cargaHoraria: "1 hora",
    ano: "2026",
    link: null
  },
  {
    id: "04",
    instituicao: "Hype Data & AI",
    curso: "Introdução a Machine Learning",
    detalhes: "Fundamentos de modelos analíticos e dados",
    cargaHoraria: "1,5 horas",
    ano: "2026",
    link: null
  },
  {
    id: "05",
    instituicao: "DIO",
    curso: "Introdução à Inteligência Artificial (1h) & Engenharia de Prompts (1h)",
    detalhes: "Digital Innovation One",
    cargaHoraria: "2 horas",
    ano: "2026",
    link: null
  },
  {
    id: "06",
    instituicao: "SEBRAE",
    curso: "Ferramentas LEAN",
    detalhes: "Otimização contínua de processos e eliminação de desperdícios",
    cargaHoraria: "3 horas",
    ano: "2026",
    link: null
  },
  {
    id: "07",
    instituicao: "Renapsi",
    curso: "HTML5 (1h) & CSS (1h)",
    detalhes: "Estruturação semântica e estilização para web",
    cargaHoraria: "2 horas",
    ano: "2026",
    link: null
  },
  {
    id: "08",
    instituicao: "UFSCar",
    curso: "Curso Básico de Japonês 5",
    detalhes: "Universidade Federal de São Carlos",
    cargaHoraria: "10 horas",
    ano: "2026",
    link: null
  }
];

// ============================================================================
// 1. ROLAGEM NATIVA DE ALTA VELOCIDADE & ÂNCORAS SUAVES
// ============================================================================
function initSmoothScroll() {
  // A rolagem do mouse e joystick é 100% nativa (sem interceptação pesada).
  // Suavidade aplicada apenas na navegação por links internos via CSS scroll-smooth.
  document.documentElement.style.scrollBehavior = 'smooth';
}

// ============================================================================
// 2. CURSOR CUSTOMIZADO DISCRETO
// ============================================================================
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

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  function attachCursorHover() {
    const targets = document.querySelectorAll('a, button, input, [data-magnetic]');
    targets.forEach((target) => {
      target.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      target.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }
  attachCursorHover();
}

// ============================================================================
// 3. BARRA DE NAVEGAÇÃO E MENU MOBILE
// ============================================================================
function initNav() {
  const navbar = document.getElementById('navbar');
  const toggleBtn = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add('is-scrolled');
      } else {
        navbar.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  if (toggleBtn && mobileMenu) {
    let isOpen = false;

    const toggleMenu = () => {
      isOpen = !isOpen;
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));

      if (isOpen) {
        toggleBtn.classList.add('is-active');
        mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
        mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
        document.body.style.overflow = 'hidden';
        setTimeout(() => mobileLinks[0]?.focus(), 60);
      } else {
        toggleBtn.classList.remove('is-active');
        mobileMenu.classList.add('opacity-0', 'pointer-events-none');
        mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
        document.body.style.overflow = '';
      }
    };

    toggleBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (isOpen) toggleMenu();
      });
    });

    // Acessibilidade por Teclado: Escape e Focus Trap
    document.addEventListener('keydown', (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        toggleMenu();
        toggleBtn.focus();
        return;
      }

      if (e.key === 'Tab') {
        const focusableElements = [toggleBtn, ...mobileLinks];
        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    });
  }
}

// ============================================================================
// 4. RENDERIZAÇÃO DE CERTIFICAÇÕES
// ============================================================================
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function initCertificacoes() {
  const container = document.getElementById('certificacoes-list');
  if (!container || !Array.isArray(certificacoesData) || certificacoesData.length === 0) {
    return;
  }

  const itemsHtml = certificacoesData.map((cert, index) => {
    const delay = 60 + index * 50;
    const hasValidLink = Boolean(
      cert.link &&
      cert.link.trim() !== '#' &&
      cert.link.trim() !== ''
    );

    const cursoHtml = `
      <span class="text-sm sm:text-base font-medium text-primary/90 group-hover:text-primary transition-colors">
        ${escapeHtml(cert.curso)}
      </span>
    `;

    const cargaHtml = `<span>${escapeHtml(cert.cargaHoraria)}</span>`;
    const anoHtml = `<span>${escapeHtml(cert.ano)}</span>`;

    let arrowActionHtml = '';
    if (hasValidLink) {
      arrowActionHtml = `
        <div class="flex items-center gap-2 text-xs font-mono text-accent shrink-0 pt-2 sm:pt-0">
          <span class="inline sm:hidden md:inline md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            Ver certificado
          </span>
          <span class="w-8 h-8 rounded-full border border-border group-hover:border-accent/40 bg-surface/60 group-hover:bg-accent/10 flex items-center justify-center text-accent text-sm font-mono transition-all duration-300 transform md:-translate-x-1 md:group-hover:translate-x-0" aria-hidden="true">
            ↗
          </span>
        </div>
      `;
    }

    const tag = hasValidLink ? 'a' : 'div';
    const linkAttrs = hasValidLink
      ? `href="${escapeHtml(cert.link)}" target="_blank" rel="noopener noreferrer" aria-label="Ver certificado de ${escapeHtml(cert.instituicao)}"`
      : '';

    return `
      <${tag} ${linkAttrs} data-reveal data-reveal-delay="${delay}" class="group relative block py-6 sm:py-8 px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-2xl border-b border-border/70 transition-all duration-300 hover:bg-surface/40 hover:backdrop-blur-sm">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-start md:items-center">
          
          <div class="md:col-span-1 flex items-center">
            <span class="font-mono text-xs sm:text-sm text-faint group-hover:text-accent transition-colors duration-300">
              ${escapeHtml(cert.id)}
            </span>
          </div>

          <div class="md:col-span-4 lg:col-span-4">
            <h3 class="font-display text-2xl sm:text-3xl font-bold text-primary group-hover:text-accent transition-colors duration-300 tracking-tight">
              ${escapeHtml(cert.instituicao)}
            </h3>
          </div>

          <div class="md:col-span-7 lg:col-span-7 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
            <div class="flex flex-col">
              ${cursoHtml}
              <div class="flex items-center gap-2 mt-1.5 text-xs font-mono text-muted flex-wrap">
                ${cert.detalhes ? `<span class="text-accent/90 underline underline-offset-4">${escapeHtml(cert.detalhes)}</span><span class="text-faint">•</span>` : ''}
                ${cargaHtml}
                <span class="text-faint">•</span>
                ${anoHtml}
              </div>
            </div>

            ${arrowActionHtml}
          </div>

        </div>
      </${tag}>
    `;
  }).join('');

  container.innerHTML = itemsHtml;
  initUnderlineForBlueText();
}

// ============================================================================
// 5. MÓDULO DE CONTATO & FOOTER
// ============================================================================
function initContact() {
  // A. Copiar E-mail
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-email-text');
  const liveStatus = document.getElementById('copy-email-status');

  if (copyBtn && copyText) {
    const email = copyBtn.dataset.email || 'matheusmgamg@gmail.com';
    let timeoutId = null;

    copyBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = email;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        if (timeoutId) clearTimeout(timeoutId);

        copyText.textContent = 'Copiado ✓';
        copyBtn.classList.add('border-accent', 'text-accent', 'bg-accent/10');
        copyBtn.classList.remove('border-border', 'text-muted');

        if (liveStatus) {
          liveStatus.textContent = `E-mail ${email} copiado para a área de transferência com sucesso.`;
        }

        timeoutId = setTimeout(() => {
          copyText.textContent = 'Copiar e-mail';
          copyBtn.classList.remove('border-accent', 'text-accent', 'bg-accent/10');
          copyBtn.classList.add('border-border', 'text-muted');
          if (liveStatus) {
            liveStatus.textContent = '';
          }
        }, 2500);

      } catch (err) {
        console.warn('Falha ao copiar e-mail:', err);
      }
    });
  }

  // B. Ano Atual no Rodapé
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // C. Voltar ao Topo Rápido e Suave
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });

      try {
        history.replaceState(null, '', '#navbar');
      } catch {}
    });
  }
}

// ============================================================================
// 6. EFEITO MAGNÉTICO EM BOTÕES
// ============================================================================
function initMagnetic() {
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isFinePointer || prefersReducedMotion) return;

  const magneticElements = document.querySelectorAll('[data-magnetic]');

  magneticElements.forEach((el) => {
    let bounding = null;

    el.addEventListener('mouseenter', () => {
      bounding = el.getBoundingClientRect();
      el.style.transition = 'transform 0.15s cubic-bezier(0.22, 1, 0.36, 1)';
    });

    el.addEventListener('mousemove', (e) => {
      if (!bounding) bounding = el.getBoundingClientRect();
      const x = e.clientX - bounding.left - bounding.width / 2;
      const y = e.clientY - bounding.top - bounding.height / 2;
      el.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0)`;
    });

    el.addEventListener('mouseleave', () => {
      bounding = null;
      el.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)';
      el.style.transform = 'translate3d(0, 0, 0)';
    });
  });
}

// ============================================================================
// 7. REVEAL PROGRESSIVO (Seguro e Resiliente)
// ============================================================================
function initReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = document.querySelectorAll('[data-reveal]');

  if (!elements.length) return;

  if (prefersReducedMotion) {
    elements.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  document.documentElement.classList.add('js-reveal-active');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -20px 0px',
    threshold: 0.05,
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

// ============================================================================
// 8. ALTERNADOR DE TEMAS: PLANO NOTURNO / PLANO DIURNO
// ============================================================================
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const mobileToggleBtn = document.getElementById('mobile-theme-toggle');
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');
  const mobileLabel = document.getElementById('mobile-theme-label');

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      try {
        localStorage.setItem('portfolio-theme', 'light');
      } catch {}
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-label', 'Ativar Plano Noturno');
        toggleBtn.setAttribute('title', 'Ativar Plano Noturno');
      }
      if (sunIcon) sunIcon.classList.add('hidden');
      if (moonIcon) moonIcon.classList.remove('hidden');
      if (mobileLabel) mobileLabel.textContent = 'Ativar Plano Noturno 🌙';
    } else {
      document.documentElement.classList.remove('light');
      try {
        localStorage.setItem('portfolio-theme', 'dark');
      } catch {}
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-label', 'Ativar Plano Diurno');
        toggleBtn.setAttribute('title', 'Ativar Plano Diurno');
      }
      if (sunIcon) sunIcon.classList.remove('hidden');
      if (moonIcon) moonIcon.classList.add('hidden');
      if (mobileLabel) mobileLabel.textContent = 'Ativar Plano Diurno ☀️';
    }
    initUnderlineForBlueText();
  }

  // Inicializa tema salvo
  let isLight = false;
  try {
    const saved = localStorage.getItem('portfolio-theme');
    isLight = saved === 'light';
  } catch {}
  
  if (document.documentElement.classList.contains('light')) {
    isLight = true;
  }
  applyTheme(isLight ? 'light' : 'dark');

  const handleToggle = () => {
    const isCurrentlyLight = document.documentElement.classList.contains('light');
    applyTheme(isCurrentlyLight ? 'dark' : 'light');
  };

  if (toggleBtn) toggleBtn.addEventListener('click', handleToggle);
  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', handleToggle);
}

// ============================================================================
// SUBLINHADO AUTOMÁTICO PARA PALAVRAS EM #15638a (FONTE <= 16px)
// ============================================================================
function initUnderlineForBlueText() {
  const targetRgb = 'rgb(21, 99, 138)'; // Cor #15638a
  const allCandidates = document.querySelectorAll(
    'p span, span, a, em, strong, mark, small'
  );

  allCandidates.forEach((el) => {
    if (el.children.length > 0 && !el.classList.contains('text-accent')) {
      return;
    }

    const text = el.textContent.trim();
    if (
      !text ||
      text === '→' ||
      text === '↗' ||
      text === '↑' ||
      text === '•' ||
      text === '/' ||
      /^\d{1,2}$/.test(text)
    ) {
      return;
    }

    const computed = window.getComputedStyle(el);
    const fontSize = parseFloat(computed.fontSize) || 16;
    const color = computed.color;
    const isLightMode = document.documentElement.classList.contains('light');

    const isBlue15638a =
      color === targetRgb ||
      (isLightMode &&
        (el.classList.contains('text-accent') ||
          el.className.includes('text-accent')));

    if (isBlue15638a && fontSize <= 16.5) {
      el.classList.add('underline', 'underline-offset-4');
      el.style.textUnderlineOffset = '4px';
      el.style.textDecorationThickness = '1.5px';
    }
  });
}

// ============================================================================
// INICIALIZAÇÃO GERAL
// ============================================================================
function startPortfolio() {
  initSmoothScroll();
  initCustomCursor();
  initNav();
  initThemeToggle();
  initCertificacoes();
  initContact();
  initReveal();
  initMagnetic();
  initUnderlineForBlueText();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startPortfolio);
} else {
  startPortfolio();
}


