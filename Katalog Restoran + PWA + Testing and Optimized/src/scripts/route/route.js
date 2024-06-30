import Detail from '../view/detail';
import Favorit from '../view/favorit';
import home from '../view/home';

const routes = {
  '/': home, // default page
  '/favorit': Favorit,
  '/detail/:id': Detail,
};

export default routes;
