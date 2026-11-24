/* Демо ресторана: меню, бронь столика через WhatsApp. */
(function () {
  "use strict";
  var D = window.DEMO, LI = { hy: 0, ru: 1, en: 2 };
  var st = { guests: 2 };
  function $(id) { return document.getElementById(id); }
  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    return e;
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function iso(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }

  function renderMenu() {
    var nav = $("menuNav"), box = $("courses"), l = LI[D.lang];
    nav.textContent = ""; box.textContent = "";
    window.MENU.forEach(function (c) {
      nav.appendChild(el("a", { href: "#c-" + c.id }, c.name[l]));
      var sec = el("div", { "class": "course", id: "c-" + c.id });
      var fig = el("figure");
      fig.appendChild(el("img", {
        src: "img/" + c.photo + "-480.webp", srcset: "img/" + c.photo + "-480.webp 480w, img/" + c.photo + "-960.webp 960w",
        sizes: "(min-width:760px) 50vw, 100vw", width: "480", height: String(c.h), loading: "lazy", decoding: "async", alt: c.name[l], style: D.bg(c.photo)
      }));
      sec.appendChild(fig);
      var list = el("div");
      list.appendChild(el("h3", null, c.name[l]));
      c.items.forEach(function (it) {
        var row = el("div", { "class": "dish" });
        row.appendChild(el("span", { "class": "dish-n" }, it[l]));
        var p = D.price(it[3]);
        row.appendChild(el("span", { "class": "dish-p" }, it[4] ? D.t("from", { p: p }) : p));
        if (it[5]) row.appendChild(el("span", { "class": "dish-d" }, it[5 + l]));
        list.appendChild(row);
      });
      sec.appendChild(list);
      box.appendChild(sec);
    });
  }

  function fillTimes() {
    var sel = $("bTime"), keep = sel.value || "19:00", now = new Date();
    var isToday = st.day === iso(now);
    sel.textContent = "";
    for (var m = 12 * 60; m <= 22 * 60 + 30; m += 30) {
      if (isToday && m <= now.getHours() * 60 + now.getMinutes() + 30) continue;
      var t = pad(Math.floor(m / 60)) + ":" + pad(m % 60);
      sel.appendChild(el("option", { value: t }, t));
    }
    if (!sel.options.length) sel.appendChild(el("option", { value: "" }, "—"));
    sel.value = keep;
    if (!sel.value && sel.options.length) sel.selectedIndex = 0;
  }

  function fillPlaces() {
    var sel = $("bPlace"), keep = sel.value || "any";
    sel.textContent = "";
    ["any", "hall", "terrace"].forEach(function (p) { sel.appendChild(el("option", { value: p }, D.t("p_" + p))); });
    sel.value = keep;
  }

  function updateLink() {
    var btn = $("bookBtn"), dv = st.day, tv = $("bTime").value;
    $("gCount").textContent = st.guests;
    if (!dv || !tv) { btn.removeAttribute("href"); btn.setAttribute("aria-disabled", "true"); btn.style.opacity = ".45"; return; }
    var p = dv.split("-"), d = new Date(+p[0], +p[1] - 1, +p[2], 12);
    var msg = D.t("waMsg", {
      date: D.date(d, "long"),
      time: tv, guests: st.guests, place: D.t("p_" + $("bPlace").value),
      inName: D.name ? D.t("inName") : ""
    });
    btn.href = D.wa(msg); btn.setAttribute("aria-disabled", "false"); btn.style.opacity = "";
  }

  function renderStatic() {
    var c = D.city();
    $("tag").textContent = c ? D.t("tagCity") : D.t("tag");
    $("addr").textContent = c ? D.t("addrCity") : D.t("addr");
    $("qrLink").href = "menu.html" + location.search;
    renderLead();
    renderDays(); fillTimes(); fillPlaces(); updateLink();
  }

  // Публичные данные конкретного заведения из ссылки (?wa= ?ig= ?fb= ?hours= ?rating= ?reviews=).
  // Без них — нейтральные заглушки. Бронь в демо всё равно открывает WhatsApp без номера.
  function renderLead() {
    var L = D.lead;
    $("hours").textContent = L.hours ? D.t("hoursDaily", { from: L.hours[0], to: L.hours[1] }) : D.t("hours");
    $("kitchen").textContent = L.hours ? "" : D.t("kitchen");
    var r = $("rating");
    r.hidden = !L.rating;
    if (L.rating) {
      var rv = L.rating.replace(".", D.lang === "en" ? "." : ",");
      r.textContent = L.reviews ? D.t("ratingLine", { r: rv, n: L.reviews }) : D.t("ratingOnly", { r: rv });
    }
    var pb = $("phoneBox"); pb.textContent = ""; pb.className = L.wa ? "" : "muted";
    if (L.wa) pb.appendChild(el("a", { href: "https://wa.me/" + L.wa, target: "_blank", rel: "noopener" }, D.t("waLink", { p: D.phone(L.wa) })));
    else pb.textContent = D.t("phoneText");
    var sb = $("socialBox"); sb.textContent = "";
    if (L.ig) sb.appendChild(el("a", { href: "https://www.instagram.com/" + L.ig + "/", target: "_blank", rel: "noopener" }, "Instagram"));
    if (L.fb) sb.appendChild(el("a", { href: "https://www.facebook.com/" + L.fb, target: "_blank", rel: "noopener" }, "Facebook"));
    sb.hidden = !(L.ig || L.fb);
  }

  // Даты — полоса из 14 дней, как в салоне (без стандартного поля браузера).
  function dayFrom(k) { var p = k.split("-"); return new Date(+p[0], +p[1] - 1, +p[2], 12); }
  function renderDays() {
    var box = $("dayOpts"), now = new Date(), base = new Date(); base.setHours(12, 0, 0, 0);
    var skipToday = now.getHours() * 60 + now.getMinutes() > 22 * 60;   // кухня закрывается — бронь с завтра
    var keepScroll = box.scrollLeft;
    box.textContent = "";
    for (var i = skipToday ? 1 : 0; i < 15; i++) {
      (function (d, first) {
        var k = iso(d);
        if (!st.day) st.day = k;
        var b = el("button", { type: "button", "class": "day", role: "radio", "aria-checked": String(st.day === k), "aria-label": D.date(d, "long") });
        b.appendChild(el("small", null, first && !skipToday ? D.t("todayShort") : D.date(d, "wd")));
        b.appendChild(el("b", null, String(d.getDate())));
        b.addEventListener("click", function () { st.day = k; renderDays(); fillTimes(); updateLink(); });
        box.appendChild(b);
      })(new Date(base.getTime() + i * 864e5), i === 0);
    }
    box.scrollLeft = keepScroll;
    $("picked").textContent = D.cap(D.date(dayFrom(st.day), "long"));
    D.scrollHint(box);
  }

  $("bTime").addEventListener("change", updateLink);
  $("bPlace").addEventListener("change", updateLink);
  $("gMinus").addEventListener("click", function () { if (st.guests > 1) st.guests--; updateLink(); });
  $("gPlus").addEventListener("click", function () { if (st.guests < 20) st.guests++; updateLink(); });

  document.querySelector("footer details").addEventListener("toggle", function () {
    var ul = $("credits"); if (ul.childNodes.length) return;
    fetch("img/credits.json").then(function (r) { return r.json(); }).then(function (list) {
      list.forEach(function (c) { var li = el("li"); li.appendChild(el("a", { href: c.url, target: "_blank", rel: "noopener" }, c.url.replace("https://", ""))); ul.appendChild(li); });
    }).catch(function () {});
  });

  D.init(window.I18N, function () { renderStatic(); renderMenu(); D.scrollHint($("menuNav")); });
})();
