import React, {useState} from 'react';
import {Form} from 'react-bootstrap';
import {Button, Text} from '@chakra-ui/react';
import CSpinner from 'components/CSpinner/CSpinner';
import useMutations from 'api/useMutations';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from 'redux/actionCreators';
import {IndexRoute} from 'router/paths';

function LoginForm() {

    const [loginData, setLoginData] = useState({});

    const [processing, setProcessing] = useState(false);

    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth);

    const {loginUser: loginMutation} = useMutations();

    const handleChange = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (processing) return;
        setProcessing(true);
        const response = await loginMutation(loginData);
        if (response?.id) {
            dispatch(loginUser(response));
        }
        else {
            const errorMsg = response?.error?.message || "Something went wrong..";
            setError(errorMsg);
        }
        setProcessing(false);
    }

    if (user) return <Redirect to={IndexRoute} />

    return (
        <Form onSubmit={handleSubmit}>
            {
                error &&
                <Form.Group className='pb-3 text-center text-danger'>
                    <Text>{error}</Text>
                </Form.Group>
            }
            <Form.Group className='my-3'>
                <Form.Control name='email' id='email' type='email' required placeholder='Email' onChange={handleChange}/>
            </Form.Group>
            <Form.Group className='my-3'>
                <Form.Control name='password' id='password' type='password' required placeholder='Password' onChange={handleChange}/>
            </Form.Group>
            <Form.Group className='mt-4 text-center'>
                <Button bg="primary.500" color="white" type="submit" isLoading={processing} spinner={<CSpinner />} transition="150ms ease-out" _hover={{bg: 'primary.200'}}>Login</Button>
            </Form.Group>
        </Form>
    )
}

export default LoginForm
