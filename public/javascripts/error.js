document.addEventListener("DOMContentLoaded", () => {
  gsap.from(".digit", {
    duration: 1,
    y: -50,
    opacity: 0,
    stagger: 0.3,
    ease: "bounce.out",
  });
  gsap.from(".pill", { duration: 1.5, scale: 0, ease: "elastic.out(1,0.5)" });
  gsap.from(".error-message", { duration: 1, x: -100, opacity: 0, delay: 1 });
  gsap.from(".home-button", { duration: 1, scale: 0, opacity: 0, delay: 1.5 });
});
