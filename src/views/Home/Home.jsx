import React from 'react';
import Header from './Header';
import Categories from './Categories';
import HotItems from './HotItems';

function Home() {
    return (
        <div className='home'>
            <Header />
            <Categories />
            <HotItems />
        </div>
    )
}

export default Home
