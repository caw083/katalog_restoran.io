const assert = require('assert');

// eslint-disable-next-line new-cap
Feature('Favorite Restaurants');

// eslint-disable-next-line new-cap
Before(({I}) => {
  I.amOnPage('/#/favorit');
});

// eslint-disable-next-line new-cap
Scenario('removing a restaurant to favorites', async ({I}) => {
  I.waitForElement('#favorite-list', 5); // Wait for up to 5 seconds
  I.see('No favorite restaurants found.', '#favorite-list');
  I.amOnPage('/');
  I.waitForElement('.card-hover', 30);
  I.seeElement('.card-hover');

  const firstRestaurant = locate('.card-hover__name').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  console.log('page title', firstRestaurantTitle);

  const firstRestaurantdetail = locate('.card-hover__link').first();
  I.click(firstRestaurantdetail);
  console.log('hello world', firstRestaurantdetail);
  I.amOnPage('/#/detail/rqdv5juczeskfw1e867');
  I.waitForElement('#content', 20);
  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');

  I.amOnPage('/#/favorit');
  I.waitForElement('.card-hover', 5); // Wait for up to 5 seconds
  // eslint-disable-next-line max-len
  const favoriteRestaurantTitle = await I.grabTextFrom('.card-hover__title span');
  console.log(favoriteRestaurantTitle);

  assert.strictEqual(firstRestaurantTitle, favoriteRestaurantTitle);

  I.amOnPage('/#/detail/rqdv5juczeskfw1e867');
  I.waitForElement('#content', 20);
  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');

  I.amOnPage('/#/favorit');
  I.waitForElement('#favorite-list', 5); // Wait for up to 5 seconds
  I.see('No favorite restaurants found.', '#favorite-list');
});

// eslint-disable-next-line new-cap
Scenario('error fetching favorite restaurants', async ({I}) => {
  // Simulate an error condition if possible, such as by mocking API response
  // This will depend on your application setup and testing environment

  // Assuming error condition setup...

  I.amOnPage('/#/favorit');
  I.waitForElement('#favorite-list', 5); // Wait for up to 5 seconds
  I.see('No favorite restaurants found.', '#favorite-list');
});
