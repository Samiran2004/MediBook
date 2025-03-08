document.addEventListener("DOMContentLoaded", () => {
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

  // Get all navigation links
  const navLinks = document.querySelectorAll("#nav-right ul li a");

  // Add active class to current page link
  navLinks.forEach((link) => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }

    // Prevent default color change on click
    link.addEventListener("click", (e) => {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
});

const style = document.createElement("style");
style.innerHTML = `
.hidden {
  opacity: 0;
  transform: translateY(50px);
}

.slide-in {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-in-side {
  opacity: 1;
  transform: translateX(0);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Creative Logo Design */
#nav-left h1 {
  font-size: 2rem;
  font-weight: bold;
  background-image: linear-gradient(45deg, #3a66ff, #3ddcff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

#nav-left h1:hover {
  transform: scale(1.05) rotate(-2deg);
  text-shadow: 2px 2px 15px rgba(58, 102, 255, 0.5);
}`;
document.head.appendChild(style);
