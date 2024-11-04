import Place from '@/components/shared/place';
import SwiperHero from '@/components/shared/swiper-hero';
import React from 'react';
import Recommunded from '../../../sections/recommunded';
import MiniNav from '@/components/shared/mini-nav';
import ScenicPlace from '../_components/scenic-place';
import HotelView from '../_components/hotel-view';
import CottageAll from '../cottage/page';
import RecentlyCottage from '@/sections/recently-cottage';

const Home = () => {
    return (
        <div className='max-w-6xl min-h-[40vh] mx-auto'>
            <section className="hero">
                <SwiperHero/>
            </section>
            <section className="place">
                <Place/>
            </section>
            <section className='hotel'>
                <HotelView/>
            </section>           
            <section className="recommended">
                <Recommunded/>
            </section>
            <section>
                <ScenicPlace/>
            </section>
            <section>
                <RecentlyCottage/>
            </section>
            <MiniNav/>
        </div>
    );
};

export default Home;