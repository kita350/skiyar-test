/* ПРОБНЫЙ САЙТ: «Под вашу отрасль» — тот же 3D-телефон, что на первом экране (кадры Blender + экран через matrix3d).
   Скриншот демо-сайта вписан по ширине экрана. Телефон поворачивается, пока блок проходит экран (−28° → +22°),
   кадр догоняет прокрутку плавно. Скрытые вкладки не считаются; при смене вкладки — сразу нужный кадр.
   При «уменьшить движение» — телефон стоит прямо, без поворота. */
(function () {
  "use strict";
  var J = window.SKIYAR_PH3D, phones = document.querySelectorAll(".in-phone");
  if (!J || !phones.length) return;
  var base = (document.querySelector('link[rel="stylesheet"][href*="assets/"]') || {}).getAttribute("href").replace(/assets\/.*$/, "") + "assets/img/phone3d/";
  var still = matchMedia("(prefers-reduced-motion: reduce)").matches, N = J.n, SW = 300, SH = 636;
  function adj(m) { return [m[4]*m[8]-m[5]*m[7], m[2]*m[7]-m[1]*m[8], m[1]*m[5]-m[2]*m[4], m[5]*m[6]-m[3]*m[8], m[0]*m[8]-m[2]*m[6], m[2]*m[3]-m[0]*m[5], m[3]*m[7]-m[4]*m[6], m[1]*m[6]-m[0]*m[7], m[0]*m[4]-m[1]*m[3]]; }
  function mm(a, b) { var c = [], i, j, s, t; for (i = 0; i < 3; i++) for (j = 0; j < 3; j++) { s = 0; for (t = 0; t < 3; t++) s += a[3*i+t] * b[3*t+j]; c[3*i+j] = s; } return c; }
  function mv(m, v) { return [m[0]*v[0]+m[1]*v[1]+m[2]*v[2], m[3]*v[0]+m[4]*v[1]+m[5]*v[2], m[6]*v[0]+m[7]*v[1]+m[8]*v[2]]; }
  function basis(p) { var m = [p[0][0], p[1][0], p[2][0], p[0][1], p[1][1], p[2][1], 1, 1, 1], v = mv(adj(m), [p[3][0], p[3][1], 1]); return mm(m, [v[0],0,0, 0,v[1],0, 0,0,v[2]]); }
  var SRCA = adj(basis([[0, 0], [SW, 0], [SW, SH], [0, SH]]));
  var STRAIGHT = Math.round(N * 0.56); // кадр, где телефон смотрит прямо (поворот −28°…+22°)
  var items = [];
  [].forEach.call(phones, function (wrap) {
    var old = wrap.querySelector(".phone"), screen = old && old.querySelector(".screen");
    if (!screen) return;
    var box = document.createElement("div"); box.className = "p3";
    var img = document.createElement("img"); img.className = "lv-3d"; img.alt = ""; img.setAttribute("aria-hidden", "true"); img.width = J.w; img.height = J.h; img.src = base + "f00.webp";
    screen.classList.add("p3-screen");
    screen.insertAdjacentHTML("beforeend", '<i class="lv-island" aria-hidden="true"></i>');
    box.appendChild(img); box.appendChild(screen); wrap.replaceChild(box, old);
    items.push({ wrap: wrap, box: box, img: img, scr: screen, pos: -1, target: 0, cur: -1 });
  });
  var cache = {};
  function src(f) { return base + "f" + (f < 10 ? "0" : "") + f + ".webp"; }
  function pre(f) { if (!cache[f]) { cache[f] = new Image(); cache[f].src = src(f); } }
  function draw(it, f) {
    if (f === it.cur) return; it.cur = f;
    it.img.src = src(f);
    var k = it.box.clientWidth / J.w;
    var d = basis(J.corners[f].map(function (p) { return [p[0] * k, p[1] * k]; })), t = mm(d, SRCA), i;
    for (i = 0; i < 9; i++) t[i] /= t[8];
    it.scr.style.transform = "matrix3d(" + [t[0], t[3], 0, t[6], t[1], t[4], 0, t[7], 0, 0, 1, 0, t[2], t[5], 0, t[8]].map(function (x) { return +x.toFixed(6); }).join(",") + ")";
  }
  function targetOf(it) {
    if (still) return STRAIGHT;
    var r = it.box.getBoundingClientRect(), c = r.top + r.height / 2;
    var p = Math.max(0, Math.min(1, 1 - c / innerHeight)); // центр у низа экрана — 0, у верха — 1
    return p * (N - 1);
  }
  var raf = 0;
  function tick() {
    raf = 0; var again = false;
    items.forEach(function (it) {
      if (!it.box.offsetParent) return; // вкладка скрыта
      it.target = targetOf(it);
      if (it.pos < 0 || still) it.pos = it.target;
      it.pos += (it.target - it.pos) * 0.16;
      if (Math.abs(it.target - it.pos) < 0.05) it.pos = it.target; else again = true;
      draw(it, Math.round(it.pos));
    });
    if (again) raf = requestAnimationFrame(tick);
  }
  function kick() { if (!raf) raf = requestAnimationFrame(tick); }
  window.addEventListener("scroll", kick, { passive: true });
  window.addEventListener("resize", function () { items.forEach(function (it) { it.cur = -1; }); kick(); }, { passive: true });
  // смена вкладки: новый телефон сразу в нужном кадре
  document.addEventListener("click", function (e) { if (e.target.closest && e.target.closest('[role="tab"]')) setTimeout(function () { items.forEach(function (it) { it.pos = -1; it.cur = -1; }); kick(); }, 0); });
  // кадры подгружаются, когда блок близко
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { for (var f = 0; f < N; f++) pre(f); io.disconnect(); } }, { rootMargin: "600px" });
    items.forEach(function (it) { io.observe(it.box); });
  }
  kick();
})();
