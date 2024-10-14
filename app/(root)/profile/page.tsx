'use client'

import BreacdCrambs from '@/components/shared/breacd-crambs';
import { AddNewPageLanguage, signInLanguage } from '@/constants/language';
import { IMG_BASE_URL } from '@/constants/server';
import { ALL_DATA } from '@/Query/get_all';
import useLanguageStore from '@/store/language-provider';
import { userUtils } from '@/utils/user.utils';
import { useMutation } from '@tanstack/react-query';
import { ImageDown, ImagePlus } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';

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

const Profile = () => {
    const userData = ALL_DATA.useSingleUser();
    const user = JSON.parse(localStorage.getItem("user"));
    // User profile language
    const { language } = useLanguageStore();
    const userImg = userData?.data?.image;
    // const fovarite = JSON.parse(localStorage.getItem("liked"));
    const ismainImage = useRef(null);
    const saveData = useRef(null);
    const editImage = useRef(null);
    const [edit, setEdit] = useState(true);

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
        },
    });

    const handleUser = (e) => {
        e.preventDefault();
        userEdit.mutate({
            id: user.id,
            phone:
                e.target.phone.value.slice(4) === user.phone
                    ? ""
                    : e.target.phone.value.slice(4),
            email: e.target.email.value || "",
            name: e.target.name.value || "",
            image: e.target.userImage.files[0],
        });
    };
    console.log(userEdit, 'efv');

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
            <div className="mt-10 w-full md:w-[50%] flex flex-col space-3 md:flex-row gap-3">
                <form className='flex flex-col space-y-3 items-center justify-center md:flex-row md:justify-between md:items-start'>
                    <div className="w-full flex items-center justify-center">
                        <div className="w-[120px] h-[120px] relative border rounded-full overflow-hidden  flex items-center justify-center">
                            <Image
                                    className={userImg ? "w-[100px] h-[100px] " : "hidden"}
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
                                <ImageDown className='absolute bottom-1 right-0 cursor-pointer'/>                        
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;