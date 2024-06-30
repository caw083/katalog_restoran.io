/* eslint-disable max-len */
import FavoriteRestaurantDB from '../../public/data/idb';
import DicodingRestaurantAPI from '../../public/data/restaurantApi';
import UrlParser from '../route/url_parser';
import './form.js';
import '../../styles/form.css';
import '../../styles/detail.css';

const Detail = {
  async render() {
    return `
            <div class="restaurant-detail" id="restaurant-detail"></div>
            // eslint-disable-next-line max-len, max-len
            <button id="favoriteButton" class="favorite-button">Tambah ke Favorit</button>
            `;
  },
  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const api = new DicodingRestaurantAPI();
    let restaurant = await api.getRestaurantDetail(url.id);
    restaurant = restaurant.restaurant;
    // eslint-disable-next-line max-len
    const restaurantDetailContainer = document.querySelector('#restaurant-detail');
    const imageUrl = await api.getRestaurantImage(restaurant.pictureId);

    restaurantDetailContainer.innerHTML = `
      <form-field placeholder="Masukkan nama pereview" id="${restaurant.id}"></form-field>
        <h2>${restaurant.name}</h2>
        <img src=${imageUrl} alt="${restaurant.name}">
        <div class="restaurant-info">
            <p><strong>Alamat:</strong> ${restaurant.address}, ${restaurant.city}</p>
            <p><strong>Rating:</strong> ${restaurant.rating}</p>
            <p>${restaurant.description}</p>
            <h3>Kategori:</h3>
            <ul>${restaurant.categories.map((category) => `<li>${category.name}</li>`).join('')}</ul>
            <h3>Menu Makanan:</h3>
            <ul>${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}</ul>
            <h3>Menu Minuman:</h3>
            <ul>${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}</ul>
            <h3>Customer Reviews:</h3>
            <ul>${restaurant.customerReviews.map((review) => `<li><strong>${review.name}</strong>: ${review.review}</li>`).join('')}</ul>
        </div>
    `;

    const favoriteButton = document.querySelector('#favoriteButton');
    const isFavorited = await FavoriteRestaurantDB.get(url.id);
    // eslint-disable-next-line max-len
    favoriteButton.textContent = isFavorited ? 'Hapus dari Favorit' : 'Tambah ke Favorit';

    favoriteButton.addEventListener('click', async () => {
      if (isFavorited) {
        await FavoriteRestaurantDB.delete(restaurant.id);
        favoriteButton.textContent = 'Tambah ke Favorit';
        alert('Restoran telah dihapus dari favorit');
      } else {
        await FavoriteRestaurantDB.put(restaurant);
        favoriteButton.textContent = 'Hapus dari Favorit';
        alert('Restoran telah ditambahkan ke favorit');
      }
    });
  },
};

export default Detail;
