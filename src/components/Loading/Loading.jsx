import React from 'react';
import {Box, CircularProgress} from "@chakra-ui/react";

function Loading({minHeight=200, background="none"}) {
    return (
        <Box minHeight={`${minHeight}px`} width="100%" display="flex" alignItems="center" justifyContent="center" background={background}>
            <CircularProgress color="primary.500" trackColor="transparent" isIndeterminate size={8}/>
        </Box>
    )
}

export default Loading
