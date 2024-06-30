import 'lazysizes';

// Menu
const menu = document.querySelector('#menu');
const hero = document.querySelector('.hero');
const main = document.querySelector('main');
const drawer = document.querySelector('#drawer');
const skipLink = document.querySelector('.skiped');
const mainContent = document.querySelector('#content');

menu.addEventListener('click', (event) => {
  event.preventDefault();
  drawer.classList.toggle('open');
  event.stopPropagation();
});

hero.addEventListener('click', () => {
  drawer.classList.remove('open');
});

main.addEventListener('click', () => {
  drawer.classList.remove('open');
});

skipLink.addEventListener('click', (event) => {
  event.preventDefault();
  mainContent.focus();
});
