import FavoriteRestaurantDB from '../src/public/data/idb';

jest.mock('idb', () => {
  const mockDB = {};
  return {
    openDB: jest.fn(() => {
      return Promise.resolve({
        get: (storeName, id) => Promise.resolve(mockDB[id]),
        getAll: (storeName) => Promise.resolve(Object.values(mockDB)),
        put: (storeName, data) => {
          mockDB[data.id] = data;
          return Promise.resolve();
        },
        delete: (storeName, id) => {
          delete mockDB[id];
          return Promise.resolve();
        },
        transaction: () => ({
          objectStore: () => ({
            getAllKeys: () => Object.keys(mockDB),
          }),
        }),
      });
    }),
    deleteDB: jest.fn(() => Promise.resolve()),
  };
});

describe('FavoriteRestaurantDB', () => {
  beforeEach(() => {
    // Clear mockDB before each test
    jest.clearAllMocks();
  });

  test('put method should add a restaurant to the database', async () => {
    const restaurant = {
      id: 1,
      name: 'Restaurant 1',
      description: 'Description 1',
      pictureId: 'picture-1',
      city: 'City 1',
      rating: 4.5,
    };

    await FavoriteRestaurantDB.put(restaurant);
    const storedRestaurant = await FavoriteRestaurantDB.get(restaurant.id);
    expect(storedRestaurant).toEqual(restaurant);
  });

  test('getAll method should return all restaurants', async () => {
    const restaurant1 = {
      id: 1,
      name: 'Restaurant 1',
      description: 'Description 1',
      pictureId: 'picture-1',
      city: 'City 1',
      rating: 4.5,
    };

    const restaurant2 = {
      id: 2,
      name: 'Restaurant 2',
      description: 'Description 2',
      pictureId: 'picture-2',
      city: 'City 2',
      rating: 4.2,
    };

    await FavoriteRestaurantDB.put(restaurant1);
    await FavoriteRestaurantDB.put(restaurant2);

    const allRestaurants = await FavoriteRestaurantDB.getAll();
    expect(allRestaurants).toHaveLength(2);
    expect(allRestaurants).toContainEqual(restaurant1);
    expect(allRestaurants).toContainEqual(restaurant2);
  });

  // eslint-disable-next-line max-len
  test('delete method should remove a restaurant from the database', async () => {
    const restaurant = {
      id: 1,
      name: 'Restaurant 1',
      description: 'Description 1',
      pictureId: 'picture-1',
      city: 'City 1',
      rating: 4.5,
    };

    await FavoriteRestaurantDB.put(restaurant);
    await FavoriteRestaurantDB.delete(restaurant.id);

    const storedRestaurant = await FavoriteRestaurantDB.get(restaurant.id);
    expect(storedRestaurant).toBeUndefined();
  });
});
