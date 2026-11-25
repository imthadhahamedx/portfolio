
// NAV SCROLL 
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


// MOBILE MENU 
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  burger.classList.toggle('active', open);
  burger.setAttribute('aria-expanded', open);
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', false);
  });
});


// TERMINAL TYPING EFFECT
const lines = [
  { selector: '.terminal__output:nth-of-type(2)',  text: 'Imthadh Ahamed', color: '#00D4FF', delay: 600  },
  { selector: '.terminal__output:nth-of-type(4)',  text: 'Full-Stack Software Engineer', color: '#00FF88', delay: 1200 },
];

lines.forEach(({ selector, text, color, delay }) => {
  const el = document.querySelector(selector);
  if (!el) return;

  el.textContent = '';
  el.style.color = color;

  setTimeout(() => {
    let i = 0;
    const type = () => {
      if (i < text.length) {
        el.textContent += text[i++];
        setTimeout(type, 38);
      }
    };
    type();
  }, delay);
});


// COUNTER ANIMATION
function animateCount(el, target, duration = 1500) {
  const start = performance.now();

  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(ease * target);
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

// Trigger counters when hero is in view
const statNums = document.querySelectorAll('.stat__num');
let counted = false;

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counted) {
      counted = true;
      statNums.forEach(el => {
        animateCount(el, +el.dataset.target);
      });
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero__stats');
if (heroStats) countObserver.observe(heroStats);


// SCROLL REVEAL
const revealEls = document.querySelectorAll(
  '.skill-card, .project-card, .about__copy, .about__visual, .contact__inner'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, +delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));


// SMOOTH ACTIVE NAV LINK
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}`
          ? '#E8EDF5'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));


// CURSOR BLINK
// Handled via CSS animation on .t-cursor


// PARALLAX GLOW ON MOUSE MOVE
const hero  = document.querySelector('.hero');
const glow1 = document.querySelector('.hero__glow--1');
const glow2 = document.querySelector('.hero__glow--2');

if (hero && glow1 && glow2) {
  hero.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;

    glow1.style.transform = `translate(${dx * 30}px, ${dy * 20}px)`;
    glow2.style.transform = `translate(${-dx * 20}px, ${-dy * 20}px)`;
  });
}


// SKILL CARD TILT ON HOVER
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / (rect.width  / 2);
    const dy   = (e.clientY - cy) / (rect.height / 2);

    card.style.transform = `translateY(-5px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


// COPY EMAIL ON CLICK
//const emailLink = document.querySelector('.contact__email');

/*if (emailLink) {
  emailLink.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = emailLink.textContent.trim();

    try {
      await navigator.clipboard.writeText(email);
      const orig = emailLink.textContent;
      emailLink.textContent = '✓ Copied to clipboard!';
      emailLink.style.color = '#00FF88';
      setTimeout(() => {
        emailLink.textContent = orig;
        emailLink.style.color = '';
      }, 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });
}*/


// PAGE LOAD SEQUENCE
document.documentElement.style.scrollBehavior = 'smooth';