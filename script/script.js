class MultistepForm {
  data = {
    personalInfo: {
      name: this.name,
      email: this.email,
      phone: this.phone,
    },
    yearly: {
      plan: {
        arcade: 9,
        advanced: 12,
        pro: 15,
      },
      addOns: {
        service: {
          name: "Online service",
          info: "Access to multiplayer games",
          rate: 10,
        },
        stotage: {
          name: "Larger storage",
          info: "Extra 1TB of cloud save",
          rate: 20,
        },
        profile: {
          name: "Customizable profile",
          info: "Custom theme on your profile",
          rate: 20,
        },
      },
    },
    monthly: {
      plan: {
        arcade: 90,
        advanced: 120,
        pro: 150,
      },
      addOns: {
        service: {
          name: "Online service",
          info: "Access to multiplayer games",
          rate: 1,
        },
        stotage: {
          name: "Larger storage",
          info: "Extra 1TB of cloud save",
          rate: 2,
        },
        profile: {
          name: "Customizable profile",
          info: "Custom theme on your profile",
          rate: 2,
        },
      },
    },
  };
  constructor() {
    this.stepsOnLeftNums = document.querySelectorAll(".info--on--left .num");
    this.stepsOnLeft = document.querySelector(".info--on--left");
    this.pageOne = document.querySelector(".step-one-form");
    this.pageTwo = document.querySelector(".step-two-form");
    this.pageThree = document.querySelector(".step-three-form");
    this.pageFour = document.querySelector(".step-four-form");
    this.pageThanks = document.querySelector(".thanks");
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
    this.addOns;
    this.pac = {};
    // this.stepOne();
    this.stepTwo();
    // this.thanking();
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
    const nextBtn = this.pageOne.querySelector(".next-btn");
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

    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!this.nameInput.classList.contains("is-invalid") && !this.emailInput.classList.contains("is-invalid") && !this.phoneInput.classList.contains("is-invalid")) {
        this.goToPage(this.pageOne, document.querySelector(`.${e.target.dataset.go}`));
        this.stepTwo();
      }
    });
  }

  stepTwo() {
    const allBtns = this.planDiv.querySelectorAll("button");
    const yearly = this.planCheckDiv.querySelector("#yearly");
    const monthly = this.planCheckDiv.querySelector("#monthly");
    const monthRate = document.querySelectorAll(".month-rate");
    const yearRate = document.querySelectorAll(".year-rate");
    const nextBtn = this.pageTwo.querySelector(".next-btn");
    const prevBtn = this.pageTwo.querySelector(".prev-btn");
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

    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.planDiv.classList.remove("is-invalid");
      if (this.plan) {
        this.goToPage(this.pageTwo, document.querySelector(`.${e.target.dataset.go}`));
        this.stepThree();
      } else {
        this.planDiv.classList.add("is-invalid");
      }
    });
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.goToPage(this.pageTwo, document.querySelector(`.${e.target.dataset.go}`));
      this.stepOne();
    });
  }

  stepThree() {
    const nextBtn = this.pageThree.querySelector(".next-btn");
    const prevBtn = this.pageThree.querySelector(".prev-btn");
    const addOnsBtns = document.querySelectorAll(".add-ons-btn");
    this.selectStep(3);

    addOnsBtns.forEach((each) => {
      each.addEventListener("click", (e) => {
        e.preventDefault();
        const clicked = e.target.closest("button");
        clicked.classList.toggle("selected-plan-btn");
        clicked.querySelector("img").classList.toggle("d-none");
        clicked.querySelector(".empty").classList.toggle("d-none");
        this.addOns = clicked.querySelector(".add-ons-info h6").textContent;
      });
    });

    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addOnsBtns[0].classList.add("is-invalid");
      if (this.addOns) {
        this.goToPage(this.pageThree, document.querySelector(`.${e.target.dataset.go}`));
        this.thanking();
      } else {
        addOnsBtns[0].classList.add("is-invalid");
      }
    });

    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.goToPage(this.pageThree, document.querySelector(`.${e.target.dataset.go}`));
      this.stepTwo();
    });
  }

  thanking() {
    // this.summary = {
    //   timePlan: this.timePlan,
    //   plan: this.plan,
    //   addOns: this.addOns,
    //   total: 0,
    // };
    this.summary = {
      timePlan: "Monthly",
      plan: "Advanced",
      addOns: ["Large storage", "Online service"],
      total: 0,
    };

    const summaryHtml = `<div class="card p-2 px-4 mt-4">
                            <div class="card-body d-flex align-items-center justify-content-between py-3">
                              <div class="d-flex flex-column align-items-start">
                                <h5>Arcade <span>(${this.timePlan})</span></h5>
                                <button class="btn btn-link text-secondary p-0">Change</button>
                              </div>
                              <h5>&#36;9/mo</h5>
                            </div>
                            <div class="card-body d-flex flex-column align-items-start border-top py-3">
                              <div class="d-flex justify-content-between w-100">
                                <p class="text-secondary">Online service</p>
                                <h6>+&#36;1/mo</h6>
                              </div>
                              <div class="d-flex justify-content-between w-100">
                                <p class="text-secondary m-0">Larger storage</p>
                                <h6>+&#36;2/mo</h6>
                              </div>
                            </div>
                          </div>`;
    console.log(this.summary);
  }
}
new MultistepForm();
