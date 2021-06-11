import {extendTheme} from '@chakra-ui/react';
import {createBreakpoints} from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
})

const colors = {
    primary: {
        500: 'crimson' 
    }
}

const theme = extendTheme({breakpoints});
export default theme;