import {creatPhotos} from './util.js';
/*На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

Адрес изображения url подставьте как атрибут src изображения.
Количество лайков likes выведите в блок .picture__likes.
Количество комментариев comments выведите в блок .picture__comments.
Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment
*/

const containerThumbnails = document.querySelector('.pictures');
const thumbnailTimplate = document.querySelector('#picture').content.querySelector('.picture');
// Находим фрагмент с содержимым темплейта, фрагменте находим нужный элемент

const similarThumbnails = creatPhotos(25); // массив из фото
const similarListFragment = document.createDocumentFragment();//создаем фрагмент


similarThumbnails.forEach((url, likes, comments) => {// перебираем массив
  const thumbnailElement = thumbnailTimplate.cloneNode(true); // Клонируем элемент со всеми "внутренностями"

  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;

  similarListFragment.appendChild(thumbnailElement);//вставляем эл-т в фрагмент

});


containerThumbnails.append(similarListFragment);//вставляем на страницу клонированный эл-т

export {containerThumbnails};
