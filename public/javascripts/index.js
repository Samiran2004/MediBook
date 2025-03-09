document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu toggle
  

  // Function to trigger slide effect when in viewport
  function animateOnScroll(elements, animationClass) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
  }

  // Apply sliding effect to Hero Section
  const heroSection = document.querySelector("#hero");
  heroSection.classList.add("hidden");
  animateOnScroll([heroSection], "slide-in");

  // Apply slide-up effect to Feature Cards
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => card.classList.add("hidden"));
  animateOnScroll(featureCards, "slide-up");

  // Apply slide-in effect to Premium Cards
  const premiumCards = document.querySelectorAll(".premium-card");
  premiumCards.forEach((card) => card.classList.add("hidden"));
  animateOnScroll(premiumCards, "slide-in-side");

  // Keep scale effect on cards
  featureCards.forEach((card) => {
    card.addEventListener("mouseover", () => {
      card.style.transform = "scale(1.05)";
      card.style.transition = "transform 0.3s ease";
    });

    card.addEventListener("mouseout", () => {
      card.style.transform = "scale(1)";
    });
  });

  premiumCards.forEach((card) => {
    card.addEventListener("mouseover", () => {
      card.style.transform = "scale(1.05)";
      card.style.transition = "transform 0.3s ease";
    });

    card.addEventListener("mouseout", () => {
      card.style.transform = "scale(1)";
    });
  });

  
});
