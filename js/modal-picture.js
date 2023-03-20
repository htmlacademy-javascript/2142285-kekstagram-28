import {isEscapeKey} from './util.js';
import {renderThumbnails} from './thumbnail.js';

const bigPicture = document.querySelector('.big-picture');//находим класс больших фото
const bigPictureCancel = document.querySelector('.big-picture__cancel');// находим скласс для удаление фото
const COMMENTS_PER_LOAD = 5;
const container = document.querySelector('.pictures');//контейнер для массив миниатюр
const commentList = bigPicture.querySelector('.social__comments');// спискок коментов
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


const commentFragment = document.createDocumentFragment();// коробочка для коментов
const renderComments = (comments) => { //задаем параметр комментов из утилитов
  commentList.innerHTML = ''; // очищаем старые комменты
  comments.forEach(({avatar, name, message}) => {
    const newComment = commentListItem.cloneNode(true);
    newComment.querySelector('.social__picture').src = avatar;
    newComment.querySelector('.social__picture').alt = name;
    newComment.querySelector('.social__text').textContent = message;
    commentFragment.append(newComment);
  });
  return commentList.append(commentFragment);
};

const renderPictureDetails = ({ url, description, likes }) => { // создаем большую фото
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => { // показываем большую фото
  openBigPicture();//функция по открытию большой фотки
  commentsLoader.classList.add('hidden');
  commentsCount.classList.add('.hidden');

  renderPictureDetails(data); //добовляем фото
  renderComments(data.comments);// добавляем комменты
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
