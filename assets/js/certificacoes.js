/**
 * assets/js/certificacoes.js
 * Módulo de renderização dinâmica para a Seção de Certificações.
 * Constrói a lista editorial numerada (01 a 06) a partir de assets/js/data/certificacoes.js.
 */

import { certificacoes } from './data/certificacoes.js';

/**
 * Verifica se um valor é um placeholder (TODO) ou se está vazio
 * @param {string|null|undefined} val 
 * @returns {boolean}
 */
function isPlaceholder(val) {
  if (!val) return true;
  const str = String(val).trim();
  return str.startsWith('<!--') || str.includes('TODO') || str === '';
}

/**
 * Escapa strings para inserção segura no DOM
 * @param {string} str 
 * @returns {string}
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Inicializa a renderização da lista de certificações
 */
export function initCertificacoes() {
  const container = document.getElementById('certificacoes-list');
  if (!container || !Array.isArray(certificacoes) || certificacoes.length === 0) {
    return;
  }

  const itemsHtml = certificacoes.map((cert, index) => {
    const delay = 100 + index * 60;
    const hasValidLink = Boolean(
      cert.link &&
      !isPlaceholder(cert.link) &&
      cert.link.trim() !== '#' &&
      cert.link.trim() !== ''
    );

    // Tratamento dos placeholders vs valores reais
    const cursoHtml = isPlaceholder(cert.curso)
      ? `<!-- TODO: nome do curso --><span class="text-sm sm:text-base font-medium text-muted/60 italic">[Curso a definir]</span>`
      : `<span class="text-sm sm:text-base font-medium text-primary/90 group-hover:text-primary transition-colors">${escapeHtml(cert.curso)}</span>`;

    const cargaHtml = isPlaceholder(cert.cargaHoraria)
      ? `<!-- TODO: carga horária --><span>Carga horária a definir</span>`
      : `<span>${escapeHtml(cert.cargaHoraria)}</span>`;

    const anoHtml = isPlaceholder(cert.ano)
      ? `<!-- TODO: ano --><span>Ano</span>`
      : `<span>${escapeHtml(cert.ano)}</span>`;

    // Ação do certificado: exibe link com seta ↗ quando houver URL real
    let arrowActionHtml = `<!-- TODO: link do certificado (opcional) -->`;
    if (hasValidLink) {
      arrowActionHtml = `
        <!-- TODO: link do certificado (opcional) -->
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

    // Elemento raiz: se houver link válido, usa âncora; caso contrário, usa div estruturada
    const tag = hasValidLink ? 'a' : 'div';
    const linkAttrs = hasValidLink
      ? `href="${escapeHtml(cert.link)}" target="_blank" rel="noopener noreferrer" aria-label="Ver certificado de ${escapeHtml(cert.instituicao)}"`
      : '';

    return `
      <${tag} ${linkAttrs} data-reveal data-reveal-delay="${delay}" class="group relative block py-6 sm:py-8 px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-2xl border-b border-border/70 transition-all duration-300 hover:bg-surface/40 hover:backdrop-blur-sm">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-start md:items-center">
          
          <!-- 1. Número Pequeno à Esquerda -->
          <div class="md:col-span-1 flex items-center">
            <span class="font-mono text-xs sm:text-sm text-faint group-hover:text-accent transition-colors duration-300">
              ${escapeHtml(cert.id)}
            </span>
          </div>

          <!-- 2. Nome da Instituição em Tipografia Grande no Centro -->
          <div class="md:col-span-4 lg:col-span-4">
            <h3 class="font-display text-2xl sm:text-3xl font-bold text-primary group-hover:text-accent transition-colors duration-300 tracking-tight">
              ${escapeHtml(cert.instituicao)}
            </h3>
          </div>

          <!-- 3. Curso, Carga Horária, Ano e Indicador de Certificado à Direita -->
          <div class="md:col-span-7 lg:col-span-7 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
            <div class="flex flex-col">
              ${cursoHtml}
              <div class="flex items-center gap-2 mt-1 text-xs font-mono text-muted">
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
}
