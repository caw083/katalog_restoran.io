/* eslint-disable max-len */
import DicodingRestaurantAPI from '../../public/data/restaurantApi';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

const home = {
  async render() {
    console.log('home');
    try {
      const api = new DicodingRestaurantAPI();
      const restaurants = await api.getRestaurantList();
      let restaurantList = '';

      // Use a for...of loop to handle async operations correctly
      for (const restaurant of restaurants.restaurants) {
        const imageUrl = await api.getRestaurantImage(restaurant.pictureId);
        restaurantList += `
          <div class="card-hover">
              <div class="card-hover__content">
                  <h3 class="card-hover__title">
                    Choice <span class="card-hover__name">${restaurant.name}</span> right now!
                  </h3>
                    <p class="card-hover__text">${restaurant.description.slice(0, 150)}</p>
                  <a href="#/detail/${restaurant.id}" class="card-hover__link">
                      <span>Learn How</span>
                        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>        
                  </a>
              </div>
              <div class="card-hover__extra">
                  <h4>Coming in <span>${restaurant.city}</span> Town and get <span>40%</span> discount!</h4>
                  <p class="card_item_rating">
                      Rating : <a href="#" class="list_item_rating_value">${restaurant.rating}</a>
                  </p>
              </div>
              <img data-src="${imageUrl}" class="lazyload" alt="${restaurant.name}">
          </div>
          `;
      }

      // Return the generated restaurant list HTML
      return `
        <div class="hero">
            <div class="heroinner">
                <h1 class="herotitle">Foodku</h1>
                <p class="herosubtitle">Ayuk makan</p>
            </div>
        </div>
        <section class="content">
            <div class="latest">
                <h1>Find Restaurant</h1>
                <div class="list" id="cardlist">
                    ${restaurantList}
                </div>
            </div>
        </section>
        `;
    } catch (error) {
      console.error('Error fetching restaurant list:', error);
      return `<p>Error fetching data: ${error.message}</p>`;
    }
  },

  async afterRender() {
    // Optional: Add any post-render logic here
  },
};

export default home;
