import BreacdCrambs from "@/components/shared/breacd-crambs";
import { Mail, Phone } from "lucide-react";
import ContactForm from "../_components/contact-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | DachaOL",
}


const Contact = () => {
    return (
        <div className="max-w-6xl mx-auto px-3 md:px-1">
            <div className="min-h-[20vh] flex flex-col justify-end items-start">
                <BreacdCrambs data={[{slug: '', title:'Home'}]} page="Contact"/>
                <h2 className='text-2xl md:text-3xl font-createRound'>Biz bilan bog`lanish</h2>
            </div>
            <div className='grid grid-cols-2 max-md:grid-cols-1 gap-4 mt-6'>
				<div className='flex flex-col'>
					<h1 className='text-4xl font-creteRound'>DachaOL bilan bog`laning</h1>
					<p className='mt-2 text-muted-foreground'>
					Men sizga yordam berish va har qanday savolga javob berish uchun shu yerdaman. Sizdan xabar kutib qolaman
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
					<h1 className='text-4xl font-creteRound mb-2'>Bog`lanish</h1>
					<div className='flex flex-col space-y-3'>
						<ContactForm/>
					</div>
				</div>
			</div>
        </div>
    );
};

export default Contact;