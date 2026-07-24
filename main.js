/**
 * Enkai Academy v2 — Art Agency Style
 */

document.addEventListener("DOMContentLoaded", () => {
  // Nav scroll
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  });

  // Mobile menu
  const toggle = document.getElementById("navToggle");
  const links = document.querySelector(".nav-links");
  if (toggle) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
  }
  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.addEventListener("click", () => links.classList.remove("open"));
  });

  // Load works
  let works = [];

  async function loadWorks() {
    try {
      const res = await fetch("works.json");
      if (!res.ok) throw new Error("fail");
      works = await res.json();
    } catch {
      works = getFallback();
    }
    renderGallery(works);
    // Update stat
    const el = document.getElementById("statArtworks");
    if (el) el.textContent = works.length;
  }

  function getFallback() {
    return [
      {
        id: 1,
        title: "Cyber Neon Odyssey",
        category: "digital",
        type: "image",
        src: "https://images.unsplash.com/photo-1618005182384-a83febe501ca?w=900&q=80",
        description: "Digital art cyberpunk neon city.",
        date: "2026-03-15",
        author: "Phạm Anh Quốc",
      },
      {
        id: 2,
        title: "Cosmic Liquid Gold",
        category: "3d",
        type: "image",
        src: "https://images.unsplash.com/photo-1634017839464-5c339bbe3c28?w=900&q=80",
        description: "3D liquid metal in space.",
        date: "2026-01-28",
        author: "Phạm Anh Quốc",
      },
      {
        id: 3,
        title: "Neo Cyber Ronin",
        category: "visual",
        type: "image",
        src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=900&q=80",
        description: "Future samurai visual art.",
        date: "2025-11-10",
        author: "Phạm Anh Quốc",
      },
    ];
  }

  const grid = document.getElementById("galleryGrid");
  const catMap = {
    visual: "Visual Art",
    digital: "Digital Art",
    "3d": "3D Art",
    video: "Video & Animation",
  };

  function renderGallery(list) {
    grid.innerHTML = "";
    if (!list.length) {
      grid.innerHTML = `<div class="empty-state"><p>Chưa có tác phẩm</p></div>`;
      return;
    }

    list.forEach((item) => {
      const card = document.createElement("article");
      card.className = "gallery-item";
      card.dataset.category = item.category;

      const media =
        item.type === "video"
          ? `<video src="${item.src}" muted loop playsinline preload="metadata"></video>
             <span class="item-badge">VIDEO</span>`
          : `<img src="${item.src}" alt="${item.title}" loading="lazy" />`;

      card.innerHTML = `
        ${media}
        <div class="item-overlay">
          <span class="item-cat">${catMap[item.category] || item.category}</span>
          <h3 class="item-title">${item.title}</h3>
          <span class="item-author">${item.author || "Phạm Anh Quốc"}</span>
        </div>
      `;

      card.addEventListener("click", () => openModal(item));
      grid.appendChild(card);
    });
  }

  // Filter
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      const filtered = f === "all" ? works : works.filter((w) => w.category === f);
      renderGallery(filtered);
    });
  });

  // Modal
  const modal = document.getElementById("detailModal");
  const modalMedia = document.getElementById("modalMedia");
  const modalTitle = document.getElementById("modalTitle");
  const modalCat = document.getElementById("modalCat");
  const modalDesc = document.getElementById("modalDesc");
  const modalMeta = document.getElementById("modalMeta");

  function openModal(item) {
    modalTitle.textContent = item.title;
    modalCat.textContent = catMap[item.category] || item.category;
    modalDesc.textContent = item.description || "";
    modalMeta.textContent = `${item.author || "Phạm Anh Quốc"} · ${formatDate(item.date)}`;

    modalMedia.innerHTML = "";
    if (item.type === "video") {
      const v = document.createElement("video");
      v.src = item.src;
      v.controls = true;
      v.autoplay = true;
      v.playsInline = true;
      modalMedia.appendChild(v);
    } else {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.title;
      modalMedia.appendChild(img);
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    const v = modalMedia.querySelector("video");
    if (v) {
      v.pause();
      v.src = "";
    }
  }

  document.querySelector(".modal-close").addEventListener("click", closeModal);
  document.querySelector(".modal-overlay").addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  function formatDate(str) {
    if (!str) return "";
    const d = new Date(str);
    return d.toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" });
  }

  loadWorks();
});
