/* История одной записи: шаг выбирается по прокрутке липкого блока.
   Только классы и opacity/transform; без JS виден первый шаг. */
(function () {
  "use strict";
  var track = document.querySelector(".st-track");
  if (!track) return;
  var N = +getComputedStyle(track).getPropertyValue("--n") || 6;
  var SB = ["23:47", "23:47", "23:48", "09:12", "18:00", "11:02"];
  var stage = track.querySelector(".st-stage");
  var box = track.querySelector(".st-ph-box");
  var cur = 0;

  function each(sel, fn) { var l = track.querySelectorAll(sel); for (var i = 0; i < l.length; i++) fn(l[i]); }
  function has(el, s) { return (" " + el.getAttribute("data-steps") + " ").indexOf(" " + s + " ") >= 0; }

  function show(s) {
    if (s === cur) return;
    cur = s;
    each("[data-steps]", function (el) { el.classList.toggle("on", has(el, s)); });
    each("[data-from]", function (el) { el.classList.toggle("on", s >= +el.getAttribute("data-from")); });
    each(".cap", function (el) { el.classList.toggle("on", +el.getAttribute("data-step") === s); });
    each(".st-rail button", function (el) {
      var n = +el.getAttribute("data-go");
      if (n === s) el.setAttribute("aria-current", "step"); else el.removeAttribute("aria-current");
      el.classList.toggle("done", n < s);
    });
    var t = track.querySelector(".sb b"); if (t) t.textContent = SB[s - 1];
    document.dispatchEvent(new CustomEvent("story:step", { detail: s }));
  }

  var MQ = window.matchMedia ? matchMedia("(max-width: 899px)") : { matches: false };
  function fit() {
    var w = track.querySelector(".st-grid").clientWidth - (innerWidth >= 900 ? 600 : 130), k;
    if (MQ.matches) {
      // телефон: без прилипания; размер от ширины и высоты экрана устройства, чтобы не прыгал,
      // когда браузер прячет/показывает свою панель
      var sh = Math.min(screen.height || innerHeight, innerHeight + 140);
      k = Math.min(1.1, w / 264, (sh * 0.56) / 546);
    } else {
      // масштаб телефона под свободную высоту
      k = Math.min(1.2, track.querySelector(".st-phone").clientHeight / 546, w / 264);
    }
    box.style.setProperty("--k", Math.max(0.5, k).toFixed(3));
  }

  // Геометрию меряем только при загрузке и смене размера; при прокрутке — одно чтение scrollY за кадр,
  // без замеров раскладки на каждое событие (на телефоне это давало рывки).
  var top0 = 0, total = 0, ticking = false;
  function measure() {
    top0 = track.getBoundingClientRect().top + window.scrollY;
    total = track.offsetHeight - stage.offsetHeight;
  }
  function update() {
    ticking = false;
    if (MQ.matches) return; // на телефоне шаги идут сами (autoplay ниже)
    var p = total > 0 ? Math.min(1, Math.max(0, (window.scrollY - top0) / total)) : 0;
    show(Math.min(N, Math.floor(p * N) + 1));
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  each(".st-rail button", function (b) {
    b.addEventListener("click", function () {
      var n = +b.getAttribute("data-go");
      if (MQ.matches) { show(n); restart(); return; }
      var total = track.offsetHeight - stage.offsetHeight;
      var y = track.getBoundingClientRect().top + window.scrollY + total * ((n - 0.5) / N);
      window.scrollTo({ top: y, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  // Телефон: шаги сменяются сами каждые 3,2 с, пока блок на экране; нажатие на полоску — к шагу.
  var STEP = 4500, timer = 0, inView = false;
  var still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function tick() { show(cur >= N ? 1 : cur + 1); }
  function stopAuto() { clearInterval(timer); timer = 0; }
  function restart() { stopAuto(); if (MQ.matches && inView && !still && !document.hidden) timer = setInterval(tick, STEP); }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (e) { inView = e[0].isIntersecting; restart(); }, { threshold: 0.4 }).observe(stage);
  }
  // Телефон: касание по телефону или подписи — следующий шаг, по левой трети — предыдущий; таймер начинается заново.
  each(".st-phone, .st-caps", function (el) {
    el.addEventListener("click", function (e) {
      var r = (el.querySelector('.st-ph-box .phone') || el).getBoundingClientRect(), back = e.clientX < r.left + r.width / 3;
      var n = back ? (cur <= 1 ? N : cur - 1) : (cur >= N ? 1 : cur + 1);
      if (!MQ.matches) { // компьютер: докручиваем страницу к шагу — прокрутка и клик не спорят
        var tot = track.offsetHeight - stage.offsetHeight, y = track.getBoundingClientRect().top + window.scrollY + tot * ((n - 0.5) / N);
        window.scrollTo({ top: y, behavior: still ? "auto" : "smooth" }); return;
      }
      show(n); restart();
    });
  });
  document.addEventListener("visibilitychange", restart);

  var rz = 0, lastW = innerWidth;
  window.addEventListener("resize", function () {
    // на телефоне меняется только высота (панель браузера) — ничего не пересчитываем
    if (MQ.matches && innerWidth === lastW) return;
    lastW = innerWidth;
    clearTimeout(rz); rz = setTimeout(function () { fit(); measure(); update(); restart(); }, 150);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fit(); measure(); update(); });
  window.addEventListener("load", function () { measure(); update(); });
  fit();
  measure();
  show(1);
  update();
})();
