'use client'

import BreacdCrambs from "@/components/shared/breacd-crambs";
import { Mail, Phone } from "lucide-react";
import ContactForm from "../_components/contact-form";
import { Metadata } from "next";
import { useTranslation } from "react-i18next";

// export const metadata: Metadata = {
//     title: "Contact | DachaOL",
// }


const Contact = () => {
	const {t} = useTranslation()
    return (
        <div className="max-w-6xl mx-auto px-3 md:px-1">
            <div className="min-h-[20vh] flex flex-col justify-end items-start">
                <BreacdCrambs data={[{slug: '', title:t('nav_home')}]} page={`${t('nav_contact')}`}/>
                <h2 className='text-2xl md:text-3xl font-createRound'>{t('contact_to_me')}</h2>
            </div>
            <div className='grid grid-cols-2 max-md:grid-cols-1 gap-4 mt-6'>
				<div className='flex flex-col'>
					<h1 className='text-4xl font-creteRound'>{t('dachaOl_info')}</h1>
					<p className='mt-2 text-muted-foreground'>
						{t('contacy_description')}
					</p>

					<div className='mt-12 flex items-center gap-3'>
						<Mail className='w-4 h-4' />
						<p className='text-sm'>info@dachaol.uz</p>
					</div>
					<div className='flex items-center gap-3 mt-2'>
						<Phone className='w-4 h-4' />
						<p className='text-sm'>+998 97 108 20 04</p>
					</div>
				</div>

				<div>
					<h1 className='text-4xl font-creteRound mb-2'>{t('connection')}</h1>
					<div className='flex flex-col space-y-3'>
						{/* <ContactForm/> */}
					</div>
				</div>
			</div>
        </div>
    );
};

export default Contact;