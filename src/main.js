import { fetchImages } from './js/pixabay-api.js';
import { clearGallery, renderImages } from './js/render-functions.js';
import { showLoader, hideLoader } from './js/loader.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
const perPage = 15;
let totalHits = 0;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

loadMoreBtn.style.display = 'none';

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = event.currentTarget.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search term',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery(gallery);
  loadMoreBtn.style.display = 'none';

  await loadImages();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  await loadImages();
});

async function loadImages() {
  showLoader();

  loadMoreBtn.textContent = 'Loading...';
  loadMoreBtn.disabled = true;

  try {
    const data = await fetchImages(currentQuery, currentPage, perPage);

    if (data.hits.length === 0 && currentPage === 1) {
      iziToast.info({
        message: 'Sorry, there are no images matching your search request.',
        position: 'topRight',
      });
      loadMoreBtn.style.display = 'none';
      hideLoader();
      return;
    }

    renderImages(data.hits, gallery);
    lightbox.refresh();

    totalHits = data.totalHits;

    if (currentPage * perPage < totalHits) {
      loadMoreBtn.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    await waitForImagesToLoad();
    smoothScroll();

  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    loadMoreBtn.textContent = 'Load more';
    loadMoreBtn.disabled = false;
    hideLoader();
  }
}

async function waitForImagesToLoad() {
  const images = gallery.querySelectorAll('img');
  const promises = Array.from(images).map(
    img =>
      new Promise(resolve => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        }
      })
  );
  await Promise.all(promises);
}

function smoothScroll() {
  const firstCard = gallery.firstElementChild;
  if (!firstCard) return;

  const { height: cardHeight } = firstCard.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
