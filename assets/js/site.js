document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const heroSlides = document.querySelectorAll(".hero-slide");

  if (heroSlides.length > 1) {
    let currentSlide = 0;

    heroSlides.forEach((slide, index) => {
      slide.classList.toggle("active", index === 0);
    });

    setInterval(() => {
      heroSlides[currentSlide].classList.remove("active");

      currentSlide = (currentSlide + 1) % heroSlides.length;

      heroSlides[currentSlide].classList.add("active");
    }, 4500);
  }
});
