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
});
