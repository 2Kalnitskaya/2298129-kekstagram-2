import { resetScale } from './scale.js';
import { resetEffect } from './effects.js';

const formElement = document.querySelector('.img-upload__form');
const fileInputElement = formElement.querySelector('.img-upload__input');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const cancelBtnElement = formElement.querySelector('.img-upload__cancel');
const bodyElement = document.body;

const hashtagInputElement = formElement.querySelector('.text__hashtags');
const commentInputElement = formElement.querySelector('.text__description');

fileInputElement.addEventListener('change', () => {
  if (fileInputElement.files.length > 0) {
    overlayElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
  }
});

function openForm() {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  resetScale();
  resetEffect();
}

function closeForm() {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  formElement.reset();
  fileInputElement.value = '';
  resetScale();
  resetEffect();
}

fileInputElement.addEventListener('change', () => {
  if (fileInputElement.files.length > 0) {
    openForm();
  }
});

cancelBtnElement.addEventListener('click', closeForm);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' &&
    document.activeElement !== hashtagInputElement &&
    document.activeElement !== commentInputElement &&
    !overlayElement.classList.contains('hidden')) {
    evt.preventDefault();
    closeForm();
  }
});

hashtagInputElement.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});
commentInputElement.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'pristine-error'
});

function validateHashtags(value) {
  if (!value) {
    return true;
  }
  const hashtags = value.trim().split(/\s+/).filter(Boolean);
  if (hashtags.length > 5) {
    return false;
  }
  const lowerCaseTags = hashtags.map((tag) => tag.toLowerCase());
  const set = new Set(lowerCaseTags);
  if (set.size !== lowerCaseTags.length) {
    return false;
  }
  return hashtags.every((tag) =>
    /^#[a-zа-яё0-9]{1,19}$/i.test(tag)
  );
}

pristine.addValidator(
  hashtagInputElement,
  validateHashtags,
  'Хэштеги: не больше 5, без повторов, #tag; до 20 символов, только буквы и числа'
);

pristine.addValidator(
  commentInputElement,
  (value) => value.length <= 140,
  'Комментарий до 140 символов'
);

formElement.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
