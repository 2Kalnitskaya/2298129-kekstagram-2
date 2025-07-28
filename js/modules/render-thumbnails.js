const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ({url, description, likes, comments }) => {
  const thumbnail = pictureTemplateElement.cloneNode(true);
  const img = thumbnail.querySelector('.picture__img');
  img.src = url;
  img.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

export const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.appendChild(createThumbnail(photo));
  });

  picturesContainerElement.appendChild(fragment);
};
