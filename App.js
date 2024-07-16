const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.start-button');
const session = document.querySelector('.minutes');
const secondDiv = document.querySelector('.seconds');
let myInterval;
let isPaused = true;
let totalSeconds;

const updateDisplay = (seconds) => {
    const minutesLeft = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    session.textContent = `${minutesLeft}`;
    secondDiv.textContent = secondsLeft < 10 ? `0${secondsLeft}` : `${secondsLeft}`;
}

const updateSeconds = () => {
    totalSeconds--;
    updateDisplay(totalSeconds);

    if (totalSeconds <= 0) {
        bells.play();
        clearInterval(myInterval);
        startBtn.innerText = "start";
        isPaused = true;
    }
}

const startTimer = () => {
    myInterval = setInterval(updateSeconds, 1000);
    startBtn.innerText = "pause";
    isPaused = false;
}

const pauseTimer = () => {
    clearInterval(myInterval);
    startBtn.innerText = "continue";
    isPaused = true;
}

const Timer = () => {
    if (isPaused) {
        if (!totalSeconds) {
            totalSeconds = Number.parseInt(session.textContent) * 60;
        }
        startTimer();
    } else {
        pauseTimer();
    }
}

startBtn.addEventListener('click', Timer);