
const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    siteBody: document.querySelector('body'),
}

refs.startBtn.addEventListener('click', startClick);
refs.stopBtn.addEventListener('click', stopClick);

let intervalId = null;
let isActive = false;

function startClick() {
    if (isActive) {
        return;
    }
    isActive = true;
    intervalId = setInterval(() => {
        let color = getRandomHexColor();
        refs.siteBody.style.backgroundColor = color;
    }, 1000);
};

function stopClick() {
    clearInterval(intervalId);
    isActive = false;
};



function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}