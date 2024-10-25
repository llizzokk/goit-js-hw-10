'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import icon from '../img/error.svg';

const input = document.querySelector('.date-input');
const button = document.querySelector('.btn');
let userSelectedDate;
let timerInterval;

button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      iziToast.error({
        backgroundColor: '#ef4040',
        position: 'topRight',
        title: 'Error',
        titleColor: '#fff',
        message: 'Illegal operation',
        messageColor: '#fff',
        iconColor: '#fff',
        iconUrl: icon,
        timeout: 3000,
      });
      button.disabled = true;
    } else {
      button.disabled = false;
      userSelectedDate = selectedDate;
    }
  },
};

flatpickr(input, options);

button.addEventListener('click', handleTimer);

function handleTimer() {
  button.disabled = true;
  input.disabled = true;

  timerInterval = setInterval(() => {
    const timeLeft = userSelectedDate - new Date();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      updateTimerDisplay(0, 0, 0, 0);
      input.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);
}

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
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
