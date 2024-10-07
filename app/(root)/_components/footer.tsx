import { Separator } from '@/components/ui/separator';
import {  FooterLink1, FooterLink2, FooterLink3 } from '@/constants/language';
import { Facebook, Instagram, Send, Youtube } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
//   const { languageChange } = useContext(LanguageContext);

    return (
        <div className="footer mt-96 space-y-4">
            <Separator/>
            <div className="container max-w-6xl mx-auto">
                <div className="footer-top">
                    <div className="footer-box">
                        <h3 className="footer-headers">
                        {/* {FooterHeadLeng[languageChange].link1} */}
                        </h3>
                        <ul className="footer-list">
                        {FooterLink1.map((el) => {
                            return (
                            <li key={el.id} className="footer-item">
                                <Link href="/" className="footer-link">
                                {/* {el.content[languageChange]} */}
                                </Link>
                            </li>
                            );
                        })}
                        </ul>
                    </div>

                    <div className="footer-box">
                        <h3 className="footer-headers">
                        {/* {FooterHeadLeng[languageChange].link2} */}
                        
                        </h3>

                        <ul className="footer-list">
                        {FooterLink2.map((el) => {
                            return (
                            <li key={el.id} className="footer-item">
                                <Link href="/" className="footer-link">
                                {/* {el.content[languageChange]} */}
                                </Link>
                            </li>
                            );
                        })}
                        </ul>
                    </div>

                    <div className="footer-box">
                        <h3 className="footer-headers">
                        {/* {FooterHeadLeng[languageChange].link3} */}
                        </h3>

                        <ul className="footer-list">
                        {FooterLink3.map((el) => {
                            return (
                            <li key={el.id} className="footer-item">
                                <Link href="/" className="footer-link">
                                {/* {el.content[languageChange]} */}
                                </Link>
                            </li>
                            );
                        })}
                        </ul>
                    </div>
                </div>

                <h3 className="footer-header font-createRound text-3xl text-center">DachaOL</h3>

                <div className="text-center my-5 space-y-4">
                    {/* <p className="footer-address">{FooterMiniLang[languageChange]}</p> */}
                    <div className="flex gap-5 items-center justify-center">
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
                    <p className="footer-text">©2024 DachaOL. All Rights Reserved</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;