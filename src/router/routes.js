import {IndexRoute, ShopRoute, RegisterRoute, VerifyRoute, LogoutRoute, LoginRoute} from './paths';
import Home from 'views/Home/Home';
import Shop from 'views/Shop/Shop';
import Register from 'views/Register/Register';
import Verify from 'views/Verify/Verify';
import Logout from 'views/Logout/Logout';
import Login from 'views/Login/Login';

const routes = [
    {path: IndexRoute, Component: Home},
    {path: ShopRoute, Component: Shop},
    {path: RegisterRoute, Component: Register},
    {path: VerifyRoute, Component: Verify},
    {path: LogoutRoute, Component: Logout},
    {path: LoginRoute, Component: Login}
]

export default routes;