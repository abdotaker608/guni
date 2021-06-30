import React from 'react';
import {useSelector} from 'react-redux';
import Product from 'components/Product/Product';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

function Cart() {

    const wishlist = useSelector(state => state.wishlist);

    return (
        <div className='wishlist'>
            <CSSTransition classNames='scale' timeout={300} unmountOnExit in={wishlist.length > 0}>
                <div className='wishlist-container'>
                    <TransitionGroup className='products-container'>
                        {
                            wishlist.map(product => (
                                <CSSTransition key={product.id} classNames='scale' timeout={300}>
                                    <Product product={product} location="wishlist"/>
                                </CSSTransition>
                            ))
                        }
                    </TransitionGroup>
                </div>
            </CSSTransition>
            <CSSTransition classNames='scale' timeout={300} unmountOnExit in={wishlist.length <= 0}>
                <div className='text-center text-secondary py-5'>
                    <h5>Your wishlist is empty!</h5>
                </div>
            </CSSTransition>
        </div>
    )
}

export default Cart
