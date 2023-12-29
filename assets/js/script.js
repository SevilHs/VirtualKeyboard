let textBox = document.querySelector(".text-box");
let keyboardContent = document.querySelector(".keyboard-content");

let toggleCapsLock = false;
let toggleShift = false;

const keys = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "capslock",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  "enter",
  "shift",
  " ",
  "backspace",
];

const toUpperCase = () => {
  toggleCapsLock = !toggleCapsLock;
  keys.forEach((key) => {
    const keyElement = document.getElementById(key === " " ? "space" : key);
    keyElement.textContent = toggleCapsLock
      ? key.toLocaleUpperCase()
      : key.toLocaleLowerCase();
  });
};

const toggleLightClass = (element, addClass) => {
  if (addClass) {
    element.classList.add("light");
  } else {
    element.classList.remove("light");
  }
};

const handleKeyClick = (key) => {
  switch (key) {
    case "backspace":
      textBox.innerHTML = textBox.innerHTML.slice(0, -1);
      break;
    case "enter":
      textBox.innerHTML += "<br>";
      break;
    case " ":
      textBox.innerHTML += " ";
      break;
    case "capslock":
      toUpperCase();
      break;
    case "shift":
      toggleShift = true;
      toUpperCase();
      break;
    default:
      textBox.innerHTML += toggleCapsLock ? key.toLocaleUpperCase() : key;
      if (toggleShift) {
        toggleShift = false;
        toUpperCase();
      }
      break;
  }
};

const setActions = () => {
  keys.forEach((key) => {
    const keyElement = document.createElement("button");
    keyElement.id = key == " " ? "space" : key;
    keyElement.textContent = key;

    keyElement.addEventListener("click", () => {
      toggleLightClass(keyElement, true);
      setTimeout(() => {
        toggleLightClass(keyElement, false);
      }, 100);
      handleKeyClick(key);
    });

    keyboardContent.appendChild(keyElement);
  });
};

setActions();

window.addEventListener("keydown", (event) => {
  const key = event.key.toLocaleLowerCase();
  const keyElement = document.getElementById(key === " " ? "space" : key);

  if (keyElement) {
    toggleLightClass(keyElement, true);
    handleKeyClick(key);
    event.preventDefault();
  }
});

window.addEventListener("keyup", (event) => {
  const key = event.key.toLocaleLowerCase();
  const keyElement = document.getElementById(key === " " ? "space" : key);

  if (keyElement) {
    toggleLightClass(keyElement, false);
  }
});
