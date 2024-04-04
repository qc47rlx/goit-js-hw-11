import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImage } from './js/pixabay-api';
import { imagesTemplate } from './js/render-functions';

const formEl = document.querySelector('.form');
const listEL = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

formEl.addEventListener('submit', event => {
  event.preventDefault();
  listEL.innerHTML = '';
  const value = event.target.elements.value.value;

  if (value) {
    loaderEl.classList.remove('is-hidden');
    getImage(value)
      .then(data => {
        if (!data.hits.length) {
          iziToast.error({
            title: 'Error',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
          });
        }
        const markup = imagesTemplate(data.hits);
        listEL.insertAdjacentHTML('afterbegin', markup);
        loaderEl.classList.add('is-hidden');
        lightbox.refresh();
      })
        .catch(error => console.log(error));
  } else {
    iziToast.error({
      title: 'Error',
      message: 'The search field is empty. Please try again!',
    });
  }
  formEl.reset();
});