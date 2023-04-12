import {renderThumbnails} from './thumbnail.js';
import {renderGallery} from './modal-picture.js';
import {loadSussecs, setUserFormSubmit} from './form.js';
import {getPhotos} from './api.js';
import {showAlert} from './util.js';
import {initSortPicturesActions} from './fillter.js';
import {showNewPhoto} from './photos.js';

showNewPhoto ();

getPhotos().then((photos) => {
  renderThumbnails(photos);
  renderGallery(photos);
  initSortPicturesActions(photos);

}).catch((err) => {
  showAlert (err);
});

setUserFormSubmit(loadSussecs);
