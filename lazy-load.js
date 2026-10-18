// Lazy Loading Images for Performance
document.addEventListener('DOMContentLoaded', function() {
  var images = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window) {
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px'
    });

    images.forEach(function(img) { imageObserver.observe(img); });
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(function(img) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
});
