/* ПРОБНЫЙ САЙТ: «Одна запись от начала до конца» — тот же 3D-корпус, что на первом экране, но неподвижный:
   кадр, где телефон стоит прямо. Экран истории натягивается на экран рендера через matrix3d.
   Здесь же: «Три языка» — нажатие на строку меняет скриншот в карточке на месте, без перехода на другую страницу. */
(function () {
  "use strict";
  // «Три языка»: скриншот меняется на месте (ловим клик раньше общего переключателя языка в site.js)
  var shots = document.querySelector(".t-lang .shots");
  // при загрузке подсвечена строка языка страницы
  if (shots) { var pl = document.documentElement.lang || "hy"; shots.setAttribute("data-show", pl);
    [].forEach.call(document.querySelectorAll(".t-lang [data-lang-btn]"), function (x) { x.setAttribute("aria-pressed", String(x.getAttribute("data-lang-btn") === pl)); }); }
  if (shots) document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".t-lang [data-lang-btn]");
    if (!b) return;
    e.preventDefault(); e.stopImmediatePropagation();
    var l = b.getAttribute("data-lang-btn");
    shots.setAttribute("data-show", l);
    [].forEach.call(document.querySelectorAll(".t-lang [data-lang-btn]"), function (x) { x.setAttribute("aria-pressed", String(x === b)); });
  }, true);

  var J = window.SKIYAR_PH3D, ph = document.querySelector(".st-ph-box .phone"), scr = ph && ph.querySelector(".screen");
  if (!J || !scr) return;
  var base = (document.querySelector('link[rel="stylesheet"][href*="assets/"]') || {}).getAttribute("href").replace(/assets\/.*$/, "") + "assets/img/phone3d/";
  var F = Math.round(J.n * 0.56), C = J.corners[F]; // кадр «прямо»
  function adj(m) { return [m[4]*m[8]-m[5]*m[7], m[2]*m[7]-m[1]*m[8], m[1]*m[5]-m[2]*m[4], m[5]*m[6]-m[3]*m[8], m[0]*m[8]-m[2]*m[6], m[2]*m[3]-m[0]*m[5], m[3]*m[7]-m[4]*m[6], m[1]*m[6]-m[0]*m[7], m[0]*m[4]-m[1]*m[3]]; }
  function mm(a, b) { var c = [], i, j, s, t; for (i = 0; i < 3; i++) for (j = 0; j < 3; j++) { s = 0; for (t = 0; t < 3; t++) s += a[3*i+t] * b[3*t+j]; c[3*i+j] = s; } return c; }
  function mv(m, v) { return [m[0]*v[0]+m[1]*v[1]+m[2]*v[2], m[3]*v[0]+m[4]*v[1]+m[5]*v[2], m[6]*v[0]+m[7]*v[1]+m[8]*v[2]]; }
  function basis(p) { var m = [p[0][0], p[1][0], p[2][0], p[0][1], p[1][1], p[2][1], 1, 1, 1], v = mv(adj(m), [p[3][0], p[3][1], 1]); return mm(m, [v[0],0,0, 0,v[1],0, 0,0,v[2]]); }
  // размеры в координатах .phone (до масштаба --k): экран 244×526 с отступом 10 px
  var SW = 244, SH = 526, P = 10, s = SW / (C[1][0] - C[0][0]);
  var img = document.createElement("img"); img.className = "st-3d"; img.alt = ""; img.setAttribute("aria-hidden", "true");
  img.width = J.w; img.height = J.h; img.src = base + "f" + F + ".webp";
  var L = P - C[0][0] * s, T = P - C[0][1] * s;
  img.style.cssText = "left:" + L.toFixed(2) + "px;top:" + T.toFixed(2) + "px;width:" + (J.w * s).toFixed(2) + "px;height:" + (J.h * s).toFixed(2) + "px";
  ph.classList.add("p3s"); ph.insertBefore(img, ph.firstChild);
  scr.insertAdjacentHTML("beforeend", '<i class="lv-island st-island" aria-hidden="true"></i>');
  // строка состояния как на первом телефоне: связь и Wi-Fi рядом с батареей
  [].forEach.call(scr.querySelectorAll(".sb i"), function (i) { i.insertAdjacentHTML("beforebegin", '<span class="sb-ic" aria-hidden="true"><svg width="54" height="12" viewBox="0 0 54 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y=".5" width="3" height="11.5" rx="1"/><path d="M28 3.2a9 9 0 0 1 6.4 2.6l1.3-1.3a10.8 10.8 0 0 0-15.4 0l1.3 1.3A9 9 0 0 1 28 3.2zm0 3.4a5.6 5.6 0 0 1 4 1.6l1.3-1.3a7.4 7.4 0 0 0-10.6 0L24 8.2a5.6 5.6 0 0 1 4-1.6zm0 3.3a2 2 0 0 0-1.5.6L28 12l1.5-1.5a2 2 0 0 0-1.5-.6z"/><rect x="39.5" y="1.5" width="12" height="9" rx="2.5" fill="none" stroke="currentColor" stroke-opacity=".45"/><rect x="41" y="3" width="8" height="6" rx="1.3"/></svg></span>'); });
  var d = basis(C.map(function (p) { return [p[0] * s + L - P, p[1] * s + T - P]; })), t = mm(d, adj(basis([[0, 0], [SW, 0], [SW, SH], [0, SH]]))), i;
  for (i = 0; i < 9; i++) t[i] /= t[8];
  scr.style.transformOrigin = "0 0";
  scr.style.transform = "matrix3d(" + [t[0], t[3], 0, t[6], t[1], t[4], 0, t[7], 0, 0, 1, 0, t[2], t[5], 0, t[8]].map(function (x) { return +x.toFixed(6); }).join(",") + ")";
  // подпись шага: высота по самой длинной подписи на этом языке — без лишней пустоты под короткими
  function capsH() { var c = document.querySelector(".st-caps"); if (!c) return; var m = 0; [].forEach.call(c.querySelectorAll(".cap"), function (x) { m = Math.max(m, x.offsetHeight); }); if (m) c.style.minHeight = m + "px"; }
  capsH(); window.addEventListener("resize", capsH); window.addEventListener("load", capsH); if (document.fonts && document.fonts.ready) document.fonts.ready.then(capsH);
})();
