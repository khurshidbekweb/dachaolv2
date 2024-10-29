'use client'

import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Pen, Trash, Upload } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { image } from '@/types';
import { QUERY_KEYS } from '@/Query/query-keys';
import { cottageUtils } from '@/utils/cottage.utils';
import { toast } from 'sonner';
import Image from 'next/image';
import { IMG_BASE_URL } from '@/constants/server';

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
                <div className="modal-body">
                    <form className="p-4" onSubmit={handlCottage}>
                        <div className="main-image-wrapper d-flex align-items-end justify-content-between border p-3">
                            {mainImageCottage?.image && (
                                <Image
                                    ref={mainImage}
                                    src={`${IMG_BASE_URL}${mainImageCottage.image}`}
                                    alt="main-image"
                                    width={250}
                                    height={200}
                                    className="rounded-3"
                                />
                            )}
                            <label className="file-input-label d-block w-25 text-center mb-2">
                                <input
                                    onChange={handleMainImage}
                                    type="file"
                                    accept="image/*"
                                    name="mainImage"
                                    id="cottage-main-img"
                                    className="file-input"
                                />
                                <Upload size={30} />
                                <span> Main Img</span>
                            </label>
                        </div>
                        <div className="imagesMultiple mt-4 border p-2 rounded">
                            <label className="file-input-label d-block w-25 text-center mb-2">
                                <input
                                    onChange={addChildImg}
                                    type="file"
                                    accept="image/*"
                                    name="childimg"
                                    id="cottage-main-img"
                                    className="file-input"
                                    multiple
                                />
                                <Upload size={30} />
                                <span>Child Images</span>
                            </label>
                            <div
                                ref={childImagesWrapper}
                                className="imagesChildWrap mt-4 flex-wrap d-flex gap-4"
                            >
                                {childImages?.length &&
                                    childImages.map((e) => {
                                        return (
                                            <div key={e.id} className="childImgCard">
                                                <Image
                                                    src={`${IMG_BASE_URL}${e.image}`}
                                                    width={100}
                                                    height={120}
                                                    alt="childImages"
                                                    className="childImage"
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => deletChilImage.mutate(e.id)}
                                                >
                                                    <Trash size={25} />
                                                </button>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                        <button
                            type="submit"
                            data-bs-dismiss="modal"
                            className="btn-modal bg-success border-0 mt-4 fs-6 fw-bold rounded-2 text-white d-block"
                        >
                            Save changes
                        </button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CottageEditImg;