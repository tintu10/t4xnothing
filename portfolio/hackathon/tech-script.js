function revealOnScroll() {
  const fadeEls = document.querySelectorAll('.fade');
  const windowHeight = window.innerHeight;
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= windowHeight - 48) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
window.addEventListener('resize', revealOnScroll);
