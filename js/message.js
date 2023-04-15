import {isEscapeKey} from './util.js';
import {closeImgUpload, onDocumentKeydown} from './form.js';

const successTemlate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successTemlate.cloneNode(true);
const errorTemlate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorTemlate.cloneNode(true);

const closeErrorKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', closeErrorKeydown);
  }
};

const closeErrorMessage = () => {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', closeErrorKeydown);
};

const onClickOutModal = (evt) => {
  if(evt.target.matches('.success')){
    document.querySelector('.success').remove();
    closeImgUpload();
  }
  if(evt.target.matches('.error')){
    closeErrorMessage();
  }
};

const showErrorMessage = () => {
  document.body.append(errorMessage);
  const errorModal = document.querySelector('.error');
  const errorButton = document.querySelector('.error__button');
  errorModal.addEventListener('click', onClickOutModal);
  errorButton.addEventListener('click', closeErrorMessage);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', closeErrorKeydown);
};

const closeSuccessMessage = () => {
  document.body.append(successMessage);
  document.querySelector('.success').remove();
};

const closeSuccessKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeSuccessMessage();
  }
};

const showSuccessMessage = () => {
  document.body.append(successMessage);
  const successModal = document.querySelector('.success');
  const successButton = document.querySelector('.success__button');
  successModal.addEventListener('click', onClickOutModal);
  successButton.addEventListener('click', closeSuccessMessage);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', closeSuccessKeydown);
};
export {showErrorMessage, showSuccessMessage};

