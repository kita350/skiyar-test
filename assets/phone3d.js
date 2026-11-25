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

  var DATA = {"w":900,"h":1350,"n":72,"corners":[[[160.84,106.17],[656.02,64.52],[717.4,1272.96],[234.04,1233.48]],[[161.56,106.09],[656.75,64.48],[716.84,1273.24],[233.25,1233.76]],[[162.24,105.97],[657.66,64.47],[716.34,1273.48],[232.33,1234.06]],[[162.85,105.82],[658.76,64.5],[715.92,1273.69],[231.26,1234.39]],[[163.42,105.63],[660.03,64.56],[715.58,1273.85],[230.07,1234.75]],[[163.92,105.42],[661.47,64.65],[715.31,1273.98],[228.74,1235.13]],[[164.38,105.17],[663.07,64.77],[715.12,1274.06],[227.3,1235.54]],[[164.77,104.89],[664.82,64.93],[715.0,1274.11],[225.74,1235.97]],[[165.11,104.58],[666.72,65.13],[714.96,1274.12],[224.07,1236.43]],[[165.4,104.24],[668.75,65.36],[714.99,1274.1],[222.3,1236.92]],[[165.65,103.87],[670.9,65.62],[715.09,1274.04],[220.44,1237.43]],[[165.84,103.47],[673.17,65.92],[715.25,1273.94],[218.49,1237.97]],[[166.0,103.04],[675.53,66.26],[715.49,1273.81],[216.48,1238.54]],[[166.11,102.58],[677.98,66.63],[715.78,1273.64],[214.4,1239.13]],[[166.2,102.1],[680.5,67.03],[716.12,1273.44],[212.26,1239.75]],[[166.25,101.6],[683.08,67.47],[716.51,1273.21],[210.09,1240.4]],[[166.28,101.06],[685.71,67.94],[716.95,1272.94],[207.88,1241.08]],[[166.29,100.51],[688.36,68.45],[717.43,1272.65],[205.65,1241.78]],[[166.29,99.93],[691.04,69.0],[717.94,1272.32],[203.41,1242.51]],[[166.28,99.33],[693.72,69.57],[718.48,1271.97],[201.18,1243.26]],[[166.27,98.7],[696.39,70.18],[719.04,1271.59],[198.96,1244.04]],[[166.26,98.06],[699.03,70.82],[719.61,1271.18],[196.77,1244.84]],[[166.26,97.4],[701.63,71.49],[720.19,1270.74],[194.62,1245.67]],[[166.28,96.73],[704.18,72.19],[720.77,1270.28],[192.51,1246.52]],[[166.31,96.03],[706.67,72.93],[721.35,1269.8],[190.47,1247.39]],[[166.37,95.33],[709.07,73.68],[721.92,1269.29],[188.51,1248.29]],[[166.46,94.61],[711.39,74.47],[722.47,1268.77],[186.62,1249.2]],[[166.59,93.88],[713.6,75.27],[723.0,1268.22],[184.83,1250.13]],[[166.75,93.14],[715.7,76.1],[723.51,1267.66],[183.15,1251.08]],[[166.95,92.39],[717.67,76.96],[723.98,1267.09],[181.57,1252.04]],[[167.2,91.64],[719.51,77.82],[724.42,1266.49],[180.12,1253.02]],[[167.49,90.88],[721.22,78.71],[724.83,1265.89],[178.8,1254.0]],[[167.84,90.11],[722.77,79.61],[725.19,1265.27],[177.62,1255.0]],[[168.23,89.35],[724.17,80.53],[725.51,1264.65],[176.57,1256.01]],[[168.68,88.59],[725.42,81.45],[725.78,1264.02],[175.68,1257.02]],[[169.18,87.83],[726.5,82.38],[726.01,1263.38],[174.93,1258.03]],[[169.73,87.07],[727.42,83.32],[726.19,1262.74],[174.34,1259.05]],[[170.33,86.32],[728.17,84.26],[726.32,1262.09],[173.91,1260.07]],[[170.98,85.58],[728.76,85.21],[726.4,1261.44],[173.63,1261.08]],[[171.68,84.84],[729.18,86.15],[726.43,1260.8],[173.51,1262.09]],[[172.42,84.12],[729.45,87.09],[726.42,1260.16],[173.55,1263.09]],[[173.21,83.41],[729.55,88.02],[726.37,1259.52],[173.74,1264.09]],[[174.03,82.71],[729.5,88.95],[726.28,1258.89],[174.07,1265.07]],[[174.88,82.03],[729.29,89.87],[726.15,1258.26],[174.56,1266.04]],[[175.76,81.36],[728.95,90.77],[725.98,1257.64],[175.18,1266.99]],[[176.67,80.72],[728.46,91.67],[725.79,1257.04],[175.94,1267.92]],[[177.59,80.09],[727.85,92.54],[725.56,1256.44],[176.83,1268.84]],[[178.52,79.49],[727.11,93.4],[725.32,1255.86],[177.83,1269.73]],[[179.46,78.91],[726.27,94.25],[725.06,1255.3],[178.94,1270.6]],[[180.4,78.35],[725.32,95.07],[724.79,1254.75],[180.15,1271.45]],[[181.32,77.82],[724.28,95.87],[724.52,1254.21],[181.44,1272.26]],[[182.24,77.32],[723.16,96.64],[724.24,1253.7],[182.82,1273.05]],[[183.13,76.84],[721.97,97.4],[723.97,1253.2],[184.26,1273.81]],[[183.99,76.4],[720.71,98.13],[723.71,1252.73],[185.75,1274.54]],[[184.82,75.98],[719.41,98.83],[723.47,1252.27],[187.29,1275.24]],[[185.6,75.59],[718.07,99.5],[723.25,1251.84],[188.86,1275.91]],[[186.34,75.24],[716.71,100.15],[723.06,1251.44],[190.44,1276.54]],[[187.02,74.92],[715.32,100.77],[722.89,1251.06],[192.03,1277.13]],[[187.64,74.63],[713.93,101.36],[722.77,1250.7],[193.61,1277.69]],[[188.2,74.38],[712.55,101.92],[722.69,1250.37],[195.17,1278.22]],[[188.69,74.16],[711.18,102.46],[722.65,1250.06],[196.7,1278.71]],[[189.11,73.97],[709.84,102.96],[722.66,1249.79],[198.18,1279.16]],[[189.45,73.82],[708.54,103.43],[722.72,1249.54],[199.61,1279.57]],[[189.71,73.71],[707.27,103.87],[722.84,1249.32],[200.98,1279.95]],[[189.88,73.63],[706.06,104.29],[723.02,1249.13],[202.27,1280.29]],[[189.97,73.59],[704.91,104.67],[723.26,1248.97],[203.48,1280.59]],[[189.97,73.59],[703.83,105.02],[723.56,1248.84],[204.59,1280.86]],[[189.89,73.63],[702.82,105.34],[723.91,1248.74],[205.6,1281.09]],[[189.72,73.71],[701.89,105.63],[724.33,1248.67],[206.5,1281.27]],[[189.46,73.82],[701.05,105.9],[724.81,1248.63],[207.28,1281.43]],[[189.13,73.97],[700.29,106.13],[725.35,1248.63],[207.94,1281.54]],[[188.71,74.16],[699.64,106.33],[725.95,1248.66],[208.48,1281.62]]]};
  var T0 = Date.now();
  window.SKIYAR_PH3D = DATA;
  start(DATA);

  function start(J) {
    var N = J.n, FW = J.w, FH = J.h, imgs = new Array(N), cur = -1, want = 0;
    var cv = document.createElement("img"); cv.className = "lv-3d"; cv.alt = ""; cv.setAttribute("aria-hidden", "true");
    cv.width = FW; cv.height = FH;
    ph.insertBefore(cv, scr);
    // второй слой: соседний кадр поверх с прозрачностью = доля между кадрами → поворот плавный на каждом кадре экрана, без «ступенек»
    var cv2 = document.createElement("img"); cv2.className = "lv-3d lv-3d2"; cv2.alt = ""; cv2.setAttribute("aria-hidden", "true");
    cv2.width = FW; cv2.height = FH; cv2.style.opacity = "0"; ph.insertBefore(cv2, scr);
    var curF = -1, cur2 = -1;
    var k = 1;
    document.documentElement.classList.add("ph3d");
    // детали настоящего телефона поверх живого экрана: островок камеры, строка ввода, значки сети
    scr.insertAdjacentHTML("beforeend", '<i class="lv-island" aria-hidden="true"></i><i class="lv-input" aria-hidden="true"></i><i class="lv-send" aria-hidden="true"></i>');
    // «Напоминание отправлено» — пуш-уведомление на самом экране телефона (поворачивается вместе с ним)
    var toast = box.querySelector(".lv-toast");
    if (toast) { scr.appendChild(toast); toast.insertAdjacentHTML("afterbegin", '<i class="lv-wa" aria-hidden="true"></i>'); }
    var dots = scr.querySelector(".lv-sb span[aria-hidden]");
    if (dots) dots.innerHTML = '<svg width="54" height="12" viewBox="0 0 54 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y=".5" width="3" height="11.5" rx="1"/><path d="M28 3.2a9 9 0 0 1 6.4 2.6l1.3-1.3a10.8 10.8 0 0 0-15.4 0l1.3 1.3A9 9 0 0 1 28 3.2zm0 3.4a5.6 5.6 0 0 1 4 1.6l1.3-1.3a7.4 7.4 0 0 0-10.6 0L24 8.2a5.6 5.6 0 0 1 4-1.6zm0 3.3a2 2 0 0 0-1.5.6L28 12l1.5-1.5a2 2 0 0 0-1.5-.6z"/><rect x="39.5" y="1.5" width="12" height="9" rx="2.5" fill="none" stroke="currentColor" stroke-opacity=".45"/><rect x="41" y="3" width="8" height="6" rx="1.3"/></svg>';

    function size() {
      k = ph.clientWidth / FW;
      cur = -1; cur2 = -1; curF = -1; paintF(pos);
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
    function paintF(x) {
      var f0 = Math.floor(x), f1 = Math.min(N - 1, f0 + 1), a = x - f0;
      if (!imgs[f0] || !imgs[f1]) { want = Math.round(x); paint(); return; }
      if (Math.abs(x - curF) < 0.004) return; curF = x;
      if (cur !== f0) { cur = f0; cv.src = imgs[f0].src; }
      if (cur2 !== f1) { cur2 = f1; cv2.src = imgs[f1].src; }
      cv2.style.opacity = a < 0.01 ? "0" : a.toFixed(3);
      var c0 = J.corners[f0], c1 = J.corners[f1];
      fit(c0.map(function (p, i) { return [p[0] + (c1[i][0] - p[0]) * a, p[1] + (c1[i][1] - p[1]) * a]; }));
    }
    function paint() {
      cv2.style.opacity = "0"; curF = -1;
      var f = want, g = want; while (f > 0 && !imgs[f]) f--; while (g < N - 1 && !imgs[g]) g++; if (!imgs[f] || (imgs[g] && g - want < want - f)) f = g; // нужный кадр ещё грузится — ближайший готовый
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
    // исходное положение — прямо (кадр ST ≈ 0°); телефон (касание): прокрутка поворачивает вправо до +22°
    var ST = Math.round(N * 0.56);
    function fromScroll() {
      var r = hero.getBoundingClientRect(), p = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height * 0.75)));
      return ST + p * (MOUSE.matches ? N - 1 - ST : 10); // телефон (касание): прокрутка лишь чуть сдвигает центр покачивания
    }
    // компьютер (мышь): телефон следует за курсором по горизонтали, ±21 кадр ≈ ±15°; прокрутка не поворачивает
    var MOUSE = matchMedia("(hover: hover) and (pointer: fine) and (min-width: 900px)");
    // плавность: показанный кадр догоняет нужный с замедлением (как инерция), а не прыгает за пальцем
    var pos = ST, target = ST;
    function glide() {
      raf = 0; if (intro) return;
      // сглаживание от прошедшего времени, а не от частоты экрана: одинаково на 60 и 144 Гц
      var now = performance.now(), dt = Math.min(64, now - (glide.t || now - 16.7)); glide.t = now;
      pos += (target - pos) * (1 - Math.pow(MOUSE.matches ? 0.88 : 0.84, dt / 16.7));
      if (Math.abs(target - pos) < 0.01) pos = target;
      // телефон (касание): во время прокрутки пальцем перерисовываем не чаще 30 раз в секунду — меньше нагрузки в Safari
      if (MOUSE.matches || pos === target || now - scrollAt > 160 || now - (glide.p || 0) >= 32) { glide.p = now; paintF(pos); }
      if (pos !== target) raf = requestAnimationFrame(glide); else glide.t = 0;
    }
    function go2(t) { target = t; if (!raf) raf = requestAnimationFrame(glide); }
    // телефон (касание): мягкое покачивание влево-вправо ±9 кадров (≈ ±6°) за 6 с, пока первый экран виден, — телефон «живой»
    var swayOn = false, heroVis = true;
    function sway() { return swayOn ? 12 * Math.sin(performance.now() / 5000 * 2 * Math.PI) : 0; }
    function aim() { return Math.max(0, Math.min(N - 1, fromScroll() + sway())); }
    function swayTick() { if (!swayOn) return; if (!intro) go2(aim()); requestAnimationFrame(swayTick); }
    function swayCheck() { var on = !still && !MOUSE.matches && heroVis; if (on && !swayOn) { swayOn = true; requestAnimationFrame(swayTick); } else if (!on) swayOn = false; }
    if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { heroVis = e[0].isIntersecting; swayCheck(); }).observe(ph);
    var scrollAt = 0;
    function onScroll() { scrollAt = performance.now(); if (still) return; // «уменьшить движение»: телефон стоит прямо
      go2(MOUSE.matches ? target : aim()); }
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mousemove", function (e) {
      if (still || !MOUSE.matches) return;
      go2(Math.max(0, Math.min(N - 1, ST + (e.clientX / innerWidth - 0.5) * 2 * 21)));
    }, { passive: true });
    document.documentElement.addEventListener("mouseleave", function () { if (!still && MOUSE.matches) go2(ST); });
    if (MOUSE.addEventListener) MOUSE.addEventListener("change", function () { swayCheck(); if (!still) go2(MOUSE.matches ? ST : aim()); });
    window.addEventListener("resize", function () { size(); }, { passive: true });

    var got = 1;
    want = ST;
    load(ST, function () {
      size();
      for (var i = 0; i < N; i++) if (i !== ST) load(i, function () { if (++got === N) startIntro(); });
    });
    cv.src = base + "f" + ST + ".webp"; size(); fit(J.corners[ST]); cur = ST; // сразу первый кадр: место под телефон занято с первой отрисовки
    window.addEventListener("load", function () { size(); }, { once: true });
    function startIntro() {
      if (still) return;
      var r = ph.getBoundingClientRect();
      if (Date.now() - T0 > 2500 || r.top > innerHeight * 0.55 || r.bottom < 0) { onScroll(); return; } // долго грузилось или телефон не на экране — без «появления»
      {
        // появление: телефон за 1,4 с разворачивается из середины поворота в исходное положение
        intro = 1; var t0 = 0, from = 24;
        var go = function (t) {
          if (!t0) t0 = t;
          var p = Math.min(1, (t - t0) / 1200), e = 1 - Math.pow(1 - p, 3);
          paintF(from + (ST - from) * e);
          if (p < 1) requestAnimationFrame(go); else { intro = 0; pos = ST; onScroll(); }
        };
        if (window.scrollY > 40) { intro = 0; onScroll(); return; } // уже прокрутили — без появления
        requestAnimationFrame(go);
      }
    }
  }
})();
