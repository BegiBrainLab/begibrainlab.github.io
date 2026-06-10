document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      menuToggle.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        menuToggle.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

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
        src: "alzain.gif",
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

  let current = 0;

  const showSlide = (index) => {
    const slide = selectedSlides[index];
    const nextSrc = prefix + slide.src;

    image.classList.add("is-fading");

    setTimeout(() => {
      image.src = "";
      image.alt = slide.alt;
      title.textContent = slide.title;
      text.textContent = slide.text;

      setTimeout(() => {
        image.src = nextSrc;
        image.classList.remove("is-fading");
      }, 40);
    }, 250);
  };

  setInterval(() => {
    current = (current + 1) % selectedSlides.length;
    showSlide(current);
  }, 5000);
});
