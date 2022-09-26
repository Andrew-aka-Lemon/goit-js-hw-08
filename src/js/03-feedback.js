import throttle from 'lodash.throttle';

import { saveToLocalStorage, loadFromLocalStorage, removeFromLocalStorage } from './jsonService';

const formRef = document.querySelector('.feedback-form');

const USER_CURRENT_INPUT_KEY = 'feedback-form-state';

let currentFormData = {};

if (loadFromLocalStorage(USER_CURRENT_INPUT_KEY)) {
  currentFormData = loadFromLocalStorage(USER_CURRENT_INPUT_KEY);
}

setFormData();

formRef.addEventListener('input', throttle(onFormInput, 500));
// formRef.addEventListener('input', onFormInput);
formRef.addEventListener('submit', throttle(onFormSubmit, 500));

function onFormInput(event) {
  const { name, value } = event.target;
  currentFormData[name] = value;

  saveToLocalStorage(USER_CURRENT_INPUT_KEY, currentFormData);
}

function onFormSubmit(event) {
  event.preventDefault();
  const { email, message } = event.currentTarget.elements;

  const filledFormData = { email: email.value, message: message.value };
  console.log(filledFormData);
  formRef.reset();
  removeFromLocalStorage(USER_CURRENT_INPUT_KEY);
}

function setFormData() {
  if (!loadFromLocalStorage(USER_CURRENT_INPUT_KEY)) {
    return;
  }

  const parcedData = loadFromLocalStorage(USER_CURRENT_INPUT_KEY);
  Object.keys(parcedData).forEach(element => {
    formRef.elements[element].value = parcedData[element];
  });
}
