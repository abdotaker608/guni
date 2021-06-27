import React from 'react';
import {CircularProgress} from "@chakra-ui/react";

function CSpinner() {
    return (
        <CircularProgress color="white" trackColor="transparent" isIndeterminate size={5}/>
    )
}

export default CSpinner
