/* ===========================
   VARIABLES GLOBALES
=========================== */
const container = document.getElementById("products");
const modal = document.getElementById("modal");
const btnBolivia = document.getElementById("btnBolivia");
const btnUsd = document.getElementById("btnUsd");
const closeModalBtn = document.getElementById("closeModal");

let productoSeleccionado = null;

/* ===========================
   CARGAR PRODUCTOS DESDE JSON
=========================== */
fetch("products.json")
  .then(res => res.json())
  .then(products => {

    products.forEach(p => {
      const div = document.createElement("div");
      div.className = "product";

      div.innerHTML = `
        ${p.premium ? '<span class="badge-premium">👑 PREMIUM</span>' : ''}
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <div class="buttons">
          <button class="ver">Ver</button>
          <button class="copiar">Copiar URL</button>
          <button class="comprar">Código Completo</button>
          <button class="personalizar">Personalizar</button>
        </div>
      `;

      /* ======================
         BOTÓN COPIAR URL
      ====================== */
      div.querySelector(".copiar").addEventListener("click", () => {
  if (!p.url) {
    alert("50 likes ❤️  = URL GRATIS");
    return;
  }

  navigator.clipboard.writeText(p.url)
    .then(() => {
      alert("URL copiada al portapapeles");
    })
    .catch(() => {
      alert("No se pudo copiar la URL");
    });
});

/* ======================
   BOTÓN VER (TIKTOK)
====================== */
div.querySelector(".ver").addEventListener("click", () => {
  if (!p.tiktok_url) {
    alert("Este producto no tiene video en TikTok");
    return;
  }

  window.open(p.tiktok_url, "_blank");
});


      /* ======================
         BOTÓN COMPRAR → MODAL
      ====================== */
      div.querySelector(".comprar").addEventListener("click", () => {
        abrirModal(p);
      });

      /* ======================
         BOTÓN PERSONALIZAR
      ====================== */
      div.querySelector(".personalizar").addEventListener("click", () => {
        const mensaje = `Hola JD-CODE quiero personalizar el producto: ${p.nombre}`;
        window.open(
          `https://wa.me/59163614354?text=${encodeURIComponent(mensaje)}`,
          "_blank"
        );
      });

      container.appendChild(div);
    });

  })
  .catch(err => {
    console.error("Error cargando products.json", err);
  });

/* ===========================
   MODAL COMPRA
=========================== */
function abrirModal(producto) {
  productoSeleccionado = producto;

  // Precios desde JSON
  btnBolivia.textContent = `${producto.precio_bs} Bs`;
  btnUsd.textContent = `Tarjeta Credito/Débito - ${producto.precio_usd} USD`;

  modal.classList.remove("hidden");
}

/* ===========================
   CERRAR MODAL
=========================== */
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});


/* ===========================
   WHATSAPP
=========================== */
btnBolivia.addEventListener("click", () => {
  enviarWhatsApp(`${productoSeleccionado.precio_bs} Bs`);
});

btnUsd.addEventListener("click", () => {
  enviarWhatsApp(`${productoSeleccionado.precio_usd} USD`);
});

function enviarWhatsApp(precio) {
  const msg = `Hola JD-CODE, quiero comprar el código ${productoSeleccionado.nombre} por ${precio}`;
  window.open(
    `https://wa.me/59163614354?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
  modal.classList.add("hidden");
}

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
