/* Общий код демо-сайтов SKIYAR.
   - персонализация из ссылки: ?name=, ?city=, ?lang=hy|ru|en
   - переключение языков, плашка «Пример сайта от SKIYAR»
   - заявки только через ссылку wa.me с готовым текстом.
   Ничего не сохраняется и не отправляется на сервер. Параметры из ссылки
   вставляются только как текст (textContent), не как HTML. */
(function () {
  "use strict";
  var P = new URLSearchParams(location.search);
  function clean(s) {
    return (s || "").replace(/[\u0000-\u001f\u007f<>{}]/g, "").replace(/\s+/g, " ").trim().slice(0, 60);
  }
  var LANGS = ["hy", "ru", "en"];
  var LOCALE = { hy: "hy-AM", ru: "ru-RU", en: "en-GB" };
  var HY_MONTHS = ["հունվարի", "փետրվարի", "մարտի", "ապրիլի", "մայիսի", "հունիսի", "հուլիսի", "օգոստոսի", "սեպտեմբերի", "հոկտեմբերի", "նոյեմբերի", "դեկտեմբերի"];
  var HY_WD = ["կիրակի", "երկուշաբթի", "երեքշաբթի", "չորեքշաբթի", "հինգշաբթի", "ուրբաթ", "շաբաթ"];
  var HY_WD_SHORT = ["կիր", "երկ", "երք", "չրք", "հնգ", "ուրբ", "շբթ"];

  // Частые города и курорты Армении: латиница из ссылки → название на языке страницы.
  var CITIES = {
    yerevan: ["Երևան", "Ереван", "Yerevan"], gyumri: ["Գյումրի", "Гюмри", "Gyumri"],
    vanadzor: ["Վանաձոր", "Ванадзор", "Vanadzor"], dilijan: ["Դիլիջան", "Дилижан", "Dilijan"],
    tsaghkadzor: ["Ծաղկաձոր", "Цахкадзор", "Tsaghkadzor"], sevan: ["Սևան", "Севан", "Sevan"],
    jermuk: ["Ջերմուկ", "Джермук", "Jermuk"], goris: ["Գորիս", "Горис", "Goris"],
    abovyan: ["Աբովյան", "Абовян", "Abovyan"], hrazdan: ["Հրազդան", "Раздан", "Hrazdan"],
    vagharshapat: ["Վաղարշապատ", "Вагаршапат", "Vagharshapat"], echmiadzin: ["Էջմիածին", "Эчмиадзин", "Etchmiadzin"],
    kapan: ["Կապան", "Капан", "Kapan"], ijevan: ["Իջևան", "Иджеван", "Ijevan"],
    yeghegnadzor: ["Եղեգնաձոր", "Ехегнадзор", "Yeghegnadzor"], ashtarak: ["Աշտարակ", "Аштарак", "Ashtarak"],
    artashat: ["Արտաշատ", "Арташат", "Artashat"], armavir: ["Արմավիր", "Армавир", "Armavir"],
    charentsavan: ["Չարենցավան", "Чаренцаван", "Charentsavan"], stepanavan: ["Ստեփանավան", "Степанаван", "Stepanavan"],
    alaverdi: ["Ալավերդի", "Алаверди", "Alaverdi"], sisian: ["Սիսիան", "Сисиан", "Sisian"],
    areni: ["Արենի", "Арени", "Areni"], garni: ["Գառնի", "Гарни", "Garni"], aghveran: ["Աղվերան", "Агверан", "Aghveran"]
  };

  // Необязательные публичные данные лида — только из ссылки, в репозиторий не попадают.
  // Каждое значение проверяется по строгому шаблону; неподходящее просто игнорируется.
  function pick(name, re) { var v = (P.get(name) || "").trim(); return re.test(v) ? v : ""; }
  var hoursRaw = pick("hours", /^\d{1,2}:\d{2}-\d{1,2}:\d{2}$/);
  var LEAD = {
    wa: pick("wa", /^\d{8,15}$/),                       // WhatsApp заведения, цифры с кодом страны
    ig: pick("ig", /^[A-Za-z0-9._]{1,60}$/),            // имя профиля Instagram
    fb: pick("fb", /^[A-Za-z0-9.]{1,80}$/),             // имя страницы Facebook
    hours: hoursRaw ? hoursRaw.split("-") : null,       // ежедневно «10:00-23:00»
    rating: pick("rating", /^[0-5](\.\d)?$/),           // рейтинг Google
    reviews: pick("reviews", /^\d{1,5}$/)               // число отзывов
  };

  var langParam = (P.get("lang") || "").toLowerCase();
  var D = (window.DEMO = {
    name: clean(P.get("name")),
    cityRaw: clean(P.get("city")),
    lead: LEAD,
    // +37494764642 → «+374 94 764 642»
    phone: function (d) { return d.indexOf("374") === 0 && d.length === 11 ? "+374 " + d.slice(3, 5) + " " + d.slice(5, 8) + " " + d.slice(8) : "+" + d; },
    lang: LANGS.indexOf(langParam) >= 0 ? langParam : "hy",
    dict: null,
    onRender: null,
    city: function (l) {
      if (!D.cityRaw) return "";
      var k = D.cityKey();
      return k ? CITIES[k][LANGS.indexOf(l || D.lang)] : D.cityRaw;
    },
    // Ключ города из ссылки в любом написании: «Yerevan», «Ереван», «Երևան» → "yerevan"; неизвестный город → "".
    cityKey: function () {
      var raw = (D.cityRaw || "").toLowerCase();
      var lat = raw.replace(/[^a-z]/g, "");
      if (CITIES[lat]) return lat;
      var norm = raw.replace(/[\s\-.]/g, "").replace(/ե՛|եւ/g, "և");
      for (var k in CITIES) {
        for (var i = 0; i < 2; i++) if (CITIES[k][i].toLowerCase().replace(/[\s\-.]/g, "") === norm) return k;
      }
      return "";
    },
    // Фон-заглушка в средний цвет фото (window.IMG_BG из img/colors.js), пока картинка грузится.
    bg: function (name) { var c = (window.IMG_BG || {})[name]; return c ? "background-color:" + c : ""; },
    locale: function () { return LOCALE[D.lang]; },
    // Текст по ключу с подстановкой {name}, {city}, {place} и своих значений.
    t: function (key, vars) {
      var d = D.dict[D.lang] || {};
      var s = d[key];
      if (s == null) s = (D.dict.ru || {})[key];
      if (s == null) return "";
      var v = {
        name: D.name || d._noName || "",
        city: D.city() || d._noCity || "",
        place: D.city() ? (d._inCity || "{city}").replace("{city}", D.city()) : (d._noCityPlace || "")
      };
      if (vars) for (var k in vars) v[k] = vars[k];
      return String(s).replace(/\{(\w+)\}/g, function (m, k) { return v[k] != null ? v[k] : m; });
    },
    // Даты: для армянского — свой формат (в части браузеров нет армянских данных Intl).
    // mode: "long" — день недели, число, месяц; "dm" — число и месяц; "wd" — короткий день недели.
    date: function (d, mode) {
      if (D.lang === "hy") {
        if (mode === "wd") return HY_WD_SHORT[d.getDay()];
        var dm = d.getDate() + " " + HY_MONTHS[d.getMonth()];
        return mode === "long" ? dm + ", " + HY_WD[d.getDay()] : dm;
      }
      var o = mode === "wd" ? { weekday: "short" } : mode === "long" ? { weekday: "long", day: "numeric", month: "long" } : { day: "numeric", month: "long" };
      return new Intl.DateTimeFormat(LOCALE[D.lang], o).format(d);
    },
    // Разряды тонким пробелом во всех языках: 64 000 ֏
    fmtNum: function (n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " "); },
    price: function (n) { return D.fmtNum(n) + " ֏"; },
    // Горизонтальная лента (вкладки, даты): затухание у краёв и стрелка «›», пока есть что листать.
    // Кнопка-стрелка ищется по data-scroll-for="<id ленты>".
    scrollHint: function (el) {
      if (!el) return;
      var btn = document.querySelector('[data-scroll-for="' + el.id + '"]');
      function upd() {
        var max = el.scrollWidth - el.clientWidth;
        var r = el.scrollLeft < max - 4;
        el.classList.toggle("fade-l", el.scrollLeft > 4);
        el.classList.toggle("fade-r", r);
        if (btn) btn.hidden = !r;
      }
      if (!el._hint) {
        el._hint = true;
        el.addEventListener("scroll", upd, { passive: true });
        window.addEventListener("resize", upd);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(upd);
        if (btn) btn.addEventListener("click", function () {
          var still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
          el.scrollBy({ left: Math.max(160, el.clientWidth * 0.7), behavior: still ? "auto" : "smooth" });
        });
      }
      upd();
    },
    cap: function (s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; },
    wa: function (text) { return "https://wa.me/?text=" + encodeURIComponent(text); },
    render: function () {
      document.documentElement.lang = D.lang;
      document.body.setAttribute("data-lang", D.lang);
      var els = document.querySelectorAll("[data-i]");
      for (var i = 0; i < els.length; i++) els[i].textContent = D.t(els[i].getAttribute("data-i"));
      els = document.querySelectorAll("[data-i-aria]");
      for (i = 0; i < els.length; i++) els[i].setAttribute("aria-label", D.t(els[i].getAttribute("data-i-aria")));
      els = document.querySelectorAll("[data-i-alt]");
      for (i = 0; i < els.length; i++) els[i].setAttribute("alt", D.t(els[i].getAttribute("data-i-alt")));
      els = document.querySelectorAll("[data-lang-btn]");
      for (i = 0; i < els.length; i++) els[i].setAttribute("aria-pressed", String(els[i].getAttribute("data-lang-btn") === D.lang));
      var t = D.t("_title");
      if (t) document.title = t;
      renderBanner();
      if (D.onRender) D.onRender();
    },
    setLang: function (l) {
      if (LANGS.indexOf(l) < 0) return;
      D.lang = l;
      var u = new URL(location.href);
      u.searchParams.set("lang", l);
      history.replaceState(null, "", u);
      D.render();
    },
    init: function (dict, onRender) {
      D.dict = dict;
      D.onRender = onRender || null;
      document.addEventListener("click", function (e) {
        var b = e.target.closest && e.target.closest("[data-lang-btn]");
        if (b) { e.preventDefault(); D.setLang(b.getAttribute("data-lang-btn")); }
      });
      D.render();
    }
  });

  // Плашка SKIYAR: постоянно сверху, со ссылкой на WhatsApp SKIYAR.
  var BANNER = {
    hy: ["Կայքի օրինակ SKIYAR-ից — այսպես կարող է լինել ձեր կայքը", "Գրել SKIYAR-ին", "Բարև ձեզ։ Տեսա կայքի օրինակը ({demo})։ Ուզում եմ նման կայք{forName}։", " «{name}»-ի համար"],
    ru: ["Пример сайта от SKIYAR — так может выглядеть ваш сайт", "Написать SKIYAR", "Здравствуйте! Посмотрел(а) пример сайта ({demo}). Хочу такой сайт{forName}.", " для «{name}»"],
    en: ["A sample website by SKIYAR — this is how your site could look", "Message SKIYAR", "Hello! I saw the sample website ({demo}). I'd like a site like this{forName}.", " for “{name}”"]
  };
  function renderBanner() {
    var el = document.getElementById("skiyar-bar");
    if (!el) {
      el = document.createElement("div");
      el.id = "skiyar-bar";
      el.setAttribute("role", "note");
      el.innerHTML = '<span class="skb-t"></span><a class="skb-a" target="_blank" rel="noopener"></a>';
      document.body.insertBefore(el, document.body.firstChild);
    }
    var b = BANNER[D.lang];
    el.querySelector(".skb-t").textContent = b[0];
    var a = el.querySelector(".skb-a");
    a.textContent = b[1];
    a.style.display = "inline-flex"; a.style.alignItems = "center"; a.style.minHeight = "44px"; // зона нажатия ≥ 44 px
    // split/join вместо replace: имя из ссылки может содержать «$&» и т.п.
    var forName = D.name ? b[3].split("{name}").join(D.name) : "";
    var msg = b[2].split("{demo}").join(location.href.split("?")[0]).split("{forName}").join(forName);
    a.href = "https://wa.me/37498337187?text=" + encodeURIComponent(msg);
  }
})();
