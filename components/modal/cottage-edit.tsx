import React from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Pen } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";

import Image from 'next/image';
import { cottage } from '@/types';
import { cottageUtils } from '@/utils/cottage.utils';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/Query/query-keys';
import { IMG_BASE_URL } from '@/constants/server';
import { ALL_DATA } from '@/Query/get_all'
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface PropsType {
    id: string,
    cottage: cottage
}

const CottageEdit = ({ cottage, id }: PropsType) => {
    const cottageTypeUset = [];

    const cottageComfortUset = [];

    if (cottage.cottageType.length) {
        cottage.cottageType.forEach((e) => {
            cottageTypeUset.push(e.id);
        });
    }

    if (cottage.comforts.length) {
        cottage.comforts.forEach((e) => {
            cottageComfortUset.push(e.id);
        });
    }

    const [cottageInfo, setCottageInfo] = useState({
        dachaType: [...cottageTypeUset],
        response: [...cottageTypeUset],
    });

    const [cottageComforts, setcottageComforts] = useState({
        comforts: [...cottageComfortUset],
        response: [...cottageComfortUset],
    });

    const queryClient = useQueryClient();

    const cottageEdit = useMutation({
        mutationFn: cottageUtils.patchCottageText,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottages] });
            toast.success("Tahrirlash muvaffaqiyat bajarildi");
        },
        onError: (err) => {
            console.log(err);
            toast.success("Hatolik mavjud");
        },
    });

    const region = ALL_DATA.useRegion()

    const place = ALL_DATA.usePlace()

    const comforts = ALL_DATA.useComforts();

    const cottageType = ALL_DATA.useCottageType();

    const handlChoseCottageType = (e) => {
        const { value, checked } = e.target;
        const { dachaType } = cottageInfo;
        if (checked) {
            setCottageInfo({
                dachaType: [...dachaType, value],
                response: [...dachaType, value],
            });
        } else {
            setCottageInfo({
                dachaType: dachaType.filter((e) => e !== value),
                response: dachaType.filter((e) => e !== value),
            });
        }
    };

    const handleCottageComforts = (e) => {
        const { value, checked } = e.target;
        const { comforts } = cottageComforts;
        if (checked) {
            setcottageComforts({
                comforts: [...comforts, value],
                response: [...comforts, value],
            });
        } else {
            setcottageComforts({
                comforts: comforts.filter((e) => e !== value),
                response: comforts.filter((e) => e !== value),
            });
        }
        console.log(value);
    };

    const handlCottage = (e) => {
        e.preventDefault();
        cottageEdit.mutate({
            id: id,
            name: e.target.cottagename.value,
            cottageStatus: 'confirmed',
            placeId: e.target.place.value,
            regionId: e.target.region.value,
            price: +e.target.price.value,
            priceWeekend: +e.target.priceweekend.value,
            cottageType: cottageInfo.response,
            comforts: cottageComforts.response,
            description: e.target.discription.value,
            lattitude: "",
            longitude: "",
            status: "active",
            rating: 0,
            isTop: true
        });
    };
    return (
        <Dialog>
            <DialogTrigger className='absolute bottom-16 right-0'><Badge className='flex gap-1 p-[2px] roundee-md font-createRound md:text-[15px]'>Tahrirlash <Pen size={18} /></Badge></DialogTrigger>
            <DialogContent className='min-w-[340px]'>
                <DialogHeader>
                    <DialogTitle>E`lon rasmini tahrirlash</DialogTitle>
                </DialogHeader>
                <div className="">
                    <form className="p-2" onSubmit={handlCottage}>
                        <label className="block mb-3">
                            <span className="block mb-1">Cottage name</span>
                            <Input
                                className="w-full p-2  form-control"
                                type="text"
                                name="cottagename"
                                placeholder="Cottage name"
                                defaultValue={cottage.name}
                            />
                        </label>

                        <p className="mb-0">Edit cottage type</p>
                        <div className="flex items-center gap-5">
                            {cottageType.data?.length &&
                                cottageType.data.slice(0,3).map((e) => {
                                    return (
                                        <label
                                            key={e.id}
                                            className="flex items-center gap-2"
                                        >
                                            <p className="type-text fs-5 block">{e.name}</p>
                                            <Input
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                type="checkbox"
                                                onChange={handlChoseCottageType}
                                                name={e.id}
                                                value={e.id}
                                                checked={
                                                    cottageInfo.dachaType.includes(e.id)
                                                        ? true
                                                        : false
                                                }
                                            />
                                        </label>
                                    );
                                })}
                        </div>
                        <div className="flex gap-2 items-center">
                            <label className="block mb-3">
                                <span className="block mb-1">Edit cottage region</span>
                                <Select
                                    name="region"
                                    aria-label="Default select example"
                                    defaultValue={cottage.region.id}
                                >
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="Theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {region.data?.length &&
                                        region.data.map((e) => {
                                            return (
                                                <SelectItem key={e.id} value={e.id}>
                                                    {e.name}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                    
                                </Select>
                            </label>
                            <label className="block mb-2">
                                <span className="block mb-1">Edit cottage place</span>
                                <Select
                                    name="place"
                                    aria-label="Default select example"
                                    defaultValue={cottage.place.id}
                                >
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="Theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {place.data?.length &&
                                        place.data.map((e) => {
                                            return (
                                                <SelectItem key={e.id} value={e.id}>
                                                    {e.name}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            </label>
                        </div>
                        <div className="flex justify-content-between gap-2 mb-3">
                            <label className="block w-50">
                                <span className="text-start block Cottage Price">
                                    Edit cottage price
                                </span>
                                <Input
                                    className="form-control"
                                    type="number"
                                    name="price"
                                    id="price"
                                    defaultValue={cottage.price}
                                />
                            </label>
                            <label className="block w-50">
                                <span className="block">Edit weekend price</span>
                                <Input
                                    className="form-control"
                                    type="number"
                                    name="priceweekend"
                                    id="priceWeek"
                                    defaultValue={cottage.priceWeekend}
                                    placeholder="Weekend price"
                                />
                            </label>
                        </div>

                        <p className="mb-1">Select cottage comforts</p>
                        <div className="grid grid-cols-2">
                            {comforts.data?.length &&
                                comforts.data.slice(0,8).map((e) => {
                                    return (
                                        <label className="flex  gap-2" key={e.id}>
                                            <Input
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                type="checkbox"
                                                checked={
                                                    cottageComforts.comforts.includes(e.id)
                                                        ? true
                                                        : false
                                                }
                                                name={e.id}
                                                value={e.id}
                                                onChange={handleCottageComforts}
                                            />
                                            <Image
                                                src={`${IMG_BASE_URL}${e.image}`}
                                                alt="img"
                                                sizes='(max-width: 20px)'
                                                width={20}
                                                height={20}
                                            />
                                            <p className="mb-0">{e.name}</p>
                                        </label>
                                    );
                                })}
                        </div>
                        <label className="block">
                            <span className="block mb-1">Cottage description</span>
                            <Textarea
                                className="form-control"
                                name="discription"
                                id="discription"
                                defaultValue={cottage.description}
                                placeholder="Discription..."
                            ></Textarea>
                        </label>
                        <DialogClose>
                            <Button
                                type="submit"
                                className="bg-green-500 text-white my-2"
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

export default CottageEdit;