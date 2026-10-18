let currentSlide = 1;
const totalSlides = 5;
const slideTitles = ['Appetizers', 'Desserts', 'Signature Plates', 'Beverages', 'Cocktails'];
let autoPlayInterval = null;
const AUTO_PLAY_DELAY = 4000;

function showSlide(n) {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dots span');
  const titleElement = document.querySelector('.carousel-header h3');

  if (n > totalSlides) currentSlide = 1;
  if (n < 1) currentSlide = totalSlides;

  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => {
    dot.textContent = '○';
    dot.classList.remove('active');
  });

  slides[currentSlide - 1].classList.add('active');
  dots[currentSlide - 1].textContent = '●';
  dots[currentSlide - 1].classList.add('active');

  if (titleElement) {
    titleElement.textContent = slideTitles[currentSlide - 1];
  }
}

function nextSlide() {
  currentSlide++;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide--;
  showSlide(currentSlide);
}

function startAutoPlay() {
  stopAutoPlay();
  autoPlayInterval = setInterval(nextSlide, AUTO_PLAY_DELAY);
}

function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const leftArrows = document.querySelectorAll('.nav-arrow.left');
  const rightArrows = document.querySelectorAll('.nav-arrow.right');
  const allArrows = document.querySelectorAll('.nav-arrow');

  leftArrows.forEach(arrow => arrow.addEventListener('click', function() {
    prevSlide();
    startAutoPlay();
  }));
  rightArrows.forEach(arrow => arrow.addEventListener('click', function() {
    nextSlide();
    startAutoPlay();
  }));

  // Pause auto-play when hovering over navigation arrows
  allArrows.forEach(arrow => {
    arrow.addEventListener('mouseenter', stopAutoPlay);
    arrow.addEventListener('mouseleave', startAutoPlay);
  });

  showSlide(currentSlide);
  startAutoPlay();
});
