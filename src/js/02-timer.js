import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    dateTime: document.querySelector('#datetime-picker'),
};

refs.startBtn.setAttribute('disabled', 'disabled');

function addLeadingZero(value) {
return String(value).padStart(2, '0');
}

const timer = {
    intervalId: null,
    
    start(startTime) {
        this.intervalId = setInterval(() => {
            const currentTime =  new Date();
            const deltaTime = startTime - currentTime;
            const ourTime = convertMs(deltaTime);
            refs.days.innerHTML = ourTime.days;
            refs.hours.innerHTML = ourTime.hours;
            refs.minutes.innerHTML = ourTime.minutes;
            refs.seconds.innerHTML = ourTime.seconds;
            if (deltaTime < 999) {
                clearInterval(this.intervalId);
                refs.startBtn.removeAttribute('disabled');
            }
        }, 1000)
    },
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const timeEnd = selectedDates[0].getTime();
        if (timeEnd < Date.now()) {
            Notiflix.Notify.warning('Please choose a date in the future');
            refs.startBtn.setAttribute('disabled','disabled')
            return;
        } else { refs.startBtn.removeAttribute('disabled') };

        refs.startBtn.addEventListener('click', () => {
            timer.start(timeEnd);
            refs.startBtn.setAttribute('disabled', 'disabled');
            refs.dateTime.setAttribute('disabled', 'disabled');
        });
        
    },
};

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};

flatpickr(refs.dateTime, options);