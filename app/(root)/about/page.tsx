import BreacdCrambs from '@/components/shared/breacd-crambs';
import React from 'react';

const About = () => {
    return (
        <div className='max-w-6xl mx-auto px-3 md:px-1'>
            <div className="min-h-[20vh] flex flex-col justify-end items-start">
                <BreacdCrambs data={[{slug: '', title:'Home'}]} page="About"/>
                <h2 className='text-2xl md:text-3xl font-createRound'>About</h2>
            </div>
        </div>
    );
};

export default About;