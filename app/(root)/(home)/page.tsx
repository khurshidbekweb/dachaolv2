import Place from '@/components/shared/place';
import SwiperHero from '@/components/shared/swiper-hero';
import React from 'react';
import Recommunded from '../../../sections/recommunded';
import MiniNav from '@/components/shared/mini-nav';

const Home = () => {
    return (
        <div className='max-w-6xl min-h-[40vh] mx-auto'>
            <section className="hero">
                <SwiperHero/>
            </section>
            <section className="place">
                <Place/>
            </section>
            <section className="recommended">
                <Recommunded/>
            </section>
            <MiniNav/>
        </div>
    );
};

export default Home;