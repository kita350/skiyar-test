/* Живой телефон в первом экране: сценарий 23:47 проигрывается сам по кругу.
   Шаги: 0 сообщение → 1 «печатает» → 2 автоответ → 3 запись создана → 4 напоминание.
   Пауза, когда телефон не виден или вкладка скрыта. prefers-reduced-motion — сразу последний кадр. */
(function () {
  "use strict";
  var box = document.getElementById("live");
  if (!box) return;
  var els = box.querySelectorAll("[data-step]"), dots = box.querySelectorAll(".lv-dots li"), clock = box.querySelector(".lv-time");
  var AT = [500, 1400, 2500, 4100, 5600], LOOP = 9200, CLOCK = ["23:47", "23:47", "23:47", "23:48", "18:00"];
  var timers = [], running = false;
  function show(n) {
    for (var i = 0; i < els.length; i++) {
      var s = +els[i].getAttribute("data-step");
      els[i].classList.toggle("on", s <= n && !(s === 1 && n >= 2));
    }
    for (i = 0; i < dots.length; i++) dots[i].classList.toggle("on", i <= Math.max(0, n - 1));
    if (clock) clock.textContent = CLOCK[Math.max(0, n)];
  }
  function stop() { timers.forEach(clearTimeout); timers = []; running = false; }
  function play() {
    if (running) return; running = true;
    (function cycle() {
      show(-1);
      AT.forEach(function (t, i) { timers.push(setTimeout(function () { show(i); }, t)); });
      timers.push(setTimeout(cycle, LOOP));
    })();
  }
  var still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches, seen = true;
  // перезапуск сценария с начала (смена ниши в assets/niche.js)
  box.restartLive = function () { if (still) { show(4); return; } stop(); if (seen && !document.hidden) play(); };
  if (still) { show(4); return; }
  box.classList.add("is-live");
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (e) { seen = e[0].isIntersecting; if (seen && !document.hidden) play(); else stop(); }, { threshold: 0.25 }).observe(box);
    document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else if (seen) play(); });
  } else play();
})();
