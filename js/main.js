//import {creatPhotos} from './util.js';
import {renderThumbnails} from './thumbnail.js';
import {renderGallery} from './modal-picture.js';
import {openimgUpload, loadSussecs, setUserFormSubmit} from './form.js';
import {resetScale} from './scale.js';
import {addEffects} from './effect.js';
import {getPhotos} from './api.js';
import {showAlert} from './util.js';
import {initSortPicturesActions} from './fillter.js';

//const pictures = creatPhotos(25);
//renderThumbnails(pictures);

//renderGallery(pictures);

getPhotos().then((photos) => {
  renderThumbnails(photos);
  renderGallery(photos);
  initSortPicturesActions(photos);

}).catch((err) => {
  showAlert (err);
});

setUserFormSubmit(loadSussecs);



