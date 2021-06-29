import React, {useState, useEffect} from 'react';
import useSearch from 'hooks/useSearch';
import useMutations from 'api/useMutations';
import {CircularProgress, Box, Text} from '@chakra-ui/react';
import {FaCheck, FaTimes} from 'react-icons/fa';
import {useDispatch} from 'react-redux';
import {loginUser} from 'redux/actionCreators';
import {useHistory} from 'react-router-dom';
import {IndexRoute} from 'router/paths';

function Verify() {

    const [status, setStatus] = useState({
        processing: true,
        message: 'Verifying your email, Please wait..',
        type: ''});

    const {token} = useSearch();

    const {verifyUser} = useMutations();

    const dispatch = useDispatch();

    const history = useHistory();

    const handleVerify = async () => {
        const response = await verifyUser(token);
        if (response?.id) {
            setStatus({
                processing: false,
                message: "Your email is verified, Redirecting you...",
                type: 'success'
            });
            dispatch(loginUser(response));
            history.push(IndexRoute);
        }
        else {
            const errorMessage = response?.error?.message || "Something went wrong..";
            setStatus({
                processing: false,
                message: errorMessage,
                type: 'error'
            })
        }
    }

    useEffect(() => {
        handleVerify();
    }, [])

    return (
        <div className='verify'>
            <Box d="flex" alignItems="center" margin="0 auto" width="fit-content">
                {
                    status.processing ?
                    <>
                        <CircularProgress size={6} color="gray" trackColor="transparent" isIndeterminate/>
                        <Text color="gray" paddingInline="10px">{status.message}</Text>
                    </>
                    :
                    (
                        status.type === 'success' ?
                        <>
                            <FaCheck color="green" size={20}/>
                            <Text color="green" paddingInline="10px">{status.message}</Text>
                        </>
                        :
                        <>
                            <FaTimes color="crimson" size={20}/>
                            <Text color="crimson" paddingInline="10px">{status.message}</Text>
                        </>
                    )
                }
            </Box>
        </div>
    )
}

export default Verify
