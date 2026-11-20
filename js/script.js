/* =========================================================
   PROYEKTONG AHON — main script
   ========================================================= */

/* ---------------------------------------------------------
   1. RESPONDER CARDS (Stories page)
   Edit names / roles / photos here. The order = order on the page
   (1st item = upper-left card). "page" is the story file inside /stories.
   --------------------------------------------------------- */
// CARD PHOTOS: upload a photo named after the story page into images/cards/
// e.g. images/cards/kapitan.jpg, images/cards/gloria.jpg ...
// If a card has no photo yet, it shows this placeholder instead:
const CARD_PHOTO = "images/cards/placeholder.jpg";
const RESPONDERS = [
  { name: "Dennis Gacena",       role: "Barangay Captain",        page: "kapitan.html" },
  { name: "Gloria Gatus",        role: "Barangay Chief",          page: "gloria.html" },
  { name: "Roger Lopez",         role: "Sitio Lider: Batasan",    page: "roger.html" },
  { name: "Angelito Castro",     role: "Sitio Lider: Batasan",    page: "angelito.html" },
  { name: "Roberto Reyes",       role: "Sitio Lider: Centro Dos", page: "roberto.html" },
  { name: "Reynaldo Luzano",     role: "Sitio Lider: Centro Uno", page: "reynaldo.html" },
  { name: "Renato Cabral",       role: "Sitio Lider: Centro Uno", page: "renato.html" },
  { name: "Lorence Nabong",      role: "Sitio Lider: Control",    page: "lorence.html" },
  { name: "Ramilo Usi",          role: "Sitio Lider: Danga",      page: "ramilo.html" },
  { name: "Edwin Torres",        role: "Sitio Lider: Danga",      page: "edwin.html" },
  { name: "Ferdinand Valderama", role: "Sitio Lider: Dudurot",    page: "paligui.html" },
  { name: "Armando Yumul",       role: "Sitio Lider: Control",    page: "armando.html" },
  { name: "Reynaldo Munar",      role: "Sitio Lider: Muzon",      page: "munar.html" },
  { name: "Romeo Valderama",     role: "Sitio Lider: Paligui",    page: "romeo.html" },
  { name: "Maximo Santiago",     role: "Sitio Lider: Paligui",    page: "maximo.html" },
];
const CARDS_PER_SET = 8; // 8 = two rows of four (like the Figma desktop design)

/* ---------------------------------------------------------
   2. GOOGLE FORM (Feedback page)
   In Google Forms: Send → "< >" (embed) → copy ONLY the src link,
   e.g. https://docs.google.com/forms/d/e/XXXXXXXX/viewform?embedded=true
   --------------------------------------------------------- */
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfjvosJ5dBJFNMl6HYCf-4JWuricmp9Tf4G5Qk-_zKjHMwnvA/viewform?embedded=true"; // <-- paste your link between the quotes


/* ================= Nothing below needs editing ================= */

document.addEventListener("DOMContentLoaded", () => {
  setupNav();
  renderCards();
  setupShowcase();
  setupFeedbackForm();
  setupImageSlots(); // run last so it also catches the cards
});

/* Mobile menu + highlight current page */
function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
  }
  const current = document.body.dataset.page;
  document.querySelectorAll(".nav-links a").forEach(a => {
    if (a.dataset.page === current) a.classList.add("active");
  });
}

/* Placeholder boxes: show the photo once you upload it, otherwise show the label */
function setupImageSlots() {
  document.querySelectorAll(".img-slot img").forEach(img => {
    const slot = img.closest(".img-slot");
    const ok = () => slot.classList.add("has-img");
    const fail = () => { img.style.display = "none"; };
    if (img.complete) {
      img.naturalWidth > 0 ? ok() : fail();
    } else {
      img.addEventListener("load", ok);
      img.addEventListener("error", fail);
    }
  });
}

/* Stories page: cards in sets with numbered buttons */
function renderCards() {
  const grid = document.getElementById("cards-grid");
  const pager = document.getElementById("pagination");
  if (!grid || !pager) return;

  const totalSets = Math.ceil(RESPONDERS.length / CARDS_PER_SET);

  function showSet(n) {
    const start = (n - 1) * CARDS_PER_SET;
    grid.innerHTML = RESPONDERS.slice(start, start + CARDS_PER_SET).map(r => `
      <article class="card">
        <div class="card-photo">
          <img src="images/cards/${r.page.replace(".html", ".jpg")}" alt="${r.name}"
               onerror="this.onerror=null; this.src='${CARD_PHOTO}';">
        </div>
        <div class="card-body">
          <span class="card-role">${r.role}</span>
          <h3 class="card-name">${r.name}</h3>
          <a class="card-btn" href="stories/${r.page}">See Story</a>
        </div>
      </article>`).join("");
    pager.querySelectorAll(".page-btn").forEach(b =>
      b.classList.toggle("active", Number(b.dataset.set) === n));
    setupImageSlots();
  }

  pager.innerHTML = Array.from({ length: totalSets }, (_, i) =>
    `<button class="page-btn" data-set="${i + 1}" aria-label="Show set ${i + 1}">${i + 1}</button>`
  ).join("");
  pager.addEventListener("click", e => {
    const btn = e.target.closest(".page-btn");
    if (!btn) return;
    showSet(Number(btn.dataset.set));
    document.getElementById("cards").scrollIntoView({ behavior: "smooth" });
  });
  showSet(1);
}

/* Stories page: Before / During / After showcase */
function setupShowcase() {
  const buttons = document.querySelectorAll(".showcase-buttons .pill");
  const slides = document.querySelectorAll(".showcase-stage img");
  if (!buttons.length) return;
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.toggle("active", b === btn));
      slides.forEach(s => s.classList.toggle("show", s.dataset.phase === btn.dataset.phase));
    });
  });
}

/* Feedback page: load the live Google Form */
function setupFeedbackForm() {
  const wrap = document.getElementById("form-holder");
  if (!wrap) return;
  if (GOOGLE_FORM_URL) {
    wrap.innerHTML = `<iframe src="${GOOGLE_FORM_URL}" title="AHON Feedback Form" loading="lazy">Loading…</iframe>`;
  } else {
    wrap.innerHTML = `<div class="form-missing">
      <h3>Google Form not linked yet</h3>
      <p>Open <b>js/script.js</b> and paste your Google Form embed link into <b>GOOGLE_FORM_URL</b>.</p>
    </div>`;
  }
}
