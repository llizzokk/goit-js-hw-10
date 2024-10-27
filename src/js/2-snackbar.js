'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import iconFulfilled from '../img/ok.svg';
import iconRejected from '../img/error.svg';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('.input-delay');

form.addEventListener('submit', handlePromiseCreate);

function handlePromiseCreate(event) {
  event.preventDefault();

  const delay = event.target.elements.delay.value;
  const radioState = event.target.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioState === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: 'OK',
        titleColor: '#fff',
        message: `Fulfilled promise in ${delay} ms`,
        messageColor: '#fff',
        iconUrl: iconFulfilled,
        backgroundColor: '#59a10d',
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        message: `Rejected promise in ${delay} ms`,
        messageColor: '#fff',
        iconUrl: iconRejected,
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
    });
}
