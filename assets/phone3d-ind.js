/* «Под вашу отрасль» — тот же 3D-телефон, что на первом экране (кадры Blender + экран через matrix3d).
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
    // строка состояния, как у настоящего телефона: время, сеть, Wi-Fi, батарея
    screen.insertAdjacentHTML("afterbegin", '<div class="p3-sb" aria-hidden="true"><b>9:41</b><span class="sbi"><svg viewBox="0 0 18 12" width="17" height="11"><rect x="0" y="8" width="3" height="4" rx=".8"/><rect x="5" y="5.5" width="3" height="6.5" rx=".8"/><rect x="10" y="3" width="3" height="9" rx=".8"/><rect x="15" y="0" width="3" height="12" rx=".8"/></svg><svg viewBox="0 0 16 12" width="15" height="11"><path d="M8 12 5.6 9.1a3.7 3.7 0 0 1 4.8 0z"/><path d="M3.9 7.1a6.4 6.4 0 0 1 8.2 0l-1.1 1.3a4.7 4.7 0 0 0-6 0z"/><path d="M1.6 4.4a9.9 9.9 0 0 1 12.8 0l-1.1 1.3a8.2 8.2 0 0 0-10.6 0z"/></svg><svg viewBox="0 0 27 12" width="25" height="11"><rect x=".6" y=".6" width="22.4" height="10.8" rx="3.2" fill="none" stroke="currentColor" stroke-width="1.1" opacity=".45"/><rect x="2.2" y="2.2" width="17" height="7.6" rx="1.8"/><path d="M24.3 4.2v3.6a2 2 0 0 0 0-3.6z" opacity=".45"/></svg></span></div>');
    // второй слой — соседний кадр с прозрачностью = доля между кадрами: поворот плавный, без «ступенек»
    var img2 = document.createElement("img"); img2.className = "lv-3d lv-3d2"; img2.alt = ""; img2.setAttribute("aria-hidden", "true"); img2.width = J.w; img2.height = J.h; img2.style.opacity = "0";
    box.appendChild(img); box.appendChild(img2); box.appendChild(screen); wrap.replaceChild(box, old);
    items.push({ wrap: wrap, box: box, img: img, img2: img2, scr: screen, pos: -1, target: 0, cur: -1, f0: -1, f1: -1 });
  });
  var cache = {};
  function src(f) { return base + "f" + (f < 10 ? "0" : "") + f + ".webp"; }
  function pre(f) { if (!cache[f]) { cache[f] = new Image(); cache[f].src = src(f); } }
  function draw(it, x) {
    if (Math.abs(x - it.cur) < 0.004) return; it.cur = x;
    var f0 = Math.floor(x), f1 = Math.min(N - 1, f0 + 1), a = x - f0;
    if (!(cache[f1] && cache[f1].complete)) a = 0; // соседний кадр ещё не загружен — без смешивания
    if (it.f0 !== f0) { it.f0 = f0; it.img.src = src(f0); }
    if (a > 0.01 && it.f1 !== f1) { it.f1 = f1; it.img2.src = src(f1); }
    it.img2.style.opacity = a > 0.01 ? a.toFixed(3) : "0";
    var k = it.box.clientWidth / J.w, c0 = J.corners[f0], c1 = J.corners[f1];
    var d = basis(c0.map(function (p, j) { return [(p[0] + (c1[j][0] - p[0]) * a) * k, (p[1] + (c1[j][1] - p[1]) * a) * k]; })), t = mm(d, SRCA), i;
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
      if (Math.abs(it.target - it.pos) < 0.01) it.pos = it.target; else again = true;
      draw(it, it.pos);
    });
    if (again) raf = requestAnimationFrame(tick);
  }
  function kick() { if (!raf) raf = requestAnimationFrame(tick); }
  window.addEventListener("scroll", kick, { passive: true });
  window.addEventListener("resize", function () { items.forEach(function (it) { it.cur = -1; }); kick(); }, { passive: true });
  // смена вкладки: новый телефон сразу в нужном кадре
  document.addEventListener("click", function (e) { if (e.target.closest && e.target.closest('[role="tab"]')) setTimeout(function () { items.forEach(function (it) { it.pos = -1; it.cur = -1; it.f0 = -1; it.f1 = -1; }); kick(); }, 0); });
  // кадры подгружаются, когда блок близко
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { for (var f = 0; f < N; f++) pre(f); io.disconnect(); } }, { rootMargin: "600px" });
    items.forEach(function (it) { io.observe(it.box); });
  }
  kick();
})();
