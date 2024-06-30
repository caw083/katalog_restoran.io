import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import '../styles/jumborton.scss';
import '../styles/navigation.scss';
import '../styles/card.scss';
import '../styles/footer.scss';
import '../styles/link_skiped.scss';
import App from './app';
import RegisterSW from './register-jw';

const drawer = document.querySelector('#drawer');
const hero = document.querySelector('.hero');
const main = document.querySelector('main');
const menu = document.querySelector('#menu');

menu.addEventListener('click', (event) => {
  drawer.classList.toggle('open');
  event.stopPropagation();
});

hero.addEventListener('click', () => {
  drawer.classList.remove('open');
});

main.addEventListener('click', () => {
  drawer.classList.remove('open');
});
const myApp = new App();
myApp.renderPage();

window.addEventListener('load', () => {
  myApp.renderPage();
  // eslint-disable-next-line new-cap
  RegisterSW();
});
