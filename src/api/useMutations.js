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
    
    return {
        registerUser,
        verifyUser,
        loginUser
    }

}

export default useMutations
