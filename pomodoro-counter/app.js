const timer = document.querySelector('#timer');
const audio = document.querySelector('#audio');
const btnDisplay = document.querySelectorAll('.btn-container button');
const pomodoroBtn = document.querySelector('.btn-pomodoro');
const shortBtn = document.querySelector('.btn-short');
const longBtn = document.querySelector('.btn-long');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resetBtn = document.querySelector('.reset');

let pomodoroCounter = 2100,
    shortCounter = 300,
    longCounter = 600,
    timeToCount,
    timerInterval,
    currentCounter,
    currentTypeCounter,
    isCounting;

pomodoroBtn.addEventListener('click', event => {
    activateButton(event.target);
    clearInterval(timerInterval);
    timer.innerHTML = '35:00';
    timerClock(pomodoroCounter);
    currentTypeCounter = pomodoroCounter;
});

shortBtn.addEventListener('click', event => {
    activateButton(event.target);
    clearInterval(timerInterval);
    timer.innerHTML = '05:00';
    timerClock(shortCounter);
    currentTypeCounter = shortCounter;
});

longBtn.addEventListener('click', event => {
    activateButton(event.target);
    clearInterval(timerInterval);
    timer.innerHTML = '10:00';
    timerClock(longCounter);
    currentTypeCounter = longCounter;
});

startBtn.addEventListener('click', () => {
    if (isCounting) return;

    if (currentCounter) timerClock(currentCounter);
    else {
        timerClock(pomodoroCounter);
        currentTypeCounter = pomodoroCounter;
    }
});

pauseBtn.addEventListener('click', event => {
    if (isCounting) {
        isCounting = false;
        clearInterval(timerInterval);
    }
});

resetBtn.addEventListener('click', event => {
    clearInterval(timerInterval);
    timerClock(currentTypeCounter);
});

function timerClock(time) {
    isCounting = true;

    if (time) timeToCount = time;

    timerInterval = setInterval(function () {
        let timeLeft = timeToCount;
        currentCounter = timeLeft;
        timeToCount--;

        let minutes = Math.floor(timeToCount / 60);
        if (minutes < 10) minutes = '0' + minutes;
        let seconds = timeToCount - minutes * 60;
        if (seconds < 10) seconds = '0' + seconds;

        timer.innerHTML = minutes + ":" + seconds;

        if (timeLeft == 0) {
            timer.innerHTML = '00:00';
            clearInterval(timerInterval);
            ringAlarm();

            setTimeout(() => {
                let stop = confirm("O tempo acabou!");
                if (stop == true) stopRingAlarm()
                else stopRingAlarm()
            }, 2000);
        }
    }, 1000);
}

function activateButton(button) {
    btnDisplay.forEach(btn => {
        btn.classList.remove('active');
    })
    button.classList.add('active');
}

function ringAlarm() {
    audio.play();
}

function stopRingAlarm() {
    audio.pause();
    audio.currentTime = 0;
}
