/* «Пакеты» на телефоне: таблица «Online по отраслям» — карточкой на отрасль. Подписи цен берём из шапки таблицы. */
(function () {
  "use strict";
  var t = document.querySelector("#variants table"); if (!t) return;
  var hs = [].map.call(t.querySelectorAll("thead th"), function (h) { return h.textContent.trim(); });
  [].forEach.call(t.querySelectorAll("tbody tr"), function (tr) {
    [].forEach.call(tr.children, function (c, i) { if (hs[i]) c.setAttribute("data-l", hs[i]); });
  });
  t.classList.add("pg-cards");
})();
