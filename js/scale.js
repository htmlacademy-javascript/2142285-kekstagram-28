const defaultScale = 100;
const maxScale = 100;
const minScale = 25;
const stepScale = 25;
const buttonSmallerScale = document.querySelector('.scale__control--smaller');// кнопка уменьшить
const buttonBiggerScale = document.querySelector('.scale__control--bigger');// кнопка увеличить
const imgScaleInput = document.querySelector('.scale__control--value');// поле с текстом изменения масштаба
const imgPreview = document.querySelector('.img-upload__preview img');// загружаемая фотография

const scaleImage = (value) => {
  imgPreview.style.transform = `scale(${value / 100})`;
  imgScaleInput.value = `${value}%`;
};


const onButtonSmallerScale = () => {
  const currentValue = parseInt(imgScaleInput.value,10);
  let newValue = currentValue - stepScale;
  if (newValue < minScale) {
    newValue = minScale;
  }
  scaleImage(newValue);
};

const onButtonBiggerScale = () => {
  const currentValue = parseInt(imgScaleInput.value,10);
  let newValue = currentValue + stepScale;
  if (newValue > maxScale) {
    newValue = maxScale;
  }
  scaleImage(newValue);
};

const resetScale = () => scaleImage(defaultScale);

buttonSmallerScale.addEventListener('click',onButtonSmallerScale);
buttonBiggerScale.addEventListener('click',onButtonBiggerScale);

export{resetScale};
