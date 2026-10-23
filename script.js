(() => {
  // Mark JS enabled for progressive enhancement
  document.documentElement.classList.add('js');

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Scroll Progress Bar (Apple minimal top bar)
  const progress = $('#scroll-progress-fill');
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progress) {
      progress.style.width = `${Math.max(0, Math.min(100, percent))}%`;
    }
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();

  // Copyright Year
  const currentYear = $('#current-year');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Mobile Navigation Toggle
  const menuToggle = $('#menu-toggle');
  const navLinks = $('#nav-links');
  const closeMenu = () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation menu');
    navLinks?.classList.remove('menu-visible');
    document.body.classList.remove('menu-open');
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    navLinks?.classList.toggle('menu-visible', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  $$('#nav-links a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });

  // Section Tracking for Nav Links
  const sections = $$('main section[id]');
  const navAnchors = $$('.nav-links a');

  const setActiveSection = (id) => {
    navAnchors.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) {
        setActiveSection(visible.target.id);
      }
    }, { rootMargin: '-20% 0px -40% 0px', threshold: [0.05, 0.2, 0.4, 0.6] });

    sections.forEach((section) => sectionObserver.observe(section));

    // Scroll Reveal Animations
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    $$('.reveal').forEach((element) => revealObserver.observe(element));
  } else {
    // Fallback if IntersectionObserver is unsupported
    $$('.reveal').forEach((element) => element.classList.add('is-visible'));
  }

  // Apple-style Project Segmented Switcher
  const projectTabs = $$('.project-selector-card');
  const projectPanels = $$('.project-panel');

  const switchProject = (targetId) => {
    projectTabs.forEach((tab) => {
      const isTarget = tab.getAttribute('data-project-target') === targetId;
      tab.classList.toggle('is-active', isTarget);
      tab.setAttribute('aria-selected', String(isTarget));
      const statusIndicator = tab.querySelector('.card-status-indicator');
      const actionCue = tab.querySelector('.card-action-cue');
      if (statusIndicator) {
        statusIndicator.textContent = isTarget ? 'Active' : 'Select';
      }
      if (actionCue) {
        actionCue.innerHTML = isTarget
          ? 'Viewing case study <span class="action-arrow">↓</span>'
          : 'Switch project <span class="action-arrow">↗</span>';
      }
    });

    projectPanels.forEach((panel) => {
      const isTarget = panel.id === `panel-${targetId}`;
      if (isTarget) {
        panel.removeAttribute('hidden');
        panel.classList.add('is-active');
      } else {
        panel.setAttribute('hidden', '');
        panel.classList.remove('is-active');
      }
    });
  };

  projectTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-project-target');
      if (target) {
        switchProject(target);
      }
    });
  });

  // Keyboard navigation for tablist (WAI-ARIA & Apple HIG pattern)
  const tablist = $('.project-selector-deck');
  tablist?.addEventListener('keydown', (e) => {
    const currentTab = document.activeElement;
    if (!currentTab || !currentTab.classList.contains('project-selector-card')) return;
    const currentIndex = projectTabs.indexOf(currentTab);
    let nextIndex = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % projectTabs.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + projectTabs.length) % projectTabs.length;
    }
    if (nextIndex !== null) {
      e.preventDefault();
      projectTabs[nextIndex].focus();
      const target = projectTabs[nextIndex].getAttribute('data-project-target');
      if (target) switchProject(target);
    }
  });

  // Handle URL hash on load or hashchange (e.g. #amc, #sentiment, #spotifai)
  const handleProjectHash = () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (['amc', 'sentiment', 'spotifai'].includes(hash)) {
      switchProject(hash);
      const workSection = $('#work');
      if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  window.addEventListener('hashchange', handleProjectHash);
  if (window.location.hash) {
    handleProjectHash();
  }

  // Lightbox Modal for Screenshots (Apple QuickLook sheet style)
  const lightbox = $('#lightbox');
  const lightboxImage = $('#lightbox-image');

  const closeLightbox = () => {
    if (lightbox?.open) {
      lightbox.close();
    }
  };

  $$('[data-lightbox]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;
      const source = button.getAttribute('data-lightbox');
      const alt = button.getAttribute('data-image-alt') || '';
      lightboxImage.src = source;
      lightboxImage.alt = alt;
      if (typeof lightbox.showModal === 'function') {
        lightbox.showModal();
      }
    });
  });

  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  lightbox?.addEventListener('close', () => {
    if (lightboxImage) lightboxImage.src = '';
  });

  // Keyboard Navigation: Escape key closes menu and lightbox
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
      closeLightbox();
    }
  });
})();
