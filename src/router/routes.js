import {IndexRoute, ShopRoute, RegisterRoute, VerifyRoute, LogoutRoute, LoginRoute, 
CartRoute, WishListRoute, OrdersRoute} from './paths';
import Home from 'views/Home/Home';
import Shop from 'views/Shop/Shop';
import Register from 'views/Register/Register';
import Verify from 'views/Verify/Verify';
import Logout from 'views/Logout/Logout';
import Login from 'views/Login/Login';
import Cart from 'views/Cart/Cart';
import Wishlist from 'views/Wishlist/Wishlist';
import Orders from 'views/Orders/Orders';

const routes = [
    {path: IndexRoute, Component: Home},
    {path: ShopRoute, Component: Shop},
    {path: RegisterRoute, Component: Register},
    {path: VerifyRoute, Component: Verify},
    {path: LogoutRoute, Component: Logout},
    {path: LoginRoute, Component: Login},
    {path: CartRoute, Component: Cart},
    {path: WishListRoute, Component: Wishlist},
    {path: OrdersRoute, Component: Orders}
]

export default routes;