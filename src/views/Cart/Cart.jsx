import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {ShopRoute} from 'router/paths';
import Product from 'components/Product/Product';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

function Cart() {

    const user = useSelector(state => state.auth);
    const cart = useSelector(state => state.cart);

    const calculateTotalPrice = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.qty * item.price;
        })
        return total.toFixed(2);
    }

    return (
        <div className='cart'>
            <CSSTransition classNames='scale' timeout={300} unmountOnExit in={cart.length > 0}>
                <div className='cart-container'>
                    {
                        user ?
                        <button>Proceed to Checkout ({calculateTotalPrice()}$)</button>
                        :
                        <button disabled>Login to Checkout ({calculateTotalPrice()}$)</button>
                    }
                    <TransitionGroup className='products-container'>
                        {
                            cart.map(product => (
                                <CSSTransition key={product.id} classNames='scale' timeout={300}>
                                    <Product product={product} />
                                </CSSTransition>
                            ))
                        }
                    </TransitionGroup>
                </div>
            </CSSTransition>
            <CSSTransition classNames='scale' timeout={300} unmountOnExit in={cart.length <= 0}>
                <div className='text-center text-secondary py-5'>
                    <h5>Your cart is empty!</h5>
                    <Link to={ShopRoute}>
                        <button className='empty'>Start Shopping</button>
                    </Link>
                </div>
            </CSSTransition>
        </div>
    )
}

export default Cart
