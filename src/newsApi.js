/*
 * - Pagination
 * - Page and Per-page
 * -  Loading (Fetch) articles on Form Submit
 * -  Loading (Fetch) articles on Load More Button Click
 * - Обновляем страницу в параметрах запроса - Reloading page in request parameters
 * - Рисуем статьи - Drawing HTML articles appearance
 * - Сброс значения при поиске по новому критерию - Reset input value while new search request
 *
 * https://newsapi.org/
 * 4330ebfabc654a6992c2aa792f3173a3
 * http://newsapi.org/v2/everything?q=cat&language=en&pageSize=5&page=1
 */

import './css/style.css';
import './css/news-api.css';
import NewsApiService from './js/news-service';
import LoadMoreBtn from './js/load-more-btn';
import SimpleLightbox from "simplelightbox";

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    articlesContainer: document.querySelector('.js-articles-container'),
    searchBtn: document.querySelector('.search-btn'),
  };
  const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
  });
  const newsApiService = new NewsApiService();
  
  refs.searchForm.addEventListener('submit', onSearch);
  loadMoreBtn.refs.button.addEventListener('click', fetchArticles);
  

  function onSearch(e) {
    e.preventDefault();
  
    newsApiService.query = e.currentTarget.elements.query.value;
  
    if (newsApiService.query === '') {
    return alert('Put your search query!');
  }
 
  loadMoreBtn.show();
  newsApiService.resetPage();
  clearArticlesContainer();
  fetchArticles();
  refs.searchBtn.disabled = true;
}

function fetchArticles() {
  loadMoreBtn.disable();
  newsApiService.fetchArticles().then(articles => {
    appendArticlesMarkup(articles);
    loadMoreBtn.enable();
  });
}

function appendArticlesMarkup(articles) {
  
  const markup = articles
    .map(
      ({ url, urlToImage, title, author, description }) => `
  <li>
    <a href="${url}" target="_blank" rel="noopener noreferrer">
      <article>
        <img src="${urlToImage}" alt="" width="480">
        <h2>${title}</h2>
        <p>Posted by: ${author}</p>
        <p>${description}</p>
      </article>
    </a>
  </li>`
    )
    .join('');

  refs.articlesContainer.insertAdjacentHTML('beforeend', markup);
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}
