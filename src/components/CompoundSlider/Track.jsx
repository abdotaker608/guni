import React from 'react';
import {Box} from "@chakra-ui/react";

function Track({source, target, getTrackProps}) {

    const trackStyles = {
        position: 'absolute',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
        borderRadius: 5,
        height: '5px',
        background: 'silver'
    }

    return (
        <Box
            {...trackStyles}
            {...getTrackProps()}
        />
    )
}

export default Track
