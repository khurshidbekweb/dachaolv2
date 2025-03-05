import Image from 'next/image';
import React from 'react';
import loading from '@/assets/loading.gif'
const Loading = () => {
    return (
        <div className='flex justify-center'>
            <Image className='md:w-[250px]' alt='loading' src={loading} />
        </div>
    );
};

export default Loading;