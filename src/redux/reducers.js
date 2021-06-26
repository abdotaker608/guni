import {createReducer} from '@reduxjs/toolkit';
import {addToCart, saveToWishlist} from './actionCreators';

//Authentication
export const AuthReducer = createReducer(null, {

})

//Cart
export const CartReducer = createReducer([], {
    [addToCart]: (state, action) => {
        const target = state.find(item => item.id === action.payload.id);
        if (target) {
            if (action.payload.qty > 0) {
                state = [...state.filter(item => item.id !== target.id), action.payload];
            }
            else state = state.filter(item => item.id !== target.id);
            
        }
        else state = [...state, action.payload];
        return state;
    }
})

//Wishlist
export const WishListReducer = createReducer([], {
    [saveToWishlist]: (state, action) => state = [...state, action.payload]
})