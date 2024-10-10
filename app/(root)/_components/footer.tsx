'use client'

import useLanguageStore from '@/store/language-provider';
import { Separator } from '@/components/ui/separator';
import {  FooterHeadLeng, FooterLink1, FooterLink2, FooterLink3, FooterMiniLang } from '@/constants/language';
import { langKey } from '@/types';
import { Facebook, Instagram, Send, Youtube } from 'lucide-react';
import Link from 'next/link';
const Footer = () => {
    const store= useLanguageStore()
    const language: langKey = store.language 

    return (
        <div className="footer mt-10 space-y-4">
            <Separator/>
            <div className="container max-w-6xl mx-auto">
            <h3 className="text-center md:text-start footer-header font-createRound text-3xl space-y-5">DachaOL</h3>
                <div className="hidden md:flex justify-between items-start mt-5">
                    <div className="footer-box">
                        <h3 className="font-createRound text-xl">
                            {FooterHeadLeng[language].link1}
                        </h3>
                        <ul>
                        {FooterLink1.map((el) => {
                            return (
                            <li key={el.id} className="mt-2">
                                <Link href="/" className="footer-link">
                                    {el.content[language]} 
                                </Link>
                            </li>
                            );
                        })}
                        </ul>
                    </div>

                    <div className="footer-box">
                        <h3 className="font-createRound text-xl">
                        {FooterHeadLeng[language].link2} 
                        
                        </h3>

                        <ul>
                        {FooterLink2.map((el) => {
                            return (
                            <li key={el.id} className="mt-2">
                                <Link href="/" className="footer-link">
                                {el.content[language]}
                                </Link>
                            </li>
                            );
                        })}
                        </ul>
                    </div>

                    <div className="footer-box">
                        <h3 className="font-createRound text-xl">
                        {FooterHeadLeng[language].link3}
                        </h3>

                        <ul className="footer-list">
                        {FooterLink3.map((el) => {
                            return (
                            <li key={el.id} className='mt-2'>
                                <Link href="/" className="footer-link">
                                {el.content[language]}
                                </Link>
                            </li>
                            );
                        })}
                        </ul>
                    </div>
                </div>               

                <div className="block text-center md:flex justify-between  md:my-10">
                    <p className="footer-address mt-2 md:mt-0">{FooterMiniLang[language]}</p>
                    <div className="flex gap-5 items-center justify-center my-3 md:my-0">
                        <Link
                        href="https://www.instagram.com/dachi_uz/"
                        target="_blank"
                        className="block"
                        >
                            <Instagram/>
                        </Link>

                        <Link
                        href="https://www.facebook.com/dachagori/"
                        target="_blank"
                        className="footer-social"
                        >
                            <Facebook/>
                        </Link>

                        <Link
                        href="https://t.me/dachi_v_gorax"
                        target="_blank"
                        className="footer-social"
                        >
                        <Send/>
                        </Link>

                        <Link
                        href="https://www.youtube.com/@dachi_uz"
                        target="_blank"
                        className="footer-social"
                        >
                            <Youtube/>
                        </Link>
                    </div>
                    <p className="footer-text md:my-0 my-4">©2024 DachaOL. All Rights Reserved</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;