/* «Посмотрите свой сайт»: название → живое превью → демо с ?name=&lang=.
   Название вставляется только как текст и только в ссылку; ничего не сохраняется. */
(function () {
  "use strict";
  var box = document.getElementById("try");
  if (!box) return;
  var base = box.getAttribute("data-demo-base") || "demo/";
  var input = box.querySelector("#tyName");
  var pv = box.querySelector(".pv");
  var link = box.querySelector("#tyOpen");
  var wa = box.querySelector("#tyWa");
  var K = { salon: ["pvSalon", "pvSalonBtn", "pvSalonNo"], restaurant: ["pvRest", "pvRestBtn", "pvRestNo"], hotel: ["pvHotel", "pvHotelBtn", "pvHotelNo"], auto: ["pvAuto", "pvAutoBtn", "pvAutoNo"], clinic: ["pvClinic", "pvClinicBtn", "pvClinicNo"], courses: ["pvCourses", "pvCoursesBtn", "pvCoursesNo"], realty: ["pvRealty", "pvRealtyBtn", "pvRealtyNo"], repair: ["pvRepair", "pvRepairBtn", "pvRepairNo"] };
  var kind = "hotel";

  function clean(s) { return (s || "").replace(/[\u0000-\u001f\u007f<>{}]/g, "").replace(/\s+/g, " ").trim().slice(0, 60); }
  // латиница для адреса: армянский и русский транслитом
  var TR = { "ա":"a","բ":"b","գ":"g","դ":"d","ե":"e","զ":"z","է":"e","ը":"y","թ":"t","ժ":"zh","ի":"i","լ":"l","խ":"kh","ծ":"ts","կ":"k","հ":"h","ձ":"dz","ղ":"gh","ճ":"ch","մ":"m","յ":"y","ն":"n","շ":"sh","ո":"o","չ":"ch","պ":"p","ջ":"j","ռ":"r","ս":"s","վ":"v","տ":"t","ր":"r","ց":"ts","ւ":"v","փ":"p","ք":"q","և":"ev","օ":"o","ֆ":"f",
    "а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ё":"e","ж":"zh","з":"z","и":"i","й":"y","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"kh","ц":"ts","ч":"ch","ш":"sh","щ":"sh","ы":"y","э":"e","ю":"yu","я":"ya" };
  function slug(s) {
    var x = s.toLowerCase().replace(/ու/g, "u").replace(/./g, function (c) { return TR[c] != null ? TR[c] : c; }).replace(/[^a-z0-9]+/g, "");
    return x.slice(0, 24);
  }

  function upd() {
    var t = window.SITE.t, name = clean(input.value), k = K[kind];
    pv.setAttribute("data-kind", kind);
    pv.querySelector(".pv-name").textContent = name || t(k[2]);
    pv.querySelector(".pv-kind").textContent = t(k[0]);
    pv.querySelector(".pv-btn").textContent = t(k[1]);
    pv.querySelector(".pv-url b").textContent = slug(name) || "yourname";
    pv.querySelector(".pv-img").src = base + kind + "/img/hero-800.webp";
    var q = new URLSearchParams();
    if (name) q.set("name", name);
    q.set("lang", window.SITE.lang());
    link.href = base + kind + "/?" + q.toString();
    wa.href = window.SITE.wa(t("tyWaMsg").split("{n}").join(name || "—").split("{k}").join(t(k[0])));
    var bs = box.querySelectorAll("[data-kind-btn]");
    for (var i = 0; i < bs.length; i++) bs[i].setAttribute("aria-checked", String(bs[i].getAttribute("data-kind-btn") === kind));
  }

  box.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-kind-btn]");
    if (b) { kind = b.getAttribute("data-kind-btn"); upd(); }
  });
  input.addEventListener("input", upd);
  box.querySelector("form").addEventListener("submit", function (e) { e.preventDefault(); window.open(wa.href, "_blank", "noopener"); });
  window.SITE.onRender.push(upd);
  upd();
})();
