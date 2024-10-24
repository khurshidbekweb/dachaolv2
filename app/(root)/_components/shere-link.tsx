import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IMG_BASE_URL } from '@/constants/server';
import { Check, Copy, Instagram, Share2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { FaSms, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { TfiEmail } from 'react-icons/tfi';

const ShereLink = () => {
    const [copySuccess, setCopySuccess] = useState<string>('');
    const pathname = usePathname()

    const link = 'https://dachaol.uz' + pathname
    const text = ''


    const copyToClipboard = async (e) => {
        e.preventDefault()
        try {
            await navigator.clipboard.writeText(e.target.link.value);
            setCopySuccess('Link copied! You can now share it.');
        } catch (err) {
            setCopySuccess('Failed to copy the link');
            console.error('Failed to copy: ', err);
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className='flex items-center gap-2'>
                    <Share2 />
                    <p className='text-[17px] font-createRound'>Share</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={copyToClipboard} className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue={link}
                            readOnly
                            name='link'
                        />
                    </div>
                    <Button type="submit" size="sm" className="px-3">
                        <span className="sr-only">Copy</span>
                        {copySuccess ? <Check /> : <Copy className="h-4 w-4" />}
                    </Button>
                </form>
                <div>
                    <ul className='flex gap-5 items-center justify-center'>
                        <li>
                            <Link href={`https://t.me/share/url?url=${link}&text=${text}`} target="_blank" rel="noopener noreferrer">
                                <FaTelegram size={35} className='text-blue-500'/>
                            </Link>
                        </li>
                        <li>
                            <Link href={`https://api.whatsapp.com/send?text=${link}`} target="_blank" rel="noopener noreferrer">
                                <FaWhatsapp  size={35} className='text-green-700'/>
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.instagram.com/xursh1dbek________" target="_blank" rel="noopener noreferrer">
                                <Instagram  size={35} className='text-red-300'/>
                            </Link>
                        </li>
                        <li>
                            <Link href={`mailto:?subject=Sayt Havolasi&body=${link}`} target="_blank" rel="noopener noreferrer">
                                <TfiEmail  size={35} className='text-yellow-500'/>
                            </Link>
                        </li>
                        <li>
                            <Link href={`sms:?body=Mana siz uchun sayt havolasi: ${link}`} target="_blank" rel="noopener noreferrer">
                                <FaSms  size={35} className='text-blue-500'/>
                            </Link>
                        </li>
                    </ul>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ShereLink;