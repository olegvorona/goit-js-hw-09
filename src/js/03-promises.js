import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formInput = document.querySelector('.form');
formInput.addEventListener('submit', getNewPromise);

function getNewPromise(event) {
  event.preventDefault();

  let stepValue = Number(event.currentTarget.step.value);
  let amountValue = Number(event.currentTarget.amount.value);
  let delayValue = Number(event.currentTarget.delay.value);
  
  for (let i = 1; i <= amountValue; i += 1) {
      createPromise(i, delayValue)
      .then(success => console.log(`✅ Fulfilled promise`))
      .catch(error => console.log(`❌ Rejected promise`));
      delayValue  += stepValue ;
  }
};
  
  
function createPromise(position, delayValue) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve(Notify.success(`✅ Fulfilled promise ${position} in ${delayValue}ms`));
        } else {
          reject(Notify.failure(`❌ Rejected promise ${position} in ${delayValue}ms`));
        }
      }, delayValue);
    } )
};
