import {Workbox} from 'workbox-window';

export const RegisterSW = () => {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', async () => {
    const wb = new Workbox('/sw.bundle.js');
    console.log(wb);
    try {
      await wb.register();
      console.log('Service worker registered');
    } catch (error) {
      console.log('Failed to register service worker', error);
    }
  });
};

export default RegisterSW;
