import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {AuthReducer, CartReducer, WishListReducer} from './reducers';

const reducer = {
    auth: AuthReducer,
    cart: CartReducer,
    wishlist: WishListReducer
}
const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware()],
});

export default store;