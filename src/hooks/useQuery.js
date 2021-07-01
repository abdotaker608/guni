import React, {useEffect, useState} from 'react'

function useQuery(fetchCb, ...args) {

    const [query, setQuery] = useState({data: null, loading: true, error: ""});

    const fetchQueries = async () => {
        const response = await fetchCb(...args);
        if (response) setQuery({data: response, loading: false, error: ""});
        else setQuery({data: null, loading: false, error: "Couldn't load data, Please check your connection.."})
    } 

    useEffect(() => {
        fetchQueries();
    }, [...args])

    return {
        ...query,
        refetchQueries: fetchQueries
    }
}

export default useQuery
