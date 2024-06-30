import routes from './route/route';
import UrlParser from './route/url_parser';
// eslint-disable-next-line max-len
import RegisterSW from './register-jw'; // Import the service worker registration

// eslint-disable-next-line require-jsdoc
class App {
  // eslint-disable-next-line require-jsdoc
  constructor() {
    // eslint-disable-next-line max-len
    this.content = document.querySelector('#content'); // Assuming you have an element with id 'content' in your HTML
    this.handleUrlChange = this.handleUrlChange.bind(this);

    // Add event listeners for URL changes
    window.addEventListener('hashchange', this.handleUrlChange);
    window.addEventListener('popstate', this.handleUrlChange);

    // Register the service worker
    // eslint-disable-next-line new-cap
    RegisterSW(); // Call the service worker registration function
  }

  // Render the page based on the current URL
  // eslint-disable-next-line require-jsdoc
  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    if (page) {
      this.content.innerHTML = await page.render();
      await page.afterRender();

      // Setup skip link for accessibility
      const skipLink = document.querySelector('.skiped');
      const mainContent = document.querySelector('#content');
      if (skipLink) {
        skipLink.addEventListener('click', (event) => {
          event.preventDefault();
          mainContent.focus();
        });
      }
    } else {
      this.content.innerHTML = '<h1>Page not found</h1>';
    }
  }

  // Handle URL change events
  // eslint-disable-next-line require-jsdoc
  async handleUrlChange() {
    await this.renderPage();
  }
}

export default App;
