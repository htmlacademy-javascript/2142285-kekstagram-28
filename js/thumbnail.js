const containerThumbnails = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarListFragment = document.createDocumentFragment();

const renderThumbnails = (array) => {
  array.forEach(({url, likes, comments, id}) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);

    thumbnailElement.querySelector('.picture__img').src = url;
    thumbnailElement.querySelector('.picture__likes').textContent = likes;
    thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
    thumbnailElement.dataset.thumbnailId = id;

    similarListFragment.appendChild(thumbnailElement);
  });
  return containerThumbnails.append(similarListFragment);
};
export {renderThumbnails};
