'use client'

import { Button } from '@/components/ui/button';
import Cleave from 'cleave.js/react'
import React, { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { signInLanguage } from '@/constants/language';
import useLanguageStore from '@/store/language-provider';
import { langKey } from '@/types';
import { authUtils } from '@/utils/auth.utils';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [step, setStep] = useState<number>(0)
    const store = useLanguageStore()
    const language: langKey = store.language
    const navigate = useRouter()

    const [code, setCode] = useState(["", "", "", "", ""]);
    const inputRefs = useRef<HTMLInputElement[]>([]); // Ref massiv  
    // Kiritilgan qiymatni o'zgarishini boshqarish
    const handleChange = (index: number, value: string) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        // Agar keyingi input mavjud bo'lsa, unga fokusni o'tkazish
        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };
    // Inputlarga qiymat kiritish
    const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
        if (event.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus(); // Oldingi inputga o'tish
        }
    };

    const phone = useMutation({
        mutationFn: authUtils.smsAuth,
        onSuccess: (data) => {
            inputRefs.current.values = data.smsCode;
            toast.success(signInLanguage.successLogin[language]);
            setTimeout(() => {
                setStep(1)
            }, 500);
            console.log(data.smsCode)            
        },
        onError: (err) => {
            console.log(err);
            toast.error(signInLanguage.numberError[language]);
        },
    });

    const login = useMutation({
        mutationFn: authUtils.loginAuth,
        onSuccess: () => {
            toast.success(signInLanguage.successLogin[language]);
            navigate.push("/add-new");
        },
        onError: (err) => {
            console.log(err, "login");
        },
    });


    const handleAuth = (e: { preventDefault: () => void; target: { phonenumber: { value: string; }; }; }) => {
        e.preventDefault();
        phone.mutate({
            phone: e.target.phonenumber.value.replaceAll(" ", "").slice(4),
        });
    };

    const handleLogin = (e: { preventDefault: () => void; target: { smsCode: { value: any; }; }; }) => {
        e.preventDefault();
        const smsCode:string[] = []
        Object.values(e.target.smsCode).map(num => {
            smsCode.push(num.value)
            
        })
        const code = smsCode.join('');
        const truthCode = phone?.data?.smsCode;  
        
        if (code === truthCode) {
            login.mutate({
                smsCode: code,
                userId: phone?.data?.userId,
            });
        } else {
            toast.error(signInLanguage.smsError[language]);
        }
    };
    const backOneHandle = () => {
        setTimeout(() => {
            setStep(0)
        }, 500);
    }



function authLOgin(step: number) {
    switch (step) {
        case 0: {
            return <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Kirish
                </h2>
                <form onSubmit={handleAuth} >
                    <label htmlFor="phone" className="block text-sm text-gray-700">
                        Telefon raqami
                    </label>
                    <Cleave
                        options={{
                            prefix: "+998",
                            delimiter: " ",
                            blocks: [4, 2, 3, 2, 2],
                            numericOnly: true,
                        }}
                        placeholder="Phone number"
                        className="w-full p-2 border outline-blue-500  rounded-md"
                        name="phonenumber"
                        required
                    />
                    <Button
                        type="submit"
                        className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 focus:ring focus:ring-blue-400"
                    >
                        Kodni olish
                    </Button>
                </form>
            </div>
        };
        case 1: {
            return <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    SMS kodini kiriting
                </h2>
                <p className="text-center text-gray-600 mb-4">
                    +998 90 123 45 67 raqamiga yuborilgan SMS kodini kiriting
                </p>
                <form onSubmit={handleLogin}>
                    <div className="flex justify-between items-center mb-4">
                        {code.map((digit: string | number | readonly string[] | undefined, index: React.Key | null | undefined) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el!)} // Inputlar refga qo'shiladi
                                type="text"
                                name="smsCode"
                                maxLength={1} 
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 focus:ring focus:ring-blue-400"
                    >
                        Tasdiqlash
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Kodni qabul qilmadingizmi?
                    <button onClick={backOneHandle} className="text-blue-600 hover:underline focus:outline-none">
                        Qayta yuborish
                    </button>
                </p>
            </div>
        };
        case 2: {
            return <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Kirish
                </h2>
                <form>
                    <label htmlFor="phone" className="block text-sm text-gray-700">
                        Ismingizni kiriting
                    </label>
                    <input
                        type='text'
                        placeholder='Xurshidbek'
                        className='w-full p-2 border outline-blue-500  rounded-md'
                    />
                    <Button
                        type="submit"
                        className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 focus:ring focus:ring-blue-400"
                    >
                        Tasdiqlash
                    </Button>
                </form>
            </div>
        }
    }
}

return (
    <div className="max-w-6xl mx-auto px-3 md:px-1">
        <div className="min-h-[20vh] flex flex-col justify-end items-start border p-11">
            Login
        </div>
        <div className="min-h-[49vh] flex items-center justify-center">
            {authLOgin(step)}
        </div>

    </div>
);
}

export default Login;