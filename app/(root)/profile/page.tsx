'use client'

import Dacha from '@/components/card/dacha';
import BreacdCrambs from '@/components/shared/breacd-crambs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ALL_DATA } from '@/Query/get_all';
import useLanguageStore from '@/store/language-provider';
import { cottageTop } from '@/types';
import { safeLocalStorage } from '@/utils/safeLocalstorge';
import { ImageDown } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

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
    const fovarite = JSON.parse(safeLocalStorage.getItem("liked"));
    const ismainImage = useRef(null);
    const [active, setActive] = useState<activeView>('services')
    const userCottage = ALL_DATA.useCottageUser()?.data;
    console.log(userCottage);
    
    // const saveData = useRef(null);
    // const editImage = useRef(null);
    // const [edit, setEdit] = useState(true);

    // const userEdit = useMutation({
    //     mutationFn: userUtils.editUser,
    //     onSuccess: async () => {
    //         toast.success(signInLanguage.successLogin[language]);
    //         localStorage.setItem("user", JSON.stringify(userData?.data));
    //         saveData.current.classList.add("hidden");
    //         editImage.current.classList.add("hidden");
    //         await userUtils.getSingleUser();
    //         console.log(edit);            
    //         setEdit(true);
    //     },
    //     onError: (err) => {
    //         toast.error(AddNewPageLanguage.cottageError[language]);
    //         console.log(err);
    //     },
    // });

    // const handleUser = (e) => {
    //     e.preventDefault();
    //     userEdit.mutate({
    //         id: user.id,
    //         phone:
    //             e.target.phone.value.slice(4) === user.phone
    //                 ? ""
    //                 : e.target.phone.value.slice(4),
    //         email: e.target.email.value || "",
    //         name: e.target.name.value || "",
    //         image: e.target.userImage.files[0],
    //     });
    // };

    const handleIsMianImage = async (e) => {
        ismainImage.current.src = await getBase64Full(e.target.files[0]);
        ismainImage.current.classList.remove("hidden");
    };

    return (
        <div className='max-w-6xl mx-auto px-3 md:px-1'>
            <div className="min-h-[20vh] flex flex-col justify-end items-start">
                <BreacdCrambs data={[{ slug: '', title: 'Home' }]} page="Profile" />
                <h2 className='text-2xl md:text-3xl font-createRound'>Profil</h2>
            </div>
            <div className="mt-10 flex flex-col md:flex-row gap-5">
                <ul className="w-full h-[50px] my-3 md:space-y-5 md:max-w-[200px] md:h-auto flex md:flex-col items-center md:items-start justify-between bg-secondary rounded-md p-3">
                    <li onClick={() =>setActive('profile')} className={cn('cursor-pointer', active=='profile' && 'text-blue-400')}>Profil</li>
                    <li onClick={() =>setActive('cottage')} className={cn('cursor-pointer', active=='cottage' && 'text-blue-400')}>My Cottage</li>
                    <li onClick={() =>setActive('services')} className={cn('cursor-pointer', active=='services' && 'text-blue-400')}>Services</li>
                </ul>
                {active==='profile' && <form>
                    <div className="w-full md:w-[50vw] flex flex-col space-y-3 items-center md:flex-row gap-2 md:items-start">
                        <div className="w-[120px] h-[120px] relative border border-separate rounded-full overflow-hidden  flex items-center justify-center">
                            <Image
                                className={userImg ? "w-[100px] h-[100px] shadow-sm" : "hidden"}
                                ref={ismainImage}
                                src={''}
                                alt="useImg"
                                fill
                            />
                            <label className="w-[100px] h-[100px] relative">
                                <input
                                    onChange={handleIsMianImage}
                                    type="file"
                                    accept="image/*"
                                    name="userImage"
                                    className="w-1 h-1 opacity-0 absolute curson-pointer"
                                />
                                <ImageDown size={25} className='absolute z-10 bottom-[-10px] bg-gray-400 text-black  w-full cursor-pointer'/>                        
                            </label>
                        </div>
                        <div className="p-1 w-full md:flex-1 space-y-3">
                            <Input type='text' placeholder='Enter your name' className=''/>
                            <Input type='text' placeholder='Phone' className=''/>
                            <Button className='flex items-start bg-green-600 text-white'>Save</Button>
                        </div>
                    </div>
                </form>
                }
                {active === 'cottage' && <div>
                    <h2 className='text-xl md:text-2xl font-createRound'>Mening dachalarim</h2>
                    <div className="w-full mt-5 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                    {/* {userCottage && userCottage.map((dacha: cottageTop) => (
                        <Dacha key={dacha.id} {...dacha}/>
                    ))} */}
                    </div>
                </div>
                }
                {active ==='services' && <div>
                    <h2>Services</h2>
                </div>
                }
            </div>
        </div>
    );
};

export default Profile;