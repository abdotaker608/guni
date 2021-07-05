import React, {useState, useEffect} from 'react';
import {Form, Row, Col} from 'react-bootstrap';
import {useElements, useStripe, CardElement} from '@stripe/react-stripe-js';
import useMutations from 'api/useMutations';
import {useToast, Box, Button, CloseButton} from "@chakra-ui/react";
import CSpinner from 'components/CSpinner/CSpinner';
import {useDispatch} from 'react-redux';
import {emptyCart} from 'redux/actionCreators';

function CheckoutForm({cart, user, totalPrice, closeModal}) {

    const stripe = useStripe();
    const elements = useElements();
    
    const dispatch = useDispatch();

    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [paymentData, setPaymentData] = useState({});

    const [noShipping, setNoShipping] = useState(false);

    const toast = useToast();

    const {createPaymentIntent, createOrder} = useMutations();

    const handleChange = (e) => {
        setPaymentData({...paymentData, [e.target.name]: e.target.value});
    }
    
    const fetchPaymentIntent = async () => {
        const response = await createPaymentIntent(totalPrice);
        if (response?.clientSecret) setClientSecret(response.clientSecret);
        else {
            toast({
                description: "Some data didn't load properly, Application might not work as expected..",
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }
    }

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (processing) return;
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    address: {
                        country: 'EG',
                        line1: paymentData.line1_address,
                        line2: paymentData.line2_address,
                    },
                    name: `${user.first_name} ${user.last_name}`
                }
            },
            receipt_email: user.email,
            shipping: {
                address: {
                    country: 'EG',
                    line1: noShipping ? paymentData.line1_address : paymentData.shipping_address
                },
                name: `${user.first_name} ${user.last_name}`
            }
        });
        if (payload.paymentIntent) {
            await createOrder(user.id, payload.paymentIntent.id, cart, totalPrice);
            toast({
                title: "Payment Successfull!",
                description: "Your order is created and can be found under the orders tab.",
                status: 'success',
                duration: 3000,
                isClosable: false
            })
            setProcessing(false);
            closeModal();
            dispatch(emptyCart());
        }
        else {
            toast({
                title: "Payment Unsuccessful..",
                description: "Please use a different card or contact your card issuer.",
                status: 'error',
                duration: 3000,
                isClosable: false
            })
            setProcessing(false);
        }
    }

    useEffect(() => {
        fetchPaymentIntent();
    }, [])

    return (
        <Form id='checkout-form' onSubmit={handleCheckout}>
            <Row className='mb-3 d-flex justify-content-end'>
                <CloseButton onClick={closeModal} pos/>
            </Row>
            <Row className='gy-3'>
                <Col sm={12}>
                    <Form.Control name="line1_address" placeholder="Line 1 Address" required onChange={handleChange}/>
                </Col>
                <Col sm={12}>
                    <Form.Control name="line2_address" placeholder="Line 2 Address (optional)"  onChange={handleChange}/>
                </Col>
            </Row>
            <Row className='mt-1 gy-3'>
                {
                    !noShipping &&
                    <Col sm={12}>
                        <Form.Control name='shipping_address' placeholder="Shipping Address" required onChange={handleChange}/>
                    </Col>
                }
                <Col sm={12}>
                    <Form.Check className='text-secondary' style={{fontSize: '11pt'}} label="Line 1 Address is the shipping address" onChange={(e) => setNoShipping(e.target.checked)}/>
                </Col>
            </Row>
            <Row className='mt-4 text-center'>
                <h5>Billing Details</h5>
                <Box mt={8}>
                    <CardElement />
                </Box>
            </Row>
            <Row className='text-center mt-5'>
                <Button width="100%" colorScheme="green" type="submit" isLoading={processing} spinner={<CSpinner />}>Checkout ({totalPrice}$)</Button>
            </Row>
        </Form>
    )
}

export default CheckoutForm
