document.addEventListener("DOMContentLoaded", () => {
  /*
   * Footer year
   */
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /*
   * Mobile navigation menu
   */
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });
  }

  /*
   * Highlight active navigation section while scrolling
   */
  const sectionLinks = Array.from(document.querySelectorAll(".menu a[href^='#']"));

  const sections = sectionLinks
    .map((link) => {
      const id = link.getAttribute("href");
      const section = document.querySelector(id);

      if (!section) {
        return null;
      }

      return {
        id,
        link,
        section
      };
    })
    .filter(Boolean);

  let lockedActiveSection = null;
  let lockTimer = null;

  const clearActiveSections = () => {
    sectionLinks.forEach((link) => {
      link.classList.remove("is-active-section");
    });
  };

  const setActiveSection = (id) => {
    clearActiveSections();

    const activeLink = document.querySelector(`.menu a[href="${id}"]`);

    if (activeLink) {
      activeLink.classList.add("is-active-section");
    }
  };

  const updateActiveSection = () => {
    if (lockedActiveSection) {
      setActiveSection(lockedActiveSection);
      return;
    }

    const offset = 170;
    let currentSectionId = "";

    sections.forEach(({ id, section }) => {
      const sectionTop = section.offsetTop - offset;

      if (window.scrollY >= sectionTop) {
        currentSectionId = id;
      }
    });

    if (currentSectionId) {
      setActiveSection(currentSectionId);
    } else {
      clearActiveSections();
    }
  };

  window.addEventListener("scroll", updateActiveSection, { passive: true });
  window.addEventListener("load", updateActiveSection);

  sectionLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("href");

      lockedActiveSection = targetId;
      setActiveSection(targetId);

      if (lockTimer) {
        clearTimeout(lockTimer);
      }

      lockTimer = setTimeout(() => {
        lockedActiveSection = null;
        updateActiveSection();
      }, 1800);
    });
  });

  updateActiveSection();

  /*
   * Hero carousel
   */
  const carousel = document.querySelector(".hero-carousel");

  if (!carousel) {
    return;
  }

  const image = carousel.querySelector(".hero-carousel-image");
  const title = carousel.querySelector(".hero-slide-caption strong");
  const text = carousel.querySelector(".hero-slide-caption span");

  if (!image || !title || !text) {
    return;
  }

  const lang = carousel.dataset.carouselLang || document.documentElement.lang || "en";
  const prefix = lang === "en" ? "assets/img/hero/" : "../assets/img/hero/";

  const slides = {
    en: [
      {
        src: "lab.png",
        alt: "BegiBrainLab visual assessment laboratory",
        title: "Visual assessment laboratory",
        text: "Clinical and digital visual exploration in neurodegenerative diseases."
      },
      {
        src: "oct.gif",
        alt: "OCT retinal image analysis",
        title: "Retinal imaging and OCT analysis",
        text: "Quantitative retinal imaging as a window into neurodegeneration."
      },
      {
        src: "begibraintool.gif",
        alt: "BegiBrainTool psychophysical visual task",
        title: "BegiBrainTool",
        text: "Computerised visual function, psychophysics and eye-tracking tasks."
      },
      {
        src: "alzhain.gif",
        alt: "Alzhain mixed reality platform",
        title: "Mixed reality and digital health",
        text: "Functional assessment and stimulation through immersive environments."
      }
    ],
    es: [
      {
        src: "lab.png",
        alt: "Laboratorio de evaluación visual de BegiBrainLab",
        title: "Laboratorio de evaluación visual",
        text: "Exploración clínica y digital de la visión en enfermedades neurodegenerativas."
      },
      {
        src: "oct.gif",
        alt: "Análisis de imagen retiniana OCT",
        title: "Imagen retiniana y análisis OCT",
        text: "Imagen cuantitativa de la retina como ventana accesible a la neurodegeneración."
      },
      {
        src: "begibraintool.gif",
        alt: "Tarea visual psicofísica de BegiBrainTool",
        title: "BegiBrainTool",
        text: "Evaluación computerizada de función visual, psicofísica y eye-tracking."
      },
      {
        src: "alzain.gif",
        alt: "Plataforma de realidad mixta Alzhain",
        title: "Realidad mixta y salud digital",
        text: "Evaluación funcional y estimulación mediante entornos inmersivos."
      }
    ],
    eu: [
      {
        src: "lab.png",
        alt: "BegiBrainLab-en ikusmen-ebaluazioko laborategia",
        title: "Ikusmen-ebaluazioko laborategia",
        text: "Ikusmenaren esplorazio kliniko eta digitala gaixotasun neurodegeneratiboetan."
      },
      {
        src: "oct.gif",
        alt: "OCT bidezko erretinaren irudi-analisia",
        title: "Erretinaren irudigintza eta OCT analisia",
        text: "Erretinaren irudigintza kuantitatiboa neurodegeneraziorako leiho irisgarri gisa."
      },
      {
        src: "begibraintool.gif",
        alt: "BegiBrainTool ikusmen-proba psikofisikoa",
        title: "BegiBrainTool",
        text: "Ikusmen-funtzioaren, psikofisikaren eta eye-trackingaren ebaluazio konputazionala."
      },
      {
        src: "alzain.gif",
        alt: "Alzhain errealitate mistoko plataforma",
        title: "Errealitate mistoa eta osasun digitala",
        text: "Ebaluazio funtzionala eta estimulazioa ingurune murgiltzaileen bidez."
      }
    ]
  };

  const selectedSlides = slides[lang] || slides.en;

  selectedSlides.forEach((slide) => {
    const preload = new Image();
    preload.src = prefix + slide.src;
  });

  let current = 0;

  const showSlide = (index) => {
    const slide = selectedSlides[index];
    const nextSrc = prefix + slide.src;

    carousel.classList.add("is-changing");

    setTimeout(() => {
      image.src = nextSrc;
      image.alt = slide.alt;
      title.textContent = slide.title;
      text.textContent = slide.text;

      setTimeout(() => {
        carousel.classList.remove("is-changing");
      }, 150);
    }, 250);
  };

  setInterval(() => {
    current = (current + 1) % selectedSlides.length;
    showSlide(current);
  }, 6000);
});
