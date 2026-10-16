/* Coastal Social: no framework or external runtime required. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  $('year').textContent = new Date().getFullYear();
  const toggle = $('menuToggle'), navigation = $('mobileNav');
  function closeMenu() { navigation.hidden = true; toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation'); }
  toggle.addEventListener('click', () => {
    const open = navigation.hidden;
    navigation.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !navigation.hidden) { closeMenu(); toggle.focus(); } });
  matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
  document.querySelectorAll('[data-occasion]').forEach(link => link.addEventListener('click', () => {
    $('occasion').value = link.dataset.occasion;
    editEnquiry();
  }));
  document.addEventListener('click', event => {
    if (!navigation.hidden && !navigation.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });

  const cards = [...document.querySelectorAll('.gallery-card')];
  const dialog = $('imageDialog'), fullImage = $('fullImage');
  let current = 0, visible = cards, returnFocus = null;
  function displayImage(index) {
    current = (index + visible.length) % visible.length;
    const card = visible[current];
    fullImage.hidden = true;
    $('imageStatus').textContent = 'Loading image…';
    fullImage.src = `assets/images/${card.dataset.image}.webp`;
    fullImage.alt = card.querySelector('img').alt;
    $('imageTitle').textContent = card.dataset.title;
    $('imageCount').textContent = `${current + 1} / ${visible.length}`;
  }
  function sizeImage() {
    const density = Math.max(1, window.devicePixelRatio || 1);
    fullImage.style.maxWidth = `min(100%, ${Math.floor(fullImage.naturalWidth / density)}px)`;
    fullImage.style.maxHeight = `min(calc(100% - 45px), ${Math.floor(fullImage.naturalHeight / density)}px)`;
  }
  fullImage.addEventListener('load', sizeImage);
  fullImage.addEventListener('load', () => { fullImage.hidden = false; $('imageStatus').textContent = ''; });
  fullImage.addEventListener('error', () => {
    fullImage.hidden = true;
    $('imageStatus').textContent = 'This image could not be loaded. Use the arrows to try another.';
  });
  window.addEventListener('resize', () => { if (dialog.open) sizeImage(); });
  cards.forEach(card => card.addEventListener('click', () => {
    returnFocus = card;
    displayImage(visible.indexOf(card));
    dialog.showModal(); document.body.classList.add('locked'); $('closeImage').focus();
  }));
  $('closeImage').addEventListener('click', () => dialog.close());
  $('previousImage').addEventListener('click', () => displayImage(current - 1));
  $('nextImage').addEventListener('click', () => displayImage(current + 1));
  dialog.addEventListener('click', event => { if (event.target.classList.contains('viewer')) dialog.close(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); displayImage(current + (event.key === 'ArrowLeft' ? -1 : 1)); }
  });
  dialog.addEventListener('close', () => { document.body.classList.remove('locked'); if (returnFocus) returnFocus.focus(); });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    cards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
    visible = cards.filter(card => !card.hidden);
    document.querySelector('.inspiration-grid').dataset.view = button.dataset.filter;
    $('galleryStatus').textContent = `${visible.length} ideas to explore`;
  }));

  const form = $('enquiryForm'), fields = $('formFields'), result = $('formResult'), submit = $('submitButton');
  const endpoint = form.dataset.endpoint.trim();
  let savedText = '';
  if (endpoint) {
    submit.firstChild.textContent = 'Send my enquiry ';
    document.querySelector('.consent span').textContent = 'I agree that my details may be sent to the event planning team to respond to this enquiry.';
  }
  const labels = { name: 'Name', email: 'Email', occasion: 'Occasion', date: 'Possible date', guests: 'Guests', location: 'Location', budget: 'Budget (AUD)', ideas: 'Ideas' };
  function editEnquiry() {
    result.hidden = true; fields.hidden = false; savedText = '';
    $('summary').replaceChildren(); $('formError').textContent = '';
  }
  $('editEnquiry').addEventListener('click', () => { editEnquiry(); $('fullName').focus(); });
  ['fullName', 'ideas'].forEach(id => $(id).addEventListener('input', () => $(id).setCustomValidity('')));
  form.addEventListener('submit', async event => {
    event.preventDefault(); $('formError').textContent = '';
    ['fullName', 'ideas'].forEach(id => $(id).setCustomValidity($(id).value.trim() ? '' : (id === 'fullName' ? 'Please enter your name.' : 'Please tell us a little about your ideas.')));
    if (!form.reportValidity() || $('website').value) return;
    const data = new FormData(form);
    const entries = Object.entries(labels).map(([key, label]) => [label, String(data.get(key) || '').trim() || 'Still deciding']);
    submit.disabled = true;
    try {
      if (endpoint) {
        const url = new URL(endpoint, location.href);
        if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Invalid form endpoint');
        data.set('consent', 'true');
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 20000);
        try { const response = await fetch(url.href, { method: 'POST', body: data, signal: controller.signal, headers: { Accept: 'application/json' } }); if (!response.ok) throw new Error('Delivery failed'); }
        finally { clearTimeout(timer); }
      }
      $('summary').replaceChildren();
      entries.forEach(([label, value]) => { const dt = document.createElement('dt'), dd = document.createElement('dd'); dt.textContent = label; dd.textContent = value; $('summary').append(dt, dd); });
      $('resultTitle').textContent = endpoint ? 'Your enquiry has been sent.' : 'Your ideas, brought together.';
      $('resultMessage').textContent = endpoint ? 'Your details were delivered successfully. You can save a copy below.' : 'Your preview is ready. No enquiry has been sent from this concept website.';
      savedText = `THE EVENT STUDIO — ENQUIRY\n${endpoint ? 'Delivered successfully' : 'Local preview only — not sent'}\n\n` + entries.map(([label, value]) => `${label}: ${value}`).join('\n\n');
      fields.hidden = true; result.hidden = false; result.focus();
    } catch (error) { $('formError').textContent = 'Your enquiry could not be sent. Your details are still here. Please try again.'; }
    finally { submit.disabled = false; }
  });
  $('saveEnquiry').addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([savedText], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'event-studio-enquiry.txt'; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  $('resetEnquiry').addEventListener('click', () => { form.reset(); document.querySelector('.optional-details').open = false; result.hidden = true; fields.hidden = false; savedText = ''; $('summary').replaceChildren(); $('formError').textContent = ''; $('fullName').focus(); });
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
    document.querySelector('.mobile-plan').classList.toggle('is-hidden', entries[0].isIntersecting);
  }, { threshold: 0 }).observe($('hello'));

  // Progressive enhancement: all content is visible with or without motion support.
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const running = new Set();
  if ('IntersectionObserver' in window && Element.prototype.animate && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (reducedMotion.matches) return;
        const animation = entry.target.animate([
          { opacity: .3, transform: 'translateY(12px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 480, easing: 'cubic-bezier(.22,.61,.36,1)' });
        running.add(animation);
        animation.finished.then(() => running.delete(animation)).catch(() => running.delete(animation));
      });
    }, { threshold: .08 });
    document.querySelectorAll('.hero-visual, .studio-copy, .section-heading, .experience-card, .approach-grid article').forEach(element => observer.observe(element));
    reducedMotion.addEventListener('change', event => {
      if (event.matches) { running.forEach(animation => animation.cancel()); running.clear(); observer.disconnect(); }
    });
  }
})();
