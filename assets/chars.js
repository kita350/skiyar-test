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
  [].forEach.call(document.querySelectorAll("img.px:not(.ca-gor)"), function (img) {
    var m = /hero-(gor|lusine|ski|ruzan)-1x\.png$/.exec(img.getAttribute("src"));
    if (!m) return;
    var c = { img: img, w: who[m[1]], mood: "base", vis: false };
    img.dataset.who = m[1]; list.push(c);
    preload(img, Object.keys(c.w).map(function (k) { return c.w[k]; }));
  });
  // облачко над головой: эмоцию видно даже на маленьком персонаже (у Рузан глаза за очками)
  var BUB = { angry: "!!", wow: "!", happy: "♥︎" };
  function show(c) {
    setSrc(c.img, c.w[c.mood]);
    if (!c.img.classList.contains("st-px")) return;
    if (!c.bub) { c.bub = document.createElement("i"); c.bub.className = "emo-bub"; c.bub.setAttribute("aria-hidden", "true"); c.img.parentNode.appendChild(c.bub); }
    var t = c.noBub ? "" : (BUB[c.mood] || "");
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
      if (!c.vis || c.busy || c.mood !== "base" || !c.w.blink || Math.random() < 0.45 || Date.now() - (c.gestAt || 0) < 1800) return;
      c.blinkAt = Date.now();
      setSrc(c.img, c.w.blink); setTimeout(function () { if (c.mood === "base") show(c); }, 140);
    });
    setTimeout(blinkLoop, 2500 + Math.random() * 2500);
  })();

  // действия: настоящие кадры движений. Машут только Гор и робот; у остальных своё дело:
  // Рузан смотрит в телефон или из сумки выглядывает собачка, Лусине говорит в гарнитуру и печатает на планшете,
  // встревоженный Гор — по щеке стекает капля пота. В «Истории» действие идёт с лицом текущей эмоции.
  function rep(a, b, n) { var r = []; for (var i = 0; i < n; i++) r.push(i % 2 ? b : a); return r; }
  var GEST = {
    gor: function (m) { return m === "base" ? [rep("emo-gor-wave1.png", "emo-gor-wave2.png", 6)] : null; },
    ski: function (m) { return m === "base" ? [rep("emo-ski-wave1.png", "emo-ski-wave2.png", 6)] : null; },
    gorfree: function () { return [rep("emo-gor-free-wave1.png", "emo-gor-free-wave2.png", 6)]; },
    gorworry: function () { return [["emo-gor-sweat1.png", "emo-gor-sweat2.png", "emo-gor-sweat3.png", "emo-gor-sweat4.png", "emo-gor-sweat4.png", "emo-gor-worry.png"]]; },
    ruzan: function (m) {
      var p = m === "base" ? "emo-ruzan-" : "emo-ruzan-" + m + "-";
      var dog = [p + "dog1.png", p + "dog2.png", p + "dog2.png", p + "dog3.png", p + "dog2.png", p + "dog1.png"];
      return m === "base" ? [dog, rep("emo-ruzan-phone1.png", "emo-ruzan-phone2.png", 5)] : [dog];
    },
    lusine: function (m) {
      if (m === "base") return [["emo-lusine-type1.png", "emo-lusine-talk2.png", "emo-lusine-talk1.png", "emo-lusine-type2.png", "emo-lusine-talk1.png", "emo-lusine-type2.png", "emo-lusine-type1.png"]];
      if (m === "happy") return [rep("emo-lusine-happy-type1.png", "emo-lusine-happy-type2.png", 6)];
      return null;
    }
  };
  function seqs(c) { var g = GEST[c.img.dataset.who]; return g ? g(c.mood) : null; }
  list.forEach(function (c) {
    ["base", "angry", "wow", "happy"].forEach(function (m) { (GEST[c.img.dataset.who] ? GEST[c.img.dataset.who](m) || [] : []).forEach(function (q) { preload(c.img, q); }); });
  });
  function gesture(c) {
    var all = seqs(c); if (!all || c.busy) return;
    if (Date.now() - (c.blinkAt || 0) < 600) return; // не сразу после моргания
    var fr = all[Math.floor(Math.random() * all.length)];
    c.busy = true; c.gestAt = Date.now(); var i = 0, m0 = c.mood;
    (function next() {
      if (i < fr.length && c.vis && c.mood === m0) { setSrc(c.img, fr[i++]); setTimeout(next, 200); }
      else { c.busy = false; show(c); }
    })();
  }
  if (!still) (function gestLoop() {
    // в «Истории» — только у персонажа текущего шага
    var vis = list.filter(function (c) { return c.vis && !c.busy && (!c.img.classList.contains("st-px") || c.img.classList.contains("on")) && !!seqs(c); });
    if (vis.length) gesture(vis[Math.floor(Math.random() * vis.length)]);
    setTimeout(gestLoop, 2600 + Math.random() * 2400);
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
      c.noBub = s >= 5; // по ТЗ облачка только на шагах 1–4
      mood(c, m);
      if (c.img.dataset.who === "lusine" && s === 4) c.t = setTimeout(function () { mood(c, "happy"); }, 1200); // увидела запись — обрадовалась
    });
  });
  // первый шаг уже на экране при загрузке
  list.forEach(function (c) { if (c.img.classList.contains("st-px") && c.img.dataset.who === "ruzan") mood(c, "angry"); });

  // «Как было — как стало»
  [].forEach.call(document.querySelectorAll(".gr-px"), function (img) {
    var free = /emo-gor-free/.test(img.getAttribute("src"));
    var b = document.createElement("i"); b.className = "emo-bub gr-bub on emo-" + (free ? "happy" : "angry"); b.textContent = free ? BUB.happy : BUB.angry; b.setAttribute("aria-hidden", "true");
    img.parentNode.style.position = "relative"; img.parentNode.appendChild(b);
    b.style.left = (img.offsetLeft + img.offsetWidth * 0.62) + "px"; b.style.top = Math.max(0, img.offsetTop - 22) + "px";
    window.addEventListener("resize", function () { b.style.left = (img.offsetLeft + img.offsetWidth * 0.62) + "px"; b.style.top = Math.max(0, img.offsetTop - 22) + "px"; });
    if (!free) {
      var cw = { img: img, w: { base: "emo-gor-worry.png" }, mood: "base", vis: false };
      img.dataset.who = "gorworry"; list.push(cw); GEST.gorworry().forEach(function (q) { preload(img, q); });
      if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { cw.vis = e[0].isIntersecting; }).observe(img); else cw.vis = true;
    }
    if (free) {
      var c = { img: img, w: { base: "emo-gor-free-hi.png" }, mood: "base", vis: false };
      img.dataset.who = "gorfree"; list.push(c); preload(img, GEST.gorfree()[0].concat(["emo-gor-free-hi.png"]));
      if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { c.vis = e[0].isIntersecting; }).observe(img); else c.vis = true;
    }
  });

  // калькулятор: Гор паникует, грустит или радуется в зависимости от потерь
  var ca = document.querySelector(".ca-gor");
  if (ca) {
    // в калькуляторе тот же маленький Гор: потери большие — встревожен, средние — спокоен, маленькие — рад
    preload(ca, ["emo-gor-worry.png", "hero-gor-1x.png", "emo-gor-happy.png"]);
    var caBub = document.createElement("i"); caBub.className = "emo-bub ca-bub"; caBub.setAttribute("aria-hidden", "true"); ca.parentNode.appendChild(caBub);
    // калькулятор: свой Гор. Встревожен — стекает пот, спокоен — иногда машет, рад — просто рад
    var caM = "base", caBusy = false, caVis = false;
    var caFace = function () { if (!caBusy) setSrc(ca, caM === "angry" ? "emo-gor-worry.png" : caM === "happy" ? "emo-gor-happy.png" : "hero-gor-1x.png"); };
    preload(ca, GEST.gorworry()[0].concat(GEST.gor("base")[0]));
    if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { caVis = e[0].isIntersecting; }).observe(ca); else caVis = true;
    if (!still) (function caLoop() {
      var fr = caM === "angry" ? GEST.gorworry()[0] : caM === "base" ? GEST.gor("base")[0] : null;
      if (fr && caVis && !caBusy) {
        caBusy = true; var i = 0, m0 = caM;
        (function next() { if (i < fr.length && caM === m0 && caVis) { setSrc(ca, fr[i++]); setTimeout(next, 200); } else { caBusy = false; caFace(); } })();
      }
      setTimeout(caLoop, 3000 + Math.random() * 2500);
    })();
    var caMood = function (d) {
      var r = d.loss / Math.max(1, d.price), m = r >= 3 ? "angry" : r >= 1 ? "base" : "happy";
      caM = m; caFace();
      caBub.textContent = BUB[m] || ""; caBub.className = "emo-bub ca-bub emo-" + m + (BUB[m] ? " on" : "");
      caPos();
    };
    // облачко прямо над головой Гора, а не в углу карточки
    var caPos = function () {
      var p = ca.offsetParent; if (!p) return;
      if (p !== ca.parentNode && getComputedStyle(ca.parentNode).position === "static") ca.parentNode.style.position = "relative";
      caBub.style.left = (ca.offsetLeft + ca.offsetWidth * 0.5 - 6) + "px"; caBub.style.top = (ca.offsetTop - 30) + "px";
    };
    window.addEventListener("resize", caPos);
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
