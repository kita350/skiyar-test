/* Под вашу отрасль: вкладки (стрелки ←/→), скриншоты и ссылки на демо по языку сайта. */
(function () {
  "use strict";
  var box = document.getElementById("demos");
  if (!box) return;
  var base = box.getAttribute("data-demo-base") || "demo/";
  var tabs = box.querySelectorAll('[role="tab"]');

  function select(tab, focus) {
    for (var i = 0; i < tabs.length; i++) {
      var on = tabs[i] === tab;
      tabs[i].setAttribute("aria-selected", String(on));
      tabs[i].tabIndex = on ? 0 : -1;
      document.getElementById(tabs[i].getAttribute("aria-controls")).hidden = !on;
    }
    if (focus) tab.focus();
    if (tab.scrollIntoView && box.querySelector(".in-tabs").scrollWidth > box.querySelector(".in-tabs").clientWidth) {
      tab.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    }
  }
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function () { select(this); });
    tabs[i].addEventListener("keydown", function (e) {
      var n = Array.prototype.indexOf.call(tabs, this);
      if (e.key === "ArrowRight") { e.preventDefault(); select(tabs[(n + 1) % tabs.length], true); }
      if (e.key === "ArrowLeft") { e.preventDefault(); select(tabs[(n - 1 + tabs.length) % tabs.length], true); }
    });
  }

  function render(lang) {
    var t = window.SITE.t, i, els;
    els = box.querySelectorAll("img[data-shot]");
    for (i = 0; i < els.length; i++) els[i].src = (box.getAttribute("data-img-base") || "../assets/img/") + "shot-" + els[i].getAttribute("data-shot") + "-" + lang + ".webp";
    els = box.querySelectorAll("[data-demo]");
    for (i = 0; i < els.length; i++) els[i].href = base + els[i].getAttribute("data-demo") + "?lang=" + lang;
    els = box.querySelectorAll("[data-ask]");
    for (i = 0; i < els.length; i++) els[i].href = window.SITE.wa(t("inAskMsg").split("{v}").join("Online · " + t(els[i].getAttribute("data-ask"))));
    els = box.querySelectorAll("[data-list]");
    for (i = 0; i < els.length; i++) {
      els[i].textContent = "";
      t(els[i].getAttribute("data-list")).split("|").forEach(function (x) { var li = document.createElement("li"); li.textContent = x; els[i].appendChild(li); });
    }
    els = box.querySelectorAll("[data-ai]");
    for (i = 0; i < els.length; i++) {
      var v = els[i].getAttribute("data-ai").split("|");
      els[i].textContent = t("inAi").split("{p}").join(v[0].replace(" ", "\u00a0")).split("{f}").join(v[1].replace(" ", "\u00a0"));
    }
    els = box.querySelectorAll("[data-guar]");
    for (i = 0; i < els.length; i++) els[i].textContent = t("inGuar").split("{n}").join(t(els[i].getAttribute("data-guar")));
  }
  window.SITE.onRender.push(render);
  render(window.SITE.lang());
})();
