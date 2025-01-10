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
import { useMutation } from '@tanstack/react-query';
import { ImageDown, PenIcon, PenLineIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import userAvatar from '@/assets/user-avater.png'

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
    const userData = ALL_DATA.useSingleUser();
    const user = JSON.parse(safeLocalStorage.getItem("user"));
    const { language } = useLanguageStore();
    const userImg = userData?.data?.image;
    const ismainImage = useRef(null);
    const [active, setActive] = useState<activeView>('profile')
    const userCottage = ALL_DATA.useCottageUser()?.data; 
    const orders = user?.orders    
    console.log(userData?.data);
    const [userImage, setUserImage] = useState<null | File>(null);
    const {t} = useTranslation()
    
    
    const saveData = useRef(null);
    const editImage = useRef(null);
    const [edit, setEdit] = useState(true);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
          setUserImage(event.target.files[0]);
        }
      };
      const getImageSrc = () => {
        if (userImage instanceof File) {
          return URL.createObjectURL(userImage); // Fayl uchun URL yaratish
        }
        return userImage; // String sifatida rasm URL ni qaytarish
      };
    
    console.log(userImage);

    const userEdit = useMutation({
        mutationFn: userUtils.editUser,
        onSuccess: async () => {
            toast.success(signInLanguage.successLogin[language]);
            localStorage.setItem("user", JSON.stringify(userData?.data));
            saveData.current.classList.add("hidden");
            editImage.current.classList.add("hidden");
            await userUtils.getSingleUser();
            setEdit(true);
        },
        onError: (err) => {
            toast.error(AddNewPageLanguage.cottageError[language]);
            console.log(err);
        }
    });

    const handleUser = (e) => {        
        e.preventDefault();
        userEdit.mutate({
            id: user?.id,
            // phone: e.target.phone.value.slice(4),
            // email: e.target.email.value || "",
            name: e.target.name.value || "",
            image: userImage,
            phone: undefined,
            email: undefined
        });
    };

    const handleIsMianImage = async (e) => {
        ismainImage.current.src = await getBase64Full(e.target.files[0]);
        setUserImage(e.target.files[0])
    };

    return (
        <>
        <div className='max-w-6xl mx-auto px-3 md:px-1'>
            <div className="min-h-[20vh] flex flex-col justify-end items-start">
                <BreacdCrambs data={[{ slug: '', title: t('nav_home') }]} page={`${t('nav_profile')}`} />
                <h2 className='text-2xl md:text-3xl font-createRound'>{t('nav_profile')}</h2>
            </div>
            <div className="mt-10 flex flex-col md:flex-row md:items-start gap-5">
                <ul className="w-full h-[50px] my-3 md:space-y-5 md:max-w-[250px] md:h-[150px] flex md:flex-col items-center md:items-start justify-between bg-secondary rounded-md p-3">
                    <li onClick={() =>setActive('profile')} className={cn('cursor-pointer', active=='profile' && 'text-blue-400')}>{t('nav_profile')}</li>
                    <li onClick={() =>setActive('cottage')} className={cn('cursor-pointer', active=='cottage' && 'text-blue-400')}>{t("profile_e'lonlarim")}</li>
                    <li onClick={() =>setActive('services')} className={cn('cursor-pointer', active=='services' && 'text-blue-400')}>{t('foydalangan_service')}</li>
                </ul>
                {active==='profile' && <form onSubmit={handleUser} className='md:w-[40vw]'>
                    <div className="w-full flex flex-col space-y-3 items-center md:flex-row gap-2 md:gap-x-14 md:items-start">
                        <div className="!w-[120px] !h-[120px] relative flex items-center justify-center">
                            <Image
                                className={"!w-[130px] flex justify-center items-center h-[120px] relative border border-separate rounded-full overflow-hidden"}
                                ref={ismainImage}
                                src={userImg || getImageSrc() || userAvatar}
                                alt="useImg"
                                sizes="120px"
                                width={120}
                                height={120}                           
                            />      
                            <label className="absolute text-black bg-red-300 right-0 bottom-0 rounded-full z-20 p-[2px] cursor-pointer">
                                <input
                                    onChange={handleImageChange}
                                    type="file"
                                    accept="image/*"
                                    name="userImage"
                                    className="w-1 h-1 opacity-0 absolute curson-pointer"
                                />
                                <PenLineIcon size={25} className='mx-auto'/>                        
                        </label>                      
                        </div>                        
                        <div className="p-1 w-full md:flex-1 space-y-3">
                            <Input type='text' name='name' placeholder={`${t('form_name')}`} className='' defaultValue={user?.name ? user.name : ""}/>
                            <Input type='text' placeholder='Phone' className='' defaultValue={"+998" + user?.phone} disabled/>
                            <Button type='submit' className='flex items-start w-[150px] hover:bg-green-700 bg-green-600 text-white'>{t('save')}</Button>
                        </div>
                    </div>
                </form>
                }
                {active === 'cottage' && <div>
                    <h2 className='text-xl md:text-2xl font-createRound'>Mening dachalarim</h2>
                    <div className="w-full mt-5 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                    {userCottage && userCottage.map((dacha: cottage) => (
                        <UserDacha key={dacha.id} {...dacha}/>
                    ))}
                    </div>
                </div>
                }
                {active ==='services' && <div>
                    <h2>Services</h2>
                    <Table>
                        <TableCaption>Foydalangan tarif jadvali</TableCaption>
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
                                    <TableCell className="font-medium">INV001</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                    <TableCell>Credit Card</TableCell>
                                    <TableCell className="text-right">$250.00</TableCell>
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