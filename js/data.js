import {getRandomInteger,getRandomArrayElement,createIdGenerator} from './util.js';

const creatPhotoCount = 25;
const idCommentCount = 6;
const descriptions = [
  'Вот бы оказаться сейчас здесь',
  'Зимняя сказка в Гриндельвальде',
  'Можно только позавидовать проезжающим по этой дороге людям',
  'Город Хьелле  расположеный в Норвегии, Фюльке Согн-ог-Фьюране',
  'Завораживающая красота'
];

const names = [
  'Irina',
  'Alex',
  'Max',
  'Mia',
  'Mark',
  'Jon',
  'Viola',
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];


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
