import React, {useState} from 'react';
import useQueries from 'api/useQueries';
import Slider from 'react-slick';
import useQuery from 'hooks/useQuery';
import Product from 'components/Product/Product';
import Loading from 'components/Loading/Loading';
import {Box, Center} from "@chakra-ui/react";
import Arrow from 'components/Arrow/Arrow';

function HotItems() {

    const {getProducts} = useQueries();

    const [params] = useState({hot: true});

    const {data: products, loading, error} = useQuery(getProducts, params);
    
    return (
        <section className='section__hot'>
            {
                loading ?
                <Loading />
                :
                (
                    error ?
                    <p className='text-danger text-center py-5 px-3'>{error}</p>
                    :
                    <Box>
                        <Box paddingBottom="30px" textAlign="center" color="gray.600">
                            <h3>Hot &amp; New</h3>
                        </Box>
                        <Box paddingInline="30px" pos='relative'>
                            <Slider
                                slidesToShow={5}
                                slidesToScroll={2}
                                speed={500}
                                arrows
                                prevArrow={<Arrow dir="left" />}
                                nextArrow={<Arrow dir="right" />}
                                swipeToSlide
                                responsive={[
                                    {
                                        breakpoint: 1100,
                                        settings: {
                                            slidesToShow: 4,
                                            slidesToScroll: 1
                                        }
                                    },
                                    {
                                        breakpoint: 992,
                                        settings: {
                                            slidesToShow: 3,
                                            slidesToScroll: 1
                                        }
                                    },
                                    {
                                        breakpoint: 768,
                                        settings: {
                                            slidesToShow: 2,
                                            slidesToScroll: 1
                                        }
                                    },
                                    {
                                        breakpoint: 576,
                                        settings: {
                                            slidesToShow: 1,
                                            slidesToScroll: 1
                                        }
                                    }
                                ]}
                                style={{position: 'static'}}
                            >
                                {
                                    products.map(product => (
                                        <Box key={product.id} paddingBlock="15px">
                                            <Center>
                                                <Product product={product} />
                                            </Center>
                                        </Box>
                                    ))
                                }
                            </Slider>
                        </Box>
                    </Box>
                )
            }
        </section>
    )
}

export default HotItems
