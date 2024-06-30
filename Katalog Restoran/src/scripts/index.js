const drawer = document.querySelector('#drawer');
const hero = document.querySelector('.hero');
const main = document.querySelector('main');
const menu = document.querySelector('#menu');
menu.addEventListener('click', function (event) {
        drawer.classList.toggle('open');
        event.stopPropagation();
});

hero.addEventListener('click', function () {
    drawer.classList.remove('open');
});

main.addEventListener('click', function () {
    drawer.classList.remove('open');
});
import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import "../styles/jumborton.scss";
import "../styles/navigation.scss";
import '../styles/card.scss';
import "../styles/footer.scss";
import "../styles/link_skiped.scss";


import jsonData from '../public/data/DATA.json';

const restaurants = jsonData['restaurants'];
let restaurantList = '';

restaurants.forEach(function(restaurant) {
    restaurantList += `
    <div class="card-hover">
    <div class="card-hover__content">
      <h3 class="card-hover__title">
        Choice <span>${restaurant.name}</span> right now!
      </h3>
      <p class="card-hover__text">${restaurant.description.slice(0, 150)}</p>
      <a href="#" class="card-hover__link">
        <span>Learn How</span>
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>        
      </a>
    </div>
    <div class="card-hover__extra">
      <h4>Coming in <span>${restaurant.city}</span> Town and get <span>40%</span> discount!</h4>
      <p class="card_item_rating">
        Rating : <a href="#" class="list_item_rating_value">${restaurant['rating']}</a>
    </p>
    </div>
    <img src="${restaurant.pictureId}" alt="${restaurant.name}">
  </div>
    `;
});

document.querySelector('#cardlist').innerHTML = restaurantList;
