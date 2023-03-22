import {createPhoto, isEscapeKey} from './util.js';
import {renderThumbnails} from './thumbnail.js';


const bigPicture = document.querySelector('.big-picture');//находим класс больших фото
const bigPictureCancel = document.querySelector('.big-picture__cancel');// находим скласс для удаление фото
const container = document.querySelector('.pictures');//контейнер для массив миниатюр
let commentList = bigPicture.querySelector('.social__comments');// спискок коментов
const commentListItem = bigPicture.querySelector('.social__comment');// однин комента = шаблон
const commentsCount = bigPicture.querySelector('.social__comment-count');// счетчик
const commentsLoader = bigPicture.querySelector('.comments-loader'); // кнопка загрузить ещё


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

const renderPictureDetails = ({ url, description, likes }) => { // создаем большую фото
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

// функция отрисовать и показать все комменты
const commentFragment = document.createDocumentFragment();
const renderComments = (array) => {
  commentList.innerHTML = ''; // очищаем старые комменты
  array.forEach(({avatar, name, message}) => {
    const newComment = commentListItem.cloneNode(true);
    newComment.querySelector('.social__picture').src = avatar;
    newComment.querySelector('.social__picture').alt = name;
    newComment.querySelector('.social__text').textContent = message;
    commentFragment.append(newComment);
  });
  return commentList.append(commentFragment);
};

// функция для показа 5 комментариев
let commentsShown = 0; // показанных коментов
const commentsPerLoad = 5;// сколько надо показывать коментов

const getComments = (array) => {
  commentsShown += commentsPerLoad;

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++){
    const commentElement = renderComments(array[i]);
    fragment.append(commentElement);
}
  commentList.innerHTML = '';
  commentList.append(fragment);
  commentsCount.innerHTML = `${commentsCount} из <span class="comments-count">${array.length}</span> комментариев`;

};

/*commentsLoader.addEventListener('click', () => {
  renderComments();
});*/

const showBigPicture = (data) => { // показываем большую фото
  openBigPicture();//функция по открытию большой фотки
  renderPictureDetails(data); //добовляем фото
  getComments(data.comments);// добавляем комменты
};

const renderGallery = (pictures) => { //вешаем обработчик на клик

  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');// ищем по атрибуту
    if (!thumbnail){
      return;
    }

    const picture = pictures.find( // ищем в массиве миниатюр
      (item) => item.id === +thumbnail.dataset.thumbnailId//совпадение id фото с id миниатюры
    );
    showBigPicture(picture); // показывает большой фото из миниатюр
  });
  renderThumbnails(pictures,container); //возвращаем миниатюру
};

export {renderGallery};
