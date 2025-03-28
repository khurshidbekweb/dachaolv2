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
import { QUERY_KEYS } from '@/Query/query-keys';
import { comfort, cottageType, footerLang, langKey, place, region } from '@/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import MiniNav from '@/components/shared/mini-nav';
import { safeLocalStorage } from '@/utils/safeLocalstorge';
import { useRouter } from 'next/navigation';
import Login from '../login/page';
import { useTranslation } from 'react-i18next';
import DachaMap from '../_components/add-map';
import ImageCropper from '@/components/modal/cropper-image';

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
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [file, setFile] = useState<File| null>(null)
  const [mainImage, setMainIMage] = useState<File | null>(null)
  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null)
  const route = useRouter()
  const store = useLanguageStore()
  const {t} = useTranslation()
  const language: langKey = store.language as keyof footerLang;
  const accessAToken = safeLocalStorage.getItem('accessToken')
  const childImagesWrapper = useRef(null);
  const [location, setLocation] = useState({
    latitude: "",
    longitude: ""
  })
  const [cottageComforts, setcottageComforts] = useState({
    comforts: [],
    response: [],
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setOriginalImage(URL.createObjectURL(selectedFile)); 
    }
}
  // Query 
  const queryClient = useQueryClient();
  const region = ALL_DATA.useRegion();
 
  const comforts = ALL_DATA.useComforts();
  const cottage = useMutation({
    mutationFn: cottageUtils.postCottage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottages] });
      toast.success(
        AddNewPageLanguage.cottageSuccess[language]
      );
      setMainIMage(null)
    },
    onError: (err) => {
      console.log(err, "err");
      toast.error(AddNewPageLanguage.cottageError[language]);
    },
  });

  //Region chacked
  const [choosRegion, setChoosRegion] = useState<string>('')
  const placeByRegionId = ALL_DATA.usePlaceById(choosRegion)?.data
  


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

  const handleLocationSelect = (location) => {
    setLocation(
            {
              latitude: location.lat,
              longitude: location.lng,
            }
    );
  };
  console.log(mainImage);
  
  const handlCottage = async (e) => {
    e.preventDefault();

    const images = [];
    for (let i = 0; i < e.target.childimg.files.length; i++) {
      images.push(e.target.childimg.files[i]);
    }

    cottage.mutate({
      name: e.target.cottagename.value,
      images: images,
      mainImage: mainImage,
      placeId: e.target.place.value,
      regionId: e.target.region.value,
      price: +e.target.price.value,
      priceWeekend: +e.target.priceweekend.value,
      cottageType: ["c4c301b1-4719-499e-bde2-2c36715fae9e"],
      comforts: cottageComforts.response,
      description: e.target.description.value,
      latitude: location.latitude,
      longitude: location.longitude
    });
    console.log(cottage.variables);
    // localStorage.setItem('dacha', JSON.stringify(cottage.variables))
    // childImagesWrapper.current.innerHTML = "";
    // e.target.reset();
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
                <label className="cursor-pointer absolute  w-full h-full flex items-center justify-center flex-col ">    
                <Input
                    type="file"
                    name="image"                    
                    accept="image/*"
                    className="w-1 h-1 opacity-0"
                    onChange={handleFileChange}
                  />              
                  <ImagePlus size={30} />
                  <p className="flex items-center justify-center text-xl md:text-2xl font-createRound">
                    {AddNewPageLanguage.mainPhoto[language]}
                  </p>
                </label>
                {originalImage && file && (
                  <ImageCropper src={originalImage} onCrop={setMainIMage} onImageUrl={setMainImageUrl} />
                )}
                {mainImageUrl && <Image
                  className="!z-20 w-full h-full object-cover inline"
                  src={mainImageUrl}
                  alt="add"
                  sizes="(min-width: 250px)"
                  width={250}
                  height={250}
                />}
              </div>
              <div className="addnew-add h-[150px] col-span-2 md:col-span-1 relative border rounded-3xl cursor-pointer">
                <label className="label-input-file absolute bg-white dark:bg-[#161f309c] rounded-3xl w-full h-full flex items-center justify-center flex-col">
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
              required
                type="text"
                name="cottagename"
                className="add-new-title-main md:w-[50vw] mt-2 md:mt-4 form-input bg-white dark:bg-[#161f309c]"
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
                    <SelectTrigger className='w-full bg-white dark:bg-[#161f309c]'>
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
                    <SelectTrigger className="w-[180px] bg-white dark:bg-[#161f309c]">
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
                  className='bg-white dark:bg-[#161f309c]'
                />
                <Input
                  type="number"
                  name="priceweekend"
                  placeholder={AddNewPageLanguage.weekendPrice[language]}
                  className='bg-white dark:bg-[#161f309c]'
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
            <h2 className='my-4'>Xarita qo`shish</h2>
            <DachaMap onLocationSelect={handleLocationSelect}/>
            <h3 className="text-xl md:text-2xl font-createRound mt-4 md:mt-6">
              {AddNewPageLanguage.description[language]}
            </h3>            
            <Textarea
              name="description"
              className="w-full md:w-[70%] h-[150px] md:h-[250px]  bg-white mt-2 md:mt-4 dark:bg-[#161f309c]"
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