import { generatePhotos } from './modules/photos.js';
import { renderThumbnails } from './modules/render-thumbnails.js';
import './modules/scale.js';
import './modules/effects.js';
import './modules/upload-form.js';

const photoData = generatePhotos();
renderThumbnails(photoData);
