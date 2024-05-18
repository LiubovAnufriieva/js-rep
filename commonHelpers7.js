import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                     */import"./assets/vendor-e5e0b403.js";const u="4330ebfabc654a6992c2aa792f3173a3",d="https://newsapi.org/v2",f={headers:{Authorization:u}};class p{constructor(){this.searchQuery,this.page=1}fetchArticles(){const t=`${d}/everything?q=${this.searchQuery}&language=en&pageSize=4&page=${this.page}`;return fetch(t,f).then(e=>e.json()).then(({articles:e})=>(this.incrementPage(),e))}incrementPage(){this.page+=1}resetPage(){this.page=1}get query(){return this.searchQuery}set query(t){this.searchQuery=t}}class b{constructor({selector:t,hidden:e=!1}){this.refs=this.getRefs(t),e&&this.hide()}getRefs(t){const e={};return e.button=document.querySelector(t),e.label=e.button.querySelector(".label"),e.spinner=e.button.querySelector(".spinner"),e}enable(){this.refs.button.disabled=!1,this.refs.label.textContent="Show more",this.refs.spinner.classList.add("is-hidden")}disable(){this.refs.button.disabled=!0,this.refs.label="Loading",this.refs.spinner.classList.remove("is-hidden")}show(){this.refs.button.classList.remove("is-hidden")}hide(){this.refs.button.classList.add("is-hidden")}}const i={searchForm:document.querySelector(".js-search-form"),articlesContainer:document.querySelector(".js-articles-container"),searchBtn:document.querySelector(".search-btn")},n=new b({selector:'[data-action="load-more"]',hidden:!0}),s=new p;i.searchForm.addEventListener("submit",g);n.refs.button.addEventListener("click",a);function g(r){if(r.preventDefault(),s.query=r.currentTarget.elements.query.value,s.query==="")return alert("Put your search query!");n.show(),s.resetPage(),y(),a(),i.searchBtn.disabled=!0}function a(){n.disable(),s.fetchArticles().then(r=>{m(r),n.enable()})}function m(r){const t=r.map(({url:e,urlToImage:o,title:c,author:h,description:l})=>`
  <li>
    <a href="${e}" target="_blank" rel="noopener noreferrer">
      <article>
        <img src="${o}" alt="" width="480">
        <h2>${c}</h2>
        <p>Posted by: ${h}</p>
        <p>${l}</p>
      </article>
    </a>
  </li>`).join("");i.articlesContainer.insertAdjacentHTML("beforeend",t)}function y(){i.articlesContainer.innerHTML=""}
//# sourceMappingURL=commonHelpers7.js.map
