import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Pen } from 'lucide-react';
import { Badge } from '../ui/badge';

const CottageEdit = () => {
    
    return (
        <Dialog>
            <DialogTrigger className='absolute bottom-16 right-0'><Badge className='flex gap-1 p-[2px] rounded-e-md font-createRound md:text-[15px]'>Tahrirlash <Pen size={18}/></Badge></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>E`lon rasmini tahrirlash</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default CottageEdit;