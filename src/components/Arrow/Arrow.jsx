import React from 'react';
import {FaAngleRight, FaAngleLeft} from 'react-icons/fa';
import {Button} from "@chakra-ui/react";

function Arrow({className, style, onClick, dir}) {

    return (
        <Button className={className} {...style} onClick={onClick} rounded="full" background="primary.200" color="white" padding="0" d="flex" alignItems="center" justifyContent="center" width="30px" filter="drop-shadow(0 0 5px transparent)" minWidth="unset" height="30px" left={dir === 'left' ? 2 : 'unset'} right={dir === 'right' ? 2 : 'unset'} position='absolute' top="50%" transform="translateY(-50%)" zIndex={50} transition="250ms ease-out" _hover={{background: 'white', color: 'primary.500', filter: 'drop-shadow(0 0 5px silver)'}}>
            <span className='dir'>
                {dir === 'left' ? <FaAngleLeft /> : <FaAngleRight />}
            </span>
        </Button>
    )
}

export default Arrow
