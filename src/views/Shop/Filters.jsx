import React, {useState, useEffect, useRef} from 'react';
import {Input, Checkbox, Button} from "@chakra-ui/react";
import PriceSlider from 'components/CompoundSlider/CompoundSlider';
import {ProductCategories} from 'api/index';
import {Form} from 'react-bootstrap';
import {RiFilterOffFill as FilterOffIcon} from 'react-icons/ri';
import useSearch from 'hooks/useSearch';

function Filters({filterize}) {

    const {search: searchQuery} = useSearch();

    const initialFilters = {price__lte: 5000, price__gte: 0, page: 1};
    const [filters, setFilters] = useState({...initialFilters, search: searchQuery});

    const [lastClear, setLastClear] = useState(null);

    const filtersForm = useRef(null);

    const [search, setSearch] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);

    const handleSearchChange = (e) => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        if (e.target.value) {
            const timeout = setTimeout(() =>  setSearch(e.target.value), 300);
            setSearchTimeout(timeout);
        }
        else {
            setFilters({...filters, search: ''});
        }
    }

    const handlePriceFilterChange = (valArr) => {
        const [min, max] = valArr;
        setFilters({...filters, price__gte: min, price__lte: max});
    }

    const handleCatChange = (e) => {
        if (e.target.checked) {
            setFilters({...filters, [e.target.name]: e.target.value});
        }
    }

    const handleCheckChange = (e) => {
        setFilters({...filters, [e.target.name]: e.target.checked});
    }

    const resetFilters = () => {
        setFilters(initialFilters);
        filtersForm.current.reset();
        setLastClear(Date.now());
    }

    useEffect(() => {
        filterize({...filters, page: 1});
    }, [filters])

    useEffect(() => {
        if (search) {
            setFilters({...filters, search});
        }
    }, [search])

    return (
        <form className='filters' ref={target => filtersForm.current = target}>
            <Input placeholder="Search here.." onChange={handleSearchChange} focusBorderColor="primary.200" type="search" defaultValue={searchQuery}/>
            <div className='ps'>
                <Form.Check onChange={handleCheckChange} label="On Sale" name="on_sale" />
                <PriceSlider key={lastClear} values={[0, 5000]} min={0} max={5000} onChange={handlePriceFilterChange}/>
            </div>
            <div>
                <Button onClick={resetFilters} colorScheme="red" width="100%"><FilterOffIcon size={25}/></Button>
            </div>
            <Form.Group className='categories'>
                {
                    ProductCategories.map((cat, index) => (
                        <Form.Check key={index} type="radio" value={index} label={cat} name="category" onChange={handleCatChange}/>
                    ))
                }
            </Form.Group>
        </form>
    )
}

export default Filters
