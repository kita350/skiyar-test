/* Тексты калькулятора «Посчитайте сами». HY — на проверку Ани.
   Без обещаний процента снижения неявок: главное — сколько визитов надо вернуть, чтобы пакет окупился. */
(function () {
  var C = {
    hy: {
      caTitle: "Որքա՞ն են արժենում դատարկ աթոռները",
      caSub: "Շարժեք սահիչները՝ ձեր թվերով։",
      caB: "Գրանցումներ շաբաթական", caN: "Չեկածներ շաբաթական", caC: "Միջին չեկ",
      caPayK: "Փաթեթն իրեն արդարացնում է, եթե հիշեցումները ամսական վերադարձնեն",
      caVisits: "այց", caVisit: "այց",
      caLoss: "Չեկածների պատճառով ամսական կորցնում եք մինչև {x}",
      caFormula: "{n} չեկած × {c} × 4,3 շաբաթ, ձեր գրանցումների {p}%-ը",
      caLow: "Չեկածները քիչ են՝ գրանցումների {p}%-ը։ Ձեզ համար ավելի կարևոր են գիշերային և հանգստյան օրերի գրանցումները։",
      caZero: "Չեկածներ չկա՞ն։ Հիանալի է։ Այդ դեպքում փաթեթը ձեզ պետք է գիշերային գրանցումների համար։",
      caPkg: "Փաթեթ՝ 35 000 ֏ ամսական",
      caNote: "Հիշեցումները նվազեցնում են չեկածների թիվը, բայց ոչ մինչև զրո, և որոշ ազատված ժամեր զբաղեցնում են ուրիշները։ Հաշվարկը մոտավոր է։",
      caCta: "Հաշվել մեզ հետ WhatsApp-ով",
      caWa: "Բարև ձեզ։ Հաշվեցի չեկածները ձեր կայքում։ Ուզում եմ միասին հաշվել իմ բիզնեսի համար։"
    },
    ru: {
      caTitle: "Сколько стоят пустые кресла",
      caSub: "Подвигайте ползунки — с вашими цифрами.",
      caB: "Записей в неделю", caN: "Неявок в неделю", caC: "Средний чек",
      caPayK: "Пакет окупается, если напоминания вернут в месяц",
      caLoss: "На неявках вы теряете до {x} в месяц",
      caFormula: "{n} × {c} × 4,3 недели — это {p}% ваших записей",
      caLow: "Неявок мало — {p}% записей. Вам важнее записи ночью и в выходные.",
      caZero: "Неявок нет? Отлично. Тогда пакет нужен ради ночных записей.",
      caPkg: "Пакет: 35 000 ֏ в месяц",
      caNote: "Напоминания сокращают неявки, но не до нуля, а часть освободившихся окон занимают другие клиенты. Расчёт примерный.",
      caCta: "Посчитать с нами в WhatsApp",
      caWa: "Здравствуйте! Посчитал(а) неявки у вас на сайте. Хочу посчитать вместе для моего бизнеса."
    },
    en: {
      caTitle: "What do empty chairs cost you",
      caSub: "Move the sliders to your own numbers.",
      caB: "Bookings a week", caN: "No-shows a week", caC: "Average bill",
      caPayK: "The package pays for itself if reminders bring back, each month,",
      caLoss: "No-shows cost you up to {x} a month",
      caFormula: "{n} × {c} × 4.3 weeks, {p}% of your bookings",
      caLow: "Few no-shows: {p}% of bookings. Night and weekend bookings matter more for you.",
      caZero: "No no-shows? Great. Then the package is about the bookings you get at night.",
      caPkg: "Package: 35 000 ֏ a month",
      caNote: "Reminders cut no-shows, but not to zero, and other clients fill some of the freed slots. A rough estimate.",
      caCta: "Do the math with us on WhatsApp",
      caWa: "Hello! I did the no-show math on your site. I’d like to work it out together for my business."
    }
  };
  for (var l in C) for (var k in C[l]) window.T[l][k] = C[l][k];
})();
