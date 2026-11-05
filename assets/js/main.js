/**
 * Christiana Ciocan - Official Author Portal (5-Star Edition)
 * Interactive Features: Romanian Dark Romance Excerpt Reader, Cart in Lei, Touch Carousel
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroCarousel();
  initCart();
  initModalExcerpt();
  initMobileNav();
});

/* 1. Hero Carousel */
function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.querySelector('.hero-arrow.prev');
  const nextBtn = document.querySelector('.hero-arrow.next');
  const carousel = document.querySelector('.hero-carousel-container');

  if (!slides.length) return;

  let currentIndex = 0;
  let timer = null;

  function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    currentIndex = index;
  }

  function next() {
    showSlide((currentIndex + 1) % slides.length);
  }

  function prev() {
    showSlide((currentIndex - 1 + slides.length) % slides.length);
  }

  function start() {
    stop();
    timer = setInterval(next, 7000);
  }

  function stop() {
    if (timer) clearInterval(timer);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); start(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); start(); });

  let touchStartX = 0;
  if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stop();
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (diff < -50) next();
      if (diff > 50) prev();
      start();
    }, { passive: true });

    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
  }

  start();
}

/* 2. Cart in Lei */
let cart = [
  {
    title: "Păcatul Casei Vartai",
    format: "Ediție Sprayed Edges (Precomandă)",
    price: 54.00,
    img: "assets/images/pacatul-casei-vartai-hero.jpg",
    qty: 1
  }
];

function initCart() {
  const cartBtn = document.querySelector('.cart-btn');
  const cartDrawer = document.querySelector('.cart-drawer');
  const cartOverlay = document.querySelector('.cart-drawer-overlay');
  const closeCartBtn = document.querySelector('.close-cart');

  function openCart() {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.add('open');
      cartOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCart() {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.remove('open');
      cartOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.book-item-card') || e.target.closest('.hero-book-card');
      const title = btn.dataset.title || card?.querySelector('.book-name-small, .hero-novel-title')?.innerText || "Păcatul Casei Vartai";
      const price = parseFloat(btn.dataset.price || '49.00');
      const img = card?.querySelector('img')?.getAttribute('src') || 'assets/images/pacatul-casei-vartai-hero.jpg';

      addItem(title, price, img);
      openCart();
    });
  });

  updateCartUI();
}

function addItem(title, price, img) {
  const existing = cart.find(i => i.title === title);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ title, format: "Paperback / E-book", price, img, qty: 1 });
  }
  updateCartUI();
}

function removeItem(title) {
  cart = cart.filter(i => i.title !== title);
  updateCartUI();
}
window.removeItem = removeItem;

function updateCartUI() {
  const badge = document.querySelector('.cart-badge');
  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  if (badge) badge.innerText = totalQty;

  const itemsWrap = document.querySelector('.cart-drawer-items');
  const subtotalEl = document.querySelector('.cart-subtotal-val');
  if (!itemsWrap) return;

  if (cart.length === 0) {
    itemsWrap.innerHTML = `
      <div style="text-align:center; padding: 3rem 1rem; color: var(--text-dim);">
        <p>Coșul tău este gol.</p>
        <a href="#seria" class="btn btn-burgundy" style="font-size:0.75rem;">Descoperă Cărțile</a>
      </div>
    `;
    if (subtotalEl) subtotalEl.innerText = "0,00 Lei";
    return;
  }

  let total = 0;
  let html = '';
  cart.forEach(item => {
    total += item.price * item.qty;
    html += `
      <div style="display:flex; gap:1rem; margin-bottom:1.25rem; padding-bottom:1.25rem; border-bottom:1px solid rgba(255,255,255,0.08);">
        <img src="${item.img}" style="width:55px; height:80px; object-fit:cover; border-radius:2px;">
        <div style="flex:1;">
          <h4 style="font-size:0.95rem; color:#fff; margin-bottom:0.25rem;">${item.title}</h4>
          <div style="font-size:0.75rem; color:var(--gold-primary); margin-bottom:0.35rem;">${item.format} (x${item.qty})</div>
          <div style="font-size:0.9rem; font-weight:700; color:#fff;">${(item.price * item.qty).toFixed(2)} Lei</div>
        </div>
        <button onclick="removeItem('${item.title}')" style="background:transparent; border:none; color:#c22547; cursor:pointer; font-size:1.1rem;">✕</button>
      </div>
    `;
  });

  itemsWrap.innerHTML = html;
  if (subtotalEl) subtotalEl.innerText = `${total.toFixed(2)} Lei`;
}

/* 3. Romanian Excerpts */
const romanianExcerpts = {
  "Păcatul Casei Vartai": `
    <h3 style="color: var(--gold-light); margin-bottom: 0.5rem;">PROLOG: JURĂMÂNTUL DIN UMBRĂ</h3>
    <p style="font-size: 0.82rem; color: var(--gold-primary); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1.5rem;">POV: KAIREN VARTAI</p>
    <p>Secretele Casei Vartai nu se îngroapă niciodată în pământ sfânt. Ele se zidesc adânc în piatra rece a conacului, sub privirile mute ale portretelor strămoșilor noștri păcătoși.</p>
    <p>Când am privit-o pentru prima oară intrând în sala mare, purtând acea rochie neagră simplă și o privire care sfida însăși moartea, am știut că destinul meu s-a pecetluit.</p>
    <p>„Nu ar fi trebuit să treci de porțile de fier,” i-am șoptit, apropiindu-mă atât de mult încât răsuflarea ei caldă mi-a atins gulerul din catifea. Masca pe care o purtam îi ascundea rănile mele, dar nu și flacăra care îmi mistuia pieptul.</p>
    <p>„Nu mă tem de tine, lord Vartai,” a rostit ea cu bărbia ridicată, deși pulsul de la gâtul ei fin bătea nebunește.</p>
    <p>Un zâmbet întunecat mi-a atins buzele: „Ar trebui să te temi. Pentru că în această casă, cei care nu se pleacă... ajung să fie posedați pentru totdeauna.”</p>
  `,
  "Speranța are numele tău": `
    <h3 style="color: var(--gold-light); margin-bottom: 0.5rem;">CAPITOLUL 1: RĂPITORUL CU OCHI DE OBSIDIAN</h3>
    <p style="font-size: 0.82rem; color: var(--gold-primary); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1.5rem;">POV: IANA</p>
    <p>Mama îmi spusese întotdeauna că fetele ca mine sunt născute doar pentru a îndura durerea în tăcere. Învățasem să fiu o umbră, o fantomă care nu îndrăznea să spere.</p>
    <p>Dar în noaptea în care ușa conacului s-a prăbușit sub forța loviturilor, întunericul a căpătat un chip uman: Rian.</p>
    <p>Oamenii îi spuneau Măcelarul. Se spunea că inima lui fusese sculptată din piatră de către Maestrul care îl antrenase să ucidă fără remușcări. Când ochii lui necruțători s-au oprit asupra mea, nu am văzut un monstru... am văzut singura mea scăpare.</p>
    <p>„Vii cu mine,” a ordonat el cu vocea ca un tunet înăbușit.</p>
    <p>„Și dacă refuz?”</p>
    <p>Rian a făcut un pas spre mine, iar mantia lui plină de ploaie m-a învăluit. „Nu este o negociere, Iana. De la miezul nopții, tu îmi aparții mie.”</p>
  `,
  "Moștenirea Sinistră": `
    <h3 style="color: var(--gold-light); margin-bottom: 0.5rem;">TEASER: BALUL MĂȘTILOR ÎNSÂNGERATE</h3>
    <p>Măștile ascundeau trădători, asasini și nobili decăzuți. Când lama rece a pumnalului a atins pielea mea, mâna lui m-a tras înapoi în umbre cu o forță de nestăpânit.</p>
    <p>„Nimeni nu te atinge în această sală fără să-mi ceară permisiunea,” a șoptit el direct în urechea mea. „Și eu nu o acord nimănui.”</p>
  `,
  "Darul Sângelui": `
    <h3 style="color: var(--gold-light); margin-bottom: 0.5rem;">PROLOG: DESTINUL CORBILOR</h3>
    <p>O coroană de spini și un tron clădit pe oase. Pentru a salva ceea ce a mai rămas din imperiu, suntem nevoiți să devenim cei mai cruzi conducători pe care istoria i-a cunoscut vreodată.</p>
  `
};

function initModalExcerpt() {
  const overlay = document.querySelector('.modal-overlay');
  const titleEl = document.querySelector('.modal-book-title');
  const bodyEl = document.querySelector('.modal-body');
  const closeBtn = document.querySelector('.modal-close');

  if (!overlay) return;

  function open(book) {
    if (titleEl) titleEl.innerText = book;
    if (bodyEl) bodyEl.innerHTML = romanianExcerpts[book] || romanianExcerpts["Păcatul Casei Vartai"];
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.btn-read-excerpt').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const book = btn.dataset.book || "Păcatul Casei Vartai";
      open(book);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
}

function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.style.display === 'flex';
      nav.style.display = isOpen ? 'none' : 'flex';
      if (!isOpen) {
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.width = '100%';
        nav.style.background = '#080709';
        nav.style.padding = '1.5rem';
        nav.style.borderBottom = '1px solid var(--border-gold)';
      }
    });
  }
}
