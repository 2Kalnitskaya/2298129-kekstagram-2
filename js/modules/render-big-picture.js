const COMMENTS_PORTION = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.body;
const bigImageElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const captionElement = bigPictureElement.querySelector('.social__caption');
const commentsList = bigPictureElement.querySelector('.social__comments');
const commentCountBlockElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const shownCommentsCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const totalCommentsCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

let comments = [];
let shownCount = 0;

function createComment({ avatar, message, name }) {
  const liElement = document.createElement('li');
  liElement.classList.add('social__comment');

  const imgElement = document.createElement('img');
  imgElement.classList.add('social__picture');
  imgElement.src = avatar;
  imgElement.alt = name;
  imgElement.width = 35;
  imgElement.height = 35;

  const pElement = document.createElement('p');
  pElement.classList.add('social__text');
  pElement.textContent = message;

  liElement.appendChild(imgElement);
  liElement.appendChild(pElement);

  return liElement;
}

function renderComments() {
  const fragment = document.createDocumentFragment();
  const next = shownCount + COMMENTS_PORTION;
  const toShow = comments.slice(shownCount, next);

  toShow.forEach((comment) => fragment.appendChild(createComment(comment)));
  commentsList.appendChild(fragment);

  shownCount += toShow.length;

  shownCommentsCountElement.textContent = shownCount;
  totalCommentsCountElement.textContent = comments.length;

  if (shownCount >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
}

function onCommentsLoaderClick() {
  renderComments();
}

export function showBigPicture(photo) {
  bigImageElement.src = photo.url;
  bigImageElement.alt = photo.description;
  likesCountElement.textContent = photo.likes;
  captionElement.textContent = photo.description;

  comments = photo.comments;
  shownCount = 0;
  commentsList.innerHTML = '';
  commentCountBlockElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');
  renderComments();

  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
  document.addEventListener('keydown', onDocumentKeydown);
  closeButtonElement.addEventListener('click', onCloseClick);
}

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButtonElement.removeEventListener('click', onCloseClick);
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onCloseClick() {
  closeBigPicture();
}
