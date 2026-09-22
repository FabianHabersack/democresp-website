document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
if (menuButton && navigation) {
  menuButton.hidden = false;
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });
  matchMedia('(min-width: 721px)').addEventListener('change', closeMenu);
}

document.querySelectorAll('[data-year]').forEach(element => {
  element.textContent = String(new Date().getFullYear());
});

if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('nav a[href^="#"]')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const homeSection = document.querySelector('#top');
  if (homeSection) sections.push(homeSection);
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      links.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -65% 0px' });
  sections.forEach(section => observer.observe(section));
}

// Keep the native cursor and supplement it only for desktop mouse/trackpad use.
const cursorPreference = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
let removeCursorHalo = () => {};

const syncCursorHalo = () => {
  removeCursorHalo();
  removeCursorHalo = () => {};
  if (!cursorPreference.matches) return;

  const halo = document.createElement('div');
  halo.className = 'cursor-halo';
  halo.setAttribute('aria-hidden', 'true');
  document.body.append(halo);

  let frame = 0;
  let x = 0;
  let y = 0;
  let overLink = false;
  let overDark = false;

  const hide = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    halo.classList.remove('is-visible');
  };

  const move = event => {
    if (event.pointerType !== 'mouse') { hide(); return; }
    x = event.clientX;
    y = event.clientY;
    const target = event.target;
    overLink = Boolean(target.closest('a, button, summary, input, select, textarea, [role="button"]'));
    overDark = Boolean(target.closest('.framework, .contact-section')) && !target.closest('.dimension');
    if (frame) return;
    frame = requestAnimationFrame(() => {
      halo.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      halo.classList.toggle('is-link', overLink);
      halo.classList.toggle('on-dark', overDark);
      halo.classList.add('is-visible');
      frame = 0;
    });
  };

  document.addEventListener('pointermove', move, { passive: true });
  document.documentElement.addEventListener('pointerleave', hide);
  document.addEventListener('keydown', hide);
  document.addEventListener('scroll', hide, { passive: true, capture: true });
  window.addEventListener('blur', hide);

  removeCursorHalo = () => {
    hide();
    halo.remove();
    document.removeEventListener('pointermove', move);
    document.documentElement.removeEventListener('pointerleave', hide);
    document.removeEventListener('keydown', hide);
    document.removeEventListener('scroll', hide, true);
    window.removeEventListener('blur', hide);
  };
};

cursorPreference.addEventListener('change', syncCursorHalo);
syncCursorHalo();

// Count up once when the project facts enter view; keep the final values in HTML.
(() => {
  const facts = document.querySelector('.project-facts');
  const counters = [...document.querySelectorAll('[data-count-to]')].map(element => ({
    element,
    target: Number(element.dataset.countTo),
    decimals: Number(element.dataset.countDecimals || 0),
    finalText: element.textContent
  }));
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if (!facts || !counters.length || reducedMotion.matches || !('IntersectionObserver' in window)) return;

  let frame = 0;
  let started = false;
  const finish = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    started = true;
    counters.forEach(({ element, finalText }) => { element.textContent = finalText; });
    observer.disconnect();
    reducedMotion.removeEventListener('change', onMotionChange);
    window.removeEventListener('beforeprint', finish);
  };
  const onMotionChange = () => { if (reducedMotion.matches) finish(); };
  const observer = new IntersectionObserver(entries => {
    if (started || !entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.4)) return;
    started = true;
    observer.disconnect();
    const start = performance.now();
    const animate = now => {
      if (reducedMotion.matches) { finish(); return; }
      const progress = Math.min((now - start) / 1300, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counters.forEach(({ element, target, decimals }) => {
        element.textContent = (target * eased).toFixed(decimals);
      });
      if (progress < 1) frame = requestAnimationFrame(animate);
      else finish();
    };
    frame = requestAnimationFrame(animate);
  }, { threshold: 0.4 });

  reducedMotion.addEventListener('change', onMotionChange);
  window.addEventListener('beforeprint', finish, { once: true });
  observer.observe(facts);
})();
