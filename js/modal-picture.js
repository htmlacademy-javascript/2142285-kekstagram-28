import {isEscapeKey} from './util.js';
import {renderThumbnails} from './thumbnail.js';

let COMMENTS_SHOWN = 0;
const COMMENTS_PER_LOAD = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const container = document.querySelector('.pictures');
const commentList = bigPicture.querySelector('.social__comments');
const commentListItem = bigPicture.querySelector('.social__comment');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
let commentsArray = [];

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

bigPictureCancel.addEventListener('click', () => {
  closeBigPicture();
});

const renderComment = ({avatar, name, message}) => {
  const newComment = commentListItem.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;
  return newComment;
};

const renderPictureDetails = (picture) => {
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.big-picture__img img').alt = picture.description;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
};

const getComments = (array) => {
  COMMENTS_SHOWN += COMMENTS_PER_LOAD;
  if (COMMENTS_SHOWN >= array.length) {
    commentsLoader.classList.add('hidden');
    COMMENTS_SHOWN = array.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < COMMENTS_SHOWN; i++){
    const commentElement = renderComment(array[i]);
    fragment.append(commentElement);
  }
  commentList.innerHTML = '';
  commentList.append(fragment);

  commentsCount.innerHTML = `${COMMENTS_SHOWN} из ${array.length} комментариев`;
};

commentsLoader.addEventListener('click', () => {
  getComments(commentsArray);
});


const showBigPicture = (data) => {
  openBigPicture();
  renderPictureDetails(data);
  commentsArray = data.comments;
  getComments(commentsArray);
};

const renderGallery = (pictures) => {

  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail){
      return;
    }
    if (COMMENTS_SHOWN >= 1){
      COMMENTS_SHOWN = 0;
    }

    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );
    showBigPicture(picture);
  });
  renderThumbnails(pictures,container);
};

export {renderGallery};
