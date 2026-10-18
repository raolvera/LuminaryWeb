let currentSlide = 1;
const totalSlides = 5;
const slideTitles = ['Appetizers', 'Desserts', 'Signature Plates', 'Beverages', 'Cocktails'];

// Auto-advance on every screen size (mobile, tablet, laptop, desktop)
const AUTOPLAY_DELAY = 5000;
// Longest we hold the current slide while waiting for the next photo
const IMAGE_WAIT_LIMIT = 2500;

let slideRequest = 0;
let autoplayTimer = null;

function slideImage(index) {
  const slides = document.querySelectorAll('.carousel-slide');
  return slides[index] ? slides[index].querySelector('.image-display img') : null;
}

// Resolves once the image is downloaded and decoded, so it can be painted
// immediately instead of revealing the empty placeholder box behind it
function whenImageReady(img) {
  if (!img) return Promise.resolve();
  img.loading = 'eager';
  const ready = (img.complete && img.naturalWidth > 0)
    ? (img.decode ? img.decode().catch(function() {}) : Promise.resolve())
    : new Promise(function(resolve) {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      }).then(function() {
        return img.decode ? img.decode().catch(function() {}) : undefined;
      });
  const limit = new Promise(function(resolve) { setTimeout(resolve, IMAGE_WAIT_LIMIT); });
  return Promise.race([ready, limit]);
}

function applySlide() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dots span');
  const titleElement = document.querySelector('.carousel-header h3');

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

function showSlide(n) {
  if (n > totalSlides) currentSlide = 1;
  if (n < 1) currentSlide = totalSlides;

  // keep the current slide on screen until the incoming photo is ready;
  // if the user taps again meanwhile, only the latest request wins
  const request = ++slideRequest;
  whenImageReady(slideImage(currentSlide - 1)).then(function() {
    if (request === slideRequest) applySlide();
  });
}

function nextSlide(e) {
  if (e) { e.preventDefault(); if (e.currentTarget && e.currentTarget.blur) e.currentTarget.blur(); }
  currentSlide++;
  showSlide(currentSlide);
  restartAutoplay();
}

function prevSlide(e) {
  if (e) { e.preventDefault(); if (e.currentTarget && e.currentTarget.blur) e.currentTarget.blur(); }
  currentSlide--;
  showSlide(currentSlide);
  restartAutoplay();
}

function stopAutoplay() {
  if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
}

function startAutoplay() {
  stopAutoplay();
  if (!document.querySelector('.menu-carousel')) return;
  if (document.hidden) return;
  autoplayTimer = setInterval(function() {
    currentSlide++;
    showSlide(currentSlide);
  }, AUTOPLAY_DELAY);
}

// after a manual swipe/tap, give the reader a full interval before moving on
function restartAutoplay() {
  if (autoplayTimer) startAutoplay();
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

    document.addEventListener('visibilitychange', function() {
      if (document.hidden) { stopAutoplay(); } else { startAutoplay(); }
    });
  }

  applySlide();
  startAutoplay();
});

// Load every carousel photo up front so the next slide's image is ready
// before it fades in (lazy-loaded hidden slides showed a blank frame)
window.addEventListener('load', function() {
  document.querySelectorAll('.carousel-slide img').forEach(function(img) {
    img.loading = 'eager';
    if (img.decode) img.decode().catch(function() {});
  });
});
