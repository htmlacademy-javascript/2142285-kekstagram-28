
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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const comments = {
  id: getRandomInteger(1,200),
  avatar: `img/avatar-${getRandomInteger(1,idCommentCount)}.svg`,
  message: getRandomArrayElement(messages) + getRandomArrayElement(messages) ,
  name: getRandomArrayElement(names),
};

const creatPhoto = () => ({
  id: getRandomInteger(1,creatPhotoCount),
  url:`photos${getRandomInteger(1,creatPhotoCount)}.jpg `,
  description: getRandomArrayElement(descriptions),
  like: getRandomInteger(15,200),
  comment: comments,
});

const creatPhotos = Array.from({length:creatPhotoCount}, creatPhoto);

