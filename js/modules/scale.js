const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const scaleSmallerElement = document.querySelector('.scale__control--smaller');
const scaleBiggerElement = document.querySelector('.scale__control--bigger');
const scaleValueInputElement = document.querySelector('.scale__control--value');
const imgPreviewElement = document.querySelector('.img-upload__preview img');

function setScale(newValue) {
  newValue = Math.min(SCALE_MAX, Math.max(SCALE_MIN, newValue));
  scaleValueInputElement.value = `${newValue}%`;
  imgPreviewElement.style.transform = `scale(${newValue / 100})`;
}

function getCurrentScale() {
  return parseInt(scaleValueInputElement.value, 10);
}

scaleSmallerElement.addEventListener('click', () => {
  setScale(getCurrentScale() - SCALE_STEP);
});
scaleBiggerElement.addEventListener('click', () => {
  setScale(getCurrentScale() + SCALE_STEP);
});

export function resetScale() {
  setScale(100);
}
