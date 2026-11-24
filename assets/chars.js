/* ПРОБНЫЙ САЙТ: у персонажей есть эмоции.
   Моргание (Гор, Лусине, робот) — раз в 2,5–5 с. В «Истории записи» лица меняются по шагам:
   Рузан злится (салон закрыт) → удивляется автоответу → радуется записи; Нарине (Лусине) удивляется, потом радуется;
   Гор в конце доволен. В калькуляторе Гор паникует при больших потерях и радуется при маленьких.
   Робот иногда улыбается. Анимации на паузе, когда персонажа не видно. */
(function () {
  "use strict";
  var still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function dir(img) { return img.getAttribute("src").replace(/[^\/]*$/, ""); }
  var pre = {};
  function preload(img, names) { names.forEach(function (n) { var k = dir(img) + n; if (!pre[k]) { pre[k] = new Image(); pre[k].src = k; } }); }
  function setSrc(img, name) { var s = dir(img) + name; if (img.getAttribute("src") !== s) img.setAttribute("src", s); }

  // кто есть кто: базовый кадр, моргание, радость
  var who = {
    gor: { base: "hero-gor-1x.png", blink: "emo-gor-blink.png", happy: "emo-gor-happy.png" },
    lusine: { base: "hero-lusine-1x.png", blink: "emo-lusine-blink.png", happy: "emo-lusine-happy.png", wow: "emo-lusine-wow.png" },
    ski: { base: "hero-ski-1x.png", blink: "emo-ski-blink.png", happy: "emo-ski-happy.png" },
    ruzan: { base: "hero-ruzan-1x.png", angry: "emo-ruzan-angry.png", wow: "emo-ruzan-wow.png", happy: "emo-ruzan-happy.png" }
  };
  var list = [];
  [].forEach.call(document.querySelectorAll("img.px"), function (img) {
    var m = /hero-(gor|lusine|ski|ruzan)-1x\.png$/.exec(img.getAttribute("src"));
    if (!m) return;
    var c = { img: img, w: who[m[1]], mood: "base", vis: false };
    img.dataset.who = m[1]; list.push(c);
    preload(img, Object.keys(c.w).map(function (k) { return c.w[k]; }));
  });
  // облачко над головой: эмоцию видно даже на маленьком персонаже (у Рузан глаза за очками)
  var BUB = { angry: "!!", wow: "!", happy: "♥" };
  function show(c) {
    setSrc(c.img, c.w[c.mood]);
    if (!c.img.classList.contains("st-px")) return;
    if (!c.bub) { c.bub = document.createElement("span"); c.bub.className = "emo-bub"; c.bub.setAttribute("aria-hidden", "true"); c.img.parentNode.appendChild(c.bub); }
    var t = BUB[c.mood] || "";
    c.bub.textContent = t; c.bub.className = "emo-bub emo-" + c.mood + (t && c.img.classList.contains("on") ? " on" : "");
    c.bub.style.left = (c.img.offsetLeft + c.img.offsetWidth * 0.62) + "px"; c.bub.style.top = (c.img.offsetTop - 8) + "px";
  }
  function mood(c, m, ms) {
    if (!c.w[m]) return;
    c.mood = m; show(c); clearTimeout(c.t);
    if (ms) c.t = setTimeout(function () { c.mood = "base"; show(c); }, ms);
  }
  // видимость
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { list.forEach(function (c) { if (c.img === e.target) c.vis = e.isIntersecting; }); }); });
    list.forEach(function (c) { io.observe(c.img); });
  } else list.forEach(function (c) { c.vis = true; });

  // моргание: только у тех, у кого видны глаза, и только в спокойном настроении
  if (!still) (function blinkLoop() {
    list.forEach(function (c) {
      if (!c.vis || c.mood !== "base" || !c.w.blink || Math.random() < 0.45) return;
      setSrc(c.img, c.w.blink); setTimeout(function () { if (c.mood === "base") show(c); }, 140);
    });
    setTimeout(blinkLoop, 2500 + Math.random() * 2500);
  })();

  // робот иногда улыбается
  if (!still) setInterval(function () { list.forEach(function (c) { if (c.vis && c.img.dataset.who === "ski" && c.mood === "base" && Math.random() < 0.5) mood(c, "happy", 1600); }); }, 5000);

  // Гор у кнопок ниш радуется выбору
  document.addEventListener("click", function (e) {
    if (!e.target.closest || !e.target.closest(".niche-b")) return;
    list.forEach(function (c) { if (c.img.classList.contains("niche-gor")) mood(c, "happy", 1400); });
  });

  // «История записи»: эмоции по шагам
  var STORY = { ruzan: { 1: "angry", 2: "wow", 3: "happy", 5: "happy" }, lusine: { 4: "wow" }, gor: { 6: "happy" } };
  document.addEventListener("story:step", function (e) {
    var s = e.detail;
    list.forEach(function (c) {
      if (!c.img.classList.contains("st-px")) return;
      var m = (STORY[c.img.dataset.who] || {})[s] || "base";
      mood(c, m);
      if (c.img.dataset.who === "lusine" && s === 4) c.t = setTimeout(function () { mood(c, "happy"); }, 1200); // увидела запись — обрадовалась
    });
  });
  // первый шаг уже на экране при загрузке
  list.forEach(function (c) { if (c.img.classList.contains("st-px") && c.img.dataset.who === "ruzan") mood(c, "angry"); });

  // калькулятор: Гор паникует, грустит или радуется в зависимости от потерь
  var ca = document.querySelector(".ca-gor");
  if (ca) {
    preload(ca, ["gor-panic.png", "gor-neutral.png", "gor-joy.png"]);
    var caMood = function (d) { var r = d.loss / Math.max(1, d.price); setSrc(ca, r >= 3 ? "gor-panic.png" : r >= 1 ? "gor-neutral.png" : "gor-joy.png"); };
    document.addEventListener("calc:loss", function (e) { caMood(e.detail); });
    if (window.SKIYAR_LOSS) caMood(window.SKIYAR_LOSS); // калькулятор уже посчитал до нас
  }

  // анимации движения — только когда персонаж виден
  if ("IntersectionObserver" in window) {
    var l = document.querySelectorAll(".niche-gor, .st-px, .ski, .gr-px, .ca-gor");
    document.documentElement.classList.add("px-io");
    var io2 = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle("px-go", e.isIntersecting); }); });
    for (var i = 0; i < l.length; i++) io2.observe(l[i]);
  }
})();
