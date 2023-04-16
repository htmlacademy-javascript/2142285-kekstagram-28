import {EFFECTS} from './data.js';

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectElement = document.querySelector('.img-upload__effect-level');

let choosenEffect = EFFECTS[0];

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});
effectElement.classList.add('hidden');

const applyEffect = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: choosenEffect.min,
      max: choosenEffect.max,
    },
    start: choosenEffect.max,
    step: choosenEffect.step,
  });
};

const getSlaider = () => {
  if(choosenEffect.name === 'none'){
    effectElement.classList.add('hidden');
  } else {
    effectElement.classList.remove('hidden');
    applyEffect();
  }
};

const filterImage = () => {
  const slaiderValue = sliderElement.noUiSlider.get();
  if (choosenEffect.name === 'none') {
    imgPreview.style.filter = choosenEffect.style;
  } else {
    imgPreview.style.filter = `${choosenEffect.style}(${slaiderValue}${choosenEffect.unit})`;
  }
  valueElement.value = slaiderValue;
};


const onEffectChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')){
    return;
  }
  choosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imgPreview.className = `effects__preview--${choosenEffect.name}`;
  filterImage ();
  getSlaider();
};

effectsList.addEventListener('change',onEffectChange);
const addEffects = sliderElement.noUiSlider.on('update', filterImage);

const resetEffect = () => {
  choosenEffect = EFFECTS[0];
  imgPreview.className = `effects__preview--${choosenEffect.name}`;
  applyEffect();
  getSlaider();
};

export {addEffects, resetEffect};

