fetch("products.json")
  .then(res => res.json())
  .then(products => {

    const container = document.getElementById("featured-products");

    // Premium primero
    const destacados = products
      .sort((a, b) => (b.premium === true) - (a.premium === true))
      .slice(0, 3);

    destacados.forEach(p => {
      const div = document.createElement("div");
      div.className = "product";

      div.innerHTML = `
        ${p.premium ? '<span class="badge-premium">👑 PREMIUM</span>' : ''}
        <img src="${p.imagen}">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <div class="buttons">
          <button class="comprar" onclick="location.href='catalogo.html'">
            Ver en catálogo
          </button>
        </div>
      `;

      container.appendChild(div);
    });
  });

/* ===========================
   PARTÍCULAS FONDO
=========================== */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

const particles = Array.from({ length: 80 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2 + 1,
  dx: (Math.random() - 0.5) * 0.7,
  dy: (Math.random() - 0.5) * 0.7
}));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "#00e5ff";
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
