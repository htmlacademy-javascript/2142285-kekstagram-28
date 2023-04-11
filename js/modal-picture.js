import {isEscapeKey} from './util.js';
import {renderThumbnails} from './thumbnail.js';

let commentsShown = 0; // показанных коментов
const commentsPerLoad = 5;// сколько надо показывать коментов
const bigPicture = document.querySelector('.big-picture');//находим класс больших фото
const bigPictureCancel = document.querySelector('.big-picture__cancel');// находим скласс для удаление фото
const container = document.querySelector('.pictures');//контейнер для массив миниатюр
const commentList = bigPicture.querySelector('.social__comments');// спискок коментов
const commentListItem = bigPicture.querySelector('.social__comment');// однин комента = шаблон
const commentsCount = bigPicture.querySelector('.social__comment-count');// счетчик
const commentsLoader = bigPicture.querySelector('.comments-loader'); // кнопка загрузить ещё
let commentsArray = [];

const onDocumentKeydown = (evt) => { // выносим функцию для обработчика
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture ();
  }
};

function openBigPicture () { // функция для удаления класса и добавления обработчика
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture () { // функция для добавления класса и удаления обработчика
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}
bigPictureCancel.addEventListener('click', () => { //добавляем класс hidden прячем большое изображение
  closeBigPicture();
});

// функция отрисовать и показать один коммент
const renderComment = ({avatar, name, message}) => {
  const newComment = commentListItem.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;
  return newComment;
};

const renderPictureDetails = (picture) => { // создаем большую фото
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.big-picture__img img').alt = picture.description;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
};

// функция для показа 5 комментарие
const getComments = (array) => {
  commentsShown += commentsPerLoad;
  if (commentsShown >= array.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = array.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++){
    const commentElement = renderComment(array[i]);
    fragment.append(commentElement);
  }
  commentList.innerHTML = '';
  commentList.append(fragment);

  commentsCount.innerHTML = `${commentsShown} из ${array.length} комментариев`;
};

commentsLoader.addEventListener('click', () => {
  getComments(commentsArray);
});


const showBigPicture = (data) => { // показываем большую фото
  openBigPicture();//функция по открытию большой фотки
  renderPictureDetails(data);
  commentsArray = data.comments;//добовляем фото
  getComments(commentsArray);
};

const renderGallery = (pictures) => {

  container.addEventListener('click', (evt) => {//вешаем обработчик на клик
    const thumbnail = evt.target.closest('[data-thumbnail-id]');// ищем по атрибуту
    if (!thumbnail){
      return;
    }
    if (commentsShown >= 1){
      commentsShown = 0;
    }

    const picture = pictures.find( // ищем в массиве миниатюр
      (item) => item.id === +thumbnail.dataset.thumbnailId//совпадение id фото с id миниатюры
    );
    showBigPicture(picture); // показывает большой фото из миниатюр
  });
  renderThumbnails(pictures,container); //возвращаем миниатюру
};

export {renderGallery};
