import Place from '@/components/shared/place';
import SwiperHero from '@/components/shared/swiper-hero';
import React from 'react';
import Recommunded from '../../../sections/recommunded';
import MiniNav from '@/components/shared/mini-nav';
import ScenicPlace from '../_components/scenic-place';
import HotelView from '../_components/hotel-view';
import CottageAll from '../cottage/page';
import RecentlyCottage from '@/sections/recently-cottage';
import Loading from '@/components/loading/loading';

const Home = () => {
    return (
        <div className='max-w-6xl min-h-[40vh] mx-auto'>
            <section className="hero">
                <SwiperHero />
            </section>
            <Loading/>
            <section className="place mt-4 md:mt-6">
                <Place />
            </section>
            <section className='hotel mt-3 md:mt-5'>
                <HotelView />
            </section>
            <section className="recommended mt-4 md:mt-6">
                <Recommunded />
            </section>
            <section className='mt-4 md:mt-6'>
                <ScenicPlace />
            </section>
            <section className='mt-4 md:mt-6'>
                <RecentlyCottage />
            </section>
            <MiniNav />
        </div>
    );
};

export default Home;