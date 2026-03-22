document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // EmailJS Setup
  // =========================
  emailjs.init("sa_QoRGfwPB_mdbke");

  const SERVICE_ID = "service_4a7q17p";
  const TEMPLATE_ID = "template_zt81dvk";

  // =========================
  // DOM Elements
  // =========================
  const popup = document.getElementById("orderPopup");
  const overlay = document.getElementById("orderOverlay");
  const closeBtn = document.getElementById("closePopupBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  const productInput = document.getElementById("productName");
  const orderForm = document.getElementById("orderForm");

  const fullNameInput = document.getElementById("fullName");
  const phoneInput = document.getElementById("phoneNumber");
  const addressInput = document.getElementById("address");

  const formMessage = document.getElementById("formMessage");
  const formError = document.getElementById("formError");

  const submitBtn = document.getElementById("submitBtn");
  const submitSpinner = document.getElementById("submitSpinner");
  const submitText = document.getElementById("submitText");

  // =========================
  // Popup Open
  // =========================
  document.querySelectorAll(".openPopupBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const product = btn.getAttribute("data-product");

      popup.classList.remove("hidden");
      overlay.classList.remove("hidden");

      productInput.value = product;
    });
  });

  // =========================
  // Popup Close
  // =========================
  function closePopup() {
    popup.classList.add("hidden");
    overlay.classList.add("hidden");
    clearMessages();
  }

  closeBtn.addEventListener("click", closePopup);
  cancelBtn.addEventListener("click", closePopup);
  overlay.addEventListener("click", closePopup);

  // =========================
  // Helpers
  // =========================
  function clearMessages() {
    formMessage.classList.add("hidden");
    formError.classList.add("hidden");
    formMessage.textContent = "";
    formError.textContent = "";
  }

  function setLoading(state) {
    submitBtn.disabled = state;
    if (state) {
      submitText.style.display = "none";
      submitSpinner.classList.remove("hidden");
    } else {
      submitText.style.display = "inline";
      submitSpinner.classList.add("hidden");
    }
  }

  function validateForm() {
    if (!fullNameInput.value.trim()) return "Enter full name";
    if (!phoneInput.value.trim()) return "Enter phone number";
    if (!addressInput.value.trim()) return "Enter address";
    if (!productInput.value.trim()) return "Select product first";
    return "";
  }

  // =========================
  // Form Submit (EmailJS)
  // =========================
  orderForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearMessages();

    const error = validateForm();
    if (error) {
      formError.textContent = error;
      formError.classList.remove("hidden");
      return;
    }

    const templateParams = {
      full_name: fullNameInput.value.trim(),
      phone_number: phoneInput.value.trim(),
      address: addressInput.value.trim(),
      product_name: productInput.value.trim(),
    };

    setLoading(true);

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);

      // ✅ SUCCESS
      formMessage.textContent = "✅ Order placed successfully!";
      formMessage.classList.remove("hidden");

      orderForm.reset();

      setTimeout(() => {
        closePopup();
      }, 1500);

    } catch (err) {
      console.error(err);

      formError.textContent = "❌ Failed to send order!";
      formError.classList.remove("hidden");
    }

    setLoading(false);
  });

});