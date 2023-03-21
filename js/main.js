import {creatPhotos} from './util.js';
import {renderThumbnails} from './thumbnail.js';
import {renderGallery} from './modal-picture.js';

const pictures = creatPhotos(25);
renderThumbnails(pictures);


renderGallery(pictures);


