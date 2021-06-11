import React from 'react';
import {Link} from 'react-router-dom';

function DesktopNav({routes, packs}) {
    return (
        <nav className='desktop-nav'>
            <div className='routes'>
                {
                    routes.map(({path, title}) => (
                        <Link key={path} to={path}>
                            <span>{title}</span>
                        </Link>
                    ))
                }
            </div>
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
        </nav>
    )
}

export default DesktopNav
