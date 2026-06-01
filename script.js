// Substitua pelo link oficial da ticketeria
const ticketUrl = "https://www.even3.com.br/fitnesp-experience-747394/";

// Substitua pelo link oficial do Google Maps
const mapsUrl = "https://www.google.com/maps/place/Faculdade+ViaSapiens+-+FVS+%7C+Tiangu%C3%A1/@-3.7197291,-40.990982,17z/data=!3m1!4b1!4m6!3m5!1s0x7eb49c8d56937f5:0xecaff45eb2c656f2!8m2!3d-3.7197291!4d-40.990982!16s%2Fg%2F11f6trwwrw?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D";

// Opcional: substitua pelo link oficial de incorporação do mapa
const mapsEmbedUrl = "https://www.google.com/maps?q=Via+Sapiens+Convention+Center&output=embed";

const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const ticketButtons = document.querySelectorAll("[data-ticket-button]");
const mapButtons = document.querySelectorAll("[data-map-button]");
const mapEmbed = document.querySelector("#map-embed");
const revealElements = document.querySelectorAll(".reveal");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");
const galleryItems = document.querySelectorAll("[data-lightbox-image]");

window.addEventListener("load", () => {
  body.classList.add("page-ready");
});

if (mapEmbed) {
  mapEmbed.src = mapsEmbedUrl;
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

ticketButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    window.open(ticketUrl, "_blank", "noopener,noreferrer");
  });
});

mapButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

revealElements.forEach((element) => observer.observe(element));

const closeLightbox = () => {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  body.classList.remove("lightbox-open");
};

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const imageSrc = item.getAttribute("data-lightbox-image");
    const imageAlt = item.getAttribute("data-lightbox-alt") || "Imagem ampliada";

    lightboxImage.src = imageSrc;
    lightboxImage.alt = imageAlt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    body.classList.add("lightbox-open");
  });
});

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox?.classList.contains("is-open")) {
    closeLightbox();
  }
});
