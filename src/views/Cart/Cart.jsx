import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {ShopRoute} from 'router/paths';
import Product from 'components/Product/Product';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js";
import CheckoutForm from './CheckoutForm';

function Cart() {

    const stripe = loadStripe("pk_test_xy1ryzsG0fPh9zBsF5C75Msp00ElOcEff0");

    const user = useSelector(state => state.auth);
    const cart = useSelector(state => state.cart);

    const [open, setOpen] = useState(false);

    const calculateTotalPrice = () => {
        const total = cart.map(item => item.qty * item.price).reduce((acc, val) => acc + val, 0);
        return total.toFixed(2);
    }

    return (
        <div className='cart'>
            <CSSTransition classNames='scale' timeout={300} unmountOnExit in={cart.length > 0}>
                <div className='cart-container'>
                    {
                        user ?
                        <button onClick={() => setOpen(true)}>Proceed to Checkout ({calculateTotalPrice()}$)</button>
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
            <CSSTransition classNames='fade' timeout={300} unmountOnExit in={open}>
                <Elements stripe={stripe}>
                    <CheckoutForm cart={cart} user={user} totalPrice={calculateTotalPrice()} closeModal={() => setOpen(false)}/>
                </Elements>
            </CSSTransition>
        </div>
    )
}

export default Cart
