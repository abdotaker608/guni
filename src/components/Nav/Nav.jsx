import React, {useEffect} from 'react';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import {IndexRoute, ShopRoute, CartRoute, WishListRoute, LoginRoute, RegisterRoute, LogoutRoute, OrdersRoute} from 'router/paths';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {BiHeart as HeartIcon, BiCartAlt as CartIcon} from 'react-icons/bi';
import {FaHome as HomeIcon, FaShoppingBag as ShopIcon, FaSignInAlt as SignInIcon, FaSignOutAlt as SignOutIcon, FaUserPlus as SignUpIcon, FaMoneyCheckAlt as OrderIcon} from 'react-icons/fa';

function Nav() {

    const history = useHistory();

    const cart = useSelector(state => state.cart);
    const wishlist = useSelector(state => state.wishlist);
    const user = useSelector(state => state.auth);

    const packs = [
        {pack: wishlist, path: WishListRoute, Icon: HeartIcon},
        {pack: cart, path: CartRoute, Icon: CartIcon}
    ]

    useEffect(() => {
        const unlisten = history.listen(() => window.scrollTo(0, 0));

        return unlisten;
    }, [])

    const authRoutes = user ? 
    [
        {path: OrdersRoute, Icon: OrderIcon, title: 'Orders'},
        {path: LogoutRoute, Icon: SignOutIcon, title: 'Logout'}
    ] :
    [
        {path: LoginRoute, Icon: SignInIcon, title: 'Login'},
        {path: RegisterRoute, Icon: SignUpIcon, title: 'Register'}
    ]

    const routes = [
        {path: IndexRoute, Icon: HomeIcon, title: 'Home'},
        {path: ShopRoute, Icon: ShopIcon, title: 'Shop'},
        ...authRoutes
    ]

    return (
        <>
            <MobileNav routes={routes} packs={packs} />
            <DesktopNav routes={routes} packs={packs}/>
        </>
    )
}

export default Nav
