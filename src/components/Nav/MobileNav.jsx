import React, {useRef, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';

function MobileNav({routes, packs}) {

    const sideMenuRef = useRef(null);

    const location = useLocation();

    const toggleMenu = () => {
        sideMenuRef.current.classList.toggle('hidden');
    }

    useEffect(() => {
        if (!sideMenuRef.current.classList.contains('hidden')) toggleMenu();
    }, [location])

    return (
        <nav className='mob-nav'>
            <div className='content'>
                <div className='packs'>
                    {
                        packs.map(({pack, path, Icon}) => (
                            <Link key={path} to={path}>
                                <span className='counter'>{pack.length}</span>
                                <Icon size={38}/>
                            </Link>
                        ))
                    }
                 </div>
                <div className='bars' onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className='side-menu hidden' ref={ref => sideMenuRef.current = ref} tabIndex={0}>
                {
                    routes.map(({path, Icon, title}) => (
                        <Link key={path} to={path}>
                            <Icon size={26}/>
                            <span>{title}</span>
                        </Link>
                    ))
                }
            </div>
        </nav>
    )
}

export default MobileNav
