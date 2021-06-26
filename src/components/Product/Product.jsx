import React, {useEffect} from 'react';
import {Box, Image, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Button} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import {ProductRoute} from 'router/paths';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart, saveToWishlist} from 'redux/actionCreators';
import SalesBanner from 'dist/images/banners.svg';

function Product({product, location}) {

    const cart = useSelector(state => state.cart);
    const wishlist = useSelector(state => state.wishlist);
    const dispatch = useDispatch();

    const qty = cart.find(item => item.id === product.id)?.qty || 0;
    const inWishlist = wishlist.find(item => item.id === product.id);

    const handleQtyChange = (val) => {
        dispatch(addToCart({...product, qty: val}));
    }
    
    return (
        <Box width="180px">
            <Link to={ProductRoute.replace(':id', product.id)}>
                <Box position='relative'>
                    <Image src={product.image} height="180px" rounded={10} transition="150ms ease-out" boxShadow="0 0 5px 1px transparent" _hover={{boxShadow: '0 0 5px 1px crimson'}}/>
                    {
                        product.on_sale &&
                        <Box position='absolute' transform="rotate(45deg)" width="60px" height="35px" right={-3} top={0}>
                            <Image src={SalesBanner} />
                        </Box>
                    }
                </Box>
            </Link>
            <Link to={ProductRoute.replace(':id', product.id)}>
                <Text textAlign="center" fontSize={18} paddingTop="5px" transition="150ms ease-out">{product.name}</Text>
            </Link>
            <Box d="flex" justifyContent="space-around">
                {
                    product.on_sale &&
                    <Text color="gray" textDecoration="line-through">{product.original_price.toFixed(2)}$</Text>
                }
                <Text color="gray">{product.price.toFixed(2)}$</Text>
            </Box>
            <Slider value={qty} onChange={handleQtyChange}>
                <SliderTrack>
                    <SliderFilledTrack bg="primary.200"/>
                </SliderTrack>
                <SliderThumb />
            </Slider>
            {
                location !== 'wishlist' &&
                <Box>
                    <Box textAlign="center">{qty} in Cart</Box>
                    <Button minW="100%" colorScheme="pink" marginTop="5px" size='sm' onClick={() => dispatch(saveToWishlist(product))} disabled={inWishlist}>
                        {inWishlist ? 'In Wishlist' : 'Save to Wishlist'}
                    </Button>
                </Box>
            }
        </Box>
    )
}

export default Product
