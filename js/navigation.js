(() => {
  const groups = '.site-navigation .group';
  const setOpen = (trigger, open) => {
    trigger.classList.toggle('hide', !open);
    trigger.setAttribute('aria-expanded', String(open));
  };
  const close = root => root.querySelectorAll('.group').forEach(trigger => setOpen(trigger, false));
  const open = trigger => {
    close(trigger.closest('.site-navigation'));
    setOpen(trigger, true);
  };

  const setup = () => {
    const search = document.querySelector('#search-button');
    if (search) {
      // Keep visual and keyboard order aligned: menus, search, mobile toggle.
      const menus = document.querySelector('#nav .menus_items');
      if (menus) menus.after(search);
      const trigger = search.querySelector('.search');
      if (trigger) {
        trigger.setAttribute('role', 'button');
        trigger.setAttribute('tabindex', '0');
        trigger.setAttribute('aria-label', '搜索');
        trigger.setAttribute('title', '搜索');
      }
    }
    document.querySelectorAll('#nav .menus_items, #sidebar-menus .menus_items').forEach(menu => {
      menu.classList.add('site-navigation');
    });
    document.querySelectorAll(groups).forEach((trigger, index) => {
      if (trigger.dataset.navReady) return;
      trigger.dataset.navReady = 'true';
      trigger.setAttribute('role', 'button');
      trigger.setAttribute('tabindex', '0');
      setOpen(trigger, false);
      const panel = trigger.nextElementSibling;
      panel.id = `${trigger.closest('#nav') ? 'desktop' : 'mobile'}-nav-panel-${index}`;
      trigger.setAttribute('aria-controls', panel.id);
      let hoverOpened = false;
      trigger.addEventListener('click', event => {
        // Own the state before Butterfly's delegated sidebar handler runs.
        event.stopPropagation();
        if (hoverOpened) {
          hoverOpened = false;
          return;
        }
        trigger.classList.contains('hide') ? open(trigger) : setOpen(trigger, false);
      });
      trigger.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          hoverOpened = false;
          trigger.click();
        }
      });
      trigger.parentElement.addEventListener('pointerenter', event => {
        if (event.pointerType !== 'mouse' || !trigger.closest('#nav') ||
            !window.matchMedia('(hover: hover)').matches) return;
        hoverOpened = trigger.classList.contains('hide');
        open(trigger);
      });
      trigger.parentElement.addEventListener('pointerleave', event => {
        hoverOpened = false;
        if (event.pointerType === 'mouse' && trigger.closest('#nav') &&
            !trigger.parentElement.contains(document.activeElement)) setOpen(trigger, false);
      });
    });
    const hamburger = document.querySelector('#toggle-menu .site-page');
    if (hamburger) {
      hamburger.setAttribute('role', 'button');
      hamburger.setAttribute('tabindex', '0');
      hamburger.setAttribute('aria-label', '打开导航菜单');
      hamburger.setAttribute('aria-controls', 'sidebar-menus');
    }
  };

  document.addEventListener('click', event => {
    document.querySelectorAll('.site-navigation').forEach(menu => {
      if (!menu.contains(event.target) || event.target.closest('a')) close(menu);
    });
  });
  document.addEventListener('focusout', event => {
    const menu = event.target.closest('.site-navigation');
    if (menu && !menu.contains(event.relatedTarget)) close(menu);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      const menu = event.target.closest('.site-navigation');
      const trigger = menu && menu.querySelector('.group:not(.hide)');
      if (trigger) {
        setOpen(trigger, false);
        trigger.focus();
      } else {
        document.querySelectorAll('.site-navigation').forEach(close);
        if (document.querySelector('#sidebar-menus.open')) {
          document.querySelector('#menu-mask').click();
          document.querySelector('#toggle-menu .site-page').focus();
        }
      }
    }
    if ((event.key === 'Enter' || event.key === ' ') &&
        event.target.matches('#toggle-menu .site-page, #search-button .search')) {
      event.preventDefault();
      event.target.click();
    }
  });
  document.addEventListener('pjax:send', () => document.querySelectorAll('.site-navigation').forEach(close));
  document.addEventListener('pjax:complete', setup);
  window.addEventListener('resize', () => document.querySelectorAll('.site-navigation').forEach(close));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();
