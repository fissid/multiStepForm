class MultistepForm {
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
    this.planRate;
    this.addOns;
    this.totalPayment = 0;

    this.stepOne();
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
    // this.stepsOnLeft.querySelector(`.step--${stepNum}`).style.opacity = "0";
    // this.stepsOnLeft.querySelector(`.step--${stepNum}`).classList.add("appear");
  }

  goToPage(curr, targetPage) {
    targetPage.style.opacity = "0";
    curr.classList.add("d-none");
    targetPage.classList.add("appear");
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
        this.planRate = each.querySelector(`.${this.timePlan.toLowerCase().replace("ly", "")}-rate`).textContent;
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

  setSummary() {
    const addOnsBtns = document.querySelectorAll(".add-ons-btn");
    this.pageFour.querySelector(".card").innerHTML = "";
    this.totalPayment = 0;
    // remove all the totals which has added before
    if (this.pageFour.querySelectorAll(".total-div").length) {
      this.pageFour.querySelectorAll(".total-div").forEach((each) => {
        each.remove();
      });
    }
    let summaryHtml = `     <div class="card p-2 px-4 mt-4">
                              <div class="card-body d-flex align-items-center justify-content-between py-3">
                                <div class="d-flex flex-column align-items-start">
                                  <h5>${this.plan} <span>(${this.timePlan})</span></h5>
                                  <button class="btn btn-link text-secondary p-0" id="change-btn">Change</button>
                                </div>
                                <h5>${this.planRate}</h5>
                              </div>
                              <div class="card-body d-flex flex-column align-items-start border-top py-3"></div>
                            </div>`;
    this.pageFour.querySelector(".card").insertAdjacentHTML("afterbegin", summaryHtml);

    addOnsBtns.forEach((each) => {
      if (each.classList.contains("selected-plan-btn")) {
        const addOnsHtml = `<div class="d-flex justify-content-between w-100">
                              <p class="text-secondary">${each.querySelector(".add-ons-info h6").textContent}</p>
                              <h6 class="add-ons-fees">${each.querySelector(`.${this.timePlan.toLowerCase().replace("ly", "")}-rate`).textContent}</h6>
                            </div>`;
        this.pageFour.querySelector(".card-body").insertAdjacentHTML("afterend", addOnsHtml);
      }
    });

    this.totalPayment += Number.parseFloat(this.planRate.slice(1));
    this.pageFour.querySelectorAll(".add-ons-fees").forEach((each) => {
      this.totalPayment += Number.parseFloat(each.textContent.slice(2));
    });
    const totalHtml = `<div class="d-flex align-items-center justify-content-between total-div px-4 py-3">
                          <p class="text-secondary m-0">Total (per <span>${this.timePlan.replace("ly", "")}</span>)</p>
                          <h5 class="total text-primary">&#36;${this.totalPayment}</h5>
                        </div>`;

    this.pageFour.querySelector(".card").insertAdjacentHTML("afterend", totalHtml);
  }

  setaddOns(e) {
    const clicked = e.target.closest("button");
    clicked.classList.toggle("selected-plan-btn");
    clicked.querySelector("img").classList.toggle("d-none");
    clicked.querySelector(".empty").classList.toggle("d-none");
    this.addOns = clicked.querySelector(".add-ons-info h6").textContent;
  }

  stepThree() {
    const nextBtn = this.pageThree.querySelector(".next-btn");
    const prevBtn = this.pageThree.querySelector(".prev-btn");
    const addOnsBtns = document.querySelectorAll(".add-ons-btn");
    this.selectStep(3);

    addOnsBtns.forEach((each) => {
      each.classList.remove("selected-plan-btn");
      each.querySelector("img").classList.add("d-none");
      each.querySelector(".empty").classList.remove("d-none");

      each.addEventListener("click", (e) => {
        e.preventDefault();
        this.setaddOns(e);
      });
    });

    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // addOnsBtns[0].classList.add("is-invalid");
      if (this.addOns) {
        this.setSummary();
        this.goToPage(this.pageThree, document.querySelector(`.${e.target.dataset.go}`));
        this.stepFour();
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

  stepFour() {
    const nextBtn = this.pageFour.querySelector(".next-btn");
    const prevBtn = this.pageFour.querySelector(".prev-btn");
    const changeBtn = this.pageFour.querySelector("#change-btn");
    this.selectStep(4);

    changeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.goToPage(this.pageFour, this.pageTwo);
      this.stepTwo();
    });

    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.goToPage(this.pageFour, this.pageThanks);
      this.thanking();
    });

    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.goToPage(this.pageFour, document.querySelector(`.${e.target.dataset.go}`));
      this.stepThree();
    });
  }

  thanking() {}
}

new MultistepForm();
