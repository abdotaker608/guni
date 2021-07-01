import React, {useEffect, useState} from 'react';
import useQuery from 'hooks/useQuery';
import useQueries from 'api/useQueries';

function Products({filters}) {

    const {getFilteredProducts} = useQueries();

    const {data: products, loading, error} = useQuery(getFilteredProducts, filters);

    return (
        <div className='products-container'>
            
        </div>
    )
}

export default Products
