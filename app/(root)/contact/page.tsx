import BreacdCrambs from "@/components/shared/breacd-crambs";
import { Mail, Phone } from "lucide-react";
import ContactForm from "../_components/contact-form";


const Contact = () => {
    return (
        <div className="max-w-6xl mx-auto px-3 md:px-1">
            <div className="min-h-[20vh] flex flex-col justify-end items-start">
                <BreacdCrambs data={[{slug: '', title:'Home'}]} page="Contact"/>
                <h2 className='text-2xl md:text-3xl font-createRound'>Contact us</h2>
            </div>
            <div className='grid grid-cols-2 max-md:grid-cols-1 gap-4 mt-6'>
				<div className='flex flex-col'>
					<h1 className='text-4xl font-creteRound'>Contact Sammi</h1>
					<p className='mt-2 text-muted-foreground'>
						I am here to help and answer any question you might have. I look
						forward to hearing from you
					</p>

					<div className='mt-12 flex items-center gap-3'>
						<Mail className='w-4 h-4' />
						<p className='text-sm'>info@sammi.ac</p>
					</div>
					<div className='flex items-center gap-3 mt-2'>
						<Phone className='w-4 h-4' />
						<p className='text-sm'>+98 02 296 4902</p>
					</div>
				</div>

				<div>
					<h1 className='text-4xl font-creteRound mb-2'>Contact form</h1>
					<div className='flex flex-col space-y-3'>
						<ContactForm/>
					</div>
				</div>
			</div>
        </div>
    );
};

export default Contact;