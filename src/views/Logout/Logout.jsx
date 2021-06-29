import React, {useEffect} from 'react'
import {CircularProgress, Box, Text} from '@chakra-ui/react';
import {useDispatch} from 'react-redux';
import {logoutUser} from 'redux/actionCreators';
import {useHistory} from 'react-router-dom';
import {IndexRoute} from 'router/paths';

function Logout() {

    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch(logoutUser())
        history.push(IndexRoute);
    }

    useEffect(() => {
        handleLogout();
    }, [])

    return (
        <div className='logout'>
            <Box d="flex" alignItems="center" margin="0 auto" width="fit-content">
                <CircularProgress size={6} color="gray" trackColor="transparent" isIndeterminate/>
                <Text color="gray" paddingInline="10px">Logging you out..</Text>
            </Box>
        </div>
    )
}

export default Logout
