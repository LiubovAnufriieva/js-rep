import iziToast from 'izitoast';
import { fetchNewsArticles } from './news-service.js';
import { renderCardsMarkup } from './render-cards.js';
import { PER_PAGE } from './config';

// Import styles
import '../css/style.css';
import './news-styles.css';
import 'izitoast/dist/css/iziToast.min.css';

// Refs from page
const containerEl = document.querySelector('.js-cards-container');
const formEl = document.querySelector('.js-search-form');
const loadMoreBtnEl = document.querySelector('.js-load-more');
const loaderEl = document.querySelector('.js-loader');

// Search params
let searchQuery = null;
let newsCurrentPage = 1;
let totalPages = 0;

loadMoreBtnEl.style.display = "none";
const onSearchSubmit = async event => {
  event.preventDefault();

  // Get query string
  const form = event.currentTarget;
  searchQuery = form.elements.newsKeyword.value;
  containerEl.innerHTML = '';
  loadMoreBtnEl.style.display = 'none';
  // loadMoreBtnEl.classList.add('d-none');

  // Check search query
  if (searchQuery.trim() === '') {
    iziToast.error({
      message: 'Field can not be empty',
      position: 'topRight',
      timeout: 2000,
    });
    form.reset();
    return;
  }

  try {
    // Get news data
    const { totalResults, articles } = await fetchNewsArticles(
      searchQuery,
      newsCurrentPage
    );

    // Render news
    containerEl.insertAdjacentHTML('beforeend', renderCardsMarkup(articles));

    totalPages = Math.ceil(totalResults / PER_PAGE);
    if (totalPages > 1) {
      loadMoreBtnEl.style.display = "block";
      // loadMoreBtnEl.classList.remove('d-none');
    }
  } catch (error) {
    let message = '';
    if (error.message === 'rateLimited') {
      message = 'Too many requests';
    } else {
      message += 'Search params is not valid';
    }

    iziToast.error({
      message,
      position: 'topRight',
      timeout: 2000,
    });
  }

  form.reset();
};

const smoothScrollOnLoadMore = () => {
  const lastArticle = containerEl.querySelector('.card');
  const newsArticleHeight = lastArticle.getBoundingClientRect().height;
  const scrollHeight = newsArticleHeight * 2;
  console.log(scrollHeight);

  window.scrollBy({
    top: newsArticleHeight,
    left: 0,
    behavior: 'smooth',
  });
};

const onLoadMorePressed = async event => {
  try {
    newsCurrentPage += 1;
    loaderEl.style.display = "block";
    // loaderEl.classList.remove('d-none');

    // Get news data
    const { articles } = await fetchNewsArticles(searchQuery, newsCurrentPage);

    // Render news
    containerEl.insertAdjacentHTML('beforeend', renderCardsMarkup(articles));
    loaderEl.style.display = "none";
    // loaderEl.classList.add('d-none');
    smoothScrollOnLoadMore();

    // Hide button if reach end of collection
    if (newsCurrentPage > totalPages) {
      loadMoreBtnEl.style.display = "none";
      // loadMoreBtnEl.classList.add('d-none');
      loadMoreBtnEl.removeEventListener('click', onLoadMorePressed);
    }
  } catch (error) {
    iziToast.error({
      message: 'Search params is not valid',
      position: 'topRight',
      timeout: 2000,
    });
  }
};

formEl.addEventListener('submit', onSearchSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMorePressed);