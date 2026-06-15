document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const brand = document.querySelector(".brand");
  const sectionLinks = Array.from(document.querySelectorAll('.menu a[href^="#"]'));
  const sections = sectionLinks
    .map((link) => {
      const id = link.getAttribute("href");
      return id ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  let lockedSectionId = null;
  let lockTimer = null;

  function clearActiveStates() {
    sectionLinks.forEach((link) => {
      link.classList.remove("is-active-section");
    });

    if (brand) {
      brand.classList.remove("is-active-section");
    }
  }

  function setActiveSection(sectionId) {
    clearActiveStates();

    if (sectionId === "home") {
      if (brand) {
        brand.classList.add("is-active-section");
      }
      return;
    }

    const activeLink = sectionLinks.find((link) => link.getAttribute("href") === `#${sectionId}`);

    if (activeLink) {
      activeLink.classList.add("is-active-section");
    }
  }

  function getCurrentSectionId() {
    const scrollY = window.scrollY || window.pageYOffset;

    /*
      Home is active while the user is still in the hero area.
      Once the scroll reaches the first section, the normal menu sections take over.
    */
    const firstSection = sections[0];

    if (firstSection) {
      const firstSectionTop = firstSection.offsetTop;
      if (scrollY < firstSectionTop - 180) {
        return "home";
      }
    }

    let currentId = sections.length ? sections[0].id : "home";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 180;

      if (scrollY >= sectionTop) {
        currentId = section.id;
      }
    });

    return currentId;
  }

  function updateActiveSection() {
    if (lockedSectionId) {
      return;
    }

    const currentId = getCurrentSectionId();
    setActiveSection(currentId);
  }

  updateActiveSection();

  window.addEventListener("scroll", updateActiveSection, { passive: true });
  window.addEventListener("resize", updateActiveSection);

  sectionLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href");
      const targetId = href ? href.replace("#", "") : null;

      if (!targetId) {
        return;
      }

      lockedSectionId = targetId;
      setActiveSection(targetId);

      if (menu && menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
      }

      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
      }

      window.clearTimeout(lockTimer);

      lockTimer = window.setTimeout(() => {
        lockedSectionId = null;
        updateActiveSection();
      }, 900);
    });
  });

  if (brand) {
    brand.addEventListener("click", () => {
      lockedSectionId = "home";
      setActiveSection("home");

      if (menu && menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
      }

      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
      }

      window.clearTimeout(lockTimer);

      lockTimer = window.setTimeout(() => {
        lockedSectionId = null;
        updateActiveSection();
      }, 900);
    });
  }
});
