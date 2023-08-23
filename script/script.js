const stepOne = function (nextBtn) {
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const phoneInput = document.querySelector("#phone");

  const checkInputs = function (name, email, phone) {
    if (name) {
      name.classList.remove("is-valid", "is-invalid");
      if (name.value.split(" ").length > 1) {
        name.classList.add("is-valid");
        emailInput.focus();
      } else {
        name.classList.add("is-invalid");
        nameInput.focus();
      }
      if (name.value.endsWith(" ")) {
        name.classList.add("is-invalid");
        nameInput.focus();
      }
    }

    if (email) {
      email.classList.remove("is-valid", "is-invalid");
      if (email.value === "" || !email.value.includes("@")) {
        email.classList.add("is-invalid");
        emailInput.focus();
      } else {
        email.classList.add("is-valid");
        phoneInput.focus();
      }
    }

    if (phone) {
      phone.classList.remove("is-valid", "is-invalid");
      if (phone.value === "") {
        phone.classList.add("is-invalid");
        phone.focus();
      } else {
        phone.classList.add("is-valid");
        phone.blur();
      }
    }
  };

  nameInput.focus();
  nameInput.addEventListener("focusout", function () {
    checkInputs(this, null, null);
  });

  emailInput.addEventListener("focusout", function () {
    checkInputs(null, this, null);
  });

  phoneInput.addEventListener("focusout", function () {
    checkInputs(null, null, this);
  });

  nextBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (!nameInput.classList.contains("is-invalid") && !emailInput.classList.contains("is-invalid") && !phoneInput.classList.contains("is-invalid")) {
      stepTwo(nextBtn);
    }
  });
};

const stepTwo = function (nextBtn) {
  console.log(nextBtn);
};
const stepThree = function () {};
const stepFour = function () {};
const thanking = function () {};
const nextPage = function () {
  nextBtn.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("lets go to next page");
  });
};

const initApp = function () {
  const stepsOnLeft = document.querySelector(".info--on--left");
  const pageOne = document.querySelector(".step-one-form");
  const pageTwo = document.querySelector(".step-two-form");
  const pageThree = document.querySelector(".step-three-form");
  const pageFour = document.querySelector(".step-four-form");
  const pageThanks = document.querySelector(".thanks");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  stepOne(nextBtn);
};
initApp();
