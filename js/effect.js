import {effects} from './data.js';


const sliderElement = document.querySelector('.effect-level__slider');// слайдер - ручка
const valueElement = document.querySelector('.effect-level__value');// поле ввода;
const imgPreview = document.querySelector('.img-upload__preview img');// загружженное изображения, добавить класс и обновить filter
const effectsList = document.querySelector('.effects__list');//  переключения эффектов
const effectElement = document.querySelector('.img-upload__effect-level');//  полностью слайдер
//const effectRadio = document.querySelector('.effects__radio');

let choosenEffect = effects[0];

noUiSlider.create(sliderElement, { //создаю слайдер
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});
effectElement.classList.add('hidden');

const applyEffect = () => { // подставляем значения из эффектов
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: choosenEffect.min,
      max: choosenEffect.max,
    },
    start: choosenEffect.max,
    step: choosenEffect.step,
  });
};

const getSlaider = () => { // прячем или показываем слайдер
  if(choosenEffect.name === 'none'){
    effectElement.classList.add('hidden');
  } else {
    effectElement.classList.remove('hidden');
    applyEffect();
  }
};

const filterImage = () => {// подставляем фильтры
  const slaiderValue = sliderElement.noUiSlider.get(); //подписываюсь на события
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
  choosenEffect = effects.find((effect) => effect.name === evt.target.value); // перебираем массив находим класс
  imgPreview.className = `effects__preview--${choosenEffect.name}`; // записываем класс
  filterImage (); // поставляем фильтры
  getSlaider(); // показываем слайдер со значениями из эффекта
};

effectsList.addEventListener('change',onEffectChange);
const addEffects = sliderElement.noUiSlider.on('update', filterImage);

const resetEffect = () => {
  choosenEffect = effects[0];
  imgPreview.className = `effects__preview--${choosenEffect.name}`;
  applyEffect();
  getSlaider();
};

export {addEffects, resetEffect};
