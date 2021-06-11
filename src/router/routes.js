import {IndexRoute, ShopRoute} from './paths';
import Home from 'views/Home/Home';
import Shop from 'views/Shop/Shop';

const routes = [
    {path: IndexRoute, Component: Home},
    {path: ShopRoute, Component: Shop}
]

export default routes;