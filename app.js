/* ==========================================================================
   KAKILAB by Daniele e Giorgia — Interactive Showcase Logic
   ========================================================================== */

(function () {
  'use strict';

  const data = window.KAKILAB_DATA;
  if (!data) return;

  const { config, categories, products, reviews } = data;

  // 1. Mobile Navigation Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('is-open');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Render Category Filters & Product Catalog
  const filterBar = document.getElementById('filter-bar');
  const catalogGrid = document.getElementById('catalog-grid');
  let activeCategory = 'all';

  function renderFilters() {
    if (!filterBar) return;
    filterBar.innerHTML = categories
      .map(
        (cat) => `
          <button
            type="button"
            class="filter-btn ${cat.id === activeCategory ? 'is-active' : ''}"
            data-category="${cat.id}"
            aria-pressed="${cat.id === activeCategory}"
          >
            ${cat.label}
          </button>
        `
      )
      .join('');

    filterBar.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.category;
        renderFilters();
        renderProducts();
      });
    });
  }

  function renderProducts() {
    if (!catalogGrid) return;
    const filtered =
      activeCategory === 'all'
        ? products
        : products.filter((p) => p.category === activeCategory);

    catalogGrid.innerHTML = filtered
      .map(
        (item) => `
          <article class="product-card" data-product-id="${item.id}" tabindex="0" role="button" aria-label="Apri dettagli di ${item.title}">
            <div class="product-media">
              <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="product-body">
              <span class="product-cat">${item.categoryLabel}</span>
              <h3 class="product-title">${item.title}</h3>
              <p class="product-summary">${item.summary}</p>
              <div class="product-footer">
                <span class="product-tech">${item.technique}</span>
                <span class="product-more">Scopri &rarr;</span>
              </div>
            </div>
          </article>
        `
      )
      .join('');

    catalogGrid.querySelectorAll('.product-card').forEach((card) => {
      const open = () => openProductModal(card.dataset.productId);
      card.addEventListener('click', open);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });
    });
  }

  // 3. Product Detail Modal
  const modalBackdrop = document.getElementById('product-modal');
  const modalClose = document.getElementById('modal-close');
  const modalImg = document.getElementById('modal-img');
  const modalCat = document.getElementById('modal-cat');
  const modalTitle = document.getElementById('modal-title');
  const modalTech = document.getElementById('modal-tech');
  const modalDesc = document.getElementById('modal-desc');
  const modalList = document.getElementById('modal-list');
  const modalEtsyBtn = document.getElementById('modal-etsy-btn');
  const modalQuoteBtn = document.getElementById('modal-quote-btn');

  let currentModalProduct = null;

  function openProductModal(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product || !modalBackdrop) return;

    currentModalProduct = product;
    modalImg.src = product.image;
    modalImg.alt = product.title;
    modalCat.textContent = product.categoryLabel;
    modalTitle.textContent = product.title;
    modalTech.textContent = product.technique;
    modalDesc.textContent = product.details;
    modalList.innerHTML = product.customOptions
      .map((opt) => `<li>${opt}</li>`)
      .join('');

    if (modalEtsyBtn) {
      modalEtsyBtn.href = config.etsyUrl;
    }

    modalBackdrop.classList.add('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProductModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeProductModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeProductModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProductModal();
  });

  if (modalQuoteBtn) {
    modalQuoteBtn.addEventListener('click', () => {
      closeProductModal();
      const topicSelect = document.getElementById('contact-topic');
      const messageField = document.getElementById('contact-message');
      if (topicSelect) {
        topicSelect.value = 'Personalizzazione su misura';
      }
      if (messageField && currentModalProduct) {
        messageField.value = `Ciao Daniele e Giorgia, vorrei informazioni o un preventivo per: ${currentModalProduct.title}.\n\n`;
        setTimeout(() => messageField.focus(), 350);
      }
    });
  }

  // 4. Render Etsy Reviews (if present in site-data.js)
  const reviewsContainer = document.getElementById('etsy-reviews-list');
  if (reviewsContainer && Array.isArray(reviews) && reviews.length > 0) {
    reviewsContainer.innerHTML = reviews
      .map(
        (rev) => `
          <div class="review-item">
            <div class="review-stars" aria-label="${rev.rating} stelle su 5">${'★'.repeat(rev.rating)}</div>
            <p class="review-text">“${rev.text}”</p>
            <p class="review-author">${rev.author}${rev.item ? ` · ${rev.item}` : ''}</p>
          </div>
        `
      )
      .join('');
  }

  // 5. Contact Form AJAX Submission via FormSubmit (direct to kakilab.dg@gmail.com)
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm && formFeedback && submitBtn) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Invio in corso...';
      formFeedback.className = 'form-feedback';

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(`https://formsubmit.co/ajax/${config.email}`, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData
        });

        if (response.ok) {
          formFeedback.textContent =
            'Messaggio inviato! Ti risponderemo al più presto su ' + config.email + '.';
          formFeedback.classList.add('is-visible', 'is-success');
          contactForm.reset();
        } else {
          throw new Error('Submission failed');
        }
      } catch (err) {
        formFeedback.innerHTML = `Non è stato possibile inviare dal modulo in questo momento. Scrivici direttamente a <a href="mailto:${config.email}" style="text-decoration:underline;color:var(--kaki-orange)">${config.email}</a>.`;
        formFeedback.classList.add('is-visible', 'is-error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  // 6. Scroll Reveal Animation
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Initialize
  renderFilters();
  renderProducts();
})();
