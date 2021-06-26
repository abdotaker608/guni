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
        200: "#fa5c6f",
        500: 'crimson' 
    }
}

const styles = {
    global: {
        body: {
            fontFamily: "Crimson Text"
        },
        h1: {
            fontSize: "32pt"
        },
        h2: {
            fontSize: "26pt"
        },
        h3: {
            fontSize: "22pt"
        },
        h4: {
            fontSize: "20pt"
        },
        h5: {
            fontSize: "16pt"
        },
        h6: {
            fontSize: "14pt"
        }
    }
}

const theme = extendTheme({breakpoints, colors, styles});
export default theme;