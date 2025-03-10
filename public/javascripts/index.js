document.addEventListener("DOMContentLoaded", () => {
  // Welcome Message Animation
  gsap.from(".welcome-title", { opacity: 0, scale: 0.8, duration: 1 });
  gsap.from(".welcome-subtitle", { opacity: 0, delay: 0.5, duration: 1 });

  // Doctor Illustration Animation
  gsap.from(".doctor-illustration", { x: 100, opacity: 0, duration: 1 });

  // Get Started Button Animation
  gsap.from(".get-started-button", {
    opacity: 0,
    delay: 1,
    duration: 1,
  });
});
