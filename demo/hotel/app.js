/* Демо гостиницы: номера, даты заезда/выезда, заявка через WhatsApp. HY — на проверку Ани. */
(function () {
  "use strict";
  var D = window.DEMO, LI = { hy: 0, ru: 1, en: 2 };

  var I18N = {
    hy: {
      _title: "{name} — համարներ և ամրագրում", _noName: "Ձեր հյուրանոցը",
      brand: "{name}", h1: "{name}", langAria: "Կայքի լեզուն",
      lead: "Համարներ՝ անտառի և լեռների տեսարանով, նախաճաշ տեղական մթերքներից։",
      leadCity: "{city}։ Համարներ՝ անտառի և լեռների տեսարանով, նախաճաշ տեղական մթերքներից։", leadUrban: "{city}։ Համարներ քաղաքում, նախաճաշ՝ տեղական մթերքներից։",
      checkIn: "Ժամանում", checkOut: "Մեկնում", guests: "Հյուրեր", chooseRoom: "Գտնել համար", calPickIn: "Ընտրեք ժամանման օրը", calPickOut: "Հիմա՝ մեկնման օրը", calDone: "Պատրաստ է", calPrev: "Նախորդ ամիս", calNext: "Հաջորդ ամիս", calAria: "Ամսաթվերի ընտրություն", noDate: "Ընտրեք",
      guestsN: "{n} հյուր", nights: "{n} գիշեր", nightsLine: "{in} — {out}, {nights}", badDates: "Մեկնման օրը պետք է լինի ժամանումից հետո",
      viewTitle: "Տեսարան պատուհանից",
      viewText: "Առավոտը սկսվում է լեռներով․ համարների մեծ մասի պատուհանները նայում են անտառին և լեռնաշղթային։", viewTextUrban: "Պատուհանները նայում են քաղաքին կամ հանգիստ բակին։ Պարզ եղանակին վերին հարկերից երևում է Արարատը։", altWindowUrban: "Տեսարան պատուհանից՝ քաղաքը և Արարատը",
      viewNote: "Այստեղ կլինեն ձեր հյուրանոցի իրական լուսանկարները՝ համարներ, տեսարան, տարածք։",
      roomsTitle: "Համարներ", roomsSub: "Գինը մեկ գիշերվա համար է՝ նախաճաշով։ Ընտրված ամսաթվերի ընդհանուր գումարը հաշվվում է ավտոմատ։",
      sqm: "{n} մ²", maxG: "մինչև {n} հյուր", perNight: "գիշերը", totalFor: "{nights}՝ {sum}", pickDates: "Ընտրեք ամսաթվերը՝ գումարը տեսնելու համար",
      bookRoom: "Ամրագրել այս համարը", tooMany: "Այս համարում՝ առավելագույնը {n} հյուր",
      waNote: "Օրինակում WhatsApp-ը բացվում է առանց համարի։ Ձեր կայքում հայտը կգա անմիջապես ձեր WhatsApp-ին։",
      waMsg: "Բարև ձեզ։ Ուզում եմ համար ամրագրել{inName}։\nՀամար՝ {room}\nԺամանում՝ {in}\nՄեկնում՝ {out} ({nights})\nՀյուրեր՝ {guests}\nԳումարը կայքում՝ {sum}",
      inName: " «{name}»-ում",
      amenTitle: "Ինչ կա հյուրանոցում",
      aroundTitle: "Շրջակայքը և ինչպես հասնել", aroundSub: "Այստեղ կլինեն ձեր շրջակայքի տեսարժան վայրերը և ճանապարհի նկարագրությունը։",
      capLake: "Լիճ՝ անտառի մեջ", capCascade: "Կասկադ", capRepublic: "Հանրապետության հրապարակ", capMatenadaran: "Մատենադարան", capMonastery: "Հին վանքեր", capMeadow: "Լեռնային արահետներ",
      addrTitle: "Հասցե", addr: "Այստեղ կլինի հյուրանոցի հասցեն", addrCity: "{city}, այստեղ կլինի հյուրանոցի հասցեն",
      carTitle: "Մեքենայով", carText: "Քարտեզի կետը և երթուղին՝ մեկ սեղմումով։",
      transferTitle: "Տրանսֆեր", transferText: "Դիմավորում «Զվարթնոց» օդանավակայանում՝ նախնական հայտով։",
      revTitle: "Կարծիքներ", revSub: "Այստեղ կլինեն ձեր հյուրերի իրական կարծիքները։", example: "օրինակ",
      footer: "Սա կայքի օրինակ է SKIYAR-ից։ Համարները, գները և կարծիքները՝ օրինակի համար։",
      credits: "Լուսանկարներ՝ Unsplash (ազատ լիցենզիա)",
      altHero: "Կանաչ լեռներ ամպերի տակ", altHeroUrban: "Երևանը և Արարատը մայրամուտին", altWindow: "Լեռների տեսարան պատուհանից", altBreakfast: "Նախաճաշ՝ ձու, լոլիկ, պանիր, մուրաբա"
    },
    ru: {
      _title: "{name} — номера и бронирование", _noName: "Ваша гостиница",
      brand: "{name}", h1: "{name}", langAria: "Язык сайта",
      lead: "Номера с видом на лес и горы, завтрак из местных продуктов.",
      leadCity: "{city}. Номера с видом на лес и горы, завтрак из местных продуктов.", leadUrban: "{city}. Номера в городе, завтрак из местных продуктов.",
      checkIn: "Заезд", checkOut: "Выезд", guests: "Гости", chooseRoom: "Найти номер", calPickIn: "Выберите дату заезда", calPickOut: "Теперь — дату выезда", calDone: "Готово", calPrev: "Предыдущий месяц", calNext: "Следующий месяц", calAria: "Выбор дат", noDate: "Выберите",
      guestsN: "{n}", nights: "{n} {w}", nightsLine: "{in} — {out}, {nights}", badDates: "Дата выезда должна быть позже заезда",
      viewTitle: "Вид из окна",
      viewText: "Утро начинается с гор: окна большинства номеров выходят на лес и хребет.", viewTextUrban: "Окна выходят на город или на тихий двор. В ясную погоду с верхних этажей виден Арарат.", altWindowUrban: "Вид из окна на город и Арарат",
      viewNote: "Здесь будут настоящие фотографии вашей гостиницы — номера, вид, территория.",
      roomsTitle: "Номера", roomsSub: "Цена за ночь с завтраком. Сумма за выбранные даты считается автоматически.",
      sqm: "{n} м²", maxG: "до {n} гостей", perNight: "за ночь", totalFor: "За {nights}: {sum}", pickDates: "Выберите даты, чтобы увидеть сумму",
      bookRoom: "Забронировать этот номер", tooMany: "В этом номере не больше {n} гостей",
      waNote: "В демо WhatsApp откроется без номера. На вашем сайте заявка придёт сразу в ваш WhatsApp.",
      waMsg: "Здравствуйте! Хочу забронировать номер{inName}.\nНомер: {room}\nЗаезд: {in}\nВыезд: {out} ({nights})\nГостей: {guests}\nСумма по сайту: {sum}",
      inName: " в «{name}»",
      amenTitle: "Что есть в гостинице",
      aroundTitle: "Окрестности и как добраться", aroundSub: "Здесь будут места рядом с вашей гостиницей и описание дороги.",
      capLake: "Озеро в лесу", capCascade: "Каскад", capRepublic: "Площадь Республики", capMatenadaran: "Матенадаран", capMonastery: "Старые монастыри", capMeadow: "Горные тропы",
      addrTitle: "Адрес", addr: "Здесь будет адрес гостиницы", addrCity: "{city}, здесь будет адрес гостиницы",
      carTitle: "На машине", carText: "Точка на карте и маршрут в одно касание.",
      transferTitle: "Трансфер", transferText: "Встреча в аэропорту «Звартноц» по предварительной заявке.",
      revTitle: "Отзывы", revSub: "Здесь будут настоящие отзывы ваших гостей.", example: "пример",
      footer: "Это пример сайта от SKIYAR. Номера, цены и отзывы — для примера.",
      credits: "Фото: Unsplash (свободная лицензия)",
      altHero: "Зелёные горы под облаками", altHeroUrban: "Ереван и Арарат на закате", altWindow: "Вид на горы из окна", altBreakfast: "Завтрак: яичница, томаты, сыр, варенье"
    },
    en: {
      _title: "{name} — rooms and booking", _noName: "Your hotel",
      brand: "{name}", h1: "{name}", langAria: "Site language",
      lead: "Rooms looking out on forest and mountains, breakfast from local produce.",
      leadCity: "{city}. Rooms looking out on forest and mountains, breakfast from local produce.", leadUrban: "{city}. Rooms in the city, breakfast from local produce.",
      checkIn: "Check-in", checkOut: "Check-out", guests: "Guests", chooseRoom: "Find a room", calPickIn: "Choose your check-in date", calPickOut: "Now choose your check-out date", calDone: "Done", calPrev: "Previous month", calNext: "Next month", calAria: "Choose dates", noDate: "Choose",
      guestsN: "{n}", nights: "{n} {w}", nightsLine: "{in} — {out}, {nights}", badDates: "Check-out must be after check-in",
      viewTitle: "The view from the window",
      viewText: "Mornings start with the mountains: most rooms face the forest and the ridge.", viewTextUrban: "Windows look out over the city or onto a quiet courtyard. On a clear day, Ararat is visible from the upper floors.", altWindowUrban: "City and Ararat seen from a window",
      viewNote: "Real photos of your hotel go here — rooms, view, grounds.",
      roomsTitle: "Rooms", roomsSub: "Prices are per night with breakfast. The total for your dates is calculated automatically.",
      sqm: "{n} m²", maxG: "up to {n} guests", perNight: "per night", totalFor: "{nights}: {sum}", pickDates: "Choose dates to see the total",
      bookRoom: "Book this room", tooMany: "This room sleeps up to {n} guests",
      waNote: "In this demo WhatsApp opens without a number. On your site, requests go straight to your WhatsApp.",
      waMsg: "Hello! I’d like to book a room{inName}.\nRoom: {room}\nCheck-in: {in}\nCheck-out: {out} ({nights})\nGuests: {guests}\nTotal on the site: {sum}",
      inName: " at “{name}”",
      amenTitle: "At the hotel",
      aroundTitle: "Around us and getting here", aroundSub: "Places near your hotel and directions go here.",
      capLake: "A forest lake", capCascade: "The Cascade", capRepublic: "Republic Square", capMatenadaran: "Matenadaran", capMonastery: "Old monasteries", capMeadow: "Mountain trails",
      addrTitle: "Address", addr: "Your hotel’s address goes here", addrCity: "{city}, your hotel’s address goes here",
      carTitle: "By car", carText: "Map pin and directions in one tap.",
      transferTitle: "Transfer", transferText: "Pick-up at Zvartnots airport on request.",
      revTitle: "Reviews", revSub: "Your guests’ real reviews go here.", example: "example",
      footer: "This is a sample website by SKIYAR. Rooms, prices and reviews are examples.",
      credits: "Photos: Unsplash (free licence)",
      altHero: "Green mountains under clouds", altHeroUrban: "Yerevan and Mount Ararat at sunset", altWindow: "Mountain view through a window", altBreakfast: "Breakfast: eggs, tomatoes, cheese, jam"
    }
  };
  var NIGHT_WORDS = { ru: { one: "ночь", few: "ночи", many: "ночей", other: "ночи" }, en: { one: "night", other: "nights" } };

  // Номера: [id, фото, высота 480w, м², гостей, цена, имя hy/ru/en, кровати hy/ru/en, описание hy/ru/en]
  var ROOMS = [
    ["std", "white", 300, 24, 2, 28000, ["Ստանդարտ՝ անտառի տեսարանով", "Стандарт с видом на лес", "Standard, forest view"], ["Մեկ մեծ մահճակալ", "Одна большая кровать", "One large bed"], ["Լուսավոր համար՝ փայտե առաստաղով և աշխատանքային սեղանով։", "Светлый номер с деревянным потолком и рабочим столом.", "A bright room with a timber ceiling and a desk."]],
    ["attic", "attic", 320, 30, 3, 32000, ["Ձեղնահարկ՝ երկու մահճակալով", "Мансарда с двумя кроватями", "Attic room, two beds"], ["Երկու մահճակալ", "Две кровати", "Two beds"], ["Ամբողջովին փայտից՝ թեք առաստաղով և կլոր պատուհանով։", "Вся в дереве, со скошенным потолком и полукруглым окном.", "All in wood, with a sloped ceiling and an arched window."]],
    ["balcony", "sun", 320, 32, 2, 38000, ["Համար պատշգամբով", "Номер с балконом", "Room with a balcony"], ["Մեկ մեծ մահճակալ", "Одна большая кровать", "One large bed"], ["Ապակե դռներ դեպի պատշգամբ. սուրճը՝ արևի առաջին ճառագայթների հետ։", "Стеклянные двери на балкон — кофе с первыми лучами солнца.", "Glass doors to the balcony — coffee with the first light."]],
    ["suite", "suite", 320, 48, 4, 55000, ["Ընտանեկան լյուքս", "Семейный люкс", "Family suite"], ["Մեծ մահճակալ և բազմոց-մահճակալ", "Большая кровать и диван-кровать", "Large bed and a sofa bed"], ["Երկու սենյակ, տեսարան՝ դեպի այգի և անտառ, տեղ երեխաների համար։", "Две комнаты, вид на сад и лес, место для детей.", "Two rooms, a view of the garden and forest, space for children."]]
  ];
  var AMEN = [
    [["Նախաճաշը ներառված է", "Завтрак включён", "Breakfast included"], ["Տեղական պանիր, ձու, մեղր, տնական մուրաբա", "Местный сыр, яйца, мёд, домашнее варенье", "Local cheese, eggs, honey, home-made jam"]],
    [["Wi‑Fi բոլոր համարներում", "Wi‑Fi во всех номерах", "Wi‑Fi in every room"], ["Հարմար է նաև աշխատանքի համար", "Хватает и для работы", "Good enough to work"]],
    [["Անվճար կայանատեղի", "Бесплатная парковка", "Free parking"], ["Հյուրանոցի տարածքում", "На территории", "On the grounds"]],
    [["Տեռաս՝ խորովածի տեղով", "Терраса с мангалом", "Terrace with a grill"], ["Երեկոյան՝ լեռների տեսարանով", "Вечером — с видом на горы", "Evenings with a mountain view"]],
    [["Ժամանում՝ 14:00-ից", "Заезд с 14:00", "Check-in from 14:00"], ["Մեկնում՝ մինչև 12:00", "Выезд до 12:00", "Check-out by 12:00"]],
    [["Տրանսֆեր օդանավակայանից", "Трансфер из аэропорта", "Airport transfer"], ["Նախնական հայտով", "По предварительной заявке", "On request"]]
  ];
  var REVIEWS = [
    [["Արթնացանք, իսկ պատուհանից դուրս՝ ամպեր լեռների վրա։ Նախաճաշը՝ ինչպես տատիկի մոտ։", "Проснулись — за окном облака на горах. Завтрак как у бабушки в деревне.", "We woke up to clouds on the mountains. Breakfast like at grandma’s in the village."], ["Աննա, Երևան", "Анна, Ереван", "Anna, Yerevan"]],
    [["Ամրագրեցինք WhatsApp-ով հինգ րոպեում, դիմավորեցին օդանավակայանում։", "Забронировали через WhatsApp за пять минут, встретили в аэропорту.", "Booked on WhatsApp in five minutes and were met at the airport."], ["Դմիտրի, Մոսկվա", "Дмитрий, Москва", "Dmitry, Moscow"]],
    [["Հանգիստ վայր երեխաների հետ. տեռասը և երեկոյան խորովածը՝ լավագույնը։", "Тихое место для отдыха с детьми, терраса и вечерний шашлык — лучшее.", "A quiet place with kids; the terrace and the evening barbecue were the best part."], ["Sarah, London", "Sarah, London", "Sarah, London"]]
  ];

  var MONTHS = {
    hy: ["Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս", "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"],
    ru: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  };
  var WD = { hy: ["Երկ", "Երք", "Չրք", "Հնգ", "Ուրբ", "Շբթ", "Կիր"], ru: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"], en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] };
  function day0(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12); }
  function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return day0(x); }
  var TODAY = day0(new Date()), LAST = addDays(TODAY, 365);
  var st = { guests: 2, a: addDays(TODAY, 7), b: addDays(TODAY, 9) };
  var cal = { open: false, pick: "in", month: null };
  function $(id) { return document.getElementById(id); }
  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    return e;
  }
  function fmt(d) { return D.date(d, "dm"); }
  function nightsText(n) {
    var w = NIGHT_WORDS[D.lang];
    var word = w ? (w[new Intl.PluralRules(D.locale()).select(n)] || w.other) : "";
    return D.t("nights", { n: n, w: word });
  }
  function stay() {
    if (!st.a || !st.b) return null;
    var n = Math.round((st.b - st.a) / 864e5);
    return n > 0 ? { a: st.a, b: st.b, n: n } : { bad: true };
  }

  // Календарь: свой, без стандартного поля браузера. Первый клик — заезд, второй — выезд.
  function monthStart(d) { return new Date(d.getFullYear(), d.getMonth(), 1, 12); }
  function openCal(which) {
    cal.open = !(cal.open && cal.pick === which);
    cal.pick = which;
    cal.month = monthStart(which === "out" && st.b ? st.b : st.a || TODAY);
    renderCal();
  }
  function closeCal() { if (cal.open) { cal.open = false; renderCal(); } }
  function pickDay(d) {
    if (cal.pick === "in" || !st.a || d <= st.a) { st.a = d; st.b = null; cal.pick = "out"; }
    else { st.b = d; cal.open = false; }
    all();
    if (!cal.open) $("outBtn").focus();
  }
  function renderCal() {
    var box = $("cal");
    $("inBtn").setAttribute("aria-expanded", String(cal.open && cal.pick === "in"));
    $("outBtn").setAttribute("aria-expanded", String(cal.open && cal.pick === "out"));
    box.hidden = !cal.open;
    if (!cal.open) return;
    box.textContent = "";
    var two = window.matchMedia && matchMedia("(min-width:760px)").matches;
    var top = el("div", { "class": "cal-top" });
    top.appendChild(el("p", null, D.t(cal.pick === "in" ? "calPickIn" : "calPickOut")));
    var nav = el("div", { "class": "cal-nav" });
    var prev = el("button", { type: "button", "aria-label": D.t("calPrev") }, "\u2039");
    var next = el("button", { type: "button", "aria-label": D.t("calNext") }, "\u203a");
    prev.disabled = cal.month <= monthStart(TODAY);
    next.disabled = cal.month >= monthStart(LAST);
    prev.addEventListener("click", function () { cal.month = new Date(cal.month.getFullYear(), cal.month.getMonth() - 1, 1, 12); renderCal(); });
    next.addEventListener("click", function () { cal.month = new Date(cal.month.getFullYear(), cal.month.getMonth() + 1, 1, 12); renderCal(); });
    nav.appendChild(prev); nav.appendChild(next); top.appendChild(nav); box.appendChild(top);
    var months = el("div", { "class": "cal-months" });
    for (var k = 0; k < (two ? 2 : 1); k++) {
      var m = new Date(cal.month.getFullYear(), cal.month.getMonth() + k, 1, 12);
      var wrap = el("div", { "class": "cal-m" });
      wrap.appendChild(el("h4", null, MONTHS[D.lang][m.getMonth()] + " " + m.getFullYear()));
      var g = el("div", { "class": "cal-g" });
      WD[D.lang].forEach(function (w) { g.appendChild(el("span", { "class": "wd", "aria-hidden": "true" }, w)); });
      for (var i = 0; i < (m.getDay() + 6) % 7; i++) g.appendChild(el("span"));
      for (var d = new Date(m); d.getMonth() === m.getMonth(); d = addDays(d, 1)) {
        (function (day) {
          var c = [];
          if (st.a && +day === +st.a) c.push("start");
          if (st.b && +day === +st.b) c.push("end");
          if (st.a && st.b && day > st.a && day < st.b) c.push("mid");
          if (+day === +TODAY) c.push("today");
          var sel = c.indexOf("start") >= 0 || c.indexOf("end") >= 0;
          var b = el("button", { type: "button", "class": c.join(" "), "aria-label": D.date(day, "long"), "aria-pressed": String(sel) }, String(day.getDate()));
          if (day < TODAY || day > LAST || (cal.pick === "out" && st.a && +day === +st.a)) b.disabled = true;
          b.addEventListener("click", function () { pickDay(day); });
          g.appendChild(b);
        })(d);
      }
      wrap.appendChild(g); months.appendChild(wrap);
    }
    box.appendChild(months);
    var foot = el("div", { "class": "cal-foot" });
    var done = el("button", { type: "button", "class": "btn line" }, D.t("calDone"));
    done.addEventListener("click", closeCal);
    foot.appendChild(done); box.appendChild(foot);
  }

  function renderRooms() {
    var box = $("roomList"), l = LI[D.lang], s = stay();
    box.textContent = "";
    ROOMS.forEach(function (r) {
      var row = el("article", { "class": "room" });
      var ph = el("div", { "class": "ph" });
      ph.appendChild(el("img", {
        src: "img/" + r[1] + "-480.webp", srcset: "img/" + r[1] + "-480.webp 480w, img/" + r[1] + "-960.webp 960w",
        sizes: "(min-width:760px) 58vw, 100vw", width: "480", height: String(r[2]), loading: "lazy", decoding: "async", alt: r[6][l], style: D.bg(r[1])
      }));
      row.appendChild(ph);
      var tx = el("div");
      tx.appendChild(el("h3", null, r[6][l]));
      var facts = el("ul", { "class": "facts" });
      facts.appendChild(el("li", null, D.t("sqm", { n: r[3] })));
      facts.appendChild(el("li", null, r[7][l]));
      facts.appendChild(el("li", null, D.t("maxG", { n: r[4] })));
      tx.appendChild(facts);
      tx.appendChild(el("p", null, r[8][l]));
      var pr = el("div", { "class": "price" });
      pr.appendChild(el("b", null, D.price(r[5])));
      pr.appendChild(el("span", null, D.t("perNight")));
      tx.appendChild(pr);
      var ok = s && !s.bad, sum = ok ? D.price(r[5] * s.n) : "";
      tx.appendChild(el("p", { "class": "total" }, ok ? D.t("totalFor", { nights: nightsText(s.n), sum: sum }) : D.t("pickDates")));
      var btn = el("a", { "class": "btn", target: "_blank", rel: "noopener" }, D.t("bookRoom"));
      var fits = st.guests <= r[4];
      if (ok && fits) {
        btn.href = D.wa(D.t("waMsg", {
          room: r[6][l], "in": fmt(s.a), out: fmt(s.b), nights: nightsText(s.n), guests: st.guests, sum: sum,
          inName: D.name ? D.t("inName") : ""
        }));
      } else btn.setAttribute("aria-disabled", "true");
      tx.appendChild(btn);
      if (!fits) tx.appendChild(el("p", { "class": "warn" }, D.t("tooMany", { n: r[4] })));
      row.appendChild(tx);
      box.appendChild(row);
    });
  }

  function renderBar() {
    var sel = $("gSel"), keep = st.guests;
    sel.textContent = "";
    for (var i = 1; i <= 6; i++) sel.appendChild(el("option", { value: String(i) }, String(i)));
    sel.value = String(keep);
    var s = stay();
    $("inVal").textContent = st.a ? fmt(st.a) : D.t("noDate");
    $("outVal").textContent = st.b ? fmt(st.b) : D.t("noDate");
    $("nights").textContent = !s ? "" : s.bad ? D.t("badDates") : D.t("nightsLine", { "in": fmt(s.a), out: fmt(s.b), nights: nightsText(s.n) });
    renderCal();
  }

  function renderStatic() {
    var c = D.city(), l = LI[D.lang];
    // Ереван — городской подзаголовок без «вида на лес и горы»; остальные города — как есть.
    $("lead").textContent = !c ? D.t("lead") : D.cityKey() === "yerevan" ? D.t("leadUrban") : D.t("leadCity");
    // «Вид из окна»: для Еревана — город и Арарат, без леса и хребта.
    var urban = D.cityKey() === "yerevan", vn = urban ? "window-yerevan" : "window", vi = $("viewImg");
    $("heroImg").alt = D.t(window.HERO && HERO.urban ? "altHeroUrban" : "altHero");
    $("viewText").textContent = D.t(urban ? "viewTextUrban" : "viewText");
    if (vi.getAttribute("data-v") !== vn) {
      vi.setAttribute("data-v", vn);
      vi.src = "img/" + vn + "-480.webp";
      vi.srcset = "img/" + vn + "-480.webp 480w, img/" + vn + "-960.webp 960w";
      vi.height = urban ? 720 : 356;
      vi.setAttribute("style", D.bg(vn));
      vi.classList.toggle("tall", urban);
    }
    vi.alt = D.t(urban ? "altWindowUrban" : "altWindow");
    // «Окрестности»: для Еревана — Каскад, площадь Республики, Матенадаран; иначе — природа.
    var AROUND = urban
      ? [["cascade", "capCascade", 263], ["republic", "capRepublic", 320], ["matenadaran", "capMatenadaran", 720]]
      : [["lake", "capLake", 320], ["monastery", "capMonastery", 320], ["meadow", "capMeadow", 320]];
    var figs = $("aroundList").querySelectorAll("figure");
    AROUND.forEach(function (a, i) {
      var img = figs[i].querySelector("img"), cap = D.t(a[1]);
      if (img.getAttribute("data-v") !== a[0]) {
        img.setAttribute("data-v", a[0]);
        img.src = "img/" + a[0] + "-480.webp";
        img.srcset = "img/" + a[0] + "-480.webp 480w, img/" + a[0] + "-960.webp 960w";
        img.height = a[2];
        img.setAttribute("style", D.bg(a[0]));
      }
      img.alt = cap;
      figs[i].querySelector("figcaption").textContent = cap;
    });
    $("addr").textContent = c ? D.t("addrCity") : D.t("addr");
    var ul = $("amenList"); ul.textContent = "";
    AMEN.forEach(function (a) { var li = el("li"); li.appendChild(el("b", null, a[0][l])); li.appendChild(el("span", null, a[1][l])); ul.appendChild(li); });
    var rv = $("revList"); rv.textContent = "";
    REVIEWS.forEach(function (r) {
      var d = el("div", { "class": "rev" });
      d.appendChild(el("q", null, r[0][l]));
      var p = el("p", null, r[1][l]);
      p.appendChild(el("span", { "class": "tagx" }, D.t("example")));
      d.appendChild(p);
      rv.appendChild(d);
    });
  }

  function all() { renderBar(); renderRooms(); }

  $("inBtn").addEventListener("click", function () { openCal("in"); });
  $("outBtn").addEventListener("click", function () { openCal(st.a ? "out" : "in"); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeCal(); });
  document.addEventListener("click", function (e) { if (cal.open && e.target.isConnected && !$("bar").contains(e.target)) closeCal(); });
  $("findBtn").addEventListener("click", closeCal);
  $("gSel").addEventListener("change", function () { st.guests = +$("gSel").value; all(); });

  document.querySelector("footer details").addEventListener("toggle", function () {
    var ul = $("credits"); if (ul.childNodes.length) return;
    fetch("img/credits.json").then(function (r) { return r.json(); }).then(function (list) {
      list.forEach(function (c) { var li = el("li"); li.appendChild(el("a", { href: c.url, target: "_blank", rel: "noopener" }, c.url.replace("https://", ""))); ul.appendChild(li); });
    }).catch(function () {});
  });

  D.init(I18N, function () { renderStatic(); all(); });
})();
