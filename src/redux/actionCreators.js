import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {ADD_TO_CART, SAVE_TO_WISHLIST, LOGIN_USER, VERIFY_TOKEN, LOGOUT_USER} from './actions';
import {BaseUrl} from 'api/index';

export const addToCart = createAction(ADD_TO_CART);
export const saveToWishlist = createAction(SAVE_TO_WISHLIST);
export const loginUser = createAction(LOGIN_USER);
export const logoutUser = createAction(LOGOUT_USER);

//Thunks
export const verifyToken = createAsyncThunk(VERIFY_TOKEN, async (thunkAPI) => {
    const token = window.localStorage.getItem('auth');
    const response = await fetch(`${BaseUrl}/auth/token/verify`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
        .catch(() => thunkAPI.rejectWithValue());
    
    try {
        const json = await response.json();
        if (json.pk) return json;
        thunkAPI.rejectWithValue();
    }
    catch(e) {
        thunkAPI.rejectWithValue();
    }
})
