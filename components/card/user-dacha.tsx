import { IMG_BASE_URL } from '@/constants/server';
import { comfort, cottage, cottageTop, image } from '@/types';
import Image from 'next/image';
import React from 'react';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SwiperNavBotton from '../shared/swiper-nav-botton';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import CottageEditImg from '../modal/cottage-edit-img';
import CottageEdit from '../modal/cottage-edit';
import { useTranslation } from 'react-i18next';

const UserDacha = (dacha: cottage) => {   
    const {t} = useTranslation()
console.log(dacha);

    return (
        <div className='relative max-w-[170px] mx-auto bg-[#ffff] dark:bg-[#161f309c] md:ml-0 md:max-w-[280px] border group shadow-lg rounded-md overflow-hidden'>
            <Link href={`/view/${dacha.id}`}>
                <div className="relative">
                    <Swiper
                        pagination={{
                            type: 'fraction',
                        }}
                        modules={[Pagination, Navigation, A11y]}
                        className="swiper"
                    >
                        {
                            dacha && dacha?.images.map((img: image) => (
                                    <SwiperSlide className='!h-[140px] !md:h-[240px]' key={img.id}>
                                        <Image className='w-full h-[140px] md:h-[210px] object-cover' sizes='(max-width: 300px)' width={300} height={250} src={`${IMG_BASE_URL}${img.image}`} alt={img.id} />
                                    </SwiperSlide>
                            ))
                        }
                        <SwiperNavBotton />
                    </Swiper> 
                </div>
                <div className="dacha-info p-2">
                    <div className="flex justify-between items-center">
                        <h2 className='text-[16px] md:text-xl font-createRound'>{dacha.name}</h2>
                        <p className='font-createRound text-xl text-yellow-400'>{dacha.price}$</p>
                    </div>
                    <div className="flex gap-x-4 items-start space-y-2 flex-col md:flex-row md:items-center">
                        <Badge variant='secondary'>{dacha.region.name}</Badge>
                        <Badge variant='secondary' className=''>{dacha.place.name}</Badge>
                    </div>
                    <div className="hidden md:flex md:gap-x-3 items-center mt-2">
                        {dacha?.cottageType[0].id === 'c4c301b1-4719-499e-bde2-2c36715fae9e' ? dacha.comforts.slice(0, 7).map((com: comfort) => (
                            <Image className=' bg-white rounded-md' width={20} sizes='(max-width: 20px)' height={20} key={com.id} src={`${IMG_BASE_URL}${com.image}`} alt={com.name} />
                        )):''}
                    </div>
                </div> 
            <span className={`w-full h-full absolute top-0 right-0 text-xl bg-[#3836369a] justify-center pt-4 font-semibold text-red-500 z-30 ${dacha?.cottageStatus=='progress'?'flex':'hidden'}`}>{t('progress')}...</span>
            </Link>
            <CottageEditImg id={dacha.id} images={dacha.images}/>
            <CottageEdit id={dacha.id} cottage ={dacha} />
        </div>
    );
};

export default UserDacha;