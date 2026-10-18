let currentSlide = 1;
const totalSlides = 5;
const slideTitles = ['Appetizers', 'Desserts', 'Signature Plates', 'Beverages', 'Cocktails'];

function showSlide(n) {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dots span');
  const titleElement = document.querySelector('.carousel-header h3');

  if (n > totalSlides) currentSlide = 1;
  if (n < 1) currentSlide = totalSlides;

  slides.forEach(function(slide, i) {
    const isActive = (i === currentSlide - 1);
    // slides are stacked in one grid cell; styles.css crossfades between them
    slide.classList.toggle('active', isActive);
    slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
  });

  dots.forEach(function(dot, i) {
    dot.textContent = (i === currentSlide - 1) ? '●' : '○';
  });

  if (titleElement) {
    titleElement.textContent = slideTitles[currentSlide - 1];
  }
}

function nextSlide(e) {
  if (e) { e.preventDefault(); if (e.currentTarget && e.currentTarget.blur) e.currentTarget.blur(); }
  currentSlide++;
  showSlide(currentSlide);
}

function prevSlide(e) {
  if (e) { e.preventDefault(); if (e.currentTarget && e.currentTarget.blur) e.currentTarget.blur(); }
  currentSlide--;
  showSlide(currentSlide);
}

document.addEventListener('DOMContentLoaded', function() {
  const leftArrows = document.querySelectorAll('.nav-arrow.left');
  const rightArrows = document.querySelectorAll('.nav-arrow.right');
  
  leftArrows.forEach(arrow => arrow.addEventListener('click', prevSlide));
  rightArrows.forEach(arrow => arrow.addEventListener('click', nextSlide));

  // Touch swipe support for mobile
  const carousel = document.querySelector('.menu-carousel');
  if (carousel) {
    let touchStartX = 0;
    let touchStartY = 0;
    const SWIPE_THRESHOLD = 45; // px of horizontal movement to count as a swipe

    carousel.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    carousel.addEventListener('touchend', function(e) {
      const dx = e.changedTouches[0].screenX - touchStartX;
      const dy = e.changedTouches[0].screenY - touchStartY;
      // only treat as a swipe if horizontal movement dominates (so vertical scrolling still works)
      if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) { nextSlide(); } else { prevSlide(); }
      }
    }, { passive: true });
  }

  showSlide(currentSlide);
});

// Load every carousel photo up front so the next slide's image is ready
// before it fades in (lazy-loaded hidden slides showed a blank frame)
window.addEventListener('load', function() {
  document.querySelectorAll('.carousel-slide img').forEach(function(img) {
    img.loading = 'eager';
  });
});
