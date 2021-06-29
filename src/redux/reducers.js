import {createReducer} from '@reduxjs/toolkit';
import {addToCart, saveToWishlist, loginUser, verifyToken, logoutUser} from './actionCreators';

//Authentication
export const AuthReducer = createReducer(null, {
    [loginUser]: (state, action) => {
        state = action.payload;
        window.localStorage.setItem('auth', action.payload.auth_token);
        return state;
    },
    [verifyToken.fulfilled]: (state, action) => {
        state = action.payload;
        return state;
    },
    [logoutUser]: (state) => {
        state = null;
        window.localStorage.removeItem('auth');
        return state;
    }
})

//Cart
const storageCart = window.localStorage.getItem('cart');
const initialCart = storageCart ? JSON.parse(storageCart) : [];
export const CartReducer = createReducer(initialCart, {
    [addToCart]: (state, action) => {
        const target = state.find(item => item.id === action.payload.id);
        if (target) {
            if (action.payload.qty > 0) {
                state = [...state.filter(item => item.id !== target.id), action.payload];
            }
            else state = state.filter(item => item.id !== target.id);
            
        }
        else state = [...state, action.payload];
        window.localStorage.setItem('cart', JSON.stringify(state));
        return state;
    }
})

//Wishlist
const storageWl = window.localStorage.getItem('wl');
const initialWl = storageWl ? JSON.parse(storageWl) : [];
export const WishListReducer = createReducer(initialWl, {
    [saveToWishlist]: (state, action) => {
        state = [...state, action.payload];
        window.localStorage.setItem('wl', JSON.stringify(state));
        return state;
    }
})