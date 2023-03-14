import {creatPhotos} from './util.js';

const containerThumbnails = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarThumbnails = creatPhotos(25);
const similarListFragment = document.createDocumentFragment();


similarThumbnails.forEach(({url, likes, comments}) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);

  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;

  similarListFragment.appendChild(thumbnailElement);
});

containerThumbnails.append(similarListFragment);

export {containerThumbnails};
