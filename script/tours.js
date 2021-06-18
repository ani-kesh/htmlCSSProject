let tourItems = document.querySelectorAll(".book-tour");
let tourTitles = document.querySelectorAll(".tour-title");
let tourFormData = document.querySelectorAll(".tour-form input");
let invalidMessage = document.querySelectorAll(".tour-form span");

tourItems.forEach((el, index) =>
  el.addEventListener("click", () => {
    openBook(index);
  })
);

tourFormData.forEach((el, index) =>
  el.addEventListener("input", (ev) => {
    classifyByType(ev, index);
  })
);

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
  } else if (type === "email") {
    inputInvalid = isEmailValid(inputChar, inputValue) ? true : false;

    tourFormData[index].addEventListener("change", (ev) => {
      emailValidation(ev, index);
    });
  } else if (type === "tel") {
    console.log(inputInvalid);
    inputInvalid = isPhoneValid(inputValue) ? true : false;
    console.log(inputInvalid);
  }

  if (inputInvalid) {
    invalidMessage[index].classList.remove("toggle");
    invalidMessage[index].innerText = "";
  } else {
    invalidMessage[index].innerText = "Wrong input";
    invalidMessage[index].classList.add("toggle");
    ev.target.value = inputValue.slice(0, inputValue.length - 1);
  }
}
function isEmailValid(char, value) {
  let [firstChar] = [...value];
  if (!isLetterCharValidation(firstChar)) return false;

  if (!/^[0-9a-zA-Z]+$/.test(char) && char !== "@" && char !== ".")
    return false;

  if (char === "." && value[value.length - 2] === ".") return false;
  if (char === "@" && value[value.length - 2] === "@") return false;

  for (let i = 1; i < value.length - 2; i++) {
    if (
      (value[i] === value[i + 1] || value[i] === value[i - 1]) &&
      !/^[0-9a-zA-Z]+$/.test(value[i])
    )
      return false;
  }
  return true;
}
function emailValidation(ev, index) {
  let inputValue = ev.target.value;
  if (!inputValue.includes("@") || inputValue.split("@").length > 2) {
    invalidMessage[index].innerText = "Wrong input";
    invalidMessage[index].classList.add("toggle");
    ev.target.value = inputValue;
  } else {
    invalidMessage[index].classList.remove("toggle");
    invalidMessage[index].innerText = "";
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

  span.addEventListener("click", () => (modal.style.display = "none"));
  backBtn.addEventListener("click", () => (modal.style.display = "none"));
  window.addEventListener("click", (event) => {
    if (event.target === modal) modal.style.display = "none";
  });
}
function isPhoneValid(inputValue) {
  // let [firstChar] = [...inputValue];
  // let tail = [,...inputValue];

  // if (firstChar !== "+") return false;
 
  // if (inputValue.length > 1 && !/[0-9]/.test(tail)) return false;

  return true;
}
