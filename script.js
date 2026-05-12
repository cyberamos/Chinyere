/* =============================================
   PRECIOUS OGBONNA — PORTFOLIO SCRIPTS
   ============================================= */

// ── Nav scroll effect ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile menu toggle ──
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Scroll-in animations ──
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children if they are .fade-up
        entry.target.style.transitionDelay = `${i * 0.05}s`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(
  '.skill-card, .portfolio__card, .cert-item, .timeline__card, .about__card, .stat'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// ── Active nav link highlight ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));

// ── Smooth platform tag hover pulse ──
document.querySelectorAll('.about__platforms span').forEach(tag => {
  tag.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.05)';
  });
  tag.addEventListener('mouseleave', function () {
    this.style.transform = '';
  });
});

// ── Portfolio tabs ──
document.querySelectorAll('.ptab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.ptab-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    // Re-trigger Instagram embeds if switching to content tab
    if (window.instgrm) window.instgrm.Embeds.process();
  });
});


const footerCopy = document.querySelector('.footer__copy');
if (footerCopy) {
  footerCopy.innerHTML = footerCopy.innerHTML.replace('2025', new Date().getFullYear());
}