import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  startBtn: document.querySelector('button[data-start]'),
  input: document.querySelector('#datetime-picker'),
};
let intervalId = 0;

refs.startBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - new Date() > 0) {
      refs.startBtn.removeAttribute('disabled');
      refs.startBtn.addEventListener('click', () => timer(selectedDates[0]));
    } else {
      Notify.failure('Please choose a date in the future');
      // window.alert('Please choose a date in the future');
    }
  },
};

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

function timer(selectedDates) {
  refs.startBtn.setAttribute('disabled', true);
  refs.input.setAttribute('disabled', true);

  intervalId = setInterval(() => {
    let timeToPoint = selectedDates - new Date();
    if (timeToPoint < 0) {
      refs.startBtn.removeAttribute('disabled', true);
      refs.input.removeAttribute('disabled', true);
      return;
    }
    refs.days.textContent = addLeadingZero(String(convertMs(timeToPoint).days));
    refs.hours.textContent = addLeadingZero(String(convertMs(timeToPoint).hours));
    refs.minutes.textContent = addLeadingZero(String(convertMs(timeToPoint).minutes));
    refs.seconds.textContent = addLeadingZero(String(convertMs(timeToPoint).seconds));
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  convertMs;
  return { days, hours, minutes, seconds };
}
