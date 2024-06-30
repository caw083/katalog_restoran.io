/* eslint-disable require-jsdoc */
import CacheHelper from './cacheHelper.js';

class DicodingRestaurantAPI {
  constructor() {
    this.BASE_URL = 'https://restaurant-api.dicoding.dev';
    this.imageURL = 'https://restaurant-api.dicoding.dev/images/medium';
  }

  async initializeAppShell() {
    const appShellRequests = [
      '/',
      '/styles/main.css',
      '/scripts/main.js',
      '/public/manifest.json',
    ];

    try {
      await CacheHelper.cachingAppShell(appShellRequests);
      console.log('App shell cached successfully!');
    } catch (error) {
      console.error('Failed to cache app shell:', error);
    }
  }

  async getRestaurantList() {
    const cacheName = 'restaurant-api-cache';
    try {
      const cache = await caches.open(cacheName);
      const cachedResponse = await cache.match(`${this.BASE_URL}/list`);

      if (cachedResponse) {
        return cachedResponse.json(); // Removed redundant await
      }

      const response = await fetch(`${this.BASE_URL}/list`);
      await cache.put(`${this.BASE_URL}/list`, response.clone());
      return response.json(); // Removed redundant await
    } catch (error) {
      console.error('Failed to fetch restaurant list:', error);
      throw error;
    }
  }

  async getRestaurantDetail(restaurantId) {
    // eslint-disable-next-line max-len
    const cacheName = `restaurant-api-cache-${restaurantId}`; // Corrected cacheName construction
    const cache = await caches.open(cacheName);
    // eslint-disable-next-line max-len
    const cachedResponse = await cache.match(`${this.BASE_URL}/detail/${restaurantId}`);

    if (cachedResponse) {
      return await cachedResponse.json();
    }
    try {
      const response = await fetch(`${this.BASE_URL}/detail/${restaurantId}`);
      // eslint-disable-next-line max-len
      await cache.put(`${this.BASE_URL}/detail/${restaurantId}`, response.clone()); // Corrected cache URL
      return await response.json();
    } catch (error) {
      console.error('Error fetching restaurant detail:', error);
      throw error; // Rethrow the error to handle it further up the call stack
    }
  }

  async searchRestaurantByName(name) {
    const cacheName = 'restaurant-api-cache';
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(
      `${this.BASE_URL}/search?nama=${encodeURIComponent(name)}`,
    );

    if (cachedResponse) {
      return await cachedResponse.json();
    }
    const response = await fetch(
      `${this.BASE_URL}/search?nama=${encodeURIComponent(name)}`,
    );
    await cache.put(
      `${this.BASE_URL}/search?nama=${encodeURIComponent(name)}`,
      response.clone(),
    );
    return await response.json();
  }

  async searchRestaurantByCategory(category) {
    const cacheName = 'restaurant-api-cache';
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(
      `${this.BASE_URL}/search?kategori=${encodeURIComponent(category)}`,
    );

    if (cachedResponse) {
      return await cachedResponse.json();
    }
    const response = await fetch(
      `${this.BASE_URL}/search?kategori=${encodeURIComponent(category)}`,
    );
    await cache.put(
      `${this.BASE_URL}/search?kategori=${encodeURIComponent(category)}`,
      response.clone(),
    );
    return await response.json();
  }

  async searchRestaurantByMenu(menu) {
    const cacheName = 'restaurant-api-cache';
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(
      `${this.BASE_URL}/search?menu=${encodeURIComponent(menu)}`,
    );

    if (cachedResponse) {
      return await cachedResponse.json();
    }
    const response = await fetch(
      `${this.BASE_URL}/search?menu=${encodeURIComponent(menu)}`,
    );
    await cache.put(
      `${this.BASE_URL}/search?menu=${encodeURIComponent(menu)}`,
      response.clone(),
    );
    return await response.json();
  }

  async postReview(restaurantId, name, review) {
    const response = await fetch(`${this.BASE_URL}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: restaurantId,
        name,
        review,
      }),
    });
    return await response.json();
  }

  async getRestaurantImage(imageId) {
    const cacheName = 'restaurant-image-cache';
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(`${this.imageURL}/${imageId}`);
    console.log(`${this.imageURL}/${imageId}`);

    if (cachedResponse) {
      const blob = await cachedResponse.blob();
      return URL.createObjectURL(blob);
    }
    const response = await fetch(`${this.imageURL}/${imageId}`);
    await cache.put(`${this.imageURL}/${imageId}`, response.clone());
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }
}

// Example usage:
export default DicodingRestaurantAPI;
