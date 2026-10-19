/**
 * GUIA NATURAL CONTRA A TOSSE — SCRIPT INTERATIVO (149 MT)
 * Suporte a efeito 3D no Mockup, Menu Mobile, FAQ Accordion,
 * Barra Móvel Fixa, Modal de Pagamento e Integração com Checkout Real.
 */

// ============================================================================
// CONFIGURAÇÃO DO CHECKOUT PELO PROPRIETÁRIO
// Se tiver um link direto de checkout (ex: EscalePay, Paywall, etc.), insira abaixo:
// Exemplo: const CONFIG_CHECKOUT_URL = "https://checkout.escalepay.com/6624091";
const CONFIG_CHECKOUT_URL = "https://checkout.escalepay.com/5732171"; 

// Elementos do DOM
const checkoutModal = document.getElementById('checkoutModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const triggerButtons = document.querySelectorAll('.trigger-checkout');
const book3d = document.getElementById('book3d');
const mockupStage = document.getElementById('mockupStage');
const mobileToggle = document.getElementById('mobileToggle');
const mobileDrawer = document.getElementById('mobileDrawer');
const faqQuestions = document.querySelectorAll('.faq-question');
const stickyMobileCta = document.getElementById('stickyMobileCta');

/**
 * 1. NAVEGAÇÃO MOBILE (MENU GAVETA)
 */
if (mobileToggle && mobileDrawer) {
  mobileToggle.addEventListener('click', () => {
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', !isExpanded);
    mobileDrawer.classList.toggle('is-open');
    mobileDrawer.setAttribute('aria-hidden', isExpanded);
  });

  // Fechar gaveta ao clicar num link
  mobileDrawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('is-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileDrawer.setAttribute('aria-hidden', 'true');
    });
  });
}

/**
 * 2. ACORDEÃO DE PERGUNTAS FREQUENTES (FAQ)
 */
faqQuestions.forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isAlreadyActive = item.classList.contains('is-active');

    // Fecha os outros
    document.querySelectorAll('.faq-item').forEach(otherItem => {
      otherItem.classList.remove('is-active');
      const otherBtn = otherItem.querySelector('.faq-question');
      if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
    });

    // Alterna o atual
    if (!isAlreadyActive) {
      item.classList.add('is-active');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/**
 * 3. FLUXO DE COMPRA & CHECKOUT
 */
function handleBuyClick(event) {
  event.preventDefault();
  
  const customUrl = event.currentTarget.getAttribute('data-checkout-url') || CONFIG_CHECKOUT_URL;
  
  if (customUrl && customUrl.trim() !== "") {
    window.open(customUrl, '_blank', 'noopener,noreferrer');
  } else {
    openCheckoutModal();
  }
}

function openCheckoutModal() {
  if (checkoutModal) {
    checkoutModal.classList.add('is-open');
    checkoutModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    const firstInput = document.getElementById('buyerName');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 150);
    }
  }
}

function closeCheckoutModal() {
  if (checkoutModal) {
    checkoutModal.classList.remove('is-open');
    checkoutModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function handleCheckoutSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('buyerName').value.trim();
  const phone = document.getElementById('buyerPhone').value.trim();
  const email = document.getElementById('buyerEmail').value.trim();

  const submitBtn = event.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>A preparar confirmação...</span>`;

  setTimeout(() => {
    alert(`Obrigado pelo seu pedido, ${name}!\n\nProduto: E-book Guia Natural Contra a Tosse (PDF)\nPreço Total: 149 MT\n\nEntraremos em contacto pelo ${phone} para a confirmação rápida do pagamento e entrega imediata do PDF.`);
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    closeCheckoutModal();
  }, 650);
}

// Ouvintes nos botões de compra
triggerButtons.forEach(btn => {
  btn.addEventListener('click', handleBuyClick);
});

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeCheckoutModal);
}

if (checkoutModal) {
  checkoutModal.addEventListener('click', (e) => {
    if (e.target === checkoutModal) {
      closeCheckoutModal();
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && checkoutModal && checkoutModal.classList.contains('is-open')) {
    closeCheckoutModal();
  }
});

/**
 * 4. INTERATIVIDADE 3D NO MOCKUP DO LIVRO
 */
if (mockupStage && book3d) {
  mockupStage.addEventListener('mousemove', (e) => {
    const rect = mockupStage.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateY = -18 + (x / rect.width) * 18;
    const rotateX = 8 - (y / rect.height) * 18;

    book3d.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(-6px)`;
  });

  mockupStage.addEventListener('mouseleave', () => {
    book3d.style.transform = `rotateY(-18deg) rotateX(8deg)`;
  });
}

/**
 * 5. BARRA MOBILE FIXA (STICKY CTA)
 */
if (stickyMobileCta) {
  window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        if (heroBottom < 100) {
          stickyMobileCta.style.display = 'flex';
        } else {
          stickyMobileCta.style.display = 'none';
        }
      }
    } else {
      stickyMobileCta.style.display = 'none';
    }
  });
}

/**
 * 6. NOTIFICAÇÕES DINÂMICAS DE PROVA SOCIAL AO VIVO
 */
const socialProofToast = document.getElementById('socialProofToast');
const toastBuyer = document.getElementById('toastBuyer');
const toastTime = document.getElementById('toastTime');

const recentSales = [
  { name: "Amina M. (Maputo)", time: "Há 2 minutos • Via M-Pesa" },
  { name: "Carlos S. (Matola)", time: "Há 6 minutos • Via e-Mola" },
  { name: "Fátima C. (Beira)", time: "Há 12 minutos • Via M-Pesa" },
  { name: "António T. (Nampula)", time: "Há 19 minutos • Via Cartão" },
  { name: "Marta L. (Chimoio)", time: "Há 4 minutos • Via M-Pesa" },
  { name: "Dra. Esperança (Inhambane)", time: "Há 25 minutos • Via M-Pesa" }
];

let saleIndex = 0;

function showNextSaleToast() {
  if (!socialProofToast || !toastBuyer || !toastTime) return;

  const sale = recentSales[saleIndex];
  toastBuyer.textContent = sale.name;
  toastTime.textContent = sale.time;

  socialProofToast.classList.remove('is-hidden');

  setTimeout(() => {
    socialProofToast.classList.add('is-hidden');
  }, 4500);

  saleIndex = (saleIndex + 1) % recentSales.length;
}

// Inicia após 4 segundos da página carregar e repete a cada 10 segundos
if (socialProofToast) {
  setTimeout(() => {
    showNextSaleToast();
    setInterval(showNextSaleToast, 11000);
  }, 3500);
}

