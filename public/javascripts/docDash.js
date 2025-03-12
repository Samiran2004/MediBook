document.addEventListener("DOMContentLoaded", () => {
  const editBtn = document.querySelectorAll(".edit-details-btn");
  const details = document.querySelectorAll(".detail-value");
  const saveDetailsBtn = document.querySelector(".save-details-btn");
  const form = document.querySelector("#details-form");

  editBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (saveDetailsBtn.classList.contains("hidden")) {
        saveDetailsBtn.classList.remove("hidden");
        saveDetailsBtn.classList.add("visible");
      }

      details.forEach((detail) => {
        if (!detail.classList.contains("non-editable")) {
          detail.setAttribute("contenteditable", "true");
          detail.classList.add("editable");
          detail.style.padding = "0 2px";
        }
      });
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const updateDetails = {};

    details.forEach((detail) => {
      const field = detail.getAttribute("data-field");
      updateDetails[field] = detail.innerText.trim();
    });

    try {
      const response = await fetch("/updateDetails", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateDetails),
      });

      if (response.ok) {
        console.log("Details updated successfully");
        details.forEach((detail) => {
          detail.setAttribute("contenteditable", "false");
          detail.classList.remove("editable");
          detail.style.padding = "0";
        });
        saveDetailsBtn.classList.remove("visible");
      }
    } catch (err) {
      console.log(err);
    }
  });
});
