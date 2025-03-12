document.addEventListener("DOMContentLoaded", async () => {
  const editBtn = document.querySelectorAll(".edit-details-btn");
  const details = document.querySelectorAll(".detail-value");
  const saveDetailsBtn = document.querySelector(".save-details-btn");
  const form = document.querySelector("#details-form");

  // Add this new function to load saved schedules
  async function loadSavedSchedules() {
    const loadingIndicator = document.createElement("div");
    loadingIndicator.textContent = "Loading schedules...";
    document.querySelector(".availability-section").prepend(loadingIndicator);

    try {
      const response = await fetch("/api/v1/getSchedule", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch schedules");
      }

      const data = await response.json();

      if (data.status === "Success" && data.data) {
        const schedules = data.data.schedules;

        // Update each day's schedule
        Object.keys(schedules).forEach((day) => {
          const daySchedule = schedules[day];
          // Find schedule item by matching the day text
          const scheduleItem = Array.from(
            document.querySelectorAll(".schedule-item")
          ).find(
            (item) => item.querySelector(".day").textContent.trim() === day
          );

          if (scheduleItem) {
            // Set the enabled/disabled state
            const checkbox = scheduleItem.querySelector(
              'input[type="checkbox"]'
            );
            if (checkbox) {
              checkbox.checked = daySchedule.enabled;
            }

            // Clear existing time slots except the add button
            const timeSlotsContainer =
              scheduleItem.querySelector(".time-slots");
            const addButton = timeSlotsContainer.querySelector(".add-slot-btn");
            // Store add button before clearing
            const clonedButton = addButton.cloneNode(true);
            timeSlotsContainer.innerHTML = "";
            timeSlotsContainer.appendChild(clonedButton);

            // Reattach event listener to cloned button
            clonedButton.addEventListener("click", addTimeSlot);

            // Add saved time slots
            if (daySchedule.slots && daySchedule.slots.length > 0) {
              daySchedule.slots.forEach((slot) => {
                const timeSlotDiv = document.createElement("div");
                timeSlotDiv.classList.add("time-slot");
                timeSlotDiv.innerHTML = `
                  <input type="time" value="${slot.start}" />
                  <span>to</span>
                  <input type="time" value="${slot.end}" />
                  <button type="button" class="remove-slot-btn"><i class="ri-close-large-line"></i></button>
                `;

                // Add remove button functionality
                const removeBtn = timeSlotDiv.querySelector(".remove-slot-btn");
                removeBtn.addEventListener("click", () => {
                  timeSlotDiv.remove();
                });

                // Insert before the add button
                timeSlotsContainer.insertBefore(timeSlotDiv, clonedButton);
              });
            }
          }
        });
      }
    } catch (error) {
      console.error("Error loading schedules:", error);
      loadingIndicator.textContent =
        "Failed to load schedules. Please refresh the page.";
      loadingIndicator.style.color = "red";
    } finally {
      setTimeout(() => loadingIndicator.remove(), 2000);
    }
  }

  // Call the function when page loads
  await loadSavedSchedules();

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

  const addSlotBtns = document.querySelectorAll(".add-slot-btn");
  const saveBtns = document.querySelectorAll(".save-schedule");
  const resetBtns = document.querySelectorAll(".reset-schedule");
  const availableForms = document.querySelectorAll(".availability-section");

  function addTimeSlot(event) {
    event.preventDefault();
    // Find the specific day's time-slots container
    const scheduleItem = event.target.closest(".schedule-item");
    const timeSlots = scheduleItem.querySelector(".time-slots");

    // Create new time slot
    const timeSlotDiv = document.createElement("div");
    timeSlotDiv.classList.add("time-slot");

    timeSlotDiv.innerHTML = `
      <input type="time" value="09:00" />
      <span>to</span>
      <input type="time" value="16:00" />
      <button type="button" class="remove-slot-btn"><i class="ri-close-large-line"></i></button>
    `;

    // Add remove button functionality
    const removeBtn = timeSlotDiv.querySelector(".remove-slot-btn");
    removeBtn.addEventListener("click", () => {
      timeSlotDiv.remove();
    });

    // Insert the new time slot before the add button
    const addButton = timeSlots.querySelector(".add-slot-btn");
    timeSlots.insertBefore(timeSlotDiv, addButton);
  }

  addSlotBtns.forEach((add) => {
    add.addEventListener("click", addTimeSlot);
  });

  availableForms.forEach((availableForm) => {
    availableForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (e.submitter && e.submitter.classList.contains("save-schedule")) {
        const scheduleData = {};
        const scheduleItems = availableForm.querySelectorAll(".schedule-item");

        scheduleItems.forEach((item) => {
          const day = item.querySelector(".day").textContent;
          const isEnabled = item.querySelector(
            'input[type="checkbox"]'
          ).checked;
          const timeSlots = Array.from(item.querySelectorAll(".time-slot")).map(
            (slot) => {
              const inputs = slot.querySelectorAll('input[type="time"]');
              return {
                start: inputs[0].value,
                end: inputs[1].value,
              };
            }
          );

          scheduleData[day] = {
            enabled: isEnabled,
            slots: timeSlots,
          };
        });

        try {
          e.submitter.disabled = true;
          e.submitter.textContent = "Saving...";

          const response = await fetch("/api/v1/updateSchedule", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(scheduleData),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Failed to Update Schedule");
          }

          // Reload the schedules to show updated data
          await loadSavedSchedules();
        } catch (error) {
          console.error("Error to update : ", error);
        } finally {
          e.submitter.disabled = false;
          e.submitter.textContent = "Save Changes";
        }
      } else if (
        e.submitter &&
        e.submitter.classList.contains("reset-schedule")
      ) {
        try {
          if (confirm("Are you sure you want to reset all schedules?")) {
            // Reset UI
            const scheduleItems =
              availableForm.querySelectorAll(".schedule-item");
            scheduleItems.forEach((item) => {
              const timeSlots = item.querySelector(".time-slots");
              const defaultSlot = timeSlots.querySelector(".time-slot");
              // Remove all slots except the first one
              Array.from(timeSlots.querySelectorAll(".time-slot"))
                .slice(1)
                .forEach((slot) => slot.remove());
              // Reset the first slot to default times
              defaultSlot.querySelector(
                'input[type="time"]:first-child'
              ).value = "09:00";
              defaultSlot.querySelector('input[type="time"]:last-child').value =
                "17:00";
            });

            // Save the reset state to database
            const resetScheduleData = {};
            scheduleItems.forEach((item) => {
              const day = item.querySelector(".day").textContent;
              resetScheduleData[day] = {
                enabled: false,
                slots: [
                  {
                    start: "09:00",
                    end: "17:00",
                  },
                ],
              };
            });

            const response = await fetch("/api/v1/updateSchedule", {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(resetScheduleData),
            });

            if (!response.ok) {
              throw new Error("Failed to reset schedule");
            }
          }
        } catch (error) {
          console.error("Error resetting schedule:", error);
        }
      }
    });
  });
});
