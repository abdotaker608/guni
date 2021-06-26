import {createAction} from '@reduxjs/toolkit';
import {ADD_TO_CART, SAVE_TO_WISHLIST} from './actions';

export const addToCart = createAction(ADD_TO_CART);
export const saveToWishlist = createAction(SAVE_TO_WISHLIST);