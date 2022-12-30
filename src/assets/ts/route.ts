import {HomeComponent} from './components/homePage';
import {CurtComponent} from './components/cartPage';
import {ErrorComponent} from './components/errorPage';
import {ItemComponent} from './components/itemDetails';
import {IRoutes} from './interfaces/route-interfaces';

const routes: IRoutes[] = [
    { path: '#/cart', component: CurtComponent, },
    { path: '#/product-details', component: ItemComponent, },
    { path: '#/', component: HomeComponent, },
];

const parseLocation  = ():string => location.hash.toLowerCase() || '#/';

const findComponentByPath = (path: string, routes:IRoutes[]): IRoutes | undefined=> routes.find(r => path.match(new RegExp(`\\${r.path}`, 'gm'))) || undefined;

const router = () => {
    const path = parseLocation();
    
console.log(path,routes)
    const { component = ErrorComponent } = findComponentByPath(path, routes) || {};
    //const main: HTMLElement | null = document.getElementById('app');
    /*(<HTMLElement>main).innerHTML  = */component();
  };

window.addEventListener('hashchange', router);
window.addEventListener('load', router);