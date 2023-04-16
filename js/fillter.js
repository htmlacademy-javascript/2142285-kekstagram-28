import { renderGallery } from './modal-picture.js';
import { debounce, shuffleArrayRandom } from './util.js';

const COUNT_RANDOM_PICTURES = 10;
const DELAY_INTERVAL = 500;

const picturesFiltersElement = document.querySelector('.img-filters');
const filterRandomElement = document.querySelector('#filter-random');
const filterDiscussedElement = document.querySelector('#filter-discussed');

const removePictures = (elements) => elements.forEach((element) => element.remove());

const sortRandom = (data) => shuffleArrayRandom(data).slice(0, COUNT_RANDOM_PICTURES);

const sortDiscussed = (data) => data.sort((a, b) => b.comments.length - a.comments.length);

const updatePictures = (targetElement, pictures) => {
  let copyPictures = pictures.slice();

  if (targetElement === filterRandomElement) {
    copyPictures = sortRandom(copyPictures);
  }
  if (targetElement === filterDiscussedElement) {
    copyPictures = sortDiscussed(copyPictures);
  }

  removePictures(document.querySelectorAll('.picture'));
  renderGallery(copyPictures);
};

const renderPicturesDelay = debounce((targetElement, pictures) => updatePictures(targetElement, pictures), DELAY_INTERVAL);

const initSortPicturesActions = (pictures) => {
  picturesFiltersElement.classList.remove('img-filters--inactive');

  picturesFiltersElement.addEventListener('click', (evt) => {
    if (evt.target.closest('.img-filters__button') && !evt.target.closest('.img-filters__button--active')) {
      const activeFilterElement = picturesFiltersElement.querySelector('.img-filters__button--active');
      activeFilterElement.classList.remove('img-filters__button--active');

      renderPicturesDelay(evt.target, pictures);
      evt.target.classList.add('img-filters__button--active');
    }
  });
};

export { initSortPicturesActions };
