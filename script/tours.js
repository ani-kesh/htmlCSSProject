let tourItems = document.querySelectorAll(".book-tour");
let tourTitles = document.querySelectorAll(".tour-title");
let tourFormData = document.querySelectorAll(".tour-form input");
let invalidMessage = document.querySelectorAll(".tour-form span");

tourItems.forEach((el, index) =>
  el.addEventListener("click", () => {
    openBook(index);
  })
);

tourFormData.forEach((el, index) => {
  el.addEventListener("input", (ev) => {
    classifyByType(ev, index);
  });
});

function classifyByType(ev, index) {
  let inputChar = ev.data;
  let inputValue = ev.target.value;
  let type = ev.target.type;

  let inputInvalid = false;
  if (type === "text") {
    inputInvalid =
      isLetterCharValidation(inputChar) && inputValue.length <= 16
        ? true
        : false;

    tourFormData[index].addEventListener("change", (ev) => {
      textValidation(ev, index);
    });
  } else if (type === "email") {
    inputInvalid = isEmailValid(inputChar, inputValue) ? true : false;

    tourFormData[index].addEventListener("change", (ev) => {
      emailValidation(ev, index);
    });
  } else if (type === "tel") {
    inputInvalid = isPhoneValid(inputValue) ? true : false;
    tourFormData[index].addEventListener("change", (ev) => {
      telValidation(ev, index);
    });
  }

  if (inputInvalid) {
    validationMessage(ev, false, index);
  } else {
    validationMessage(ev, true, index);
  }
}

function isEmailValid(char, value) {
  let [firstChar] = [...value];
  if (!isLetterCharValidation(firstChar)) return false;

  if (
    !/^[0-9a-zA-Z]+$/.test(char) &&
    char !== "@" &&
    char !== "." &&
    char !== "_"
  )
    return false;

  if (char === "." && value[value.length - 2] === ".") return false;
  if (char === "@" && value[value.length - 2] === "@") return false;

  for (let i = 1; i < value.length - 2; i++) {
    if (
      (value[i] === value[i + 1] || value[i] === value[i - 1]) &&
      !/^[0-9a-zA-Z_]+$/.test(value[i])
    )
      return false;
  }
  return true;
}

function emailValidation(ev, index) {
  let inputValue = ev.target.value;

  if (
    !inputValue.includes("@") ||
    inputValue.split("@").length > 2 ||
    !/[a-zA-Z]/.test(inputValue[inputValue.length - 1])
  ) {
    validationMessage(ev, true, index);
  } else {
    validationMessage(ev, false, index);
  }
}

function isLetterCharValidation(char) {
  if (/[a-zA-Z]/.test(char)) return true;
  return false;
}

function openBook(index) {
  let modal = document.getElementById("modal-for-book");

  let span = document.getElementsByClassName("close")[0];
  let backBtn = document.getElementById("book-back");
  document.querySelector(".modal-title").innerText =
    tourTitles[index].innerText;
  modal.style.display = "block";

  span.addEventListener("click", (ev) => {
    modal.style.display = "none";
    tourFormData.forEach((el, index) => {
      el.value = "";
      validationMessage(ev, false, index);
    });
  });
  backBtn.addEventListener("click", (ev) => {
    modal.style.display = "none";
    tourFormData.forEach((el, index) => {
      el.value = "";
      validationMessage(ev, false, index);
    });
  });
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      tourFormData.forEach((el, index) => {
        el.value = "";
        validationMessage(event, false, index);
      });
    }
  });
}

function isPhoneValid(inputValue) {
  let phoneNumber = [...inputValue];
  if (phoneNumber[0] !== "+") return false;
  if (typeof phoneNumber[1] !== "undefined" && phoneNumber[1] !== "3")
    return false;
  if (typeof phoneNumber[2] !== "undefined" && phoneNumber[2] !== "7")
    return false;
  if (typeof phoneNumber[3] !== "undefined" && phoneNumber[3] !== "4")
    return false;

  if (phoneNumber.length > 12) return false;

  if (phoneNumber.length > 4) {
    for (let i = 4; i < phoneNumber.length; i++) {
      if (!/[0-9]/.test(phoneNumber[i])) return false;
    }
  }
  return true;
}

function telValidation(ev, index) {
  let inputValue = ev.target.value;
  if (/\+374\d{8}$/.test(inputValue)) {
    validationMessage(ev, false, index);
    return;
  } else {
    validationMessage(ev, true, index);
    return;
  }
}

function validationMessage(ev, type, index) {
  let inputValue = ev.target.value;
  if (type) {
    invalidMessage[index].innerText = "Wrong input";
    invalidMessage[index].classList.add("toggle");
    ev.target.value = inputValue;
  } else {
    invalidMessage[index].classList.remove("toggle");
    invalidMessage[index].innerText = "";
  }
}

function textValidation(ev, index) {
  let inputValue = ev.target.value;
  if (/^[a-zA-Z]+$/.test(inputValue)) {
    validationMessage(ev, false, index);
    return;
  } else {
    validationMessage(ev, true, index);
    return;
  }
}


