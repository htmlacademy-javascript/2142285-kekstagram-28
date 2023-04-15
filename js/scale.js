const DEFAULT_SCALE = 100;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const STEP_SCALE = 25;
const buttonSmallerScale = document.querySelector('.scale__control--smaller');
const buttonBiggerScale = document.querySelector('.scale__control--bigger');
const imgScaleInput = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imgPreview.style.transform = `scale(${value / 100})`;
  imgScaleInput.value = `${value}%`;
};


const onButtonSmallerScale = () => {
  const currentValue = parseInt(imgScaleInput.value,10);
  let newValue = currentValue - STEP_SCALE;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};

const onButtonBiggerScale = () => {
  const currentValue = parseInt(imgScaleInput.value,10);
  let newValue = currentValue + STEP_SCALE;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

buttonSmallerScale.addEventListener('click',onButtonSmallerScale);
buttonBiggerScale.addEventListener('click',onButtonBiggerScale);

export{resetScale};
