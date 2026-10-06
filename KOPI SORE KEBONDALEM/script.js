/* ==========================================================================
   KOPI SORE KEBONDALEM - JavaScript Functionalities
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. HAMBURGER MENU TOGGLE
     -------------------------------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = hamburgerBtn.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when clicking any navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (!link.classList.contains('dropdown-toggle')) {
          navMenu.classList.remove('active');
          const icon = hamburgerBtn.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
          }
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     2. DROPDOWN MENU TOGGLE (MOBILE)
     -------------------------------------------------------------------------- */
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownParent = document.querySelector('.dropdown');

  if (dropdownToggle && dropdownParent) {
    dropdownToggle.addEventListener('click', (e) => {
      // Toggle dropdown only on mobile screen widths
      if (window.innerWidth < 992) {
        e.preventDefault();
        dropdownParent.classList.toggle('active');
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. DARK MODE TOGGLE (WITH LOCAL STORAGE)
     -------------------------------------------------------------------------- */
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;

  // Check saved theme in localStorage
  const savedTheme = localStorage.getItem('kopi-sore-theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    if (darkModeToggle) {
      darkModeToggle.querySelector('i').className = 'fa-solid fa-sun';
    }
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const icon = darkModeToggle.querySelector('i');

      if (body.classList.contains('dark-mode')) {
        icon.className = 'fa-solid fa-sun';
        localStorage.setItem('kopi-sore-theme', 'dark');
      } else {
        icon.className = 'fa-solid fa-moon';
        localStorage.setItem('kopi-sore-theme', 'light');
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. HERO SLIDER FUNCTIONALITY
     -------------------------------------------------------------------------- */
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  let currentSlide = 0;
  let autoSlideInterval;

  function showSlide(index) {
    if (slides.length === 0) return;

    // Boundary check
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentSlide);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      resetAutoSlide();
    });
  });

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Initialize auto-slide
  startAutoSlide();

  /* --------------------------------------------------------------------------
     5. MODAL DETAIL PRODUK
     -------------------------------------------------------------------------- */
  const modal = document.getElementById('product-modal');
  const modalClose = document.getElementById('modal-close');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalPrice = document.getElementById('modal-price');
  const modalDesc = document.getElementById('modal-desc');
  const detailButtons = document.querySelectorAll('.btn-detail');

  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const price = btn.getAttribute('data-price');
      const img = btn.getAttribute('data-img');
      const desc = btn.getAttribute('data-desc');

      if (modal && modalImg && modalTitle && modalPrice && modalDesc) {
        modalImg.src = img;
        modalImg.alt = title;
        modalTitle.textContent = title;
        modalPrice.textContent = price;
        modalDesc.textContent = desc;
        modal.classList.add('active');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Close modal when clicking outside content
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  /* --------------------------------------------------------------------------
     6. FORM VALIDATION (CONTACT FORM)
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Clear previous error messages
      if (nameError) nameError.textContent = '';
      if (emailError) emailError.textContent = '';
      if (messageError) messageError.textContent = '';
      if (formSuccess) formSuccess.textContent = '';

      // Name Validation
      if (nameInput && nameInput.value.trim() === '') {
        if (nameError) nameError.textContent = 'Nama tidak boleh kosong.';
        isValid = false;
      } else if (nameInput && nameInput.value.trim().length < 3) {
        if (nameError) nameError.textContent = 'Nama minimal 3 karakter.';
        isValid = false;
      }

      // Email / No HP Validation
      if (emailInput && emailInput.value.trim() === '') {
        if (emailError) emailError.textContent = 'Email / No HP tidak boleh kosong.';
        isValid = false;
      }

      // Message Validation
      if (messageInput && messageInput.value.trim() === '') {
        if (messageError) messageError.textContent = 'Pesan tidak boleh kosong.';
        isValid = false;
      } else if (messageInput && messageInput.value.trim().length < 10) {
        if (messageError) messageError.textContent = 'Pesan minimal 10 karakter.';
        isValid = false;
      }

      // If valid, show success message
      if (isValid) {
        if (formSuccess) formSuccess.textContent = '✓ Terima kasih! Pesan Anda telah berhasil terkirim.';
        contactForm.reset();

        setTimeout(() => {
          if (formSuccess) formSuccess.textContent = '';
        }, 5000);
      }
    });
  }

});