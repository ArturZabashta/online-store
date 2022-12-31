import { HomeComponent } from './components/homePage';
import { CartComponent } from './components/cartPage';
import { ErrorComponent } from './components/errorPage';
import { ItemComponent } from './components/itemDetails';
import { IRoutes } from './interfaces/route-interfaces';

const routes: IRoutes[] = [
  { path: '#/cart', component: CartComponent, },
  { path: '#/product-details', component: ItemComponent, },
{ path: '#/shop', component: HomeComponent, },
];

const parseLocation  = ():string => location.hash.toLowerCase() || '#/shop';

const findComponentByPath = (path: string, routes:IRoutes[]): IRoutes | undefined=> routes.find(r => path.match(new RegExp(`\\${r.path}`, 'gm'))) || undefined;

const router = () => {
  const path = parseLocation();
  const { component = ErrorComponent } = findComponentByPath(path, routes) || {};
  component();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);