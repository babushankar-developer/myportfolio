/* =============================================
   BABUSHANKAR PORTFOLIO — script.js
   ============================================= */

// ── Custom Cursor ──────────────────────────────
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
});

function animateRing() {
  ringX += (mouseX - ringX - 16) * 0.15;
  ringY += (mouseY - ringY - 16) * 0.15;
  cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();

// Scale cursor on hover of interactive elements
document.querySelectorAll('a, button, .skill-tag, .project-card, .skill-card, .contact-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform += ' scale(1.8)';
    cursorRing.style.transform += ' scale(1.5)';
    cursorRing.style.borderColor = 'rgba(0,255,136,0.7)';
  });
  el.addEventListener('mouseleave', () => {
    cursorRing.style.borderColor = 'rgba(0,245,255,0.5)';
  });
});

// ── Hamburger Menu ─────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ── Scroll Reveal ──────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .timeline-item, .project-card').forEach(el => {
  revealObserver.observe(el);
});

// Stagger project cards
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

document.querySelectorAll('.skill-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.06}s`;
  card.classList.add('reveal');
  revealObserver.observe(card);
});

// ── Animated Counter ───────────────────────────
function animateCounter(el, target, duration = 1500) {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ── Active Nav Link on Scroll ──────────────────
const sections = document.querySelectorAll('section[id], div[id="contact"]');
const navAnchors = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${id}`) {
          a.classList.add('active');
          a.style.color = 'var(--accent-cyan)';
        } else {
          a.style.color = '';
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => navObserver.observe(s));

// ── Navbar background on scroll ───────────────
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 60) {
    navbar.style.background = 'rgba(2, 8, 18, 0.97)';
  } else {
    navbar.style.background = 'rgba(2, 8, 18, 0.85)';
  }
});

// ── SVG Circuit Lines in Hero Card ────────────
const svgNS = "http://www.w3.org/2000/svg";
const circuitLinesDiv = document.querySelector('.circuit-lines');

if (circuitLinesDiv) {
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.style.position = 'absolute';
  svg.style.inset = '0';

  const lines = [
    { x1: 0, y1: 60, x2: 80, y2: 60 },
    { x1: 80, y1: 60, x2: 80, y2: 100 },
    { x1: 0, y1: 180, x2: 60, y2: 180 },
    { x1: 60, y1: 180, x2: 60, y2: 320 },
    { x1: 320, y1: 40, x2: 260, y2: 40 },
    { x1: 260, y1: 40, x2: 260, y2: 120 },
    { x1: 320, y1: 220, x2: 240, y2: 220 },
    { x1: 240, y1: 220, x2: 240, y2: 380 },
    { x1: 120, y1: 380, x2: 120, y2: 300 },
    { x1: 120, y1: 300, x2: 200, y2: 300 },
  ];

  lines.forEach(l => {
    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', l.x1); line.setAttribute('y1', l.y1);
    line.setAttribute('x2', l.x2); line.setAttribute('y2', l.y2);
    line.setAttribute('stroke', '#00f5ff');
    line.setAttribute('stroke-width', '1');
    svg.appendChild(line);

    // Small dot at end
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', l.x2); circle.setAttribute('cy', l.y2);
    circle.setAttribute('r', '3');
    circle.setAttribute('fill', '#00f5ff');
    svg.appendChild(circle);
  });

  circuitLinesDiv.appendChild(svg);
}

// ── Skill tags hover ripple ────────────────────
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    tag.style.transform = 'scale(1.15)';
    setTimeout(() => tag.style.transform = '', 200);
  });
});

// ── Typing effect in hero tag ──────────────────
const heroTag = document.querySelector('.hero-tag');
if (heroTag) {
  const text = 'EMBEDDED SOFTWARE ENGINEER';
  heroTag.textContent = '';
  heroTag.style.visibility = 'visible';

  // Add the decorative ::before via a span instead
  const decorLine = document.createElement('span');
  decorLine.style.cssText = 'display:inline-block;width:32px;height:1px;background:var(--accent-green);margin-right:12px;vertical-align:middle;';
  heroTag.appendChild(decorLine);

  let i = 0;
  const typeInterval = setInterval(() => {
    heroTag.textContent = '';
    heroTag.appendChild(decorLine);
    heroTag.appendChild(document.createTextNode(text.slice(0, i + 1)));
    i++;
    if (i >= text.length) clearInterval(typeInterval);
  }, 60);
}

// ── Smooth scroll polyfill for older browsers ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

console.log('%cBabushankar Mathiyazagan — Embedded Software Engineer', 'color:#00f5ff;font-family:monospace;font-size:14px;font-weight:bold;');
console.log('%cPortfolio built with vanilla HTML, CSS & JS', 'color:#00ff88;font-family:monospace;font-size:11px;');
