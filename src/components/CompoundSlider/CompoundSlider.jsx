import React, {useState} from 'react';
import {Rail, Tracks, Handles, Slider} from 'react-compound-slider';
import {Box, useToken, Text} from "@chakra-ui/react";
import Handle from './Handle';
import Track from './Track';

function CompoundSlider({max, min, values, onChange}) {

    const [primary] = useToken('colors', ['primary.200']);

    const defaultDomain = [min || 0, max || 100];

    const [currentValues, setCurrentValues] = useState(defaultDomain);

    const sliderStyles = {
        position: 'relative',
        width: '100%',
    }

    const railStyles = {
        position: 'absolute',
        width: '100%',
        height: "5px",
        borderRadius: 5,
        backgroundColor: primary
    }

    const handleChange = (val) => {
        onChange(val);
    } 

    const handleSlide = (val) => {
        setCurrentValues(val);
    }


    return (
        <Slider
            className='price-slider'
            step={1}
            mode={2}
            domain={defaultDomain}
            values={values || defaultDomain}
            rootStyle={sliderStyles}
            onChange={handleChange}
            onUpdate={handleSlide}
        >
            <Rail>
                {({getRailProps}) => (
                    <Box {...railStyles} {...getRailProps()} />
                )}
            </Rail>
            <Handles>
                {({handles, getHandleProps}) => (
                    <Box>
                        {
                            handles.map(handle => (
                                <Handle handle={handle} getHandleProps={getHandleProps} key={handle.id} />
                            ))
                        }
                    </Box>
                )}
            </Handles>
            <Tracks left={false} right={false}>
                {({tracks, getTrackProps}) => (
                    <Box>
                        {
                            tracks.map(({source, target, id}) => (
                                <Track key={id} source={source} target={target} getTrackProps={getTrackProps}/>
                            ))
                        }
                    </Box>
                )}
            </Tracks>
            <Box d="flex" justifyContent="space-between" pt={3} color="silver">
                <Text>{currentValues[0]}$</Text>
                <Text>{currentValues[1]}$</Text>
            </Box>
        </Slider>
    )
}

export default CompoundSlider
