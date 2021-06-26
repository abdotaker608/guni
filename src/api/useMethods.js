import React from 'react';
import {useSelector} from 'react-redux';
import {BaseUrl} from './index';

function useMethods() {

    const user = useSelector(state => state.auth);

    const handleResponse = async (res) => {
        try {
            const json = res.json();
            return json;
        }
        catch(e) {
            return null;
        }
    }

    const get = async (endpoint, kwargs, params) => {
        let queryString = '';
    
        if (params) {
            let index = 0;
            for (const [key, value] of Object.entries(params)) {
                if (value) {
                    queryString += `${index === 0 ? '?' : '&'}${key}=${value}`;
                    index += 1;
                }
            }
        }
    
        if (kwargs) {
            for (const [key, value] of Object.entries(kwargs)) {
                endpoint = endpoint.replace(key, value);
            }
        }

        const response = await fetch(`${BaseUrl}${endpoint}${queryString}`, {
            headers: {
                'Authorization': `Token ${user?.auth_token}`
            }
        })
        
        return handleResponse(response);
    }

    return {
        get
    }
}

export default useMethods
