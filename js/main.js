// Active nav link based on current page
(function() {
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(function(link) {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (path === '/' || path === '/index.html') {
      if (href === '/' || href === '/index.html') link.classList.add('active');
    } else if (href === path) {
      link.classList.add('active');
    }
  });
})();

// Hero orb interactive parallax
const heroOrb = document.querySelector('.hero-orb');
if (heroOrb) {
  heroOrb.addEventListener('mousemove', (e) => {
    const rect = heroOrb.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const core = heroOrb.querySelector('.orb-core');
    if (core) {
      core.style.transform = `translate(${x * 12}px, ${y * 12}px)`;
    }
  });
  heroOrb.addEventListener('mouseleave', () => {
    const core = heroOrb.querySelector('.orb-core');
    if (core) core.style.transform = 'translate(0, 0)';
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

// Portfolio work filter
const workFilters = document.querySelectorAll('.work-filter');
const workCards = document.querySelectorAll('.work-card');

if (workFilters.length > 0 && workCards.length > 0) {
  workFilters.forEach(function(btn) {
    btn.addEventListener('click', function() {
      workFilters.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      workCards.forEach(function(card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// Scroll reveal animation for sections
(function() {
  const sections = document.querySelectorAll('.section, .page-hero');
  if (!sections.length) return;

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(function(section) {
    section.classList.add('reveal-on-scroll');
    observer.observe(section);
  });
})();
