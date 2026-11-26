/* Переключатель ниши в живом телефоне первого экрана. Салон (первый) берёт тексты из hero.js.
   Цены — docs/packages.md: Запись 35 000, Меню 30 000, Бронь 45 000 ֏ в месяц. Названия бизнесов выдуманные.
   HY — на проверку Ани. */
(function () {
  var C = {
    hy: {
      nicheLbl: "Ձեր բիզնեսը", nicheAria: "Ընտրեք ոլորտը",
      nicheChips: ["Սրահ", "Ռեստորան", "Հյուրատուն", "Ավտոսերվիս"],
      nichePrice: ["Salon — ամսական 20 000 ֏", "Online · Ճաշացանկ — ամսական 30 000 ֏", "Online · Ամրագրում — ամսական 45 000 ֏", "Online · Գրանցում — ամսական 35 000 ֏"],
      niches: [null,
        { name: "Oriane Grill", av: "O", msg: "Բարի երեկո, շաբաթ օրը 20:00-ին չորս հոգու սեղան կա՞։", autoT: "Հիմա չենք կարող պատասխանել, բայց ազատ սեղանները կարող եք տեսնել այստեղ", btn: "Ամրագրել սեղան", ok: "Ամրագրված է՝ շաբաթ 20:00, սեղան 4 հոգու համար", toast: "Շաբաթ 12:00, Արամը պատասխանեց՝ «Կգանք»" },
        { name: "Velour Lodge", av: "V", msg: "Բարև ձեզ, դեկտեմբերի 12–14-ը երկտեղանոց սենյակ կա՞։", autoT: "Հիմա չենք կարող պատասխանել, բայց ազատ օրերը կարող եք տեսնել այստեղ", btn: "Ամրագրել սենյակ", ok: "Ամրագրված է՝ դեկտեմբերի 12–14, երկտեղանոց սենյակ", toast: "Դեկտեմբերի 11, Աննան պատասխանեց՝ «Կգանք»" },
        { name: "Torq Auto", av: "T", msg: "Բարև ձեզ, վաղը յուղը կարո՞ղ եք փոխել։", autoT: "Հիմա փակ ենք, բայց ազատ ժամերը կարող եք տեսնել այստեղ", btn: "Գրանցվել առցանց", ok: "Գրանցված է՝ վաղը 10:30, յուղի փոխարինում", toast: "Այսօր 18:00, Դավիթը պատասխանեց՝ «Կգամ»" }
      ]
    },
    ru: {
      nicheLbl: "Ваш бизнес", nicheAria: "Выберите отрасль",
      nicheChips: ["Салон", "Ресторан", "Гостиница", "Автосервис"],
      nichePrice: ["Salon — 20 000 ֏ в месяц", "Online · Меню — 30 000 ֏ в месяц", "Online · Бронь — 45 000 ֏ в месяц", "Online · Запись — 35 000 ֏ в месяц"],
      niches: [null,
        { name: "Oriane Grill", av: "O", msg: "Добрый вечер, есть столик на четверых в субботу в 20:00?", autoT: "Сейчас не можем ответить, но свободные столы видно здесь", btn: "Забронировать стол", ok: "Бронь: суббота 20:00, стол на 4", toast: "Суббота 12:00, Арам ответил «Будем»" },
        { name: "Velour Lodge", av: "V", msg: "Здравствуйте, есть номер на двоих с 12 по 14 декабря?", autoT: "Сейчас не можем ответить, но свободные даты видно здесь", btn: "Забронировать номер", ok: "Бронь: 12–14 декабря, номер на двоих", toast: "11 декабря, Анна ответила «Приедем»" },
        { name: "Torq Auto", av: "T", msg: "Здравствуйте, можно завтра поменять масло?", autoT: "Сейчас закрыто, но свободное время видно здесь", btn: "Записаться онлайн", ok: "Запись: завтра 10:30, замена масла", toast: "Сегодня 18:00, Давид ответил «Приеду»" }
      ]
    },
    en: {
      nicheLbl: "Your business", nicheAria: "Pick your business type",
      nicheChips: ["Salon", "Restaurant", "Guesthouse", "Car service"],
      nichePrice: ["Salon — 20 000 ֏ a month", "Online · Menu — 30 000 ֏ a month", "Online · Stays — 45 000 ֏ a month", "Online · Appointments — 35 000 ֏ a month"],
      niches: [null,
        { name: "Oriane Grill", av: "O", msg: "Good evening, any table for four on Saturday at 20:00?", autoT: "We can’t reply right now, but you can see free tables here", btn: "Book a table", ok: "Booked: Saturday 20:00, table for 4", toast: "Saturday 12:00, Aram replied “We’ll be there”" },
        { name: "Velour Lodge", av: "V", msg: "Hello, any room for two from 12 to 14 December?", autoT: "We can’t reply right now, but you can see free dates here", btn: "Book a room", ok: "Booked: 12–14 December, room for two", toast: "11 December, Anna replied “We’re coming”" },
        { name: "Torq Auto", av: "T", msg: "Hi, can I get an oil change tomorrow?", autoT: "We’re closed now, but you can see free times here", btn: "Book online", ok: "Booked: tomorrow 10:30, oil change", toast: "Today 18:00, Davit replied “I’ll be there”" }
      ]
    }
  };
  for (var l in C) for (var k in C[l]) window.T[l][k] = C[l][k];
})();
