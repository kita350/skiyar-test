/* ПРОБНЫЙ САЙТ (ветка site-mock-tilt, на основной не ставить без «ок» основателя): объёмный «живой» телефон первого экрана.
   Объём: толщина корпуса — стопка жёстких теней в сторону, обратную наклону; мягкая тень под телефоном;
   слои — плашка записи и Гор у ниш сдвигаются сильнее телефона (параллакс), блик скользит по стеклу.
   Компьютер: наклон за мышью (до 16°). Телефон: телефон сам плавно поворачивается, пока на экране,
   плюс наклон от прокрутки; касания не перехватываются.
   Выключено только при «уменьшить движение». Вне экрана — пауза. */
(function () {
  "use strict";
  var box = document.getElementById("live");
  var wrap = box && box.querySelector(".lv-box"), ph = box && box.querySelector(".lv-phone");
  if (!ph || !wrap || !window.matchMedia) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var mouse = matchMedia("(hover: hover) and (pointer: fine)").matches;
  document.documentElement.classList.add("tilt-on");
  var sheen = document.createElement("i"); sheen.className = "lv-sheen"; sheen.setAttribute("aria-hidden", "true");
  ph.appendChild(sheen);
  var toast = wrap.querySelector(".lv-toast"), gor = document.querySelector(".niche-gor");

  var A = 16, DEPTH = 12;
  var EDGE = ["#9db2d4", "#8aa0c4", "#7890b6", "#6982a8", "#5c7599", "#51698b", "#475e7e", "#3e5372", "#364966", "#2e3f5a", "#26354d", "#0b111d"];
  var tx = 0, ty = 0, raf = 0, rect = null, seen = true;
  function draw() {
    raf = 0;
    ph.style.transform = "perspective(1000px) rotateX(" + (-ty * A).toFixed(2) + "deg) rotateY(" + (tx * A).toFixed(2) + "deg)";
    // толщина: слои корпуса уходят в сторону, противоположную наклону
    // металлический торец: ближние слои светлее, дальние темнее
    var sh = [], dx = -tx * 1.6, dy = ty * 1.6, i, c;
    for (i = 1; i <= DEPTH; i++) { c = EDGE[i - 1]; sh.push((dx * i).toFixed(1) + "px " + (dy * i).toFixed(1) + "px 0 " + c); }
    sh.push((dx * 22).toFixed(0) + "px " + (26 + dy * 16).toFixed(0) + "px 50px -16px rgba(0,0,0,.7)");
    sh.push("0 0 0 1px rgba(127,178,236,.2) inset");
    ph.style.boxShadow = sh.join(",");
    sheen.style.transform = "translate(" + (tx * 30).toFixed(1) + "%," + (ty * 20).toFixed(1) + "%)";
    if (toast) toast.style.translate = (tx * 26).toFixed(1) + "px " + (ty * 18).toFixed(1) + "px";
    if (gor) gor.style.translate = (-tx * 8).toFixed(1) + "px 0";
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
      tx = Math.max(-1, Math.min(1, (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2 + 160)));
      ty = Math.max(-1, Math.min(1, (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2 + 160)));
      wrap.classList.add("tilting"); queue();
    }, { passive: true });
    area.addEventListener("pointerleave", function () { wrap.classList.remove("tilting"); tx = -0.5; ty = 0.2; queue(); }, { passive: true });
    tx = -0.5; ty = 0.2; queue(); // в покое телефон стоит чуть повёрнутым — объём виден сразу
  } else {
    // телефон: медленный поворот туда-обратно + наклон от прокрутки первого экрана; ~30 кадров/с, только пока виден
    var hero = document.querySelector(".hero"), hh = hero ? hero.offsetHeight : innerHeight, p = 0, odd = false, loop = 0;
    window.addEventListener("scroll", function () { p = Math.min(1, scrollY / hh); }, { passive: true });
    var step = function (t) {
      loop = 0;
      if (!seen || document.hidden) return;
      odd = !odd;
      if (odd) { tx = Math.sin(t / 1500) * 1.1; ty = Math.cos(t / 2300) * 0.3 - p * 0.8; draw(); }
      loop = requestAnimationFrame(step);
    };
    var go = function () { if (!loop && seen && !document.hidden) loop = requestAnimationFrame(step); };
    document.addEventListener("visibilitychange", go);
    if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { seen = e[0].isIntersecting; go(); }).observe(ph);
    go();
  }
  // блик — только пока телефон на экране
  if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { seen = e[0].isIntersecting; wrap.classList.toggle("idle", seen); }).observe(ph);
})();
/* персонажи двигаются только когда видны на экране (иначе анимация на паузе — браузер не тратит силы) */
(function () {
  if (!("IntersectionObserver" in window)) return;
  var l = document.querySelectorAll(".niche-gor, .st-px, .ski, .gr-px, .ca-gor");
  document.documentElement.classList.add("px-io");
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle("px-go", e.isIntersecting); }); });
  for (var i = 0; i < l.length; i++) io.observe(l[i]);
})();
