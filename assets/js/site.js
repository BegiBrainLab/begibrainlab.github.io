document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const carousels = document.querySelectorAll(".hero-carousel");

  carousels.forEach((carousel) => {
    const slides = carousel.querySelectorAll(".hero-slide");

    if (slides.length <= 1) {
      return;
    }

    let currentSlide = 0;

    const restartGifIfNeeded = (slide) => {
      const img = slide.querySelector("img");

      if (!img) {
        return;
      }

      const src = img.getAttribute("src");

      if (!src || !src.toLowerCase().includes(".gif")) {
        return;
      }

      img.setAttribute("src", "");
      setTimeout(() => {
        img.setAttribute("src", src);
      }, 30);
    };

    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === 0);
    });

    restartGifIfNeeded(slides[0]);

    setInterval(() => {
      slides[currentSlide].classList.remove("active");

      currentSlide = (currentSlide + 1) % slides.length;

      slides[currentSlide].classList.add("active");
      restartGifIfNeeded(slides[currentSlide]);
    }, 5000);
  });
});
