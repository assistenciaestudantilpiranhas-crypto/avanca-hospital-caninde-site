const menuToggle = document.querySelector(".menu-toggle");
const siteMenu = document.querySelector(".site-menu");
const navLinks = Array.from(document.querySelectorAll(".site-menu a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const backToTop = document.querySelector(".back-to-top");
const lawModal = document.querySelector("[data-law-modal]");
const openLawModalButtons = Array.from(document.querySelectorAll("[data-open-law-modal]"));
const closeLawModalButtons = Array.from(document.querySelectorAll("[data-close-law-modal]"));
const modalTriggers = Array.from(document.querySelectorAll("[data-modal-target]"));
const genericModals = Array.from(document.querySelectorAll("[data-modal]"));
const brandLogo = document.querySelector("[data-brand-logo]");
const brandFallback = document.querySelector("[data-brand-fallback]");
let lastModalTrigger = null;
let lastLawModalTrigger = null;

if (brandLogo && brandFallback) {
  brandFallback.hidden = true;
  brandLogo.addEventListener("error", () => {
    brandLogo.hidden = true;
    brandFallback.hidden = false;
  });
}

menuToggle.addEventListener("click", () => {
  const isOpen = siteMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  });
});

const setActiveLink = () => {
  const offset = window.scrollY + 130;
  let currentId = sections[0]?.id;

  sections.forEach((section) => {
    if (section.offsetTop <= offset) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
};

const toggleBackToTop = () => {
  backToTop.classList.toggle("visible", window.scrollY > 620);
};

window.addEventListener("scroll", () => {
  setActiveLink();
  toggleBackToTop();
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const openLawModal = (trigger) => {
  lastLawModalTrigger = trigger;
  lawModal.classList.add("open");
  lawModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  lawModal.querySelector("[data-close-law-modal]").focus();
};

const closeLawModal = () => {
  lawModal.classList.remove("open");
  lawModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastLawModalTrigger) {
    lastLawModalTrigger.focus();
  }
};

openLawModalButtons.forEach((button) => {
  button.addEventListener("click", () => openLawModal(button));
});

closeLawModalButtons.forEach((button) => {
  button.addEventListener("click", closeLawModal);
});

lawModal.addEventListener("click", (event) => {
  if (event.target === lawModal) {
    closeLawModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lawModal.classList.contains("open")) {
    closeLawModal();
  }
});

const openModal = (modal, trigger) => {
  lastModalTrigger = trigger;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modal.querySelector("[data-modal-close]").focus();
};

const closeModal = (modal) => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastModalTrigger) {
    lastModalTrigger.focus();
  }
};

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const modal = document.querySelector(`[data-modal="${trigger.dataset.modalTarget}"]`);
    if (modal) {
      openModal(modal, trigger);
    }
  });
});

genericModals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });

  modal.querySelectorAll("[data-modal-close]").forEach((button) => {
    button.addEventListener("click", () => closeModal(modal));
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  const openGenericModal = genericModals.find((modal) => modal.classList.contains("open"));
  if (openGenericModal) {
    closeModal(openGenericModal);
  }
});

setActiveLink();
toggleBackToTop();
