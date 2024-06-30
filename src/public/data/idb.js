// db.js
import {openDB} from 'idb';

const DATABASE_NAME = 'favorite-restaurant-database';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'restaurants';

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(db) {
    db.createObjectStore(OBJECT_STORE_NAME, {keyPath: 'id'});
  },
});

const FavoriteRestaurantDB = {
  async get(id) {
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAll() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async put(restaurant) {
    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  },
  async delete(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default FavoriteRestaurantDB;
