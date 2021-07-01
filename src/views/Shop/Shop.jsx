import React, {useState, useEffect} from 'react';
import Filters from './Filters';
import Products from './Products';

function Shop() {

    const [filters, setFilters] = useState(null);

    return (
        <div className='shop'>
            <Filters filterize={(newFilters) => setFilters(newFilters)}/>
            {
                filters &&
                <Products filters={filters}/>
            }
        </div>
    )
}

export default Shop
