/* ПРОБНЫЙ САЙТ (ветка site-mock-tilt; на основной — только после «ок» основателя).
   Телефон первого экрана «как у Apple»: корпус — кадры рендера Blender (assets/img/phone3d/fNN.webp),
   при прокрутке телефон поворачивается (кадр выбирается по прокрутке первого экрана), при загрузке — плавно «встаёт» на место.
   Живой экран с перепиской (HTML, ниши и языки работают) кладётся поверх: для каждого кадра известны 4 угла экрана
   (corners.json из Blender), экран натягивается на них через matrix3d. Без JS и при «уменьшить движение» — первый кадр без анимации. */
(function () {
  "use strict";
  var box = document.getElementById("live");
  var wrap = box && box.querySelector(".lv-box"), ph = box && box.querySelector(".lv-phone"), scr = ph && ph.querySelector(".lv-screen");
  if (!scr || !window.fetch) return;
  var base = (document.querySelector('link[rel="stylesheet"][href*="assets/"]') || {}).getAttribute("href").replace(/assets\/.*$/, "") + "assets/img/phone3d/";
  var still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SW = 300, SH = 636; // размер живого экрана в CSS-пикселях (пропорции экрана модели)

  var DATA = {"w":900,"h":1350,"n":36,"corners":[[[160.84,106.17],[656.02,64.52],[717.4,1272.96],[234.04,1233.48]],[[162.25,105.96],[657.69,64.47],[716.33,1273.49],[232.3,1234.07]],[[163.45,105.62],[660.11,64.56],[715.56,1273.86],[229.99,1234.77]],[[164.41,105.15],[663.21,64.79],[715.11,1274.07],[227.17,1235.57]],[[165.15,104.54],[666.95,65.15],[714.96,1274.12],[223.87,1236.49]],[[165.68,103.81],[671.22,65.66],[715.11,1274.03],[220.16,1237.51]],[[166.02,102.96],[675.94,66.32],[715.53,1273.78],[216.12,1238.64]],[[166.21,102.0],[681.01,67.11],[716.19,1273.4],[211.83,1239.88]],[[166.28,100.94],[686.31,68.06],[717.06,1272.88],[207.37,1241.24]],[[166.29,99.77],[691.73,69.14],[718.08,1272.23],[202.84,1242.7]],[[166.27,98.52],[697.15,70.36],[719.2,1271.47],[198.33,1244.27]],[[166.26,97.19],[702.44,71.71],[720.37,1270.6],[193.95,1245.94]],[[166.33,95.79],[707.5,73.18],[721.54,1269.63],[189.79,1247.7]],[[166.5,94.34],[712.22,74.76],[722.67,1268.57],[185.95,1249.54]],[[166.82,92.84],[716.5,76.44],[723.7,1267.43],[182.5,1251.46]],[[167.32,91.31],[720.26,78.2],[724.6,1266.24],[179.54,1253.44]],[[168.01,89.77],[723.43,80.03],[725.34,1264.99],[177.12,1255.46]],[[168.92,88.22],[725.96,81.9],[725.9,1263.71],[175.29,1257.51]],[[170.03,86.68],[727.83,83.81],[726.26,1262.4],[174.1,1259.57]],[[171.36,85.18],[729.01,85.72],[726.42,1261.09],[173.55,1261.63]],[[172.87,83.71],[729.52,87.62],[726.4,1259.79],[173.64,1263.66]],[[174.54,82.3],[729.39,89.5],[726.2,1258.51],[174.35,1265.65]],[[176.33,80.95],[728.66,91.34],[725.86,1257.26],[175.65,1267.58]],[[178.2,79.69],[727.38,93.11],[725.41,1256.06],[177.47,1269.43]],[[180.1,78.53],[725.63,94.81],[724.88,1254.92],[179.76,1271.18]],[[181.98,77.46],[723.49,96.42],[724.32,1253.84],[182.42,1272.83]],[[183.77,76.51],[721.04,97.94],[723.78,1252.85],[185.36,1274.36]],[[185.42,75.68],[718.38,99.35],[723.3,1251.94],[188.5,1275.76]],[[186.89,74.98],[715.6,100.65],[722.92,1251.13],[191.71,1277.02]],[[188.11,74.42],[712.79,101.83],[722.7,1250.42],[194.9,1278.13]],[[189.05,73.99],[710.03,102.89],[722.65,1249.82],[197.97,1279.1]],[[189.68,73.72],[707.41,103.82],[722.83,1249.34],[200.83,1279.91]],[[189.96,73.6],[705.01,104.64],[723.23,1248.98],[203.38,1280.57]],[[189.9,73.63],[702.87,105.32],[723.89,1248.74],[205.54,1281.07]],[[189.47,73.81],[701.07,105.89],[724.8,1248.63],[207.26,1281.42]],[[188.71,74.16],[699.64,106.33],[725.95,1248.66],[208.48,1281.62]]]};
  var T0 = Date.now();
  start(DATA);

  function start(J) {
    var N = J.n, FW = J.w, FH = J.h, imgs = new Array(N), cur = -1, want = 0;
    var cv = document.createElement("img"); cv.className = "lv-3d"; cv.alt = ""; cv.setAttribute("aria-hidden", "true");
    cv.width = FW; cv.height = FH;
    ph.insertBefore(cv, scr);
    var k = 1;
    document.documentElement.classList.add("ph3d");
    // детали настоящего телефона поверх живого экрана: островок камеры, строка ввода, значки сети
    scr.insertAdjacentHTML("beforeend", '<i class="lv-island" aria-hidden="true"></i><i class="lv-input" aria-hidden="true"></i><i class="lv-send" aria-hidden="true"></i>');
    var dots = scr.querySelector(".lv-sb span[aria-hidden]");
    if (dots) dots.innerHTML = '<svg width="54" height="12" viewBox="0 0 54 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y=".5" width="3" height="11.5" rx="1"/><path d="M28 3.2a9 9 0 0 1 6.4 2.6l1.3-1.3a10.8 10.8 0 0 0-15.4 0l1.3 1.3A9 9 0 0 1 28 3.2zm0 3.4a5.6 5.6 0 0 1 4 1.6l1.3-1.3a7.4 7.4 0 0 0-10.6 0L24 8.2a5.6 5.6 0 0 1 4-1.6zm0 3.3a2 2 0 0 0-1.5.6L28 12l1.5-1.5a2 2 0 0 0-1.5-.6z"/><rect x="39.5" y="1.5" width="12" height="9" rx="2.5" fill="none" stroke="currentColor" stroke-opacity=".45"/><rect x="41" y="3" width="8" height="6" rx="1.3"/></svg>';

    function size() {
      k = ph.clientWidth / FW;
      cur = -1; paint();
    }
    // матрица, переводящая прямоугольник экрана в 4 угла кадра
    function adj(m) { return [m[4]*m[8]-m[5]*m[7], m[2]*m[7]-m[1]*m[8], m[1]*m[5]-m[2]*m[4], m[5]*m[6]-m[3]*m[8], m[0]*m[8]-m[2]*m[6], m[2]*m[3]-m[0]*m[5], m[3]*m[7]-m[4]*m[6], m[1]*m[6]-m[0]*m[7], m[0]*m[4]-m[1]*m[3]]; }
    function mm(a, b) { var c = [], i, j, s, t; for (i = 0; i < 3; i++) for (j = 0; j < 3; j++) { s = 0; for (t = 0; t < 3; t++) s += a[3*i+t] * b[3*t+j]; c[3*i+j] = s; } return c; }
    function mv(m, v) { return [m[0]*v[0]+m[1]*v[1]+m[2]*v[2], m[3]*v[0]+m[4]*v[1]+m[5]*v[2], m[6]*v[0]+m[7]*v[1]+m[8]*v[2]]; }
    function basis(p) { var m = [p[0][0], p[1][0], p[2][0], p[0][1], p[1][1], p[2][1], 1, 1, 1], v = mv(adj(m), [p[3][0], p[3][1], 1]); return mm(m, [v[0],0,0, 0,v[1],0, 0,0,v[2]]); }
    var SRC = basis([[0, 0], [SW, 0], [SW, SH], [0, SH]]), SRCA = adj(SRC);
    function fit(c) {
      var d = basis(c.map(function (p) { return [p[0] * k, p[1] * k]; })), t = mm(d, SRCA), i;
      for (i = 0; i < 9; i++) t[i] /= t[8];
      scr.style.transform = "matrix3d(" + [t[0], t[3], 0, t[6], t[1], t[4], 0, t[7], 0, 0, 1, 0, t[2], t[5], 0, t[8]].map(function (x) { return +x.toFixed(6); }).join(",") + ")";
    }
    function paint() {
      var f = want; while (f > 0 && !imgs[f]) f--; // нужный кадр ещё грузится — ближайший готовый
      if (!imgs[f] || f === cur) return;
      cur = f; cv.src = imgs[f].src; fit(J.corners[f]);
    }
    // кадр считается готовым только после распаковки (decode) — иначе браузер распаковывает его посреди прокрутки
    function load(i, cb) {
      var im = new Image(); im.decoding = "async"; im.src = base + "f" + (i < 10 ? "0" : "") + i + ".webp";
      var done = function () { imgs[i] = im; if (cb) cb(); if (Math.abs(i - want) < 2) paint(); };
      if (im.decode) im.decode().then(done, function () {}); else im.onload = done;
    }

    // прокрутка: 0 — телефон повёрнут влево, к концу первого экрана — развернулся вправо
    var hero = document.querySelector(".hero"), raf = 0, intro = 0;
    function fromScroll() {
      var r = hero.getBoundingClientRect(), p = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height * 0.75)));
      return Math.round(p * (N - 1));
    }
    function onScroll() { if (!raf) raf = requestAnimationFrame(function () { raf = 0; if (intro) return; want = fromScroll(); paint(); }); }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", function () { size(); }, { passive: true });

    var got = 1;
    load(0, function () {
      size();
      for (var i = 1; i < N; i++) load(i, function () { if (++got === N) startIntro(); });
    });
    cv.src = base + "f00.webp"; size(); fit(J.corners[0]); cur = 0; // сразу первый кадр: место под телефон занято с первой отрисовки
    window.addEventListener("load", function () { size(); }, { once: true });
    function startIntro() {
      if (still) return;
      var r = ph.getBoundingClientRect();
      if (Date.now() - T0 > 2500 || r.top > innerHeight * 0.55 || r.bottom < 0) { onScroll(); return; } // долго грузилось или телефон не на экране — без «появления»
      {
        // появление: телефон за 1,4 с разворачивается из середины поворота в исходное положение
        intro = 1; var t0 = 0, from = Math.round(N * 0.6);
        var go = function (t) {
          if (!t0) t0 = t;
          var p = Math.min(1, (t - t0) / 1400), e = 1 - Math.pow(1 - p, 3);
          want = Math.round(from * (1 - e)); paint();
          if (p < 1) requestAnimationFrame(go); else { intro = 0; onScroll(); }
        };
        if (window.scrollY > 40) { intro = 0; onScroll(); return; } // уже прокрутили — без появления
        requestAnimationFrame(go);
      }
    }
  }
})();
