import Image from 'next/image';
import React from 'react';
import loading from '@/assets/loading.gif'
const Loading = () => {
    return (
        <div className='col-span-full'>
            <Image className='md:w-[250px] mx-auto' alt='loading' src={loading} />
        </div>
    );
};

export default Loading;