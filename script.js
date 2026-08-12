/* ===== NAV ===== */
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20));

const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
burger.addEventListener('click', () => {
  const open = drawer.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});
drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  drawer.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', false);
}));

/* ===== IDIOMA (PT / EN) ===== */
// O HTML nasce em português; cada elemento traduzível carrega o inglês em data-en.
// Na primeira execução guardamos o português original em data-pt.
const i18nEls = document.querySelectorAll('[data-en]');
i18nEls.forEach(el => { if (el.dataset.pt === undefined) el.dataset.pt = el.innerHTML.trim(); });

const META = {
  pt: {
    lang: 'pt-BR',
    title: 'Paulo Henrique Monção — Backend, IA e Segurança',
    desc: 'Paulo Henrique Monção, desenvolvedor backend no Instituto ECOA PUC-Rio e co-founder da Capi. Python, Ruby on Rails e OpenAI API. Estudando Segurança da Informação pela CASCO.'
  },
  en: {
    lang: 'en',
    title: 'Paulo Henrique Monção — Backend, AI and Security',
    desc: 'Paulo Henrique Monção, backend developer at Instituto ECOA PUC-Rio and Capi co-founder. Python, Ruby on Rails and the OpenAI API. Studying Information Security with CASCO.'
  }
};

const langBtns = document.querySelectorAll('.lang-btn');
const metaDesc = document.querySelector('meta[name="description"]');

function setLang(lang) {
  const m = META[lang] || META.pt;
  i18nEls.forEach(el => { el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.pt; });
  document.documentElement.lang = m.lang;
  document.title = m.title;
  if (metaDesc) metaDesc.setAttribute('content', m.desc);
  langBtns.forEach(b => {
    const on = b.dataset.lang === lang;
    b.classList.toggle('is-on', on);
    b.setAttribute('aria-pressed', on);
  });
  try { localStorage.setItem('lang', lang); } catch (e) { /* modo privado */ }
}

langBtns.forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

let saved = null;
try { saved = localStorage.getItem('lang'); } catch (e) { /* modo privado */ }
const prefersPt = (navigator.language || 'pt').toLowerCase().startsWith('pt');
setLang(saved === 'pt' || saved === 'en' ? saved : (prefersPt ? 'pt' : 'en'));

/* ===== TIMELINE — filtro ===== */
const tlBtns = document.querySelectorAll('.tl-f');
const tlItems = document.querySelectorAll('.tl-item');
tlBtns.forEach(btn => btn.addEventListener('click', () => {
  const f = btn.dataset.filter;
  tlBtns.forEach(b => b.classList.toggle('is-on', b === btn));
  tlItems.forEach(it => it.classList.toggle('hide', f !== 'all' && it.dataset.track !== f));
}));

/* ===== SKILLS — atraso escalonado das barras ===== */
document.querySelectorAll('.skill-col').forEach(col => {
  col.querySelectorAll('.sk-fill').forEach((fill, i) => {
    fill.style.setProperty('--sd', (i * 0.09) + 's');
  });
});

/* ===== REVEAL ===== */
const io = new IntersectionObserver((es) => {
  es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.setProperty('--d', (i % 4) * 0.06 + 's');
  io.observe(el);
});
