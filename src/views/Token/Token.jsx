import React, {useEffect, useState} from 'react';
import {PuffLoader} from 'react-spinners';
import {useDispatch} from 'react-redux';
import {verifyToken} from 'redux/actionCreators';
import {Box, useToken} from "@chakra-ui/react";

function Token() {

    const [verifying, setVerifying] = useState(true);

    const [primary] = useToken('colors', ["primary.500"])

    const dispatch = useDispatch();

    const postVerify = () => {
        document.body.style.overflowY = 'unset';
        setVerifying(false);
    }

    const handleVerify = () => {
        dispatch(verifyToken())
            .then(postVerify)
            .catch(postVerify);
    }

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        handleVerify();
    }, [])

    return (
        <>
            {
                verifying ?
                <Box height="100vh" width="100%" position='fixed' top={0} left={0} d="flex" alignItems="center" justifyContent="center" background="rgba(162, 166, 171, .7)" zIndex={1000}>
                    <PuffLoader color={primary}/>
                </Box>
                :
                <></>
            }
        </>
    )
}

export default Token
