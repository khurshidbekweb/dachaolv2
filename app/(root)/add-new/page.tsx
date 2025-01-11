'use client'

import BreacdCrambs from '@/components/shared/breacd-crambs';
import { AddNewPageLanguage } from '@/constants/language';
import { ALL_DATA } from '@/Query/get_all';
import useLanguageStore from '@/store/language-provider';
import { cottageUtils } from '@/utils/cottage.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { ChangeEvent, useRef, useState } from 'react';
import { ImagePlus, LogInIcon } from 'lucide-react';
import { IMG_BASE_URL } from '@/constants/server';
import { toast } from 'sonner';
import { authUtils } from '@/utils/auth.utils';
import { QUERY_KEYS } from '@/Query/query-keys';
import { comfort, cottageType, footerLang, langKey, place, region } from '@/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import MiniNav from '@/components/shared/mini-nav';
import { safeLocalStorage } from '@/utils/safeLocalstorge';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Login from '../login/page';
import { useTranslation } from 'react-i18next';

// Images transform getbase64Full
async function getBase64Full(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
}

const AddNew = () => {
  const mainImage = useRef<HTMLImageElement | null>(null);
  // get Language
  const route = useRouter()
  const store = useLanguageStore()
  const {t} = useTranslation()
  const language: langKey = store.language as keyof footerLang;
  const accessAToken = safeLocalStorage.getItem('accessToken')
  const childImagesWrapper = useRef(null);
  const handleChange = (value) => {
    console.log('Content:', value); // Muharrirdagi matnni konsolga chiqarish
  };
  const [cottageInfo, setCottageInfo] = useState({
    dachaType: [],
    response: [],
  });
  const [cottageComforts, setcottageComforts] = useState({
    comforts: [],
    response: [],
  });
  // Query 
  const queryClient = useQueryClient();
  const region = ALL_DATA.useRegion();
  const place = ALL_DATA.usePlace();
  const cottageType = ALL_DATA.useCottageType();
  const comforts = ALL_DATA.useComforts();
  const cottage = useMutation({
    mutationFn: cottageUtils.postCottage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottages] });
      toast.success(
        AddNewPageLanguage.cottageSuccess[language]
      );
      route.push('/services')
    },
    onError: (err) => {
      console.log(err, "err");
      toast.error(AddNewPageLanguage.cottageError[language]);
    },
  });

  //Region chacked
  const [choosRegion, setChoosRegion] = useState<string>('')
  const placeByRegionId= ALL_DATA.usePlaceById(choosRegion)?.data
  

  // const handleChoosRegion = (e: React.ChangeEvent<HTMLSelectElement>) => {

  // }


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

  const handleCottageComforts = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const handlCottage = async (e) => {
    e.preventDefault();

    const images = [];
    for (let i = 0; i < e.target.childimg.files.length; i++) {
      images.push(e.target.childimg.files[i]);
    }

    cottage.mutate({
      name: e.target.cottagename.value,
      images: images,
      mainImage: e.target.mainImage.files[0],
      placeId: e.target.place.value,
      regionId: e.target.region.value,
      price: +e.target.price.value,
      priceWeekend: +e.target.priceweekend.value,
      cottageType: ["c4c301b1-4719-499e-bde2-2c36715fae9e"],
      comforts: cottageComforts.response,
      description: e.target.description.value,
    });

    childImagesWrapper.current.innerHTML = "";
    e.target.reset();
  };

  const handleMainImage = async (e) => {
    const result = await getBase64Full(e.target.files[0]);
    if (typeof result === 'string') { // Tekshirish
      const mainImgUrl = result; // Endi bu 'string'
      mainImage.current.classList.remove("hidden");
      mainImage.current.setAttribute("src", mainImgUrl);
    } else {
      console.error("getBase64Full returned a non-string value.");
    }
  };

  const handlmultipleImg = async (e) => {
    const images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(await getBase64Full(e.target.files[i]));
    }
    for (const image of images) {
      childImagesWrapper.current.insertAdjacentHTML(
        "beforeend",
        `<Image src=${image} width="120" sizes="(min-width: 120px)" height="70" alt="child image" class="child-img-cottage !h-[70px] rounded-md"/ >`
      );
    }
  };
  if (!accessAToken) {
    return <Login/>
  }
  return (
    <>
      <div className="max-w-6xl mx-auto px-3 md:px-1">
        <div className="min-h-[20vh] flex flex-col justify-end items-start">
          <BreacdCrambs data={[{ slug: '', title: t('nav_home') }]} page={`${t('elon_qoshish')}`} />
          <h2 className='text-2xl md:text-3xl font-createRound'>{t('elon_qoshish')}</h2>
        </div>
        <div className="addnew">
          <h3 className="text-2xl md:text-3xl font-createRound mt-5">
            {AddNewPageLanguage.maintitle[language]}
          </h3>
          <form onSubmit={handlCottage} className='mt-2 md:mt-4'>
            <div className="addnew-imgs grid grid-cols-4 gap-2">
              <div className="addnew-box relative col-span-2 md:col-span-1 border overflow-hidden h-[150px] rounded-3xl">
                <label className="label-input-file absolute  w-full h-full flex items-center justify-center flex-col ">
                  <Input
                    type="file"
                    accept="image/*"
                    name="mainImage"
                    className="h-1 z-0 opacity-0"
                    onChange={handleMainImage}
                  />
                  <ImagePlus size={30} />
                  <p className="flex items-center justify-center text-xl md:text-2xl font-createRound">
                    {AddNewPageLanguage.mainPhoto[language]}
                  </p>
                </label>
                <Image
                  ref={mainImage}
                  className="!z-20 w-full hidden !h-[150px]"
                  src={''}
                  alt="add"
                  sizes="(min-width: 250px)"
                  width={250}
                  height={250}
                />
              </div>
              <div className="addnew-add h-[150px] col-span-2 md:col-span-1 relative border rounded-3xl cursor-pointer">
                <label className="label-input-file absolute bg-white rounded-3xl w-full h-full flex items-center justify-center flex-col">
                  <Input
                    type="file"
                    name="childimg"
                    multiple
                    accept="image/*"
                    className="w-1 h-1 opacity-0"
                    onChange={handlmultipleImg}
                  />
                  <ImagePlus size={30} />
                  <p className="addnew-add-text font-createRound text-xl">
                    {AddNewPageLanguage.addPhoto[language]}
                  </p>
                </label>
              </div>
              <div ref={childImagesWrapper} className="col-span-4 md:col-span-2 flex flex-wrap items-start gap-2">

              </div>
            </div>

            <div>
              <h3 className="mt-4 md:mt-6 text-2xl md:text-3xl font-createRound">{AddNewPageLanguage.cottageName[language]}</h3>
              <Input
                type="text"
                name="cottagename"
                className="add-new-title-main md:w-[50vw] mt-2 md:mt-4 form-input bg-white"
                placeholder={AddNewPageLanguage.name[language]}
              />
              <div className="w-full md:w-[40%] grid grid-cols-2 mt-2 md:mt-4 gap-2">
                <div className="mini-wrap-select">
                  <h3 className="addnew-label mb-2 font-semibold">
                    {AddNewPageLanguage.region[language]}
                  </h3>
                  <Select
                    name="region"
                    onValueChange={(value: string)=> setChoosRegion(value)}
                  >
                    <SelectTrigger className='w-full bg-white'>
                      <SelectValue placeholder= {AddNewPageLanguage.region[language]}/>
                    </SelectTrigger>
                    <SelectContent>
                      {region.data?.length &&
                        region.data.map((e: region) => (
                          <SelectItem key={e.id} value={e.id}>
                            {e.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="mini-wrap-select">
                  <h3 className="addnew-label mb-2 font-semibold">
                    {AddNewPageLanguage.Place[language]}
                  </h3>
                  <Select
                    disabled={!choosRegion}
                    name="place"
                  >
                    <SelectTrigger className="w-[180px] bg-white">
                      <SelectValue placeholder={AddNewPageLanguage.Place[language]} />
                    </SelectTrigger>
                    <SelectContent className='p-2 rounded-md'>
                      {placeByRegionId?.length &&
                        placeByRegionId.map((e: place) => (
                          <SelectItem key={e.id} value={e.id}>
                            {e.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <h5 className='text-xl md:text-2xl font-semibold mt-4 md:mt-6'>{AddNewPageLanguage.Price[language]}</h5>
              <div className="w-full md:w-[40%] flex gap-2 mt-2 md:mt-4">
                <Input
                  type="number"
                  name="price"
                  placeholder={AddNewPageLanguage.Price[language]}
                  className='bg-white'
                />
                <Input
                  type="number"
                  name="priceweekend"
                  placeholder={AddNewPageLanguage.weekendPrice[language]}
                  className='bg-white'
                />
              </div>
            </div>

            <h3 className="addnew-header text-xl md:text-2xl font-createRound mt-5 my-3">
              {AddNewPageLanguage.comforts[language]}
            </h3>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
              {comforts.data?.length &&
                comforts.data.map((e: comfort) => (
                  <label key={e.id} className="flex items-center gap-2">
                    <input
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      type="checkbox"
                      value={e.id}
                      onChange={handleCottageComforts}
                    />
                    <Image
                      className="bg-white rounded-sm"
                      width={20}
                      sizes="(min-width: 20px)"
                      height={20}
                      src={`${IMG_BASE_URL}${e.image}`}
                      alt="img"
                    />
                    <p className="text-lg">{e.name}</p>
                  </label>
                ))}
            </div>

            <h3 className="text-xl md:text-2xl font-createRound mt-4 md:mt-6">
              {AddNewPageLanguage.description[language]}
            </h3>
            <Textarea
              name="description"
              className="w-full md:w-[70%] h-[150px] md:h-[250px]  bg-white mt-2 md:mt-4"
              placeholder={AddNewPageLanguage.shortDescription[language]}
            />
            <Button type="submit" className=" p-2 w-full hover:bg-green-500 dark:text-white bg-green-600 md:w-[200px] text-lg mt-5 rounded-lg">
              {AddNewPageLanguage.save[language]}
            </Button>
          </form>
        </div>
      </div>
      <MiniNav />
    </>
  );
};

export default AddNew;