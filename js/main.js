// 3D tilt effect on hero visual
const hero3d = document.getElementById('hero3d');
if (hero3d) {
  const card = hero3d.querySelector('.hero-3d-card');
  const shine = hero3d.querySelector('.hero-3d-shine');

  hero3d.addEventListener('mousemove', (e) => {
    const rect = hero3d.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (0.5 - y) * 20;
    const rotateY = (x - 0.5) * 20;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Move shine based on mouse position
    shine.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.12) 0%, transparent 50%)`;
  });

  hero3d.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    shine.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.03) 100%)';
  });
}

// Stat counter animation on scroll
const statNumbers = document.querySelectorAll('.stat-number[data-target]');
let statAnimated = false;

function animateStats() {
  if (statAnimated) return;
  const first = statNumbers[0];
  if (!first) return;
  const rect = first.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.85) {
    statAnimated = true;
    statNumbers.forEach((el) => {
      const target = parseFloat(el.getAttribute('data-target'));
      const isFloat = target % 1 !== 0;
      const duration = 1500;
      const start = performance.now();

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = target * ease;
        el.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    });
  }
}

window.addEventListener('scroll', animateStats, { passive: true });
animateStats();

// Testimonials carousel
const testiTrack = document.getElementById('testimonialsTrack');
const testiDots = document.querySelectorAll('.testi-dot');

if (testiTrack && testiDots.length > 0) {
  testiDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const slide = parseInt(dot.getAttribute('data-slide'), 10);
      testiTrack.style.transform = `translateX(-${slide * 100}%)`;
      testiDots.forEach((d) => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });

  // Auto-advance every 5s
  let currentSlide = 0;
  setInterval(() => {
    currentSlide = (currentSlide + 1) % testiDots.length;
    testiTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    testiDots.forEach((d) => d.classList.remove('active'));
    testiDots[currentSlide].classList.add('active');
  }, 5000);
}

// Blog carousel
const blogTrack = document.getElementById('blogTrack');
const blogDots = document.querySelectorAll('.blog-dot');

if (blogTrack && blogDots.length > 0) {
  blogDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const slide = parseInt(dot.getAttribute('data-blog'), 10);
      const cardWidth = blogTrack.querySelector('.blog-card').offsetWidth + 20;
      blogTrack.style.transform = `translateX(-${slide * cardWidth}px)`;
      blogDots.forEach((d) => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });
}

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}
