import {isEscapeKey} from './util.js';
import {closeimgUpload, onDocumentKeydown} from './form.js';

const successTemlate = document.querySelector('#success').content.querySelector('.success');// шаблон успешной отпраки
const errorTemlate = document.querySelector('#error').content.querySelector('.error');//шаблон Не отправки

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

const onClickOutModal = (evt) => { //закрытие сообщения если не модальное окно сообщения
  if(evt.target.matches('.success')){//если не окно сообщения
    document.querySelector('.success').remove();// удаляем класс
    closeimgUpload();// закрываем модальное окно
  }
  if(evt.target.matches('.error')){
    closeErrorMessage();
  }
};

const showErrorMessage = function() {
  const errorMessage = errorTemlate.cloneNode(true);
  document.body.append(errorMessage);
  const errorModal = document.querySelector('.error');
  const errorButton = document.querySelector('.error__button');
  errorModal.addEventListener('click', onClickOutModal);
  errorButton.addEventListener('click', closeErrorMessage);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', closeErrorKeydown);
};

const closeSuccessMessage = () => { //закрываем сообщение об успехе
  document.querySelector('.success').remove(); // удаляем класс
};

const closeSuccessKeydown = (evt) => {// удаление через esc
  if (isEscapeKey(evt)) {
    closeSuccessMessage();
    closeErrorMessage();
  }
};

const showSuccessMessage = function() {
  const successMessage = successTemlate.cloneNode(true);
  document.body.append(successMessage);

  const successModal = document.querySelector('.success');
  const successButton = document.querySelector('.success__button');

  successModal.addEventListener('click', onClickOutModal);
  successButton.addEventListener('click', closeSuccessMessage);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', closeSuccessKeydown);
};

export {showErrorMessage, showSuccessMessage};

