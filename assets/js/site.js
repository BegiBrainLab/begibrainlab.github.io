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

    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === 0);
    });

    setInterval(() => {
      slides[currentSlide].classList.remove("active");

      currentSlide = (currentSlide + 1) % slides.length;

      slides[currentSlide].classList.add("active");
    }, 4500);
  });
});
