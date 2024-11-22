'use client'

import React, { useRef } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Pen, Trash, Upload } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { image } from '@/types';
import { QUERY_KEYS } from '@/Query/query-keys';
import { cottageUtils } from '@/utils/cottage.utils';
import { toast } from 'sonner';
import Image from 'next/image';
import { IMG_BASE_URL } from '@/constants/server';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';

interface PropsType {
    id: string,
    images: image[]
}

const CottageEditImg = ({ id, images }: PropsType) => {
    const mainImage = useRef(null);

    const childImagesWrapper = useRef(null);

    const queryClient = useQueryClient();

    const mainImageCottage = images.find((e) => e.isMainImage === true);
    const childImages = images.filter((e) => e.isMainImage !== true);

    const cottageMainImg = useMutation({
        mutationFn: cottageUtils.patchCottageImage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottages] });
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const addCottageImage = useMutation({
        mutationFn: cottageUtils.addCottageImage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottages] });
            toast.success("Success add image");
        },
        onError: (err) => {
            alert(err.message);
        },
    });

    const deletChilImage = useMutation({
        mutationFn: cottageUtils.deleteCottageImage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottages] });
            toast.success("Success delete image");
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const addChildImg = async (e) => {
        addCottageImage.mutate({
            cottageId: id,
            image: e.target.files[0],
            isMainImage: false,
        });
    };

    const handlCottage = async (e) => {
        e.preventDefault();
    };

    const handleMainImage = async (e) => {
        if (mainImageCottage?.id) {
            cottageMainImg.mutate({
                id: mainImageCottage.id,
                image: e.target.files[0],
            });
            return;
        }

        addCottageImage.mutate({
            cottageId: id,
            image: e.target.files[0],
            isMainImage: true,
        });
        return;
    };
    return (
        <Dialog>
            <DialogTrigger className='absolute top-0 right-0'><Badge className='flex gap-1 rounded-e-md font-createRound text-[15px]'>Img <Pen size={18} /></Badge></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>E`lon rasmini tahrirlang</DialogTitle>
                </DialogHeader>
                <div className="modal-body overflow-x-hidden">
                    <form className="p-4" onSubmit={handlCottage}>
                        <h2 className='text-[18px] font-createRound'>Asosiy rasm</h2>
                        <div className="flex items-end gap-4 my-3">
                            {mainImageCottage?.image && (
                                <Image
                                    ref={mainImage}
                                    src={`${IMG_BASE_URL}${mainImageCottage.image}`}
                                    alt="main-image"
                                    sizes='(max-width: 150px)'
                                    width={150}
                                    height={180}
                                    className="!w-[150px] rounded-md"
                                />
                            )}
                            <label className="flex flex-col items-center">
                                <input
                                    onChange={handleMainImage}
                                    type="file"
                                    accept="image/*"
                                    name="mainImage"
                                    id="cottage-main-img"
                                    className="file-input w-1 opacity-0 absolute"
                                />
                                <div className="bg-secondary flex items-center justify-center flex-col p-1 rounded-md cursor-pointer">
                                    <Upload size={20} />
                                    <span> Rasmni almashtiring</span>
                                </div>
                            </label>
                        </div>
                        <Separator/>
                        <div className="mt-4 overflow-x-hidden">
                            <h1>Qo`shimcha rasmlar</h1>
                            <div
                                ref={childImagesWrapper}
                                className="flex gap-2 w-full "
                            >
                                {childImages?.length &&
                                    childImages.map((e) => {
                                        return (
                                            <div key={e.id} className="!w-[110px] relative">
                                                <Image
                                                    src={`${IMG_BASE_URL}${e.image}`}
                                                    sizes='(max-width: 110px)'
                                                    width={110}
                                                    height={120}
                                                    alt="childImages"
                                                    className="rounded-md !w-full h-[120px]"
                                                />
                                                <Button
                                                    variant='link'
                                                    type="button"
                                                    className="text-center absolute bottom-1 left-4 bg-red-500 px-2 flex items-center justify-center rounded-full"
                                                    onClick={() => deletChilImage.mutate(e.id)}
                                                >
                                                    <Trash size={20} className='text-white' />
                                                </Button>
                                            </div>
                                        );
                                    })}
                            </div>
                            <label className="bg-secondary my-2 flex items-center justify-center flex-col p-1 rounded-md cursor-pointer">
                                <input
                                    onChange={addChildImg}
                                    type="file"
                                    accept="image/*"
                                    name="childimg"
                                    id="cottage-main-img"
                                    className="file-input w-1 opacity-0 absolute"
                                    multiple
                                />
                                <Upload size={20} />
                                <span>Qo`shimcha rasm</span>
                            </label>
                        </div>
                        <DialogClose asChild>
                            <Button
                                type="submit"
                                className="bg-green-500 p-2 rounded-md mt-3 ml-auto"
                            >
                                Save changes
                            </Button>
                        </DialogClose>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CottageEditImg;