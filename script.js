/* =========================================================
   Muhammad Jahanzaib Khan | Portfolio
   script.js: behaviour plus the data you are most likely to edit
   ========================================================= */
(function () {
  'use strict';

  // Lets the stylesheet know JavaScript is running (used by the scroll-reveal styles).
  document.documentElement.classList.add('js');

  /* ---------------------------------------------------------
     1. EDIT HERE: personal details and contact links
     --------------------------------------------------------- */
  const SITE = {
    whatsappLocalNumber: '03412133685', // as written in Pakistan
    countryCode: '92',                  // Pakistan: the leading 0 is dropped and 92 is added
    whatsappMessage: 'Hi Jahanzaib! I visited your portfolio and would like to connect with you.',
    email: 'thejahanzaibk@gmail.com',
    github: 'https://github.com/mjk-fintech/Portfolio',
    typingWords: ['FinTech Student', 'Technology Enthusiast', 'Aspiring Innovator', 'Lifelong Learner']
  };

  /* ---------------------------------------------------------
     2. EDIT HERE: certificate files
        Upload the two PDFs into the "certificates" folder of your repository.
        If you rename a PDF, change its name below (and nowhere else).
     --------------------------------------------------------- */
  const CERT_FOLDER = 'certificates';

  const CERT_FILES = {
    datacamp: 'Certificates 26K-5692 Data Camp.pdf',
    marketing: '182410310621505.pdf'
  };

  /* ---------------------------------------------------------
     3. EDIT HERE: certificate cards
        file: key from CERT_FILES   page: PDF page number (leave out for a one-page PDF)
        accent: 'cyan' or 'violet'  rows: [label, value] pairs shown on the card
     --------------------------------------------------------- */
  const CERTIFICATES = [
    {
      title: 'Introduction to Microsoft Copilot',
      provider: 'DataCamp',
      kind: 'Statement of Accomplishment',
      accent: 'cyan',
      file: 'datacamp',
      page: 1,
      rows: [['Completed', 'August 26, 2026'], ['Duration', '1 hour'], ['Certificate no.', '49,458,008']]
    },
    {
      title: 'Introduction to Excel',
      provider: 'DataCamp',
      kind: 'Statement of Accomplishment',
      accent: 'cyan',
      file: 'datacamp',
      page: 2,
      rows: [['Completed', 'August 28, 2026'], ['Duration', '4 hours'], ['Certificate no.', '49,532,609']]
    },
    {
      title: 'Introduction to Power BI',
      provider: 'DataCamp',
      kind: 'Statement of Accomplishment',
      accent: 'cyan',
      file: 'datacamp',
      page: 3,
      rows: [['Completed', 'August 29, 2026'], ['Duration', '4 hours'], ['Certificate no.', '49,527,052']]
    },
    {
      title: 'Introduction to Python',
      provider: 'DataCamp',
      kind: 'Statement of Accomplishment',
      accent: 'cyan',
      file: 'datacamp',
      page: 4,
      rows: [['Completed', 'August 26, 2026'], ['Duration', '4 hours'], ['Certificate no.', '49,443,336']]
    },
    {
      title: 'Introduction to SQL',
      provider: 'DataCamp',
      kind: 'Statement of Accomplishment',
      accent: 'cyan',
      file: 'datacamp',
      page: 5,
      rows: [['Completed', 'August 26, 2026'], ['Duration', '2 hours'], ['Certificate no.', '49,497,759']]
    },
    {
      title: 'Certificate in Digital Marketing',
      provider: 'Skill Development Council Karachi',
      kind: 'Conducted by Infotics Institute of Technology',
      accent: 'violet',
      file: 'marketing',
      rows: [
        ['Issued', 'January 4, 2024'],
        ['Duration', '36 hours'],
        ['Training period', 'September 1 to December 30, 2023']
      ]
    }
  ];

  /* ---------------------------------------------------------
     4. EDIT HERE: project cards
        github / demo: add a real URL to show that button. Leave '' to hide it.
        art: which CSS illustration to show ('toys', 'jarvis', 'chat' or 'soon')
     --------------------------------------------------------- */
  const PROJECTS = [
    {
      title: 'MJK TOY MART',
      categories: ['Entrepreneurship', 'Brand Development'],
      description: 'My own brand and a hands-on way to explore entrepreneurship. I use it to practise branding, product presentation, customer engagement and business development.',
      tech: ['Branding', 'Product Presentation', 'Customer Engagement', 'Business Development'],
      status: 'Business initiative',
      art: 'toys',
      github: '',
      demo: ''
    },
    {
      title: 'AI JARVIS Assistant',
      categories: ['Python', 'Artificial Intelligence'],
      description: 'A learning project exploring the idea of a personal AI assistant in the style of JARVIS, built with Python.',
      tech: ['Python', 'AI'],
      status: 'Learning project',
      art: 'jarvis',
      github: '',
      demo: ''
    },
    {
      title: 'AI Chatbot',
      categories: ['Python', 'Conversational AI'],
      description: 'A Python project exploring conversational interactions and how chatbots are built.',
      tech: ['Python', 'Conversational AI'],
      status: 'Learning project',
      art: 'chat',
      github: '',
      demo: ''
    },
    {
      title: 'More Projects Coming Soon',
      categories: ['Always learning'],
      description: "I'm continuously learning and will add more projects here as my skills grow.",
      tech: ['Finance', 'Technology', 'AI'],
      status: 'Coming soon',
      art: 'soon',
      soon: true,
      github: '',
      demo: ''
    }
  ];

  /* ---------------------------------------------------------
     Helpers
     --------------------------------------------------------- */
  const $ = (selector, root) => (root || document).querySelector(selector);
  const $$ = (selector, root) => Array.from((root || document).querySelectorAll(selector));

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduceMotion = () => motionQuery.matches;

  const esc = (value) =>
    String(value === undefined || value === null ? '' : value).replace(/[&<>"']/g, (ch) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[ch]));

  const isHttpUrl = (value) => typeof value === 'string' && /^https?:\/\/\S+$/i.test(value.trim());

  /** 03412133685 -> 923412133685 */
  function internationalNumber() {
    const digits = SITE.whatsappLocalNumber.replace(/\D/g, '');
    return SITE.countryCode + digits.replace(/^0+/, '');
  }

  /** https://wa.me/923412133685?text=<encoded message> */
  function whatsappUrl() {
    return 'https://wa.me/' + internationalNumber() + '?text=' + encodeURIComponent(SITE.whatsappMessage);
  }

  /** certificates/Certificates%2026K-5692%20Data%20Camp.pdf#page=1 */
  function certificateUrl(fileKey, page) {
    const fileName = CERT_FILES[fileKey];
    return CERT_FOLDER + '/' + encodeURIComponent(fileName) + (page ? '#page=' + page : '');
  }

  /* ---------------------------------------------------------
     Contact links (WhatsApp, email, GitHub)
     --------------------------------------------------------- */
  function setupLinks() {
    const wa = whatsappUrl();
    $$('[data-link="whatsapp"]').forEach((a) => {
      a.href = wa;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    });
    $$('[data-link="email"]').forEach((a) => {
      a.href = 'mailto:' + SITE.email;
    });
    $$('[data-link="github"]').forEach((a) => {
      a.href = SITE.github;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    });
  }

  /* ---------------------------------------------------------
     Certificates
     --------------------------------------------------------- */
  function renderCertificates() {
    const grid = $('#certificate-grid');
    if (!grid) return;

    grid.innerHTML = CERTIFICATES.map((cert, index) => {
      const url = certificateUrl(cert.file, cert.page);
      const rows = cert.rows.map((row) => '<dt>' + esc(row[0]) + '</dt><dd>' + esc(row[1]) + '</dd>').join('');
      const label = 'View Certificate: ' + cert.title + ' (opens in a new tab)';

      return (
        '<article class="panel cert tilt reveal" data-accent="' + esc(cert.accent) + '" style="--d:' + index * 70 + 'ms">' +
          '<div class="cert-top">' +
            '<span class="cert-icon" aria-hidden="true"><svg class="icon icon--stroke" focusable="false"><use href="#icon-seal"></use></svg></span>' +
            '<span class="tag">' + esc(cert.provider) + '</span>' +
          '</div>' +
          '<div>' +
            '<h3 class="cert-title">' + esc(cert.title) + '</h3>' +
            (cert.kind ? '<p class="cert-kind">' + esc(cert.kind) + '</p>' : '') +
          '</div>' +
          '<dl class="cert-meta">' + rows + '</dl>' +
          '<a class="btn btn-cert" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(label) + '">' +
            '<span>View Certificate</span>' +
            '<svg class="icon icon--stroke" aria-hidden="true" focusable="false"><use href="#icon-external"></use></svg>' +
          '</a>' +
        '</article>'
      );
    }).join('');
  }

  /* ---------------------------------------------------------
     Projects
     --------------------------------------------------------- */
  function artMarkup(type) {
    switch (type) {
      case 'toys':
        return '<div class="art art-toys"><span class="blk blk-m">M</span><span class="blk blk-j">J</span><span class="blk blk-k">K</span><span class="toy-ball"></span></div>';
      case 'jarvis':
        return '<div class="art art-jarvis"><div class="reactor"><i></i><i></i><i></i><b></b></div><div class="wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>';
      case 'chat':
        return '<div class="art art-chat"><div class="bub bub-in"><i></i><i></i></div><div class="bub bub-out"><i></i></div><div class="bub bub-typing"><i></i><i></i><i></i></div></div>';
      default:
        return '<div class="art art-soon"><div class="soon-box"></div><div class="soon-bars"><i></i><i></i><i></i></div></div>';
    }
  }

  function renderProjects() {
    const grid = $('#project-grid');
    if (!grid) return;

    grid.innerHTML = PROJECTS.map((project, index) => {
      const cats = project.categories.map((c) => '<li class="tag tag-cat">' + esc(c) + '</li>').join('');
      const tech = project.tech.map((t) => '<li class="tag">' + esc(t) + '</li>').join('');

      const links = [];
      if (isHttpUrl(project.github)) {
        links.push(
          '<a class="btn btn-ghost btn-sm" href="' + esc(project.github.trim()) + '" target="_blank" rel="noopener noreferrer" aria-label="GitHub repository for ' + esc(project.title) + ' (opens in a new tab)">' +
            '<svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-github"></use></svg><span>GitHub</span></a>'
        );
      }
      if (isHttpUrl(project.demo)) {
        links.push(
          '<a class="btn btn-primary btn-sm" href="' + esc(project.demo.trim()) + '" target="_blank" rel="noopener noreferrer" aria-label="Live demo of ' + esc(project.title) + ' (opens in a new tab)">' +
            '<span>Live Demo</span><svg class="icon icon--stroke" aria-hidden="true" focusable="false"><use href="#icon-external"></use></svg></a>'
        );
      }

      return (
        '<article class="panel project tilt reveal' + (project.soon ? ' project--soon' : '') + '" style="--d:' + (index % 2) * 90 + 'ms">' +
          '<div class="project-art" aria-hidden="true">' + artMarkup(project.art) + '</div>' +
          '<div class="project-body">' +
            '<ul class="project-cats" aria-label="Categories">' + cats + '</ul>' +
            '<h3 class="project-title">' + esc(project.title) + '</h3>' +
            '<p class="project-desc">' + esc(project.description) + '</p>' +
            '<ul class="project-tech" aria-label="Technologies and focus areas">' + tech + '</ul>' +
            '<div class="project-foot">' +
              '<span class="project-status">' + esc(project.status) + '</span>' +
              (links.length ? '<div class="project-links">' + links.join('') + '</div>' : '') +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  /* ---------------------------------------------------------
     Navigation (mobile menu)
     --------------------------------------------------------- */
  function setupNav() {
    const header = $('.site-header');
    const toggle = $('.nav-toggle');
    const menu = $('#primary-nav');
    if (!header || !toggle || !menu) return;

    const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.classList.toggle('is-open', open);
    }

    toggle.addEventListener('click', () => setOpen(!isOpen()));

    // Close after choosing a link
    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });

    // Escape closes the menu and returns focus to the button
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Clicking outside the header closes it
    document.addEventListener('click', (event) => {
      if (isOpen() && !header.contains(event.target)) setOpen(false);
    });

    // Reset when the layout switches back to desktop
    const desktopQuery = window.matchMedia('(min-width: 901px)');
    const onChange = () => setOpen(false);
    if (desktopQuery.addEventListener) desktopQuery.addEventListener('change', onChange);
    else if (desktopQuery.addListener) desktopQuery.addListener(onChange);
  }

  /* ---------------------------------------------------------
     Active section highlighting
     --------------------------------------------------------- */
  function setupScrollSpy() {
    const links = $$('.nav-links a[data-nav]');
    const ids = ['home', 'about', 'education', 'skills', 'certifications', 'projects', 'journey', 'contact'];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const alias = { journey: 'projects' }; // the Journey section has no nav link of its own
    const header = $('.site-header');
    if (!links.length || !sections.length) return;

    let ticking = false;

    function update() {
      ticking = false;
      const offset = (header ? header.offsetHeight : 68) + Math.round(window.innerHeight * 0.25);
      const line = window.scrollY + offset;
      let current = sections[0].id;

      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (top <= line) current = section.id;
      });

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = 'contact';

      const key = alias[current] || current;
      links.forEach((link) => {
        const active = link.dataset.nav === key;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  /* ---------------------------------------------------------
     Typing animation in the hero
     --------------------------------------------------------- */
  function setupTyping() {
    const target = $('#typed');
    const words = SITE.typingWords;
    if (!target || !words.length) return;

    // Reduced motion: keep the first phrase still (all phrases are in the screen-reader text).
    if (reduceMotion()) {
      target.textContent = words[0];
      return;
    }

    let wordIndex = 0;
    let charIndex = words[0].length;
    let deleting = true; // starts by erasing the phrase already in the HTML

    function tick() {
      const word = words[wordIndex];
      let delay;

      if (deleting) {
        charIndex -= 1;
        delay = 40;
        if (charIndex <= 0) {
          charIndex = 0;
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          delay = 350;
        }
      } else {
        charIndex += 1;
        delay = 85;
        if (charIndex >= word.length) {
          charIndex = word.length;
          deleting = true;
          delay = 1700;
        }
      }

      target.textContent = words[wordIndex].slice(0, charIndex);
      window.setTimeout(tick, delay);
    }

    window.setTimeout(tick, 1800);
  }

  /* ---------------------------------------------------------
     Scroll reveal
     --------------------------------------------------------- */
  function setupReveal() {
    const items = $$('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window) || reduceMotion()) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    items.forEach((el) => observer.observe(el));
  }

  /* ---------------------------------------------------------
     Card tilt and pointer glow (mouse only)
     --------------------------------------------------------- */
  function setupTilt() {
    if (!hoverQuery.matches || reduceMotion()) return;

    $$('.tilt').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        if (event.pointerType && event.pointerType !== 'mouse') return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        card.style.setProperty('--ry', ((x - 0.5) * 6).toFixed(2) + 'deg');
        card.style.setProperty('--rx', ((0.5 - y) * 6).toFixed(2) + 'deg');
        card.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      });

      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* ---------------------------------------------------------
     Hero orb follows the pointer slightly
     --------------------------------------------------------- */
  function setupOrbParallax() {
    const hero = $('.hero');
    const orb = $('#orb');
    if (!hero || !orb || !hoverQuery.matches || reduceMotion()) return;

    let frame = 0;

    hero.addEventListener('pointermove', (event) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const rect = hero.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        orb.style.setProperty('--px', x.toFixed(3));
        orb.style.setProperty('--py', y.toFixed(3));
      });
    });

    hero.addEventListener('pointerleave', () => {
      orb.style.setProperty('--px', '0');
      orb.style.setProperty('--py', '0');
    });
  }

  /* ---------------------------------------------------------
     Back-to-top button
     --------------------------------------------------------- */
  function setupBackToTop() {
    const button = $('#back-to-top');
    if (!button) return;

    const update = () => button.classList.toggle('is-visible', window.scrollY > 600);

    window.addEventListener('scroll', update, { passive: true });
    update();

    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' });
      const brand = $('.brand');
      if (brand) brand.focus({ preventScroll: true });
    });
  }

  /* ---------------------------------------------------------
     Footer year
     --------------------------------------------------------- */
  function setupYear() {
    const year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  /* ---------------------------------------------------------
     Start
     --------------------------------------------------------- */
  function init() {
    setupLinks();
    renderCertificates();
    renderProjects();
    setupNav();
    setupScrollSpy();
    setupTyping();
    setupReveal();
    setupTilt();
    setupOrbParallax();
    setupBackToTop();
    setupYear();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
