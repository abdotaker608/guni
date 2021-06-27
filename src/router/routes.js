import {IndexRoute, ShopRoute, RegisterRoute} from './paths';
import Home from 'views/Home/Home';
import Shop from 'views/Shop/Shop';
import Register from 'views/Register/Register';

const routes = [
    {path: IndexRoute, Component: Home},
    {path: ShopRoute, Component: Shop},
    {path: RegisterRoute, Component: Register}
]

export default routes;