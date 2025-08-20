// Shared minimal behavior for About and Contact pages
// Keep content always visible; only include small UX helpers if needed
document.addEventListener('DOMContentLoaded', function() {
  // Ensure nav logo click still routes to home if main.js isn't loaded for some reason
  const navLogo = document.querySelector('.nav-logo a');
  if (navLogo) {
    navLogo.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
        window.location.href = 'index.html';
      }
    });
  }
});


