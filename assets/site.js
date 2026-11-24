/* SKIYAR — общий код сайта: языки HY (основной) / RU / EN.
   Тексты страницы — в window.T = { hy: {...}, ru: {...}, en: {...} }.
   Элементы: data-t="ключ" (текст), data-t-html="ключ" (разметка из нашего словаря),
   data-t-alt / data-t-aria / data-t-href.
   Язык: на собранных страницах (/, /ru/, /en/) — window.PAGE_LANG, переключение = переход на страницу языка;
   в исходниках src/ — ?lang= → сохранённый → hy. */
document.documentElement.classList.add("js");
(function () {
  "use strict";
  var LANGS = ["hy", "ru", "en"];
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  var q = (new URLSearchParams(location.search).get("lang") || "").toLowerCase();
  var PAGE = LANGS.indexOf(window.PAGE_LANG) >= 0 ? window.PAGE_LANG : "";
  var lang = PAGE || (LANGS.indexOf(q) >= 0 ? q : (LANGS.indexOf(store("skiyar-lang")) >= 0 ? store("skiyar-lang") : "hy"));

  var S = (window.SITE = {
    lang: function () { return lang; },
    t: function (k) { var d = (window.T || {})[lang] || {}; return d[k] != null ? d[k] : ((window.T || {}).ru || {})[k] || ""; },
    wa: function (text) { return "https://wa.me/37498337187?text=" + encodeURIComponent(text); },
    onRender: [],
    render: function (first) {
      document.documentElement.lang = lang;
      document.body.setAttribute("data-lang", lang);
      var i, els;
      // собранная страница уже содержит тексты своего языка — при первом показе их не переписываем
      if (first === true && PAGE) { for (i = 0; i < S.onRender.length; i++) S.onRender[i](lang); return; }
      els = document.querySelectorAll("[data-t]");
      for (i = 0; i < els.length; i++) els[i].textContent = S.t(els[i].getAttribute("data-t"));
      els = document.querySelectorAll("[data-t-html]");
      for (i = 0; i < els.length; i++) els[i].innerHTML = S.t(els[i].getAttribute("data-t-html"));
      els = document.querySelectorAll("[data-t-alt]");
      for (i = 0; i < els.length; i++) els[i].alt = S.t(els[i].getAttribute("data-t-alt"));
      els = document.querySelectorAll("[data-t-aria]");
      for (i = 0; i < els.length; i++) els[i].setAttribute("aria-label", S.t(els[i].getAttribute("data-t-aria")));
      els = document.querySelectorAll("[data-t-ph]");
      for (i = 0; i < els.length; i++) els[i].placeholder = S.t(els[i].getAttribute("data-t-ph"));
      els = document.querySelectorAll("[data-t-src]");
      for (i = 0; i < els.length; i++) els[i].src = S.t(els[i].getAttribute("data-t-src"));
      els = document.querySelectorAll("[data-wa]");
      for (i = 0; i < els.length; i++) els[i].href = S.wa(S.t(els[i].getAttribute("data-wa")));
      els = document.querySelectorAll("[data-lang-btn]");
      for (i = 0; i < els.length; i++) if (els[i].tagName === "BUTTON") els[i].setAttribute("aria-pressed", String(els[i].getAttribute("data-lang-btn") === lang));
      var tk = document.body.getAttribute("data-title-key") || "", title = S.t(tk ? "_title" + tk : "_title"); if (title) document.title = title;
      var desc = S.t(tk ? "_desc" + tk : "_desc"), md = document.querySelector('meta[name="description"]'); if (desc && md) md.setAttribute("content", desc);
      for (i = 0; i < S.onRender.length; i++) S.onRender[i](lang);
    },
    setLang: function (l) {
      if (LANGS.indexOf(l) < 0) return;
      lang = l; store("skiyar-lang", l);
      var u = new URL(location.href); u.searchParams.set("lang", l); history.replaceState(null, "", u);
      S.render();
    }
  });
  // меню на телефоне
  document.addEventListener("click", function (e) {
    var nav = document.getElementById("nav"), m = e.target.closest && e.target.closest(".nav-burger");
    if (!nav) return;
    if (m) { var o = !nav.classList.contains("open"); nav.classList.toggle("open", o); m.setAttribute("aria-expanded", String(o)); return; }
    if (nav.classList.contains("open") && e.target.closest(".nav-links a")) { nav.classList.remove("open"); nav.querySelector(".nav-burger").setAttribute("aria-expanded", "false"); }
  });
  // выпадающий список языков: закрывать по нажатию мимо и по Esc
  document.addEventListener("click", function (e) { var d = document.querySelector(".lang-dd[open]"); if (d && !d.contains(e.target)) d.open = false; });
  document.addEventListener("keydown", function (e) { var d = document.querySelector(".lang-dd[open]"); if (d && e.key === "Escape") { d.open = false; d.querySelector("summary").focus(); } });
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-lang-btn]");
    if (!b) return;
    var l = b.getAttribute("data-lang-btn");
    var dd = b.closest(".lang-dd"); if (dd) dd.open = false;
    if (PAGE) {
      // собранная страница: переходим на страницу языка, сохраняя якорь
      var a = b.tagName === "A" ? b : document.querySelector('a[data-lang-btn="' + l + '"][href]');
      if (a) { e.preventDefault(); if (l !== lang) location.href = a.href.split("#")[0] + location.hash; }
      return;
    }
    e.preventDefault(); S.setLang(l);
  });
  function boot() { S.render(true); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
