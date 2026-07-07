// =========================================================
// Footer year
// =========================================================
document.getElementById('year').textContent = new Date().getFullYear();

// =========================================================
// Mobile nav toggle
// =========================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// =========================================================
// Scroll-triggered reveal animations
// =========================================================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// =========================================================
// Typewriter effect for hero role text
// =========================================================
const roles = [
  'Data Analyst',
  'Software Development Engineer',
  'Full-Stack Developer'
];

const typewriterEl = document.getElementById('typewriter');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const current = roles[roleIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typewriterEl.textContent = current.substring(0, charIndex);

  let delay = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length) {
    delay = 1400; // pause at full word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 300;
  }

  setTimeout(typeLoop, delay);
}

typeLoop();

// =========================================================
// Nav background on scroll (subtle shadow once scrolled)
// =========================================================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 8px 24px rgba(0,0,0,0.25)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// =========================================================
// Contact form (front-end only — replace action with your
// own backend / Formspree / EmailJS endpoint when ready)
// =========================================================
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // TODO: connect this to a real form backend (e.g. Formspree,
  // EmailJS, or your own API) to actually send messages.
  formNote.textContent = 'Thanks! This form is a front-end demo — connect it to your email service to go live.';
  contactForm.reset();
});
