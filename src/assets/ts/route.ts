import {HomeComponent} from './components/homePage';
import {CurtComponent} from './components/curtpage';
import {ErrorComponent} from './components/errorPage';
import {IRoutes} from './interfaces/routeInterfaces'

const routes: IRoutes[] = [
    { path: '/', component: HomeComponent, },
    { path: '/curt', component: CurtComponent, },
];

const parseLocation  = ():string => location.hash.slice(1).toLowerCase() || '/';

const findComponentByPath = (path: string, routes:IRoutes[]): IRoutes | undefined => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

const router = () => {
    const path = parseLocation();
    const { component = ErrorComponent } = findComponentByPath(path, routes) || {};
    const main: HTMLElement | null = document.getElementById('app');
    (<HTMLElement>main).innerHTML  = component.render();
  };

window.addEventListener('hashchange', router);
window.addEventListener('load', router);