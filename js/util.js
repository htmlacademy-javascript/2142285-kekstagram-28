import {messages,names,descriptions,idCommentCount,creatPhotoCount} from './data.js';

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

const createComment = () => {
  const comments = {
    id: generateId(),
    avatar: `img/avatar-${getRandomInteger(1,idCommentCount)}.svg`,
    message: getRandomArrayElement(messages) + getRandomArrayElement(messages) ,
    name: getRandomArrayElement(names),
  };
  return comments;
};

const creatPhoto = () => ({
  id: generateId(),
  url:`photos${generatePhotoId()}.jpg `,
  description: getRandomArrayElement(descriptions),
  like: getRandomInteger(15,200),
  comment:createComment(),
});

const creatPhotos = Array.from({length:creatPhotoCount}, creatPhoto);

export {creatPhotos};
