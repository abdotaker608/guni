import React from 'react';
import useMethods from './useMethods';

function useMutations() {

    const {post} = useMethods();

    const registerUser = async (registerData) => {
        const response = await post('/auth/register', registerData);
        return response;
    }

    const verifyUser = async (token) => {
        const response = await post('/auth/verify', {token});
        return response;
    }
    
    const loginUser = async (loginData) => {
        const response = await post('/auth/login', loginData);
        return response;
    }

    const createPaymentIntent = async (totalPrice) => {
        const response = await post('/product/intent', {total_price: totalPrice});
        return response;
    }

    const createOrder = async (userId, intentId, items, totalPrice) => {
        const response = await post('/product/order', {user_id: userId, intent_id: intentId, items, total_price: totalPrice});
        return response;
    }
    
    return {
        registerUser,
        verifyUser,
        loginUser,
        createPaymentIntent,
        createOrder
    }

}

export default useMutations
