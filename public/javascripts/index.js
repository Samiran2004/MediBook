document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu toggle
  const menuToggle = document.createElement("div");
  menuToggle.id = "hamburger-menu";
  menuToggle.innerHTML = `<i class="ri-menu-line"></i>`;
  document
    .querySelector("nav")
    .insertBefore(menuToggle, document.getElementById("nav-right"));

  const navRight = document.getElementById("nav-right");
  menuToggle.addEventListener("click", () => {
    navRight.classList.toggle("open");
    menuToggle.innerHTML = navRight.classList.contains("open")
      ? `<i class="ri-close-line"></i>`
      : `<i class="ri-menu-line"></i>`;
  });

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

// Add responsive styles
const style = document.createElement("style");
style.innerHTML = `
#hamburger-menu {
  display: none;
  font-size: 2rem;
  cursor: pointer;
  color: var(--secondary-color);
}

@media (max-width: 768px) {
  #hamburger-menu {
    display: block;
  }

  #nav-right {
    position: absolute;
    top: 60px;
    right: 0;
    background: var(--tertiary-color);
    width: 100%;
    display: none;
    flex-direction: column;
    padding: 1rem 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  #nav-right.open {
    display: flex;
  }

  #nav-right ul {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
}
`;
document.head.appendChild(style);
