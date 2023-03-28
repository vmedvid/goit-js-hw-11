import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { markUpGallery } from './mark-up-gallery';
import { PixabayAPI } from './pixabay-api';

const searchImagesFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

const pixabayAPI = new PixabayAPI();
let showedImages = 0;

let simpleLightbox;

searchImagesFormEl.addEventListener('submit', handleSubmitForm);

function handleSubmitForm(evt) {
  evt.preventDefault();

  loadMoreBtnEl.classList.add('is-hidden');
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
      loadMoreBtnEl.classList.add('is-hidden');
    } else {
      Notify.success(`Hooray! We found ${images.totalHits} images.`);
      markUpGallery(images, galleryEl);
      simpleLightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
      if (images.totalHits <= pixabayAPI.perPage) {
        loadMoreBtnEl.classList.add('is-hidden');
      } else {
        loadMoreBtnEl.classList.remove('is-hidden');
      }
      showedImages += images.hits.length;
    }
  } catch (error) {
    console.log(error.message);
  }
  Loading.remove();
  smoothPageScrolling(1);
}

loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnClick);

function handleLoadMoreBtnClick() {
  pixabayAPI.page += 1;
  renderNextPage();
}

async function renderNextPage() {
  try {
    const images = await pixabayAPI.getImages();
    markUpGallery(images, galleryEl);
    simpleLightbox.refresh();
    showedImages += images.hits.length;
    if (showedImages >= images.totalHits) {
      loadMoreBtnEl.classList.add('is-hidden');
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.log(error.message);
  }
  Loading.remove();
  smoothPageScrolling(2);
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
