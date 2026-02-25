// Accessibility Enhancements
document.addEventListener('DOMContentLoaded', function() {
  
  // Keyboard navigation for carousel
  document.addEventListener('keydown', function(e) {
    const carousel = document.querySelector('.menu-carousel');
    if (!carousel) return;
    
    if (e.key === 'ArrowLeft') {
      const leftBtn = document.querySelector('.carousel-slide.active .nav-arrow.left');
      if (leftBtn) leftBtn.click();
    } else if (e.key === 'ArrowRight') {
      const rightBtn = document.querySelector('.carousel-slide.active .nav-arrow.right');
      if (rightBtn) rightBtn.click();
    }
  });
  
  // Keyboard navigation for hamburger menu
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    hamburger.setAttribute('tabindex', '0');
    
    hamburger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  }
  
  // Add ARIA labels to navigation
  const nav = document.querySelector('nav');
  if (nav) {
    nav.setAttribute('aria-label', 'Main navigation');
  }
  
  // Add ARIA labels to carousel controls
  const leftArrows = document.querySelectorAll('.nav-arrow.left');
  const rightArrows = document.querySelectorAll('.nav-arrow.right');
  
  leftArrows.forEach(arrow => {
    arrow.setAttribute('aria-label', 'Previous slide');
  });
  
  rightArrows.forEach(arrow => {
    arrow.setAttribute('aria-label', 'Next slide');
  });
  
  // Add ARIA live region for carousel category
  const carouselCategory = document.getElementById('carousel-category');
  if (carouselCategory) {
    carouselCategory.setAttribute('aria-live', 'polite');
  }
  
  // Skip to main content link
  const skipLink = document.createElement('a');
  skipLink.href = '#main';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  skipLink.setAttribute('aria-label', 'Skip to main content');
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add main ID if not exists
  const main = document.querySelector('main');
  if (main && !main.id) {
    main.id = 'main';
  }
  
  // Focus management for modals
  const modals = document.querySelectorAll('.picker-modal');
  modals.forEach(modal => {
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
  });
  
  // Announce form errors to screen readers
  const form = document.getElementById('reservationForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      const invalidFields = form.querySelectorAll(':invalid');
      if (invalidFields.length > 0) {
        const errorMsg = document.createElement('div');
        errorMsg.setAttribute('role', 'alert');
        errorMsg.setAttribute('aria-live', 'assertive');
        errorMsg.textContent = 'Please fill in all required fields';
        errorMsg.style.position = 'absolute';
        errorMsg.style.left = '-9999px';
        document.body.appendChild(errorMsg);
        setTimeout(() => errorMsg.remove(), 3000);
      }
    });
  }
});
