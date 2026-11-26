/* Посчитайте сами. Главное — сколько визитов в месяц окупают пакет (30 000 / средний чек).
   Потери: неявки × чек × 4,3 недели, «до» — часть окон занимают другие клиенты.
   Число меняется плавно (кроме reduced motion). */
(function () {
  "use strict";
  var box = document.getElementById("calc");
  if (!box) return;
  var PRICE = 30000, WEEKS = 4.3;
  var $ = function (s) { return box.querySelector(s); };
  var b = $("#caB"), n = $("#caN"), c = $("#caC");
  var still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var shown = 0, raf = 0;

  function fmt(x) { return String(Math.round(x)).replace(/\B(?=(\d{3})+(?!\d))/g, " "); }
  function unit(k, lang) {
    if (lang === "ru") { var m = k % 10, h = k % 100; return m === 1 && h !== 11 ? "визит" : m >= 2 && m <= 4 && (h < 12 || h > 14) ? "визита" : "визитов"; }
    if (lang === "en") return k === 1 ? "visit" : "visits";
    return "այց";
  }
  function animate(to) {
    cancelAnimationFrame(raf);
    if (still) { shown = to; $("#caOut").textContent = fmt(to); return; }
    var from = shown, t0 = performance.now();
    (function step(t) {
      var p = Math.min(1, (t - t0) / 320), e = 1 - Math.pow(1 - p, 3);
      shown = from + (to - from) * e;
      $("#caOut").textContent = fmt(shown);
      if (p < 1) raf = requestAnimationFrame(step);
    })(t0);
  }
  // сумма потерь считается плавно (как число визитов), Гор подпрыгивает, когда ползунок отпущен
  var lossShown = 0, lossRaf = 0, lastK = "";
  function lossText(v) { $("#caLoss").textContent = window.SITE.t("caLoss").split("{x}").join(fmt(v) + " ֏"); }
  function tweenLoss(to) {
    cancelAnimationFrame(lossRaf);
    if (still) { lossShown = to; lossText(to); say(); return; }
    var from = lossShown, t0 = performance.now();
    (function step(t) {
      var p = Math.min(1, (t - t0) / 420), e = 1 - Math.pow(1 - p, 3);
      lossShown = from + (to - from) * e; lossText(lossShown);
      if (p < 1) lossRaf = requestAnimationFrame(step); else say();
    })(t0);
  }
  // итог для экранного диктора — один раз, после того как числа досчитались
  var sayEl = document.getElementById("caSay"), sayT = 0;
  function say() { if (!sayEl) return; clearTimeout(sayT); sayT = setTimeout(function () { sayEl.textContent = $("#caK").textContent + " " + lastK + " " + $("#caUnit").textContent + ". " + $("#caLoss").textContent; }, 300); }
  var gor = box.querySelector(".ca-gor");
  function hop() { if (!gor || still) return; gor.classList.remove("hop"); void gor.offsetWidth; gor.classList.add("hop"); }
  [b, n, c].forEach(function (el) { el.addEventListener("change", hop); });
  function upd() {
    var t = window.SITE.t, lang = window.SITE.lang();
    if (+n.value > +b.value) n.value = b.value;
    var B = +b.value, N = +n.value, C = +c.value;
    $("#caBv").textContent = B; $("#caNv").textContent = N; $("#caCv").textContent = fmt(C) + " ֏";
    var loss = N * C * WEEKS, k = Math.ceil(PRICE / C), p = B ? Math.round(N / B * 100) : 0;
    lastK = k; window.SKIYAR_LOSS = { loss: loss, price: PRICE };
    animate(k);
    $("#caUnit").textContent = unit(k, lang);
    tweenLoss(loss);
    document.dispatchEvent(new CustomEvent("calc:loss", { detail: { loss: loss, price: PRICE } }));
    $("#caFormula").textContent = t("caFormula").split("{n}").join(N).split("{c}").join(fmt(C) + " ֏").split("{p}").join(p);
    var msg = !N ? t("caZero") : (N / B < 0.03 ? t("caLow").split("{p}").join(p) : "");
    $("#caMsg").textContent = msg; $("#caMsg").hidden = !msg;
    box.classList.toggle("ca-quiet", !N || N / B < 0.03);
    var max = Math.max(loss, PRICE, 1);
    $("#caBarL").style.transform = "scaleX(" + (loss / max) + ")";
    $("#caBarS").style.transform = "scaleX(" + (PRICE / max) + ")";
    [b, n, c].forEach(function (el) { el.style.setProperty("--p", ((el.value - el.min) / (el.max - el.min) * 100) + "%"); });
  }
  [b, n, c].forEach(function (el) { el.addEventListener("input", upd); });
  window.SITE.onRender.push(upd);
  upd();
})();
