import { generatePhotos } from './modules/photos.js';
import { renderThumbnails } from './modules/render-thumbnails.js';

const photoData = generatePhotos();
renderThumbnails(photoData);
