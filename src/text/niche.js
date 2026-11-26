/* Переключатель ниши в живом телефоне первого экрана. Салон (первый) берёт тексты из hero.js.
   Цены — docs/packages.md: Запись 35 000, Меню 30 000, Бронь 45 000 ֏ в месяц. Названия бизнесов выдуманные.
   HY — на проверку Ани. */
(function () {
  var C = {
    hy: {
      nicheLbl: "Ձեր բիզնեսը", nicheAria: "Ընտրեք ոլորտը",
      nicheChips: ["Սրահ", "Ռեստորան", "Հյուրատուն", "Ավտոսերվիս", "Կլինիկա", "Դասընթացներ", "Անշարժ գույք", "Վերանորոգում"],
      nichePrice: ["Lite 20 000 ֏ · Business 30 000 ֏ ամսական", "Lite 20 000 ֏ · Business 30 000 ֏ ամսական", "Lite 20 000 ֏ · Business 30 000 ֏ ամսական", "Lite 20 000 ֏ · Business 30 000 ֏ ամսական", "Lite 20 000 ֏ · Business 30 000 ֏ ամսական", "Lite 20 000 ֏ · Business 30 000 ֏ ամսական", "Lite 20 000 ֏ · Business 30 000 ֏ ամսական", "Lite 20 000 ֏ · Business 30 000 ֏ ամսական"],
      niches: [{ name: "Liora Beauty", av: "L", msg: "Բարև ձեզ, ուրբաթ օրը մատնահարդարման ազատ ժամ կա՞", autoT: "Հիմա փակ ենք, բայց ազատ ժամերը կարող եք տեսնել այստեղ", btn: "Գրանցվել առցանց", ok: "Գրանցված է՝ ուրբաթ 11:00, մատնահարդարում", toast: "Հինգշաբթի 18:00, Ռուզանը պատասխանեց՝ «Կգամ»" },
        { name: "Oriane Grill", av: "O", msg: "Բարի երեկո, շաբաթ օրը 20:00-ին չորս հոգու սեղան կա՞։", autoT: "Հիմա չենք կարող պատասխանել, բայց ազատ սեղանները կարող եք տեսնել այստեղ", btn: "Ամրագրել սեղան", ok: "Ամրագրված է՝ շաբաթ 20:00, սեղան 4 հոգու համար", toast: "Շաբաթ 12:00, Արամը պատասխանեց՝ «Կգանք»" },
        { name: "Velour Lodge", av: "V", msg: "Բարև ձեզ, դեկտեմբերի 12–14-ը երկտեղանոց սենյակ կա՞։", autoT: "Հիմա չենք կարող պատասխանել, բայց ազատ օրերը կարող եք տեսնել այստեղ", btn: "Ամրագրել սենյակ", ok: "Ամրագրված է՝ դեկտեմբերի 12–14, երկտեղանոց սենյակ", toast: "Դեկտեմբերի 11, Աննան պատասխանեց՝ «Կգանք»" },
        { name: "Torq Auto", av: "T", msg: "Բարև ձեզ, վաղը յուղը կարո՞ղ եք փոխել։", autoT: "Հիմա փակ ենք, բայց ազատ ժամերը կարող եք տեսնել այստեղ", btn: "Գրանցվել առցանց", ok: "Գրանցված է՝ վաղը 10:30, յուղի փոխարինում", toast: "Այսօր 18:00, Դավիթը պատասխանեց՝ «Կգամ»" },
        { name: "Medis Clinic", av: "M", msg: "Բարև ձեզ, վաղը ատամնաբույժի մոտ ազատ ժամ կա՞", autoT: "Հիմա փակ ենք, բայց բժիշկների ազատ ժամերը կարող եք տեսնել այստեղ", btn: "Գրանցվել բժշկի մոտ", ok: "Գրանցված է՝ վաղը 10:00, ատամնաբույժ", toast: "Այսօր 18:00, Արմենը պատասխանեց՝ «Կգամ»" },
        { name: "Lingua Lab", av: "L", msg: "Բարև ձեզ, անգլերենի փորձնական դաս կա՞", autoT: "Հիմա չենք կարող պատասխանել, բայց խմբերն ու ազատ տեղերը կարող եք տեսնել այստեղ", btn: "Գրանցվել փորձնական դասի", ok: "Գրանցված է՝ երեքշաբթի 19:00, փորձնական դաս", toast: "Երկուշաբթի 18:00, Մարիամը պատասխանեց՝ «Կգամ»" },
        { name: "Domus Realty", av: "D", msg: "Բարև ձեզ, Արաբկիրում երկսենյականը դեռ ակտուա՞լ է", autoT: "Հիմա չենք կարող պատասխանել, բայց բոլոր օբյեկտները կարող եք տեսնել այստեղ", btn: "Դիտել օբյեկտները", ok: "Հայտ՝ երկսենյակ, Արաբկիր, դիտում շաբաթ 12:00", toast: "Ուրբաթ 18:00, Տիգրանը պատասխանեց՝ «Կգամ»" },
        { name: "Forma Repair", av: "F", msg: "Բարև ձեզ, 60 մ² բնակարանի վերանորոգումն ինչ կարժենա՞", autoT: "Հիմա չենք կարող պատասխանել, բայց մոտավոր գինը կարող եք հաշվել այստեղ", btn: "Հաշվել գինը", ok: "Հայտ՝ վերանորոգում 60 մ², չափագրում հինգշաբթի 11:00", toast: "Չորեքշաբթի 18:00, Անին պատասխանեց՝ «Սպասում եմ»" }
      ]
    },
    ru: {
      nicheLbl: "Ваш бизнес", nicheAria: "Выберите отрасль",
      nicheChips: ["Салон", "Ресторан", "Гостиница", "Автосервис", "Клиника", "Курсы", "Недвижимость", "Ремонт"],
      nichePrice: ["Lite 20 000 ֏ · Business 30 000 ֏ в месяц", "Lite 20 000 ֏ · Business 30 000 ֏ в месяц", "Lite 20 000 ֏ · Business 30 000 ֏ в месяц", "Lite 20 000 ֏ · Business 30 000 ֏ в месяц", "Lite 20 000 ֏ · Business 30 000 ֏ в месяц", "Lite 20 000 ֏ · Business 30 000 ֏ в месяц", "Lite 20 000 ֏ · Business 30 000 ֏ в месяц", "Lite 20 000 ֏ · Business 30 000 ֏ в месяц"],
      niches: [{ name: "Liora Beauty", av: "L", msg: "Здравствуйте, на маникюр в пятницу есть время?", autoT: "Сейчас закрыто, но свободное время видно здесь", btn: "Записаться онлайн", ok: "Запись: пятница 11:00, маникюр", toast: "Четверг 18:00, Рузан ответила «Приду»" },
        { name: "Oriane Grill", av: "O", msg: "Добрый вечер, есть столик на четверых в субботу в 20:00?", autoT: "Сейчас не можем ответить, но свободные столы видно здесь", btn: "Забронировать стол", ok: "Бронь: суббота 20:00, стол на 4", toast: "Суббота 12:00, Арам ответил «Будем»" },
        { name: "Velour Lodge", av: "V", msg: "Здравствуйте, есть номер на двоих с 12 по 14 декабря?", autoT: "Сейчас не можем ответить, но свободные даты видно здесь", btn: "Забронировать номер", ok: "Бронь: 12–14 декабря, номер на двоих", toast: "11 декабря, Анна ответила «Приедем»" },
        { name: "Torq Auto", av: "T", msg: "Здравствуйте, можно завтра поменять масло?", autoT: "Сейчас закрыто, но свободное время видно здесь", btn: "Записаться онлайн", ok: "Запись: завтра 10:30, замена масла", toast: "Сегодня 18:00, Давид ответил «Приеду»" },
        { name: "Medis Clinic", av: "M", msg: "Здравствуйте, есть время к стоматологу на завтра?", autoT: "Сейчас закрыто, но свободное время врачей видно здесь", btn: "Записаться к врачу", ok: "Запись: завтра 10:00, стоматолог", toast: "Сегодня 18:00, Армен ответил «Приду»" },
        { name: "Lingua Lab", av: "L", msg: "Здравствуйте, есть пробное занятие по английскому?", autoT: "Сейчас не можем ответить, но группы и свободные места видно здесь", btn: "Записаться на пробное", ok: "Запись: вторник 19:00, пробное занятие", toast: "Понедельник 18:00, Мариам ответила «Приду»" },
        { name: "Domus Realty", av: "D", msg: "Здравствуйте, двушка в Арабкире ещё актуальна?", autoT: "Сейчас не можем ответить, но все объекты видно здесь", btn: "Смотреть объекты", ok: "Заявка: двушка, Арабкир, просмотр в субботу 12:00", toast: "Пятница 18:00, Тигран ответил «Буду»" },
        { name: "Forma Repair", av: "F", msg: "Здравствуйте, сколько стоит ремонт квартиры 60 м²?", autoT: "Сейчас не можем ответить, но примерную цену можно посчитать здесь", btn: "Посчитать цену", ok: "Заявка: ремонт 60 м², замер в четверг 11:00", toast: "Среда 18:00, Ани ответила «Жду»" }
      ]
    },
    en: {
      nicheLbl: "Your business", nicheAria: "Pick your business type",
      nicheChips: ["Salon", "Restaurant", "Hotel", "Car service", "Clinic", "Courses", "Real estate", "Renovation"],
      nichePrice: ["Lite 20 000 ֏ · Business 30 000 ֏ a month", "Lite 20 000 ֏ · Business 30 000 ֏ a month", "Lite 20 000 ֏ · Business 30 000 ֏ a month", "Lite 20 000 ֏ · Business 30 000 ֏ a month", "Lite 20 000 ֏ · Business 30 000 ֏ a month", "Lite 20 000 ֏ · Business 30 000 ֏ a month", "Lite 20 000 ֏ · Business 30 000 ֏ a month", "Lite 20 000 ֏ · Business 30 000 ֏ a month"],
      niches: [{ name: "Liora Beauty", av: "L", msg: "Hi, any time for a manicure on Friday?", autoT: "We’re closed now, but you can see free times here", btn: "Book online", ok: "Booked: Friday 11:00, manicure", toast: "Thursday 18:00, Ruzan replied “I’ll be there”" },
        { name: "Oriane Grill", av: "O", msg: "Good evening, any table for four on Saturday at 20:00?", autoT: "We can’t reply right now, but you can see free tables here", btn: "Book a table", ok: "Booked: Saturday 20:00, table for 4", toast: "Saturday 12:00, Aram replied “We’ll be there”" },
        { name: "Velour Lodge", av: "V", msg: "Hello, any room for two from 12 to 14 December?", autoT: "We can’t reply right now, but you can see free dates here", btn: "Book a room", ok: "Booked: 12–14 December, room for two", toast: "11 December, Anna replied “We’re coming”" },
        { name: "Torq Auto", av: "T", msg: "Hi, can I get an oil change tomorrow?", autoT: "We’re closed now, but you can see free times here", btn: "Book online", ok: "Booked: tomorrow 10:30, oil change", toast: "Today 18:00, Davit replied “I’ll be there”" },
        { name: "Medis Clinic", av: "M", msg: "Hello, any time with the dentist tomorrow?", autoT: "We’re closed now, but you can see the doctors’ free times here", btn: "Book a doctor", ok: "Booked: tomorrow 10:00, dentist", toast: "Today 18:00, Armen replied “I’ll be there”" },
        { name: "Lingua Lab", av: "L", msg: "Hello, is there a trial English lesson?", autoT: "We can’t reply right now, but you can see groups and free places here", btn: "Book a trial lesson", ok: "Booked: Tuesday 19:00, trial lesson", toast: "Monday 18:00, Mariam replied “I’ll be there”" },
        { name: "Domus Realty", av: "D", msg: "Hello, is the 2-room flat in Arabkir still available?", autoT: "We can’t reply right now, but you can see all listings here", btn: "See listings", ok: "Request: 2-room flat, Arabkir, viewing Saturday 12:00", toast: "Friday 18:00, Tigran replied “I’ll be there”" },
        { name: "Forma Repair", av: "F", msg: "Hello, how much is renovating a 60 m² flat?", autoT: "We can’t reply right now, but you can estimate the price here", btn: "Estimate the price", ok: "Request: renovation 60 m², measuring Thursday 11:00", toast: "Wednesday 18:00, Ani replied “I’ll be waiting”" }
      ]
    }
  };
  for (var l in C) for (var k in C[l]) window.T[l][k] = C[l][k];
})();
