const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const photoChooser = document.querySelector('.img-upload__start input[type=file]');
const preview = document.querySelector('.img-upload__preview img');

const showNewPhoto = () => {
  photoChooser.addEventListener('change', () => {
    const file = photoChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      preview.src = URL.createObjectURL(file);
    }
  });
};

export {showNewPhoto};

