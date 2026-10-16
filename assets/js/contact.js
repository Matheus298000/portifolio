/**
 * assets/js/contact.js
 * Módulo para a Seção de Contato e Footer:
 * - Copiar e-mail para a área de transferência com feedback tátil e aria-live
 * - Atualização dinâmica do ano corrente no footer com fallback estático
 * - Botão "Voltar ao topo" com rolagem suave e respeito a prefers-reduced-motion
 */

/**
 * Inicializa o botão de copiar e-mail com confirmação visual e acessibilidade
 */
export function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-email-text');
  const copyIcon = document.getElementById('copy-email-icon');
  const liveStatus = document.getElementById('copy-email-status');

  if (!copyBtn || !copyText) return;

  const email = copyBtn.dataset.email || 'matheusmgamg@gmail.com';
  let timeoutId = null;

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback para navegadores legados sem suporte direto a Clipboard API
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

      // Feedback visual
      if (timeoutId) clearTimeout(timeoutId);

      copyText.textContent = 'Copiado ✓';
      copyBtn.classList.add('border-accent', 'text-accent', 'bg-accent/10');
      copyBtn.classList.remove('border-border', 'text-muted');

      if (liveStatus) {
        liveStatus.textContent = `E-mail ${email} copiado para a área de transferência com sucesso.`;
      }

      // Retorna ao estado inicial após 2.5 segundos
      timeoutId = setTimeout(() => {
        copyText.textContent = 'Copiar e-mail';
        copyBtn.classList.remove('border-accent', 'text-accent', 'bg-accent/10');
        copyBtn.classList.add('border-border', 'text-muted');
        if (liveStatus) {
          liveStatus.textContent = '';
        }
      }, 2500);

    } catch (err) {
      console.warn('Falha ao copiar e-mail automaticamente:', err);
      if (liveStatus) {
        liveStatus.textContent = `Não foi possível copiar automaticamente. O e-mail é ${email}.`;
      }
    }
  });
}

/**
 * Atualiza o ano no rodapé
 */
export function initCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * Inicializa a navegação suave do botão "Voltar ao topo"
 */
export function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (window.LenisInstance) {
      window.LenisInstance.scrollTo(0, { immediate: prefersReducedMotion });
    } else {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    }

    try {
      history.replaceState(null, '', '#navbar');
    } catch {
      // Ignora erro em ambientes com restrição de history API
    }
  });
}

/**
 * Ponto de entrada do módulo de contato
 */
export function initContact() {
  initCopyEmail();
  initCurrentYear();
  initBackToTop();
}
