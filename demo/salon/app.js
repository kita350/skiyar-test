/* Демо салона. Тексты HY — на проверку Ани (помечены в PR). */
(function () {
  "use strict";
  var D = window.DEMO;

  var I18N = {
    hy: {
      _title: "{name} — առցանց գրանցում", _noName: "Ձեր սրահը",
      brand: "{name}", h1: "{name}", langAria: "Կայքի լեզուն",
      kind: "Գեղեցկության սրահ", kindCity: "Գեղեցկության սրահ, {city}",
      lead: "Սանրվածք, ներկում, մատնահարդարում և խնամք։ Ընտրեք վարպետին և ժամը հենց այստեղ՝ հաստատումը կգա WhatsApp-ով։",
      ctaBook: "Գրանցվել առցանց", ctaPrices: "Գներ",
      today: "Այսօր բաց ենք {from}–{to}",
      pricesTitle: "Ծառայություններ և գներ",
      pricesSub: "Գները մոտավոր են․ վերջնական արժեքը վարպետը կասի խորհրդատվությունից հետո։ Սեղմեք ծառայության վրա՝ անմիջապես գրանցվելու համար։",
      cat_hair: "Մազեր", cat_nails: "Եղունգներ", cat_care: "Հոնքեր և խնամք",
      min: "{n} րոպե", from: "{p}-ից",
      mastersTitle: "Վարպետներ", mastersSub: "Յուրաքանչյուր վարպետ աշխատում է իր ուղղությամբ. գրանցվելիս կարող եք ընտրել կոնկրետ մարդու կամ ցանկացած ազատ վարպետի։",
      exp: "{n} տարվա փորձ",
      bookTitle: "Առցանց գրանցում", bookSub: "Չորս քայլ՝ մոտ մեկ րոպե։ Հայտը կուղարկվի սրահի WhatsApp-ին։",
      step1: "Ծառայություն", step2: "Վարպետ", step3: "Ամսաթիվ", step4: "Ժամ",
      anyMaster: "Ցանկացած ազատ վարպետ", pickService: "Նախ ընտրեք ծառայությունը", pickDate: "Նախ ընտրեք ամսաթիվը",
      noSlots: "Այս օրը ազատ ժամ չկա. ընտրեք այլ օր", todayShort: "Այսօր",
      sumEmpty: "Ընտրեք ծառայությունը, վարպետին, ամսաթիվը և ժամը։",
      sumFull: "{service}, {master}, {date}, ժամը {time}",
      bookBtn: "Գրանցվել",
      waNote: "Օրինակում WhatsApp-ը բացվում է առանց համարի։ Ձեր կայքում հայտը կգա անմիջապես ձեր WhatsApp-ին։",
      waMsg: "Բարև ձեզ։ Ուզում եմ գրանցվել{inName}։\nԾառայություն՝ {service}\nՎարպետ՝ {master}\nԱմսաթիվ՝ {date}\nԺամ՝ {time}",
      inName: " «{name}»-ում",
      galleryTitle: "Վարպետների աշխատանքները", gallerySub: "Այստեղ կլինեն ձեր վարպետների իրական աշխատանքների լուսանկարները։",
      contactsTitle: "Ինչպես գտնել մեզ", hoursTitle: "Աշխատանքային ժամեր", monSat: "Երկուշաբթի – շաբաթ", sun: "Կիրակի",
      addrTitle: "Հասցե", addr: "Այստեղ կլինի սրահի հասցեն", addrCity: "{city}, այստեղ կլինի սրահի հասցեն",
      addrNote: "Քարտեզի հղումով, որ հաճախորդը մեկ սեղմումով կառուցի երթուղին։",
      igText: "Այստեղ կլինի ձեր էջի հղումը", waText: "Այստեղ կլինի ձեր համարը",
      footer: "Սա կայքի օրինակ է SKIYAR-ից։ Անունները, գները և ժամերը՝ օրինակի համար։",
      credits: "Լուսանկարներ՝ Unsplash (ազատ լիցենզիա)",
      altHero: "Սրահի ինտերիեր՝ կամար և կանաչ բույսեր", altCurls: "Ալիքավոր հարդարում", altNails: "Մատնահարդարում",
      altCurl: "Վարպետը գանգրացնում է մազերը", altRoom: "Լվացման տեղ և բազկաթոռ սրահում", altMaster: "Վարպետի աշխատանքը"
    },
    ru: {
      _title: "{name} — онлайн-запись", _noName: "Ваш салон",
      brand: "{name}", h1: "{name}", langAria: "Язык сайта",
      kind: "Салон красоты", kindCity: "Салон красоты, {city}",
      lead: "Стрижки, окрашивание, маникюр и уход. Выберите мастера и время прямо здесь — подтверждение придёт в WhatsApp.",
      ctaBook: "Записаться онлайн", ctaPrices: "Цены",
      today: "Сегодня открыто {from}–{to}",
      pricesTitle: "Услуги и цены",
      pricesSub: "Цены ориентировочные: точную стоимость мастер назовёт после консультации. Нажмите на услугу, чтобы сразу записаться.",
      cat_hair: "Волосы", cat_nails: "Ногти", cat_care: "Брови и уход",
      min: "{n} мин", from: "от {p}",
      mastersTitle: "Мастера", mastersSub: "У каждого мастера своё направление. При записи можно выбрать конкретного человека или любого свободного.",
      exp: "Опыт {n} лет",
      bookTitle: "Онлайн-запись", bookSub: "Четыре шага, около минуты. Заявка уйдёт в WhatsApp салона.",
      step1: "Услуга", step2: "Мастер", step3: "Дата", step4: "Время",
      anyMaster: "Любой свободный мастер", pickService: "Сначала выберите услугу", pickDate: "Сначала выберите дату",
      noSlots: "На этот день свободного времени нет — выберите другой", todayShort: "Сегодня",
      sumEmpty: "Выберите услугу, мастера, дату и время.",
      sumFull: "{service}, {master}, {date}, в {time}",
      bookBtn: "Записаться",
      waNote: "В демо WhatsApp откроется без номера. На вашем сайте заявка придёт сразу в ваш WhatsApp.",
      waMsg: "Здравствуйте! Хочу записаться{inName}.\nУслуга: {service}\nМастер: {master}\nДата: {date}\nВремя: {time}",
      inName: " в «{name}»",
      galleryTitle: "Работы мастеров", gallerySub: "Здесь будут фотографии настоящих работ ваших мастеров.",
      contactsTitle: "Как нас найти", hoursTitle: "Часы работы", monSat: "Понедельник — суббота", sun: "Воскресенье",
      addrTitle: "Адрес", addr: "Здесь будет адрес салона", addrCity: "{city}, здесь будет адрес салона",
      addrNote: "Со ссылкой на карту, чтобы клиент построил маршрут в одно касание.",
      igText: "Здесь будет ссылка на ваш профиль", waText: "Здесь будет ваш номер",
      footer: "Это пример сайта от SKIYAR. Имена, цены и часы — для примера.",
      credits: "Фото: Unsplash (свободная лицензия)",
      altHero: "Интерьер салона: арка и живые растения", altCurls: "Укладка локонами", altNails: "Маникюр",
      altCurl: "Мастер завивает волосы", altRoom: "Мойка и кресло в салоне", altMaster: "Работа мастера"
    },
    en: {
      _title: "{name} — book online", _noName: "Your salon",
      brand: "{name}", h1: "{name}", langAria: "Site language",
      kind: "Beauty salon", kindCity: "Beauty salon, {city}",
      lead: "Haircuts, colour, nails and care. Pick a master and a time right here — confirmation comes on WhatsApp.",
      ctaBook: "Book online", ctaPrices: "Prices",
      today: "Open today {from}–{to}",
      pricesTitle: "Services and prices",
      pricesSub: "Prices are a guide; your master confirms the exact cost after a consultation. Tap a service to book it straight away.",
      cat_hair: "Hair", cat_nails: "Nails", cat_care: "Brows and care",
      min: "{n} min", from: "from {p}",
      mastersTitle: "Masters", mastersSub: "Each master has their own speciality. When booking, choose a specific person or anyone available.",
      exp: "{n} years’ experience",
      bookTitle: "Book online", bookSub: "Four steps, about a minute. Your request goes to the salon’s WhatsApp.",
      step1: "Service", step2: "Master", step3: "Date", step4: "Time",
      anyMaster: "Any available master", pickService: "Choose a service first", pickDate: "Choose a date first",
      noSlots: "No free time this day — try another", todayShort: "Today",
      sumEmpty: "Choose a service, master, date and time.",
      sumFull: "{service}, {master}, {date} at {time}",
      bookBtn: "Book",
      waNote: "In this demo WhatsApp opens without a number. On your site, requests go straight to your WhatsApp.",
      waMsg: "Hello! I’d like to book{inName}.\nService: {service}\nMaster: {master}\nDate: {date}\nTime: {time}",
      inName: " at “{name}”",
      galleryTitle: "Recent work", gallerySub: "Photos of your masters’ real work go here.",
      contactsTitle: "Find us", hoursTitle: "Opening hours", monSat: "Monday to Saturday", sun: "Sunday",
      addrTitle: "Address", addr: "Your salon’s address goes here", addrCity: "{city}, your salon’s address goes here",
      addrNote: "With a map link, so clients get directions in one tap.",
      igText: "Your profile link goes here", waText: "Your number goes here",
      footer: "This is a sample website by SKIYAR. Names, prices and hours are examples.",
      credits: "Photos: Unsplash (free licence)",
      altHero: "Salon interior with an arch and plants", altCurls: "Soft curls styling", altNails: "Manicure",
      altCurl: "A master curling hair", altRoom: "Wash station and chair in the salon", altMaster: "A master at work"
    }
  };

  // Услуги: [id, категория, минуты, цена, «от», hy, ru, en]
  var SERVICES = [
    ["cut", "hair", 60, 8000, 1, "Կանացի սանրվածք", "Женская стрижка", "Women’s haircut"],
    ["mcut", "hair", 40, 5000, 0, "Տղամարդու սանրվածք", "Мужская стрижка", "Men’s haircut"],
    ["style", "hair", 45, 6000, 0, "Հարդարում", "Укладка", "Blow-dry and styling"],
    ["tone", "hair", 120, 18000, 1, "Միագույն ներկում", "Окрашивание в один тон", "Single-colour dye"],
    ["balayage", "hair", 240, 35000, 1, "Բալայաժ, էյրթաչ", "Балаяж, airtouch", "Balayage, airtouch"],
    ["treat", "hair", 60, 14000, 0, "Մազերի խնամքի պրոցեդուրա", "Уход для волос", "Hair treatment"],
    ["gel", "nails", 90, 9000, 0, "Մատնահարդարում գել-լաքով", "Маникюр с гель-лаком", "Manicure with gel polish"],
    ["mani", "nails", 45, 5000, 0, "Մատնահարդարում առանց ծածկույթի", "Маникюр без покрытия", "Manicure, no polish"],
    ["pedi", "nails", 75, 10000, 0, "Ոտնահարդարում", "Педикюр", "Pedicure"],
    ["brows", "care", 30, 4000, 0, "Հոնքերի ձևավորում", "Оформление бровей", "Brow shaping"],
    ["face", "care", 60, 15000, 0, "Դեմքի խնամք", "Уход за лицом", "Facial"],
    ["massage", "care", 40, 12000, 0, "Մեջքի մերսում", "Массаж спины", "Back massage"]
  ];
  // Мастера: [id, фото, лет опыта, категории, hy/ru/en имя, hy/ru/en роль]
  var MASTERS = [
    ["lilit", "color", 9, ["hair"], ["Լիլիթ", "Лилит", "Lilit"], ["Կոլորիստ, բարդ ներկում", "Колорист, сложное окрашивание", "Colourist, balayage and airtouch"]],
    ["mariam", "blow", 6, ["hair"], ["Մարիամ", "Мариам", "Mariam"], ["Սանրվածքներ և հարդարում", "Стрижки и укладки", "Cuts and styling"]],
    ["narine", "mani", 7, ["nails"], ["Նարինե", "Нарине", "Narine"], ["Մատնահարդարում և ոտնահարդարում", "Маникюр и педикюр", "Manicure and pedicure"]],
    ["sona", "massage", 5, ["care"], ["Սոնա", "Сона", "Sona"], ["Հոնքեր, դեմքի խնամք, մերսում", "Брови, уход за лицом, массаж", "Brows, facials, massage"]]
  ];
  var MASTER_IMG_H = { color: 320, blow: 320, mani: 320, massage: 720 };
  var HOURS = { 0: [11, 19] }; // воскресенье
  var DEF_HOURS = [10, 21];
  var LI = { hy: 0, ru: 1, en: 2 };
  var CATS = ["hair", "nails", "care"];

  var st = { cat: "hair", svc: null, master: null, day: null, time: null };

  function $(id) { return document.getElementById(id); }
  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    return e;
  }
  function svcName(s) { return s[5 + LI[D.lang]]; }
  function svcById(id) { for (var i = 0; i < SERVICES.length; i++) if (SERVICES[i][0] === id) return SERVICES[i]; }
  function masterById(id) { for (var i = 0; i < MASTERS.length; i++) if (MASTERS[i][0] === id) return MASTERS[i]; }
  function priceText(s) { var p = D.price(s[3]); return s[4] ? D.t("from", { p: p }) : p; }
  function hoursFor(d) { return HOURS[d.getDay()] || DEF_HOURS; }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function dayKey(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function fmtDate(d) { return D.date(d, "long"); }

  function renderPrices() {
    var box = $("priceList"); box.textContent = "";
    CATS.forEach(function (c) {
      var wrap = el("div", { "class": "cat" });
      wrap.appendChild(el("h3", null, D.t("cat_" + c)));
      SERVICES.filter(function (s) { return s[1] === c; }).forEach(function (s) {
        var b = el("button", { type: "button", "class": "svc" });
        b.appendChild(el("span", { "class": "svc-n" }, svcName(s)));
        b.appendChild(el("span", { "class": "svc-p" }, priceText(s)));
        b.appendChild(el("span", { "class": "svc-d" }, D.t("min", { n: s[2] })));
        b.addEventListener("click", function () {
          st.cat = s[1]; st.svc = s[0]; st.master = null; st.time = null;
          renderBooking();
          $("book").scrollIntoView();
        });
        wrap.appendChild(b);
      });
      box.appendChild(wrap);
    });
  }

  function renderMasters() {
    var box = $("masterList"); box.textContent = "";
    MASTERS.forEach(function (m) {
      var f = el("figure", { "class": "master", style: "margin:0" });
      var a = el("div", { "class": "arch" });
      a.appendChild(el("img", {
        src: "img/" + m[1] + "-480.webp", srcset: "img/" + m[1] + "-480.webp 480w, img/" + m[1] + "-960.webp 960w",
        sizes: "(min-width:760px) 25vw, 68vw", width: "480", height: String(MASTER_IMG_H[m[1]]),
        loading: "lazy", decoding: "async", alt: D.t("altMaster"), style: D.bg(m[1])
      }));
      f.appendChild(a);
      f.appendChild(el("h3", null, m[4][LI[D.lang]]));
      f.appendChild(el("p", null, m[5][LI[D.lang]]));
      f.appendChild(el("p", null, D.t("exp", { n: m[2] })));
      box.appendChild(f);
    });
  }

  // Псевдозанятость слотов — детерминированно от даты и мастера, чтобы демо выглядело живым.
  function busy(key, master, t) {
    var s = key + master + t, h = 0;
    for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h % 10 < 3;
  }

  function slots(day) {
    var s = svcById(st.svc); if (!s) return [];
    var h = hoursFor(day), out = [], now = new Date();
    var isToday = dayKey(day) === dayKey(now);
    for (var m = h[0] * 60; m + s[2] <= h[1] * 60; m += 30) {
      var t = pad(Math.floor(m / 60)) + ":" + pad(m % 60);
      var past = isToday && m <= now.getHours() * 60 + now.getMinutes() + 30;
      out.push([t, past || busy(dayKey(day), st.master || "any", t)]);
    }
    return out;
  }

  function radio(cls, checked, label, onClick, disabled) {
    var b = el("button", { type: "button", "class": cls, role: "radio", "aria-checked": String(!!checked) });
    if (label != null) b.textContent = label;
    if (disabled) b.disabled = true;
    b.addEventListener("click", onClick);
    return b;
  }

  function renderBooking() {
    // 1. категория и услуга
    var tabs = $("catTabs"); tabs.textContent = "";
    CATS.forEach(function (c) {
      var b = el("button", { type: "button", "class": "chip", "aria-pressed": String(st.cat === c) }, D.t("cat_" + c));
      b.addEventListener("click", function () { st.cat = c; renderBooking(); });
      tabs.appendChild(b);
    });
    var so = $("svcOpts"); so.textContent = "";
    SERVICES.filter(function (s) { return s[1] === st.cat; }).forEach(function (s) {
      var b = radio("svc-opt", st.svc === s[0], null, function () {
        st.svc = s[0]; st.time = null;
        var m = masterById(st.master); if (m && m[3].indexOf(s[1]) < 0) st.master = null;
        renderBooking();
      });
      b.appendChild(el("i"));
      var nm = el("span", null, svcName(s));
      nm.appendChild(el("small", null, D.t("min", { n: s[2] })));
      b.appendChild(nm);
      b.appendChild(el("b", null, priceText(s)));
      so.appendChild(b);
    });

    // 2. мастер
    var mo = $("masterOpts"); mo.textContent = "";
    var svc = svcById(st.svc);
    if (!svc) mo.appendChild(el("p", { "class": "hint" }, D.t("pickService")));
    else {
      MASTERS.filter(function (m) { return m[3].indexOf(svc[1]) >= 0; }).forEach(function (m) {
        mo.appendChild(radio("chip", st.master === m[0], m[4][LI[D.lang]], function () { st.master = m[0]; st.time = null; renderBooking(); }));
      });
      mo.appendChild(radio("chip", st.master === "any", D.t("anyMaster"), function () { st.master = "any"; st.time = null; renderBooking(); }));
    }

    // 3. дата: 14 дней вперёд
    var dd = $("dayOpts"); dd.textContent = "";
    var base = new Date(); base.setHours(12, 0, 0, 0);
    
    for (var i = 0; i < 14; i++) {
      (function (d) {
        var k = dayKey(d);
        var b = radio("day", st.day === k, null, function () { st.day = k; st.time = null; renderBooking(); });
        b.appendChild(el("small", null, i === 0 ? D.t("todayShort") : D.date(d, "wd")));
        b.appendChild(el("b", null, String(d.getDate())));
        b.setAttribute("aria-label", fmtDate(d));
        dd.appendChild(b);
      })(new Date(base.getTime() + i * 864e5));
    }

    // 4. время
    var to = $("timeOpts"); to.textContent = "";
    if (!svc) to.appendChild(el("p", { "class": "hint", style: "grid-column:1/-1" }, D.t("pickService")));
    else if (!st.day) to.appendChild(el("p", { "class": "hint", style: "grid-column:1/-1" }, D.t("pickDate")));
    else {
      var p = st.day.split("-"), day = new Date(+p[0], +p[1] - 1, +p[2], 12);
      var list = slots(day), free = 0;
      list.forEach(function (s) {
        if (!s[1]) free++;
        to.appendChild(radio("chip", st.time === s[0], s[0], function () { st.time = s[0]; renderBooking(); }, s[1]));
      });
      if (!free) to.appendChild(el("p", { "class": "hint", style: "grid-column:1/-1" }, D.t("noSlots")));
    }
    renderSummary();
  }

  function renderSummary() {
    var svc = svcById(st.svc), btn = $("bookBtn");
    var ok = svc && st.master && st.day && st.time;
    if (!ok) {
      $("summary").textContent = D.t("sumEmpty");
      btn.setAttribute("aria-disabled", "true"); btn.removeAttribute("href");
      return;
    }
    var p = st.day.split("-"), day = new Date(+p[0], +p[1] - 1, +p[2], 12);
    var m = masterById(st.master);
    var v = {
      service: svcName(svc), master: m ? m[4][LI[D.lang]] : D.t("anyMaster"),
      date: fmtDate(day), time: st.time,
      inName: D.name ? D.t("inName") : ""
    };
    $("summary").textContent = D.t("sumFull", v);
    btn.href = D.wa(D.t("waMsg", v));
    btn.setAttribute("aria-disabled", "false");
  }

  function renderStatic() {
    var c = D.city();
    $("kind").textContent = c ? D.t("kindCity") : D.t("kind");
    $("addr").textContent = c ? D.t("addrCity") : D.t("addr");
    var h = hoursFor(new Date());
    $("today").textContent = D.t("today", { from: pad(h[0]) + ":00", to: pad(h[1]) + ":00" });
  }

  function loadCredits() {
    var ul = $("credits");
    if (ul.childNodes.length) return;
    fetch("img/credits.json").then(function (r) { return r.json(); }).then(function (list) {
      list.forEach(function (c) {
        var li = el("li"), a = el("a", { href: c.url, target: "_blank", rel: "noopener" }, c.url.replace("https://", ""));
        li.appendChild(a); ul.appendChild(li);
      });
    }).catch(function () {});
  }
  document.querySelector("footer details").addEventListener("toggle", loadCredits);

  D.init(I18N, function () { renderStatic(); renderPrices(); renderMasters(); renderBooking(); });
})();
