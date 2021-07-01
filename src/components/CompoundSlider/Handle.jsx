import React from 'react';
import {Box, useToken, Text} from '@chakra-ui/react';

function Handle({handle: {id, value, percent}, getHandleProps}) {

    const [primary] = useToken('colors', ['primary.200']);

    const handleStyles = {
        borderRadius: '50%',
        cursor: 'pointer',
        background: primary,
        width: "20px",
        height: "20px",
        left: `${percent}%`,
        position: 'absolute',
        marginLeft: -2.5,
        marginTop: -2,
        zIndex: 5
    }

    return (
        <Box 
            {...handleStyles}
            {...getHandleProps(id)} 
        />
    )
}

export default Handle
