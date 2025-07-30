const EFFECTS = {
  none:   { filter: '', range: [0, 100], start: 100, step: 1, unit: '' },
  chrome: { filter: 'grayscale', range: [0, 1], start: 1, step: 0.1, unit: '' },
  sepia:  { filter: 'sepia', range: [0, 1], start: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert', range: [0, 100], start: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', range: [0, 3], start: 3, step: 0.1, unit: 'px' },
  heat:   { filter: 'brightness', range: [1, 3], start: 3, step: 0.1, unit: '' }
};

const sliderContainerElement = document.querySelector('.effect-level__slider');
const sliderValueInputElement = document.querySelector('.effect-level__value');
const effectRadiosElement = document.querySelectorAll('input[name="effect"]');
const effectLevelBlockElement = document.querySelector('.img-upload__effect-level');
const imgPreviewElement = document.querySelector('.img-upload__preview img');

let currentEffect = 'none';

noUiSlider.create(sliderContainerElement, {
  range: { min: EFFECTS.none.range[0], max: EFFECTS.none.range[1] },
  start: EFFECTS.none.start,
  step: EFFECTS.none.step,
  connect: 'lower'
});

function updateSlider(effect) {
  const params = EFFECTS[effect];
  sliderContainerElement.noUiSlider.updateOptions({
    range: { min: params.range[0], max: params.range[1] },
    start: params.start,
    step: params.step
  });
  if (effect === 'none') {
    effectLevelBlockElement.classList.add('hidden');
    imgPreviewElement.style.filter = '';
    sliderValueInputElement.value = '';
  } else {
    effectLevelBlockElement.classList.remove('hidden');
    setFilter(effect, params.start);
    sliderValueInputElement.value = params.start;
  }
}

function setFilter(effect, value) {
  const params = EFFECTS[effect];
  if (effect === 'none') {
    imgPreviewElement.style.filter = '';
    sliderValueInputElement.value = '';
    return;
  }
  imgPreviewElement.style.filter = `${params.filter}(${value}${params.unit})`;
  sliderValueInputElement.value = value;
}

effectRadiosElement.forEach((radio) => {
  radio.addEventListener('change', () => {
    currentEffect = radio.value;
    updateSlider(currentEffect);
  });
});

sliderContainerElement.noUiSlider.on('update', (values, handle) => {
  const value = values[handle];
  if (currentEffect !== 'none') {
    setFilter(currentEffect, value);
  }
});

export function resetEffect() {
  if (window.noUiSlider) {
    currentEffect = 'none';
    updateSlider('none');
  }
}

updateSlider('none');
