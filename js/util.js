import {messages,names,descriptions,idCommentCount} from './data.js';

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createIdGenerator = () => {
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
};

const createPhoto = () => ({
  id: generateId(),
  url:`photos/${generatePhotoId()}.jpg`,
  description: getRandomArrayElement(descriptions),
  likes: getRandomInteger(15,200),
  comments:Array.from({length: getRandomInteger(1, 50)}, createComment),
});


const creatPhotos = (count) => Array.from({length:count}, createPhoto);

const isEscapeKey = (evt) => evt.key === 'Escape';

export {creatPhotos, isEscapeKey, createComment,createPhoto};
