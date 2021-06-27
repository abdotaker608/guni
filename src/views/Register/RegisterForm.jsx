import React, {useState} from 'react';
import {Form, Row, Col, InputGroup} from 'react-bootstrap';
import {Button, Text} from '@chakra-ui/react';
import CSpinner from 'components/CSpinner/CSpinner';
import useMutations from 'api/useMutations';

function RegisterForm() {

    const {registerUser} = useMutations();
    const [registerData, setRegisterData] = useState({});
    const [processing, setProcessing] = useState(false);
    const [touched, setTouched] = useState({});
    const [status, setStatus] = useState({error: '', success: ''});

    const valid = {
        first_name: registerData.first_name,
        last_name: registerData.last_name,
        email: registerData.email?.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
        password: registerData.password?.length >= 8,
        confirm_password: registerData.confirm_password === registerData.password
    }
    const validate = () => {
        let validity = true;
        for (const val of Object.values(valid)) {
            if (!val) {
                validity = false;
                break;
            }
        }
        return validity;
    }

    const handleChange = (e) => {
        setRegisterData({...registerData, [e.target.name]: e.target.value});
    }

    const handleBlur = (e) => {
        setTouched({...touched, [e.target.name]: true});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const data = {...registerData};
        delete data.confirm_password;
        setProcessing(true);
        const response = await registerUser(data).catch(Boolean);
        setProcessing(false);
        if (response) {
            if (response.success) {
                setStatus({success: "All set, Please check your email address."});
                e.target.reset();
                setRegisterData({});
                setTouched({});
            }
            else if (response.error) setStatus({error: response.error.message});
            else setStatus({error: "Something went wrong. Please try again later.."});
        }
        else setStatus({error: "Something went wrong. Please try again later.."});
    }

    return (
        <Form noValidate onSubmit={handleSubmit}>
            {
                (status.error || status.success) &&
                <Row className='pb-4 text-center'>
                    <Text className={`text-${status.success ? 'success' : 'danger'}`}>{status.success || status.error}</Text>
                </Row>
            }
            <Row className='g-3'>
                <Col sm={12} md={6}>
                    <Form.Control id="first_name" name="first_name" placeholder="First Name" isInvalid={touched.first_name && !valid.first_name} onChange={handleChange} onBlur={handleBlur} isValid={touched.first_name && valid.first_name}/>
                </Col>
                <Col sm={12} md={6}>
                    <Form.Control id="last_name" name="last_name" placeholder="Last Name" isInvalid={touched.last_name && !valid.last_name} onChange={handleChange} onBlur={handleBlur} isValid={touched.last_name && valid.last_name}/>
                </Col>
            </Row>
            <Row className='mt-1 g-3'>
                <Col sm={12}>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control id="email" name="email" type="email" placeholder="Email" onChange={handleChange} onBlur={handleBlur} isInvalid={touched.email && !valid.email} isValid={touched.email && valid.email}/>
                    </InputGroup>
                </Col>
            </Row>
            <Row className='mt-1 g-3'>
                <Col sm={12} md={6}>
                    <Form.Control id="password" name="password" placeholder="Password" type="password" onChange={handleChange} onBlur={handleBlur} isInvalid={touched.password && !valid.password} isValid={touched.password && valid.password}/>
                </Col>
                <Col sm={12} md={6}>
                    <Form.Control id="confirm_password" name="confirm_password" placeholder="Confirm Password" type="password" onChange={handleChange} onBlur={handleBlur} isInvalid={touched.confirm_password && !valid.confirm_password} isValid={touched.confirm_password && valid.confirm_password}/>
                </Col>
            </Row>
            <Row className='mt-1 g-3'>
                <Col sm={12} className='text-center'>
                    <Button colorScheme="primary" type="submit" isLoading={processing} spinner={<CSpinner />}>Submit</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default RegisterForm
