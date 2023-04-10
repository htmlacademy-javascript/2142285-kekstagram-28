
const ALERT_SHOW_TIME = 5000;

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

/*const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generateId = createIdGenerator();
const generatePhotoId = createIdGenerator();
const generateCommentId = createIdGenerator();

const createComment = () => {
  const messageCounter = {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(1,idCommentCount)}.svg`,
    message: getRandomArrayElement(messages) + getRandomArrayElement(messages),
    name: getRandomArrayElement(names),
  };
  return messageCounter;
};*/

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


/*const createPhoto = () => ({
  id: generateId(),
  url:`photos/${generatePhotoId()}.jpg`,
  description: getRandomArrayElement(descriptions),
  likes: getRandomInteger(15,200),
  comments:Array.from({length: getRandomInteger(1, 50)}, createComment),
});*/


//const creatPhotos = (count) => Array.from({length:count}, createPhoto);

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const isEscapeKey = (evt) => evt.key === 'Escape';

function throttle (callback, delayBetweenFrames) {
  let lastTime = 0;
  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

// Перемешиваем случайно массив
const shuffleArrayRandom = (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    const j = getRandomInteger(0, array.length - 1);
    const buffer = array[i];
    array[i] = array[j];
    array[j] = buffer;
  }

  return array;
};

export {isEscapeKey, showAlert,shuffleArrayRandom, throttle,debounce};
