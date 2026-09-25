// Smooth navbar shadow on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 4px 32px rgba(0,0,0,0.5)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});
