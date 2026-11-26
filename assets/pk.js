/* Пакеты и цены: «Ежемесячно / За год −15%» (цены меняются плавно), выбор колонки на телефоне,
   счётчик занятых мест в пилоте — из data-taken на секции (сейчас 0). */
(function () {
  "use strict";
  var box = document.getElementById("packages");
  if (!box) return;
  var still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function num(s) { return +String(s).replace(/\D/g, ""); }
  function fmt(x) { return String(Math.round(x)).replace(/\B(?=(\d{3})+(?!\d))/g, " "); }
  function tween(el, to) {
    var from = num(el.textContent) || to;
    if (still || from === to) { el.textContent = fmt(to); return; }
    var t0 = performance.now();
    (function step(t) {
      var p = Math.min(1, (t - t0) / 380), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(from + (to - from) * e);
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  function render(animate) {
    var t = window.SITE.t, y = box.getAttribute("data-bill") === "y", i, els;
    els = box.querySelectorAll(".pl-p[data-m]");
    for (i = 0; i < els.length; i++) {
      var v = num(els[i].getAttribute(y ? "data-y" : "data-m")), x = els[i].querySelector(".pl-x");
      if (animate) tween(x, v); else x.textContent = fmt(v);
      els[i].querySelector("[data-per]").textContent = t(y ? "pkPerY" : "pkPerM");
    }
    els = box.querySelectorAll(".pl-eq[data-eq]");
    for (i = 0; i < els.length; i++) els[i].textContent = y ? t("pkEqM").split("{x}").join(fmt(num(els[i].getAttribute("data-eq")) / 12) + " ֏") : "";
    els = box.querySelectorAll(".pl-s[data-setup]");
    for (i = 0; i < els.length; i++) els[i].textContent = t(els[i].hasAttribute("data-free") ? "pkSetupFree" : "pkSetup").split("{x}").join(els[i].getAttribute("data-setup") + " ֏");
    els = box.querySelectorAll("[data-bill] [role=radio], .bill [role=radio]");
    for (i = 0; i < els.length; i++) els[i].setAttribute("aria-checked", String(els[i].getAttribute("data-bill") === (y ? "y" : "m")));
    els = box.querySelectorAll("[data-first]");
    for (i = 0; i < els.length; i++) {
      var f = els[i].getAttribute("data-first").split(",").map(Number);
      var total = (y ? f[1] : f[0] * 11) + f[2]; // 1-й месяц бесплатно при договоре на год (packages.md, 26.11)
      els[i].textContent = t("pkTerm") + ", " + t("pkFirst").split("{x}").join(fmt(total) + "\u00a0֏");
    }
    var taken = +box.getAttribute("data-taken");
    var left = box.querySelector("#pkLeft"); if (left) left.textContent = t("pLeft").split("{n}").join(5 - taken);
    var seats = box.querySelector(".seats"); if (seats) seats.textContent = "";
    for (i = 0; seats && i < 5; i++) { var s = document.createElement("i"); if (i < taken) s.className = "taken"; seats.appendChild(s); }
  }

  box.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".bill [data-bill]");
    if (b) { box.setAttribute("data-bill", b.getAttribute("data-bill")); render(true); return; }
    var c = e.target.closest && e.target.closest("[data-col]");
    if (c) {
      box.setAttribute("data-sel", c.getAttribute("data-col"));
      var bs = box.querySelectorAll("[data-col]");
      for (var i = 0; i < bs.length; i++) bs[i].setAttribute("aria-pressed", String(bs[i] === c));
    }
  });
  window.SITE.onRender.push(function () { render(false); });
  render(false);
})();
