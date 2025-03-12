document.addEventListener("DOMContentLoaded", () => {
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

  gsap.from("#hamburger-menu", { opacity: 0, duration: 1 });

  gsap.from("nav", { y: -100, opacity: 0, duration: 0.8 });

  // Get all required elements
  const menuBtn = document.querySelector(".menu-btn");
  const closeBtn = document.querySelector(".close-btn");
  const navbarLinks = document.querySelector(".navbar-links");
  const dropdowns = document.querySelectorAll(".dropdown");
  const profileBtn = document.querySelector(".profile-btn");
  const profileDropdown = document.querySelector(".profile-dropdown");

  // Toggle mobile menu
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      navbarLinks.classList.add("active");
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      navbarLinks.classList.remove("active");
    });
  }

  // Handle dropdowns
  dropdowns.forEach((dropdown) => {
    const dropdownBtn = dropdown.querySelector(".dropdown-btn");
    const dropdownContent = dropdown.querySelector(".dropdown-content");

    if (dropdownBtn && dropdownContent) {
      dropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        dropdownContent.classList.toggle("show");

        // Close other dropdowns
        dropdowns.forEach((otherDropdown) => {
          if (otherDropdown !== dropdown) {
            const otherContent =
              otherDropdown.querySelector(".dropdown-content");
            if (otherContent) {
              otherContent.classList.remove("show");
            }
          }
        });
      });
    }
  });

  // Handle profile dropdown
  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle("show");
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      dropdowns.forEach((dropdown) => {
        const dropdownContent = dropdown.querySelector(".dropdown-content");
        if (dropdownContent) {
          dropdownContent.classList.remove("show");
        }
      });
    }

    if (profileDropdown && !e.target.closest(".profile-section")) {
      profileDropdown.classList.remove("show");
    }
  });

  // Close mobile menu and dropdowns on window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      if (navbarLinks) {
        navbarLinks.classList.remove("active");
      }
      dropdowns.forEach((dropdown) => {
        const dropdownContent = dropdown.querySelector(".dropdown-content");
        if (dropdownContent) {
          dropdownContent.classList.remove("show");
        }
      });
      if (profileDropdown) {
        profileDropdown.classList.remove("show");
      }
    }
  });
});
