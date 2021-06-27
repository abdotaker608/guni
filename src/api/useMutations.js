import React from 'react';
import useMethods from './useMethods';

function useMutations() {

    const {post} = useMethods();

    const registerUser = async (registerData) => {
        const response = await post('/auth/register', registerData);
        return response;
    }
    
    return {
        registerUser
    }

}

export default useMutations
