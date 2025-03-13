document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("appointmentModal");
  const closeModal = document.querySelector(".modal .close");
  const bookAppointmentBtns = document.querySelectorAll(
    ".book-appointment-btn"
  );
  const appointmentForm = document.getElementById("appointmentForm");
  const doctorIdInput = document.getElementById("doctorId");
  const appointmentDateInput = document.getElementById("appointmentDate");
  const timeSlotSelect = document.getElementById("timeSlot");
  const doctorsGrid = document.getElementById("doctors-grid");

  // Fetch and render doctors
  async function fetchAndRenderDoctors() {
    try {
      console.log("Frontend: Fetching doctors...");
      const response = await fetch("/api/v1/doctors");
      const data = await response.json();

      if (data.status === "OK" && data.data) {
        const doctors = data.data;
        doctorsGrid.innerHTML = doctors
          .map(
            (doctor) => `
          <div class="doctor-card">
            <div class="doctor-header">
              <img src="${
                doctor.profilepic || "/assets/doctor-placeholder.png"
              }" alt="Dr. ${doctor.name}" class="doctor-avatar">
              <div class="online-status ${
                doctor.isOnline ? "online" : "offline"
              }"></div>
            </div>
            <div class="doctor-info">
              <h3>${doctor.name}</h3>
              <p class="specialization">${doctor.specialization.join(", ")}</p>
              <div class="rating">
                <i class="ri-star-fill"></i>
                <i class="ri-star-fill"></i>
                <i class="ri-star-fill"></i>
                <i class="ri-star-fill"></i>
                <i class="ri-star-line"></i>
                <span>(${doctor.rating || "N/A"})</span>
              </div>
              <div class="quick-info">
                <div class="info-item">
                  <i class="ri-user-star-line"></i>
                  <span>${doctor.experience || "N/A"} Years</span>
                </div>
                <div class="info-item">
                  <i class="ri-money-dollar-circle-line"></i>
                  <span>₹${doctor.consultationFee || "N/A"}</span>
                </div>
              </div>
            </div>
            <div class="doctor-actions">
              <button class="btn btn-primary book-appointment-btn" data-doctor-id="${
                doctor._id
              }">Book Appointment</button>
              <button class="btn btn-outline">View Profile</button>
            </div>
          </div>
        `
          )
          .join("");

        // Re-attach event listeners to the newly added buttons
        attachBookAppointmentListeners();
      }
    } catch (error) {
      console.error("Frontend: Error fetching doctors:", error);
    }
  } // working

  // Attach event listeners to book appointment buttons
  function attachBookAppointmentListeners() {
    const bookAppointmentBtns = document.querySelectorAll(
      ".book-appointment-btn"
    );
    bookAppointmentBtns.forEach((btn) => {
      btn.addEventListener("click", async (event) => {
        const doctorId = event.target.getAttribute("data-doctor-id");
        doctorIdInput.value = doctorId;

        // Fetch doctor's schedule
        try {
          console.log("Frontend: Fetching schedule for doctor ID:", doctorId);
          const response = await fetch(
            `/api/v1/getSchedule?doctorId=${doctorId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the headers
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
          const data = await response.json();

          if (data.status === "Success" && data.data) {
            const schedules = data.data.schedules;
            populateTimeSlots(schedules);
          } else {
            console.error("Frontend: Failed to fetch schedule:", data.message);
          }
        } catch (error) {
          console.error("Frontend: Error fetching schedule:", error);
        }

        modal.style.display = "block";
      });
    });
  }

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  appointmentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(appointmentForm);
    const appointmentData = {
      doctorId: formData.get("doctorId"),
      appointmentDate: formData.get("appointmentDate"),
      timeSlot: formData.get("timeSlot"),
    };

    try {
      console.log("Frontend: Booking appointment with data:", appointmentData);
      const response = await fetch("/api/v1/bookAppointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        alert("Appointment booked successfully!");
        modal.style.display = "none";
      } else {
        alert("Failed to book appointment.");
      }
    } catch (error) {
      console.error("Frontend: Error booking appointment:", error);
    }
  });

  function populateTimeSlots(schedules) {
    const selectedDate = new Date(appointmentDateInput.value);
    const dayOfWeek = selectedDate.toLocaleString("en-US", { weekday: "long" });

    const daySchedule = schedules[dayOfWeek];
    timeSlotSelect.innerHTML = "";

    if (daySchedule && daySchedule.enabled) {
      daySchedule.slots.forEach((slot) => {
        const option = document.createElement("option");
        option.value = `${slot.start}-${slot.end}`;
        option.textContent = `${slot.start} to ${slot.end}`;
        timeSlotSelect.appendChild(option);
      });
    } else {
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "No available slots";
      timeSlotSelect.appendChild(option);
    }
  }

  // Fetch and render doctors on page load
  fetchAndRenderDoctors();
});