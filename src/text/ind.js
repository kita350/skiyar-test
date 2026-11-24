/* Тексты блока «Под вашу отрасль». Цены и пороги — из docs/packages.md (21.11.2026). HY — на проверку Ани. */
(function () {
  var I = {
    hy: {
      inTitle: "Ձեր ոլորտի համար",
      inSub: "Նույն Online փաթեթը՝ ձեր ոլորտի օրինակով և մի քանի գործառույթով։",
      inAria: "Ոլորտներ",
      inPer: "ամսական", inSetup: "միացում", inFree: "առաջին 5-ին՝ անվճար", inAi: "ԱԲ ադմինիստրատորով (փորձարկվում է)՝ {p} ֏ ամսական, միացում՝ {f} ֏", inPilot: "Առաջին 5 բիզնեսի համար միացումն անվճար է, առաջին ամիսը՝ գործարկումից հետո։", inTerm: "Տարեկան վճարելիս՝ −15%։", inGuar: "Երաշխիք՝ {n}",
      inDemo: "Դիտել օրինակը", inMore: "Նաև՝", inBarber: "բարբերշոփ", inNails: "եղունգների ստուդիա", inLive: "Կենդանի դեմո՝ իրական գրանցումով", inMenu: "QR-ճաշացանկ", inAsk: "Ստանալ օրինակ 1 օրում",
      inAskMsg: "Բարև ձեզ։ Ուզում եմ «{v}» փաթեթի օրինակ իմ բիզնեսի համար։",
      inNoDemo: "Պատրաստի օրինակ դեռ չկա. ձեր անունով կպատրաստենք 1 օրում, անվճար։",
      inMock: "Նկարազարդում",
      in1: "Գրանցում", in1w: "Սրահներ, վարսավիրանոցներ, մատնահարդարում, կոսմետոլոգիա, կլինիկաներ, ավտոսերվիսներ", in1f: "Վարպետներ, ծառայություններ և գներ|Գրանցում ժամով՝ նաև գիշերը|Հիշեցում WhatsApp-ով նախորդ օրը", in1g: "եթե 2 ամսում համակարգով եկել է 20-ից քիչ առցանց գրանցում, 3-րդ ամիսն անվճար է",
      in2: "Ամրագրում", in2w: "Հյուրատներ, հյուրանոցներ, տաղավարներ, բաղնիքներ, ավտոմեքենաների վարձույթ", in2f: "Համարներ, լուսանկարներ և գներ|Ազատ ամսաթվերի ընտրություն|Ուղիղ ամրագրում՝ առանց Booking-ի միջնորդավճարի", in2g: "եթե 2 ամսում համակարգով եկել է 5-ից քիչ ուղիղ ամրագրում, 3-րդ ամիսն անվճար է",
      in3: "Ճաշացանկ", in3w: "Ռեստորաններ և սրճարաններ", in3f: "Ճաշացանկ երեք լեզվով|QR-ճաշացանկ սեղանների համար|Սեղանի ամրագրում WhatsApp-ով", in3g: "եթե 2 ամսում համակարգով եկել է 15-ից քիչ սեղանի ամրագրում կամ պատվեր, 3-րդ ամիսն անվճար է",
      in3x: "Կա նաև միանվագ տարբերակ՝ 120 000 ֏, առանց բաժանորդագրության։",
      in4: "Հայտեր", in4w: "Վերանորոգում, կահույք, արևային վահանակներ, մաքրում", in4f: "Ծառայություններ և աշխատանքների լուսանկարներ|Մոտավոր գնի հաշվիչ|Հայտը գալիս է WhatsApp-ին", in4g: "եթե 2 ամսում համակարգով եկել է 10-ից քիչ հայտ, 3-րդ ամիսն անվճար է",
      in5: "Խմբեր", in5w: "Դպրոցներ, խմբակներ, ֆիթնես, պարեր", in5f: "Խմբեր և դասացուցակ|Գրանցում փորձնական դասի|Հիշեցում դասից առաջ", in5g: "եթե 2 ամսում համակարգով եկել է 10-ից քիչ գրանցում փորձնական դասի, 3-րդ ամիսն անվճար է",
      mk4h: "Գնի հաշվիչ", mk4a: "Ծառայություն", mk4av: "Բնակարանի վերանորոգում", mk4b: "Մակերես", mk4c: "Մոտավոր գինը", mk4d: "Ուղարկել հայտը",
      mk5h: "Դասացուցակ", mk5a: "Երկ, Չրք", mk5b: "Երք, Հնգ", mk5c: "Շաբաթ", mk5k1: "Երեխաներ 7–10", mk5k2: "Սկսնակներ", mk5k3: "Մեծահասակներ", mk5d: "Գրանցվել փորձնական դասի"
    },
    ru: {
      inTitle: "Под вашу отрасль",
      inSub: "Один пакет Online — демо вашей отрасли и пара нужных функций.",
      inAria: "Отрасли",
      inPer: "в месяц", inSetup: "подключение", inFree: "первым 5 — бесплатно", inAi: "С ИИ-администратором (в тесте) — {p} ֏ в месяц, подключение {f} ֏", inPilot: "Первым 5 бизнесам подключение бесплатно, первый месяц — после запуска.", inTerm: "При оплате за год — −15%.", inGuar: "Гарантия: если за 2 месяца через систему пришло меньше, чем {n}, 3-й месяц бесплатно",
      inDemo: "Посмотреть пример", inMore: "Ещё примеры:", inBarber: "барбершоп", inNails: "ногтевая студия", inLive: "Живое демо с настоящей записью", inMenu: "QR-меню", inAsk: "Получить пример за 1 день",
      inAskMsg: "Здравствуйте! Хочу пример пакета «{v}» для моего бизнеса.",
      inNoDemo: "Готового демо пока нет — пример с вашим названием сделаем за 1 день, бесплатно.",
      inMock: "Иллюстрация",
      in1: "Запись", in1w: "Салоны, барбершопы, ногти, косметология, клиники, автосервисы", in1f: "Мастера, услуги и цены|Запись на время — и ночью тоже|Напоминание в WhatsApp накануне", in1g: "20 онлайн-записей",
      in2: "Бронь", in2w: "Гестхаусы, гостиницы, беседки, бани, прокат авто", in2f: "Номера, фото и цены|Выбор свободных дат|Прямая бронь без комиссии Booking", in2g: "5 прямых броней",
      in3: "Меню", in3w: "Рестораны и кафе", in3f: "Меню на трёх языках|QR-меню на столы|Бронь стола в WhatsApp", in3g: "15 броней столов или заказов",
      in3x: "Есть и разовый вариант: 120 000 ֏ без подписки.",
      in4: "Заявки", in4w: "Ремонт, мебель, солнечные панели, клининг", in4f: "Услуги и фото работ|Калькулятор примерной цены|Заявка приходит в WhatsApp", in4g: "10 заявок",
      in5: "Группы", in5w: "Школы, кружки, фитнес, танцы", in5f: "Группы и расписание|Запись на пробное занятие|Напоминание перед занятием", in5g: "10 записей на пробное",
      mk4h: "Калькулятор цены", mk4a: "Услуга", mk4av: "Ремонт квартиры", mk4b: "Площадь", mk4c: "Примерная цена", mk4d: "Отправить заявку",
      mk5h: "Расписание", mk5a: "Пн, Ср", mk5b: "Вт, Чт", mk5c: "Суббота", mk5k1: "Дети 7–10", mk5k2: "Начинающие", mk5k3: "Взрослые", mk5d: "Записаться на пробное"
    },
    en: {
      inTitle: "Made for your industry",
      inSub: "The same Online package, with a demo for your industry and the features it needs.",
      inAria: "Industries",
      inPer: "a month", inSetup: "setup", inFree: "free for the first 5", inAi: "With the AI front desk (in testing): {p} ֏ a month, setup {f} ֏", inPilot: "For the first 5 businesses setup is free and the first month is paid after launch.", inTerm: "Pay yearly and save 15%.", inGuar: "Guarantee: if fewer than {n} come through the system in 2 months, month 3 is free",
      inDemo: "See the sample", inMore: "More samples:", inBarber: "barbershop", inNails: "nail studio", inLive: "Live demo with real booking", inMenu: "QR menu", inAsk: "Get a sample in 1 day",
      inAskMsg: "Hello! I’d like a sample of the “{v}” package for my business.",
      inNoDemo: "No ready demo yet: we’ll make a sample with your name in 1 day, free.",
      inMock: "Illustration",
      in1: "Appointments", in1w: "Salons, barbershops, nail studios, cosmetology, clinics, car services", in1f: "Masters, services and prices|Booking by time, at night too|WhatsApp reminder the day before", in1g: "20 online bookings",
      in2: "Stays", in2w: "Guesthouses, hotels, gazebos, saunas, car rental", in2f: "Rooms, photos and prices|Pick free dates|Direct bookings without Booking.com commission", in2g: "5 direct bookings",
      in3: "Menu", in3w: "Restaurants and cafés", in3f: "Menu in three languages|QR menu for the tables|Table booking on WhatsApp", in3g: "15 table bookings or orders",
      in3x: "There’s also a one-time option: ֏120,000, no subscription.",
      in4: "Requests", in4w: "Renovation, furniture, solar panels, cleaning", in4f: "Services and photos of your work|Rough price calculator|Requests arrive on WhatsApp", in4g: "10 requests",
      in5: "Classes", in5w: "Schools, clubs, fitness, dance", in5f: "Groups and timetable|Trial class sign-up|Reminder before the class", in5g: "10 trial sign-ups",
      mk4h: "Price calculator", mk4a: "Service", mk4av: "Flat renovation", mk4b: "Area", mk4c: "Estimated price", mk4d: "Send request",
      mk5h: "Timetable", mk5a: "Mon, Wed", mk5b: "Tue, Thu", mk5c: "Saturday", mk5k1: "Kids 7–10", mk5k2: "Beginners", mk5k3: "Adults", mk5d: "Book a trial class"
    }
  };
  for (var l in I) for (var k in I[l]) window.T[l][k] = I[l][k];
})();
