import {creatPhotos} from './util.js';
import {renderThumbnails} from './thumbnail.js';
import {renderGallery} from './modal-picture.js';
import {openimgUpload} from './form.js';
import {resetScale} from './scale.js';
import {addEffects} from './effect.js';

const pictures = creatPhotos(25);
renderThumbnails(pictures);


renderGallery(pictures);


