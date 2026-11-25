/* Тексты блока «Как было у Гора / как стало». Гор — герой наших роликов (лист: social/out/pixel/gor-sheet.png).
   Цифры «было» — сценка из роликов, не статистика клиента (так и подписано). HY — на проверку Ани. */
(function () {
  var G = {
    hy: {
      csTitle: "", csQuote: "", csWho: "",
      grTitle: "Ինչպես էր Գորի մոտ, և ինչպես դարձավ", grSub: "Նույն սրահը, նույն վարպետները։ Տարբերությունը՝ մեկ շաբաթ։",
      grWho: "Գորը մեր տեսահոլովակների հերոսն է՝ գործարար, ով հարազատների և ծանոթների միջոցով փորձում է տարբեր բիզնեսներ՝ ռեստորան, սրահ, հյուրատուն։",
      grWasK: "Առաջ՝ տետր", grWasT: "Գրանցումը տետրում, հեռախոսը՝ մինչև գիշեր",
      grW1: "հաճախորդ 15:00-ին", grW2: "նամակ առանց պատասխանի", grW3: "չեկած շաբաթում",
      grN1: "Ուրբ 15:00 — Աննա", grN2a: "Ուրբ 15:00 —", grN2b: "Մարի", grN3: "Շբթ 11:00 — ???", grN4: "հետ զանգել՝ 6 հոգու",
      grNowK: "Հիմա՝ SKIYAR Online", grNowT: "Հաճախորդները գրանցվում են ինքնուրույն, հիշեցումը գնում է ինքը",
      grS1: "կրկնակի գրանցում", grS2: "գրանցում եկավ գիշերը", grS3: "հիշեցում նախորդ օրը",
      grCalT: "Ուրբաթ, Նարինե", grC1: "Ռուզան, կայքից", grC2: "Աննա, հաստատեց", grC3: "Ազատ",
      grAltWas: "Գորը խուճապի մեջ է՝ տետրում երկու հաճախորդ նույն ժամին", grAltNow: "Գորը ուրախ է՝ գրանցումները հավաքվում են ինքնուրույն",
      grFoot: "«Առաջ» թվերը տեսարան են մեր տեսանյութերից, ոչ թե հաճախորդի վիճակագրություն։"
    },
    ru: {
      csTitle: "", csQuote: "", csWho: "",
      grTitle: "Как было у Гора и как стало", grSub: "Тот же салон, те же мастера. Разница — одна неделя.",
      grWho: "Гор — герой наших роликов: бизнесмен, который через родственников и знакомых пробует разные бизнесы — ресторан, салон, гостиница.",
      grWasK: "Было: тетрадка", grWasT: "Запись в тетрадке, телефон до ночи",
      grW1: "клиента на 15:00", grW2: "сообщений без ответа", grW3: "неявки за неделю",
      grN1: "Пт 15:00 — Анна", grN2a: "Пт 15:00 —", grN2b: "Мари", grN3: "Сб 11:00 — ???", grN4: "перезвонить: 6 чел.",
      grNowK: "Стало: SKIYAR Online", grNowT: "Клиенты записываются сами, напоминание уходит само",
      grS1: "двойных записей", grS2: "записи пришли ночью", grS3: "напоминание накануне",
      grCalT: "Пятница, Нарине", grC1: "Рузан, с сайта", grC2: "Анна, подтвердила", grC3: "Свободно",
      grAltWas: "Гор в панике: в тетрадке два клиента на одно время", grAltNow: "Гор радуется: записи собираются сами",
      grFoot: "Цифры «было» — сценка из наших роликов, не статистика клиента."
    },
    en: {
      csTitle: "", csQuote: "", csWho: "",
      grTitle: "Gor: before and after", grSub: "Same salon, same staff. The difference is one week.",
      grWho: "Gor is the hero of our videos: a businessman who tries different businesses through relatives and friends — a restaurant, a salon, a guesthouse.",
      grWasK: "Before: the notebook", grWasT: "Bookings in a notebook, the phone ringing till midnight",
      grW1: "clients at 15:00", grW2: "unanswered messages", grW3: "no-shows a week",
      grN1: "Fri 15:00 — Anna", grN2a: "Fri 15:00 —", grN2b: "Mari", grN3: "Sat 11:00 — ???", grN4: "call back: 6 people",
      grNowK: "Now: SKIYAR Online", grNowT: "Clients book themselves, reminders go out on their own",
      grS1: "double bookings", grS2: "bookings came in at night", grS3: "reminder the day before",
      grCalT: "Friday, Narine", grC1: "Ruzan, from the site", grC2: "Anna, confirmed", grC3: "Free",
      grAltWas: "Gor panicking: two clients at the same time in the notebook", grAltNow: "Gor happy: bookings collect themselves",
      grFoot: "The “before” numbers are a scene from our videos, not client statistics."
    }
  };
  for (var l in G) for (var k in G[l]) window.T[l][k] = G[l][k];
})();
