import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { markUpGallery } from './mark-up-gallery';
import { PixabayAPI } from './pixabay-api';
import debounce from 'lodash.debounce';

const searchImagesFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');

const pixabayAPI = new PixabayAPI();
let showedImages = 0;

let simpleLightbox;

searchImagesFormEl.addEventListener('submit', handleSubmitForm);

function handleSubmitForm(evt) {
  evt.preventDefault();
  galleryEl.innerHTML = '';
  showedImages = 0;
  pixabayAPI.query = evt.currentTarget.elements.searchQuery.value.trim();

  if (!pixabayAPI.query) {
    return Notify.warning('Please enter a picture title');
  }
  renderFirstPage();
  evt.target.reset();
}

async function renderFirstPage() {
  pixabayAPI.page = 1;
  try {
    const images = await pixabayAPI.getImages();
    if (images.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notify.success(`Hooray! We found ${images.totalHits} images.`);
      markUpGallery(images, galleryEl);
      simpleLightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
      showedImages += images.hits.length;
      smoothPageScrolling(1);
    }
  } catch (error) {
    console.log(error.message);
  }
  Loading.remove();
}

async function renderNextPage() {
  try {
    const images = await pixabayAPI.getImages();
    if (showedImages >= images.totalHits) {
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
      Loading.remove();
      return;
    }
    markUpGallery(images, galleryEl);
    simpleLightbox.refresh();
    showedImages += images.hits.length;
    smoothPageScrolling(2);
  } catch (error) {
    console.log(error.message);
  }
  Loading.remove();
}

function smoothPageScrolling(number) {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * number,
    behavior: 'smooth',
  });
}

const DEBOUNCE_DELAY = 250;
window.addEventListener('scroll', debounce(onScroll, DEBOUNCE_DELAY));

function onScroll() {
  const documentRect = document.documentElement.getBoundingClientRect();

  if (documentRect.bottom < document.documentElement.clientHeight + 70) {
    pixabayAPI.page += 1;
    renderNextPage();
  }
}
