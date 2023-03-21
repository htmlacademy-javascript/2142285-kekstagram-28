const COMMENTS_SHOW_COUNT = 5;
const bigPicture = document.querySelector('.big-picture');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const socialComments = bigPicture.querySelector('.social__comments');
const moreComments = bigPicture.querySelector('.comments-loader');

const createElement = (tagName, className, text) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

const createComment = (array, container) => {
  array.forEach((item) => {
    const listItem = createElement('li', 'social__comment');
    listItem.classList.add('hidden');
    const picture = createElement('img', 'social__picture');
    const commentText = createElement('p', 'social__text', item.message);

    picture.src = item.avatar;
    picture.alt = item.name;
    listItem.appendChild(picture);
    listItem.appendChild(commentText);
    container.appendChild(listItem);
  });
};

const showComments = (array, count) => {
  for (let i = 0; i < count; i++) {
    array[i].classList.remove('hidden');
  }
  commentsCount.textContent = `${socialComments.children.length - socialComments.querySelectorAll('.hidden').length} из ${socialComments.children.length} комментариев`;
};

const loadComments = () => {
  const hiddenComments = socialComments.querySelectorAll('.hidden');

  if (hiddenComments.length > COMMENTS_SHOW_COUNT) {
    showComments(hiddenComments, COMMENTS_SHOW_COUNT);
  } else {
    if (hiddenComments.length <= COMMENTS_SHOW_COUNT) {
      showComments(hiddenComments, hiddenComments.length);
      moreComments.classList.add('hidden');
    }
  }
};

export { createComment, loadComments };
