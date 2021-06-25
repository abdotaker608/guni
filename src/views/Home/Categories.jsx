import React from 'react';
import {Box} from "@chakra-ui/react";

function Categories() {

    const Cards = [
        {src: require('dist/images/sales.jpg').default, title: 'Sales & Bargains'},
        {src: require('dist/images/money.jpg').default, title: 'Easy Payments'},
        {src: require('dist/images/woman-shopping.jpg').default, title: 'Variety of Cateogries'}
    ]

    return (
        <section className='section__categories'>
            <div className='cards-container'>
                {
                    Cards.map(({src, title}, index) => (
                        <Box key={index} className='card' backgroundImage={`url(${src})`} backgroundSize="cover" backgroundRepeat="no-repeat" backgroundPosition="center" borderRadius="15px">
                            <Box borderRadius="15px" height="100%" width="100%" background='rgba(0, 0, 0, .5)' color="white" padding="10px" d="flex" justifyContent="center" alignItems="center" textAlign="center">
                                <h3>{title}</h3>
                            </Box>
                        </Box>
                    ))
                }
            </div>
        </section>
    )
}

export default Categories
