import React from 'react';
import useMethods from './useMethods';

function useQueries() {

    const {get} = useMethods();
    
    const getProducts = async (params) => {
        const response = await get('/product', null, params);
        return response;
    }

    return {
        getProducts
    }

}

export default useQueries
