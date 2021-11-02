const startBtnRef = document.querySelector('button[data-start]');
const stopBtnRef = document.querySelector('button[data-stop]');
const bodyRef = document.querySelector('body');

let intervalId = 0;

startBtnRef.addEventListener('click', onStartBtnClick);
stopBtnRef.addEventListener('click', onStopBtnClick);

stopBtnRef.setAttribute('disabled', true);

function onStartBtnClick() {
  stopBtnRef.removeAttribute('disabled');
  startBtnRef.setAttribute('disabled', true);
  intervalId = setInterval(() => {
    bodyRef.style.background = getRandomHexColor();
  }, 1000);
}

function onStopBtnClick() {
  stopBtnRef.setAttribute('disabled', true);
  startBtnRef.removeAttribute('disabled');
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
