import { showBigPicture } from './render-big-picture.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = (photo) => {
  const thumbnail = pictureTemplateElement.cloneNode(true);
  const img = thumbnail.querySelector('.picture__img');
  img.src = photo.url;
  img.alt = photo.description;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture(photo);
  });

  return thumbnail;
};

export const renderThumbnails = (photos) => {
  picturesContainerElement.querySelectorAll('.picture').forEach((item) => item.remove());
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.appendChild(createThumbnail(photo));
  });

  picturesContainerElement.appendChild(fragment);
};
