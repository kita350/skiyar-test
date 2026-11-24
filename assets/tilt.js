/* МАКЕТ (ветка site-mock-tilt, на сайт не ставить без «ок» основателя): «живой» телефон первого экрана.
   Компьютер: наклоняется за мышью (до 10°). Телефон: наклон идёт от прокрутки первого экрана —
   пальцу ничего не мешает, касания не перехватываются. По стеклу скользит блик (отдельный слой, только transform).
   Покачивание в покое — на обёртке .lv-box, наклон — на .lv-phone, они не перебивают друг друга.
   Выключено: prefers-reduced-motion, слабые устройства (≤4 ядер без мыши), вне экрана — пауза. */
(function () {
  "use strict";
  var box = document.getElementById("live");
  var wrap = box && box.querySelector(".lv-box"), ph = box && box.querySelector(".lv-phone");
  if (!ph || !wrap || !window.matchMedia) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var mouse = matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!mouse && (navigator.hardwareConcurrency || 4) <= 4) return; // слабый телефон: без эффекта
  document.documentElement.classList.add("tilt-on");
  var sheen = document.createElement("i"); sheen.className = "lv-sheen"; sheen.setAttribute("aria-hidden", "true");
  ph.appendChild(sheen);

  var tx = 0, ty = 0, raf = 0, rect = null, seen = true;
  function draw() {
    raf = 0;
    ph.style.transform = "perspective(900px) rotateX(" + (-ty * 10).toFixed(2) + "deg) rotateY(" + (tx * 10).toFixed(2) + "deg)";
    sheen.style.transform = "translate(" + (tx * 30).toFixed(1) + "%," + (ty * 20).toFixed(1) + "%)";
  }
  function queue() { if (!raf) raf = requestAnimationFrame(draw); }

  if (mouse) {
    var area = document.querySelector(".hero") || box;
    var measure = function () { rect = ph.getBoundingClientRect(); };
    area.addEventListener("pointerenter", measure, { passive: true });
    window.addEventListener("scroll", function () { rect = null; }, { passive: true });
    area.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      if (!rect) measure();
      tx = Math.max(-1, Math.min(1, (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2 + 120)));
      ty = Math.max(-1, Math.min(1, (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2 + 120)));
      wrap.classList.add("tilting"); queue();
    }, { passive: true });
    area.addEventListener("pointerleave", function () { wrap.classList.remove("tilting"); tx = ty = 0; queue(); }, { passive: true });
  } else {
    // телефон: наклон от прокрутки первого экрана (одно чтение scrollY за кадр)
    var hero = document.querySelector(".hero"), hh = hero ? hero.offsetHeight : innerHeight;
    window.addEventListener("scroll", function () {
      if (!seen) return;
      var p = Math.min(1, scrollY / hh);
      ty = -p * 0.9; tx = Math.sin(p * Math.PI) * 0.35; queue();
    }, { passive: true });
  }
  // покачивание и блик — только пока телефон на экране
  if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { seen = e[0].isIntersecting; wrap.classList.toggle("idle", seen); }).observe(ph);
})();
