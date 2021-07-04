import React from 'react';
import useQuery from 'hooks/useQuery';
import useQueries from 'api/useQueries';
import Loading from 'components/Loading/Loading';
import Product from 'components/Product/Product';
import Paginator from 'components/Paginator/Paginator';
import {Box} from "@chakra-ui/react";

function Products({filters, changePage}) {

    const {getFilteredProducts} = useQueries();

    const {data, loading, error} = useQuery(getFilteredProducts, filters);
    
    const handlePageChange = (p) => changePage(p);

    return (
        <div className='products-container'>
            {
                loading ?
                <Loading minHeight={400}/>
                :
                (
                    error ?
                    <div className='text-danger text-center px-2 err-msg'>
                        <p>{error}</p>
                    </div>
                    :
                    (
                        data.results?.length > 0 ?
                        <div className='products'>
                            {
                                data.results?.map(product => (
                                    <Product key={product.id} product={product} />
                                ))
                            }
                        </div>
                        :
                        <p className='text-center text-secondary px-2 err-msg'>No results found.</p>
                    )
                )
            }
            <Box display={(loading || error || data?.results?.length < 1) ? 'none' : 'flex'} className='py-5 justify-content-center align-items-center'>
                <Paginator current={filters.page} total={data?.total} onChange={handlePageChange}/>
            </Box>
        </div>
    )
}

export default Products
