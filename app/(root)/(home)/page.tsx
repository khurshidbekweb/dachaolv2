import SwiperHero from '@/components/shared/swiper-hero';
import React from 'react';

const Home = () => {
    return (
        <div className='max-w-6xl min-h-[40vh] mx-auto'>
            <div className="hero">
                <SwiperHero/>
            </div>
        </div>
    );
};

export default Home;