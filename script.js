/**
 * PORTFÓLIO & CURRÍCULO PROFISSIONAL — MATHEUS GIOVANNI AZEVEDO MAGALHÃES
 * Lógica de Interatividade, Alternância de Temas, Filtros e Ações Rápidas
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Controle de Tema (Dark / Light Mode) ---
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('mg_theme') || 'dark';

  body.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('mg_theme', newTheme);
    });
  }

  // --- 2. Menu Mobile (Hamburger) ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Fecha o menu ao clicar em qualquer link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Fecha ao clicar fora do menu
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // --- 3. Navbar com Efeito Scrolled ---
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (navbar) {
      if (scrollPos > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 4. Destaque Automático de Links do Menu (Active Section) ---
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);

  // --- 5. Imprimir / Salvar PDF ---
  const printBtn = document.getElementById('print-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // --- 6. Sistema de Notificações Toast ---
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  let toastTimeout;

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Copiar E-mail no Hero e no Card de Contato
  const emailToCopy = 'matheusmgamg@gmail.com';
  const copyHeroBtn = document.getElementById('copy-email-hero');
  const copyCardBtn = document.getElementById('copy-email-card');

  function copyEmailHandler() {
    navigator.clipboard.writeText(emailToCopy).then(() => {
      showToast('E-mail (matheusmgamg@gmail.com) copiado para a área de transferência!');
    }).catch(() => {
      // Fallback
      window.location.href = `mailto:${emailToCopy}`;
    });
  }

  if (copyHeroBtn) copyHeroBtn.addEventListener('click', copyEmailHandler);
  if (copyCardBtn) copyCardBtn.addEventListener('click', copyEmailHandler);

  // --- 7. Filtros Interativos de Cursos e Certificados ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const certCards = document.querySelectorAll('.cert-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      certCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // --- 8. Gerador de Mensagem Rápida (WhatsApp & E-mail) ---
  const sendWhatsAppBtn = document.getElementById('send-whatsapp-btn');
  const sendEmailBtn = document.getElementById('send-email-btn');
  const nameInput = document.getElementById('sender-name');
  const topicInput = document.getElementById('sender-topic');
  const messageInput = document.getElementById('sender-message');

  function buildMessage() {
    const name = nameInput ? nameInput.value.trim() : '';
    const topic = topicInput ? topicInput.value : '';
    const customMsg = messageInput ? messageInput.value.trim() : '';

    let text = `Olá Matheus! `;
    if (name) {
      text += `Meu nome é ${name}. `;
    }
    if (topic) {
      text += `Estou entrando em contato referente a: *${topic}*. `;
    }
    if (customMsg) {
      text += `\n\n${customMsg}`;
    } else {
      text += `\n\nGostei muito do seu portfólio e currículo e gostaria de agendar uma conversa sobre oportunidades.`;
    }

    return { text, topic, name };
  }

  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', () => {
      const { text } = buildMessage();
      const encoded = encodeURIComponent(text);
      const url = `https://wa.me/5511994723395?text=${encoded}`;
      window.open(url, '_blank');
    });
  }

  if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', () => {
      const { text, topic } = buildMessage();
      const subject = encodeURIComponent(`[Contato Portfólio] ${topic || 'Oportunidade Profissional'}`);
      const body = encodeURIComponent(text);
      const mailtoUrl = `mailto:matheusmgamg@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoUrl;
    });
  }
});
