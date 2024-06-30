/* eslint-disable max-len */
import FavoriteRestaurantDB from '../../public/data/idb.js';
import DicodingRestaurantAPI from '../../public/data/restaurantApi';
import '../../styles/card.scss';
import '../../styles/jumborton.scss';

const Favorit = {
  async render() {
    return `
            <div class="hero">
                <div class="heroinner">
                    <h1 class="herotitle">Favorite Restaurants</h1>
                </div>
            </div>
            <section class="content">
                <div class="latest">
                    <h1>Your Favorite Restaurants</h1>
                    <div class="list" id="favorite-list">
                    </div>
                </div>
            </section>
        `;
  },
  async afterRender() {
    try {
      const api = new DicodingRestaurantAPI();
      const favoriteRestaurants = await FavoriteRestaurantDB.getAll();
      const favoriteListContainer = document.querySelector('#favorite-list');
      if (favoriteRestaurants.length > 0) {
        let restaurantList = '';
        for (const restaurant of favoriteRestaurants) {
          const imageUrl = await api.getRestaurantImage(restaurant.pictureId);
          restaurantList += `
                    <div class="card-hover">
                        <div class="card-hover__content">
                            <h3 class="card-hover__title">
                                <span>${restaurant.name}</span>
                            </h3>
                            <p class="card-hover__text">${restaurant.description.slice(0, 150)}</p>
                            <a href="#/detail/${restaurant.id}" class="card-hover__link">
                                <span>Learn More</span>
                                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </a>
                        </div>
                        <div class="card-hover__extra">
                            <h4>Located in <span>${restaurant.city}</span></h4>
                            <p class="card_item_rating">
                                Rating: <a href="#" class="list_item_rating_value">${restaurant.rating}</a>
                            </p>
                        </div>
                        <img src="${imageUrl}" alt="${restaurant.name}">
                    </div>
                    `;
        }
        favoriteListContainer.innerHTML = restaurantList;
      } else {
        favoriteListContainer.innerHTML = '<p>No favorite restaurants found.</p>';
      }
    } catch (error) {
      console.error('Error fetching favorite restaurant list:', error);
      const favoriteListContainer = document.querySelector('#favorite-list');
      favoriteListContainer.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    }
  },
};

export default Favorit;
