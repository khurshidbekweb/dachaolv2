'use client'

import UserDacha from '@/components/card/user-dacha';
import BreacdCrambs from '@/components/shared/breacd-crambs';
import MiniNav from '@/components/shared/mini-nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AddNewPageLanguage, signInLanguage } from '@/constants/language';
import { cn } from '@/lib/utils';
import { ALL_DATA } from '@/Query/get_all';
import useLanguageStore from '@/store/language-provider';
import { cottage, cottageTop, order } from '@/types';
import { safeLocalStorage } from '@/utils/safeLocalstorge';
import { userUtils } from '@/utils/user.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HousePlus,  PenLineIcon, Pointer } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import userAvatar from '@/assets/user-avater.png'
import { IMG_BASE_URL } from '@/constants/server';
import { QUERY_KEYS } from '@/Query/query-keys';
import Link from 'next/link';

async function getBase64Full(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
    });
}
type activeView = 'profile' | 'cottage' | 'services'

const Profile = () => {
    const {t} = useTranslation()
    const userData = ALL_DATA.useSingleUser();
    const user = JSON.parse(safeLocalStorage.getItem("user"));
    const { language } = useLanguageStore();
    const userImg = userData?.data?.image;
    const [active, setActive] = useState<activeView>('profile')
    const userCottage = ALL_DATA.useCottageUser()?.data; 
    const orders = user?.orders      
    const [name, setName] = useState(user?.name)    
    const [changeData, setChangeData] = useState(true)
    const queryClinet = useQueryClient()
    
    const userEdit = useMutation({
        mutationFn: userUtils.editUser,
        onSuccess: async () => {
            queryClinet.invalidateQueries({queryKey: [QUERY_KEYS.users]})
            toast.success(signInLanguage.successLogin[language]);
            localStorage.setItem("user", JSON.stringify(userData?.data));
        },
        onError: (err) => {
            console.log(err, 'aaaa');
        }
    });

    const handleUser = () => { 
        userEdit.mutate({
            id: user?.id,
            name: name,
            image: userImg,
        });
    };

    const handleIsMianImage = (e) => {
        e.preventDefault()

        userEdit.mutate({
            id: user?.id,
            image: e.target.files[0],
            name: name ? name : ''
        });
    };    

    return (
        <>
        <div className='max-w-6xl mx-auto px-3 md:px-1 md:min-h-[60vh]'>
            <div className="min-h-[20vh] flex flex-col justify-end items-start">
                <BreacdCrambs data={[{ slug: '', title: t('nav_home') }]} page={`${t('nav_profile')}`} />
                <h2 className='text-2xl md:text-3xl font-createRound'>{t('nav_profile')}</h2>
            </div>
            <div className="mt-10 flex flex-col md:flex-row md:items-start gap-5">
                <ul className="w-full h-[50px] my-3 md:space-y-5 md:max-w-[250px] md:h-[150px] flex md:flex-col items-center md:items-start justify-between dark:bg-secondary bg-slate-300 rounded-md p-3">
                    <li onClick={() =>setActive('profile')} className={cn('cursor-pointer p-1 px-2', active=='profile' && 'text-white bg-gray-400 rounded-md')}>{t('nav_profile')}</li>
                    <li onClick={() =>setActive('cottage')} className={cn('cursor-pointer p-1 px-2', active=='cottage' && 'text-white bg-gray-400 rounded-md')}>{t("profile_e'lonlarim")}</li>
                    <li onClick={() =>setActive('services')} className={cn('cursor-pointer p-1 px-2', active=='services' && 'text-white bg-gray-400 rounded-md')}>{t('foydalangan_service')}</li>
                </ul>
                {active==='profile' && <div className='md:w-[40vw]'>
                    <div className="w-full flex flex-col space-y-3 items-center md:flex-row gap-2 md:gap-x-14 md:items-start">
                        <div className="!w-[120px] !h-[120px] relative flex items-center justify-center">
                            <Image
                                className={"!w-[130px] flex justify-center items-center h-[120px] relative border border-separate rounded-full overflow-hidden"}
                                src={userImg ? `${IMG_BASE_URL}${userImg}` : userAvatar}
                                alt="useImg"
                                sizes="120px"
                                width={120}
                                height={120}                           
                            />      
                            <label className="absolute text-black bg-red-300 right-0 bottom-0 rounded-full z-20 p-[2px] cursor-pointer">
                                <input
                                    onChange={(e)=> handleIsMianImage(e)}
                                    type="file"
                                    accept="image/*"
                                    name="userImage"
                                    className="w-1 h-1 opacity-0 absolute curson-pointer"
                                />
                                <PenLineIcon size={25} className='mx-auto'/>                        
                        </label>                      
                        </div>                        
                        <div className="p-1 w-full md:flex-1 space-y-3">
                            <Input  type='text' onChange={(e) =>{
                                setName(e.target.value)
                                setChangeData(false)
                                }} 
                                placeholder={`${t('form_name')}`} className='' defaultValue={user?.name ? user.name : ""}/>
                            <Input type='tel' placeholder='Phone' className='' defaultValue={"+998" + user?.phone} disabled/>
                            <Button disabled={changeData} onClick={handleUser} type='button' className='flex items-start w-[150px] hover:bg-green-700 bg-green-600 text-white'>{t('save')}</Button>
                        </div>
                    </div>
                </div>
                }
                {active === 'cottage' && <div>
                    <h2 className='text-xl md:text-2xl font-createRound'>Mening dachalarim</h2>
                    <div className="w-full mt-5 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                    {userCottage?.length ? userCottage.map((dacha: cottage) => (
                        <UserDacha key={dacha.id} {...dacha}/>
                    )): 
                    <div className='border w-[370px] mt-4 border-red-400 p-2 rounded-md  bg-yellow-200 flex flex-col space-y-3'>
                        <p className="text-black">{t('my_annonim')} </p>
                        <div className="flex gap-3">
                            <Link className='text-blue-500 underline inline-block' href={'/add-new'}>{t("profile_e'lonlar")} </Link><HousePlus className='text-blue-500' size={20}/>
                        </div>
                    </div>
                    }
                    </div>
                </div>
                }
                {active ==='services' && <div>
                    <h2>{t('foydalangan_service')}</h2>
                    <Table className='min-w-[540px] md:min-w-[720px] overflow-x-scroll'>
                        {!orders?.length && <TableCaption className=''><Link className='text-blue-500 underline text-[18px]' href={'/services'}>{t('not_servise')} <Pointer className='text-yellow-300'/></Link> </TableCaption>}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Nomi</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {orders && orders.map((order: order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.cottage.name}</TableCell>
                                    <TableCell> <p className={`${order.status=='active'?'bg-green-400':'bg-red-400'} text-white  rounded-md p-2 text-center text-ellipsis capitalize`}>{order.status}</p> </TableCell>
                                    <TableCell>
                                        <p className='text-[14px] font-workSans'>Days: {order.tariff.days} kun</p>
                                        <p className='text-[14px] font-workSans'>Price: {order.tariff.price} so`m</p>                                        
                                    </TableCell>
                                    <TableCell className="text-right">
                                    <p className='text-[14px] font-workSans text-green-500'>Boshlanish: {order.createdAt.slice(0,10)}</p>
                                    <p className='text-[14px] font-workSans text-red-500'>Tugash: {order.expireAt.slice(0,10)}</p>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                }
            </div>
        </div>
        <MiniNav/>
        </>
    );
};

export default Profile;