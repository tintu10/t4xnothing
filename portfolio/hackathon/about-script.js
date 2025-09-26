// Scroll-triggered animation for fade-in sections
function revealOnScroll() {
  const fadeEls = document.querySelectorAll('.fade');
  const windowHeight = window.innerHeight;
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= windowHeight - 60) {
      el.classList.add('visible');
    }
  });
}

// Run on seed
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Optional: rerun if layout changes
window.addEventListener('resize', revealOnScroll);
