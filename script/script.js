class MultistepForm {
  constructor() {
    this.stepsOnLeftNums = document.querySelectorAll(".info--on--left .num");
    this.stepsOnLeft = document.querySelector(".info--on--left");
    this.pageOne = document.querySelector(".step-one-form");
    this.pageTwo = document.querySelector(".step-two-form");
    this.pageThree = document.querySelector(".step-three-form");
    this.pageFour = document.querySelector(".step-four-form");
    this.pageThanks = document.querySelector(".thanks");
    this.nextBtn = document.querySelectorAll(".next-btn");
    this.prevBtn = document.querySelectorAll(".prev-btn");
    this.nameInput = document.querySelector("#name");
    this.emailInput = document.querySelector("#email");
    this.phoneInput = document.querySelector("#phone");
    this.planDiv = document.querySelector(".plan-div");
    this.planCheckDiv = document.querySelector(".checkmark-div");
    this.name;
    this.email;
    this.phone;
    this.plan;
    this.timePlan = "Yearly";
    // this.stepOne();
    this.stepTwo();
  }

  checkInputs(nameEl, emailEl, phoneEl) {
    if (nameEl) {
      nameEl.classList.remove("is-valid", "is-invalid");
      if (nameEl.value.split(" ").length > 1) {
        nameEl.classList.add("is-valid");
        this.name = nameEl.value;
        this.emailInput.focus();
      } else {
        nameEl.classList.add("is-invalid");
        this.nameInput.focus();
      }
      if (nameEl.value.endsWith(" ")) {
        nameEl.classList.add("is-invalid");
        this.nameInput.focus();
      }
    }

    if (emailEl) {
      emailEl.classList.remove("is-valid", "is-invalid");
      if (emailEl.value === "" || !emailEl.value.includes("@")) {
        emailEl.classList.add("is-invalid");

        this.emailInput.focus();
      } else {
        emailEl.classList.add("is-valid");
        this.email = emailEl.value;
        this.phoneInput.focus();
      }
    }

    if (phoneEl) {
      phoneEl.classList.remove("is-valid", "is-invalid");
      if (phoneEl.value === "") {
        phoneEl.classList.add("is-invalid");
        phoneEl.focus();
      } else {
        phoneEl.classList.add("is-valid");
        this.phone = phoneEl.value;
        phoneEl.blur();
      }
    }
    return this;
  }

  selectStep(stepNum) {
    this.stepsOnLeftNums.forEach((each) => {
      each.classList.remove("filled-num");
    });
    this.stepsOnLeft.querySelector(`.step--${stepNum}`).classList.add("filled-num");
  }

  goToPage(curr, targetPage) {
    curr.classList.add("d-none");
    targetPage.classList.remove("d-none");
  }

  stepOne() {
    this.selectStep(1);
    this.nameInput.focus();
    this.nameInput.addEventListener("focusout", () => {
      this.checkInputs(this.nameInput, null, null);
    });

    this.emailInput.addEventListener("focusout", () => {
      this.checkInputs(null, this.emailInput, null);
    });

    this.phoneInput.addEventListener("focusout", () => {
      this.checkInputs(null, null, this.phoneInput);
    });

    this.nextBtn.forEach((each) => {
      each.addEventListener("click", (e) => {
        e.preventDefault();
        if (!this.nameInput.classList.contains("is-invalid") && !this.emailInput.classList.contains("is-invalid") && !this.phoneInput.classList.contains("is-invalid")) {
          this.goToPage(this.pageOne, document.querySelector(`.${e.target.dataset.go}`));
          this.stepTwo();
        }
      });
    });
  }

  stepTwo() {
    const allBtns = this.planDiv.querySelectorAll("button");
    const yearly = this.planCheckDiv.querySelector("#yearly");
    const monthly = this.planCheckDiv.querySelector("#monthly");
    const monthRate = document.querySelectorAll(".month-rate");
    const yearRate = document.querySelectorAll(".year-rate");
    this.planDiv.classList.remove("is-invalid");
    this.selectStep(2);

    this.planCheckDiv.querySelector("#plan-switch").addEventListener("change", (e) => {
      monthRate.forEach((each) => {
        each.classList.add("d-none");
      });
      yearRate.forEach((each) => {
        each.classList.add("d-none");
      });

      if (e.target.checked) {
        yearly.classList.add("label-on");
        monthly.classList.remove("label-on");
        monthly.classList.add("label-off");
        yearRate.forEach((each) => {
          each.classList.remove("d-none");
        });
        this.timePlan = "Yearly";
      } else {
        monthly.classList.add("label-on");
        yearly.classList.remove("label-on");
        yearly.classList.add("label-off");
        monthRate.forEach((each) => {
          each.classList.remove("d-none");
        });
        this.timePlan = "Monthly";
      }
    });

    allBtns.forEach((each) => {
      each.classList.remove("selected-plan-btn");
      each.addEventListener("click", (e) => {
        e.preventDefault();
        allBtns.forEach((inEach) => {
          inEach.classList.remove("selected-plan-btn");
        });
        each.classList.add("selected-plan-btn");
        this.plan = each.querySelector("h5").textContent;
      });
    });

    this.nextBtn.forEach((each) => {
      each.addEventListener("click", (e) => {
        e.preventDefault();
        this.planDiv.classList.remove("is-invalid");
        if (this.plan) {
          this.goToPage(this.pageTwo, document.querySelector(`.${e.target.dataset.go}`));
          this.stepThree();
        } else {
          // here
          this.planDiv.classList.add("is-invalid");
        }
      });
    });

    this.prevBtn.forEach((each) => {
      each.addEventListener("click", (e) => {
        e.preventDefault();
        this.goToPage(this.pageTwo, document.querySelector(`.${e.target.dataset.go}`));
        this.stepOne();
      });
    });
  }

  stepThree() {}
  stepFour() {}
  thanking() {}
}
new MultistepForm();
