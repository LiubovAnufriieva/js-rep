import {truncate } from './helpers';

export const renderCardsMarkup = articles => {
    return articles.reduce((markup, article) => {
        return (markup += `
        <article class="card">
        <img
          class="card-img-top"
          src=${article.urlToImage || './public/placeholder.png'}
          alt="${article?.title}"
          height="146"
        />
        <div class="card-body gallery-info-div">
          <h5 class="card-title">${truncate(article?.title, 20)}</h5>
          <p class="card-text">${truncate(article?.description, 86)}</p>
          <p class="card-text">
            <small class="text-body-secondary">${truncate(
              article?.publishedAt,
              10
            )}</small>
          </p>
          <a href="#" class="btn btn-primary">
            <span class="text-white">Read more</span>
          </a>
        </div>
      </article>`); 
    }, '');
};