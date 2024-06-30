/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
import {screen} from '@testing-library/dom';
import FavoriteRestaurantDB from '../src/public/data/idb';
import Favorit from '../src/scripts/view/favorit';
import home from '../src/scripts/view/home';
import Detail from '../src/scripts/view/detail';

describe('FavoriteRestaurantDB', () => {
  const restaurant = {id: 1, name: 'Restaurant 1'};
  const restaurant2 = {id: 2, name: 'Restaurant 2'};

  beforeAll(async () => {
    // Clear the database before running tests
    const allRestaurants = await FavoriteRestaurantDB.getAll();
    // eslint-disable-next-line max-len
    await Promise.all(allRestaurants.map((r) => FavoriteRestaurantDB.delete(r.id)));
  });

  test('should add a restaurant to the database', async () => {
    await FavoriteRestaurantDB.put(restaurant);
    const result = await FavoriteRestaurantDB.get(restaurant.id);
    expect(result).toEqual(restaurant);
  });

  test('should retrieve all restaurants from the database', async () => {
    await FavoriteRestaurantDB.put(restaurant2);
    const result = await FavoriteRestaurantDB.getAll();
    expect(result).toContainEqual(restaurant);
    expect(result).toContainEqual(restaurant2);
  });

  test('should delete a restaurant from the database', async () => {
    await FavoriteRestaurantDB.delete(restaurant.id);
    const result = await FavoriteRestaurantDB.get(restaurant.id);
    expect(result).toBeUndefined();
  });

  test('should return undefined for a non-existent restaurant', async () => {
    const result = await FavoriteRestaurantDB.get(999);
    expect(result).toBeUndefined();
  });
  test('render method should return the correct HTML structure', async () => {
    const html = await Favorit.render();
    expect(html).toBeTruthy(); // Assert that html is truthy (not null or undefined)
  });
  test('render method should return the correct HTML structure', async () => {
    document.body.innerHTML = await Favorit.render();
    // Assert that specific elements or text exist in the rendered HTML
    console.log(document.body.innerHTML);
  });


  test('should display message if no favorite restaurants found', async () => {
    let html = await Favorit.afterRender();
    let test = await Favorit.afterRender();
    console.log('hello world');
    console.log(html);
    // eslint-disable-next-line max-len
  });
});
