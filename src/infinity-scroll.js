// import './style.css';
// import axios from 'axios';

// const BASE_URL = 'https://api.themoviedb.org/3';
// const END_POINT = '/trending/movie/week';
// const API_KEY = '345007f9ab440e5b86cef51be6397df1';

// const selectors = {
//   container: document.querySelector('.js-movie-list'),
//   guard: document.querySelector('.js-guard'),
// };

// let page = 499;

// let options = {
//   root: null,
//   rootMargin: '300px',
//   threshold: 0,
// };

// let observer = new IntersectionObserver(handlePagination, options);

// serviceMovie(page)
//   .then(data => {
//     selectors.container.insertAdjacentHTML(
//       'beforeend',
//       createMarkup(data.results)
//     );
//     if(data.page < 500) {
//         observer.observe(selectors.guard);
//     }
    
//   })

//   .catch(error => alert(error.message));

// async function serviceMovie(page) {
//   const response = await axios({
//     url: `${BASE_URL}${END_POINT}`,
//     params: {
//       api_key: API_KEY,
//       page,
//     },
//   });
//   return response.data;
// }

// function createMarkup(arr) {
//   return arr
//     .map(
//       ({ id, poster_path, original_title, release_date, vote_average }) => `
//      <li class="movie-card" data-id="${id}">
//         <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}">
//         <div class="movie-info"></div>
//         <h2>${original_title}</h2>
//         <p>Release Date: ${release_date}</p>
//         <p>Vote Average: ${vote_average}</p>
//     </li>`
//     )
//     .join('');
// }

// function handlePagination(entries, observer) {
//     entries.forEach((async (entry) => {
//         if(entry.isIntersecting) {
//             page += 1
            
//             try {
//                 const movies = await serviceMovie(page);
//                 selectors.container.insertAdjacentHTML('beforeend', createMarkup(movies.results));
//                 console.log(movies);

//                 if(movies.page >= 500) {
//                   observer.unobserve(entry.target)
//                 }
//             } catch(error) {
//                 alert(error.message)
//             }
//         }
//     })) 
// }
