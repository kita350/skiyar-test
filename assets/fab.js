/* Плавающая кнопка WhatsApp (телефон и планшет): видна всегда — это главный способ связи.
   Прячется только пока открыто меню. Никаких замеров при прокрутке.
   Чтобы она не закрывала текст, внизу каждого блока и подвала оставлено место (end.css). */
(function () {
  "use strict";
  var fab = document.getElementById("fab"), nav = document.getElementById("nav");
  if (!fab) return;
  fab.classList.add("on");
  // Встроенные браузеры Facebook/Instagram рисуют свою нижнюю панель поверх страницы — поднимаем кнопку над ней.
  if (/FBAN|FBAV|FB_IAB|Instagram/i.test(navigator.userAgent)) document.documentElement.classList.add("inapp");
  if (!nav || !("MutationObserver" in window)) return;
  new MutationObserver(function () { fab.classList.toggle("on", !nav.classList.contains("open")); })
    .observe(nav, { attributes: true, attributeFilter: ["class"] });
})();
