import React, {useState} from 'react';
import {Box, Button} from '@chakra-ui/react';
import {Form} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {ShopRoute} from 'router/paths';

function Header() {

    const [search, setSearch] = useState("");

    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        if (search) {
            history.push(`${ShopRoute}?search=${search}`);
        }
    }

    return (
        <header>
            <h1>Gu<Box as="span" color='primary.500'>N</Box>i</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='input-container'>
                    <Form.Control placeholder="Search Anything..." required onChange={e => setSearch(e.target.value)}/>
                    <Button type="submit">Go</Button>
                </Form.Group>
            </Form>
        </header>
    )
}

export default Header
