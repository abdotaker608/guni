import React from 'react'

function useSearch() {
    
    const URLSearch = new URLSearchParams(window.location.search);

    let search = {};

    for (const [key, value] of URLSearch) {
        search[key] = value;
    }

    return search;
}

export default useSearch
