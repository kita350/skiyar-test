// Пробный 3D-предмет для ниши «Салон»: фен, построенный кодом (метод img2threejs: заготовка → форма → материалы → свет → движение).
// Лёгкий: ~6 тыс. треугольников, без текстур и моделей. Рендер только когда виден; при «уменьшить движение» стоит неподвижно.
import * as THREE from "./three.module.min.js";

export function mountFen(host) {
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  cam.position.set(0, -0.35, 9.6); cam.lookAt(0, -0.35, 0);

  // свет: мягкий общий + ключ сверху-слева + холодный контровой (как у 3D-телефона сайта)
  scene.add(new THREE.HemisphereLight(0xdfe8ff, 0x0d1221, 1.1));
  const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(-4, 5, 6); scene.add(key);
  const rim = new THREE.DirectionalLight(0x8eb2df, 2.0); rim.position.set(5, 1, -4); scene.add(rim);

  // материалы — палитра сайта: светлый корпус, синий акцент, «ночное» сопло
  const body = new THREE.MeshPhysicalMaterial({ color: 0xeef2f8, roughness: 0.38, clearcoat: 0.6, clearcoatRoughness: 0.25 });
  const accent = new THREE.MeshPhysicalMaterial({ color: 0x5296e1, roughness: 0.3, metalness: 0.1, clearcoat: 0.8 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x12182a, roughness: 0.55 });
  const metal = new THREE.MeshStandardMaterial({ color: 0xc8ced8, roughness: 0.25, metalness: 0.9 });

  const fen = new THREE.Group();
  // корпус: тело вращения (профиль задней «шапки», цилиндра и сужения к соплу), ось — X
  const prof = [];
  for (let i = 0; i <= 10; i++) { const a = (i / 10) * Math.PI / 2; prof.push(new THREE.Vector2(Math.sin(a) * 0.62, -1.25 + (1 - Math.cos(a)) * 0.45)); }
  prof.push(new THREE.Vector2(0.64, -0.2), new THREE.Vector2(0.62, 0.55), new THREE.Vector2(0.5, 0.95), new THREE.Vector2(0.42, 1.25));
  const bodyGeo = new THREE.LatheGeometry(prof, 40); bodyGeo.rotateZ(-Math.PI / 2);
  fen.add(new THREE.Mesh(bodyGeo, body));
  // синее кольцо-акцент на корпусе
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.635, 0.045, 12, 48), accent); ring.rotation.y = Math.PI / 2; ring.position.x = 0.2; fen.add(ring);
  // сопло-концентратор: тёмный усечённый конус
  const noz = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.42, 0.55, 36, 1, true), dark); noz.rotation.z = Math.PI / 2; noz.position.x = -1.5; fen.add(noz);
  const nozLip = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.03, 8, 36), dark); nozLip.rotation.y = Math.PI / 2; nozLip.position.x = -1.775; fen.add(nozLip);
  // задняя решётка: металлический диск с кольцами
  const grille = new THREE.Group();
  grille.add(new THREE.Mesh(new THREE.CircleGeometry(0.36, 32), dark));
  for (const r of [0.12, 0.22, 0.32]) grille.add(new THREE.Mesh(new THREE.TorusGeometry(r, 0.012, 6, 32), metal));
  grille.rotation.y = Math.PI / 2; grille.position.x = 1.256; fen.add(grille);
  // ручка: скруглённый брусок, наклон назад
  const handle = new THREE.Mesh(new THREE.CapsuleGeometry(0.26, 1.25, 8, 20), body);
  handle.position.set(0.35, -1.05, 0); handle.rotation.z = -0.22; fen.add(handle);
  // кнопки на ручке
  for (const [y, m] of [[-0.75, accent], [-1.05, dark]]) { const bt = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.06, 20), m); bt.rotation.x = Math.PI / 2; bt.position.set(0.3 + (y + 0.75) * -0.22, y, 0.26); fen.add(bt); }
  // шнур
  const cord = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0.52, -1.75, 0), new THREE.Vector3(0.6, -2.05, 0.12), new THREE.Vector3(0.45, -2.3, 0.2), new THREE.Vector3(0.62, -2.5, 0.05)]), 32, 0.045, 8), dark);
  fen.add(cord);
  fen.position.set(-0.05, 0.25, 0); fen.rotation.set(0.08, -0.5, 0);
  scene.add(fen);

  // контактная тень — мягкое пятно (как у 3D-телефона)
  const sh = document.createElement("canvas"); sh.width = sh.height = 64;
  const g = sh.getContext("2d"), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, "rgba(0,0,0,.55)"); gr.addColorStop(1, "rgba(0,0,0,0)"); g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 0.9), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sh), transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2; shadow.position.set(0.15, -2.45, 0); scene.add(shadow);

  function size() { const w = host.clientWidth || 1, h = host.clientHeight || 1; renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); }
  size(); addEventListener("resize", size); if (window.ResizeObserver) new ResizeObserver(size).observe(host);

  // движение: медленное покачивание + поворот за мышкой; рисуем только когда видно
  let tx = 0, ty = 0, vis = true, raf = 0, t0 = performance.now();
  addEventListener("pointermove", (e) => { tx = (e.clientX / innerWidth - 0.5) * 0.9; ty = (e.clientY / innerHeight - 0.5) * 0.3; }, { passive: true });
  new IntersectionObserver((es) => { vis = es[0].isIntersecting; if (vis && !raf) raf = requestAnimationFrame(loop); }).observe(host);
  function loop(t) {
    raf = 0; if (!vis || document.hidden) return;
    const s = still ? 0 : Math.sin((t - t0) / 2500) * 0.35;
    fen.rotation.y += ((-0.5 + s + (still ? 0 : tx)) - fen.rotation.y) * 0.06;
    fen.rotation.x += ((0.08 + (still ? 0 : ty)) - fen.rotation.x) * 0.06;
    fen.position.y = 0.25 + (still ? 0 : Math.sin((t - t0) / 1600) * 0.05);
    renderer.render(scene, cam);
    if (!still) raf = requestAnimationFrame(loop);
  }
  document.addEventListener("visibilitychange", () => { if (!document.hidden && vis && !raf) raf = requestAnimationFrame(loop); });
  raf = requestAnimationFrame(loop);
  return { triangles: () => { let n = 0; scene.traverse((o) => { if (o.isMesh) n += (o.geometry.index ? o.geometry.index.count : o.geometry.attributes.position.count) / 3; }); return Math.round(n); } };
}
