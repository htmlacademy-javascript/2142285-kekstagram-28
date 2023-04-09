const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Methods = {
  GET: 'GET',
  POST: 'POST',
};

const Routes = {
  HOME: '/',
  PHOTO: '/data'
};

const ErrorTexts = {
  GET_PHOTO: 'Не удалось загрузить фотографии. Попробуйте обновить страницу',
  SEND_PHOTO: 'Не удалось отправить данные фотографии. Попробуйте ещё раз',
};

const load = (route, errorText, method = Methods.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .catch(() => {
      throw new Error(errorText);
    });


const getPhotos = () => load(Routes.PHOTO, ErrorTexts.GET_PHOTO, Methods.GET);
const sendPhoto = (body) => load(Routes.HOME, ErrorTexts.SEND_PHOTO, Methods.POST, body);

export {getPhotos, sendPhoto};
