'use client'

import BreacdCrambs from '@/components/shared/breacd-crambs';
import { AddNewPageLanguage } from '@/constants/language';
import { ALL_DATA } from '@/Query/get_all';
import useLanguageStore from '@/store/language-provider';
import { cottageUtils } from '@/utils/cottage.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import Dacha3 from '../../../assets/dacha3.png'
import { ImagePlus } from 'lucide-react';
import { IMG_BASE_URL } from '@/constants/server';
import { toast } from 'sonner';
import { authUtils } from '@/utils/auth.utils';
import { QUERY_KEYS } from '@/Query/query-keys';
import { cottage, langKey } from '@/types';
import { Input } from '@/components/ui/input';


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
    const mainImage:React.MutableRefObject<null> = useRef(null);
    // get Language
    const store = useLanguageStore()
    const language: langKey = store.language

    const childImagesWrapper = useRef(null);
  
    const [cottageInfo, setCottageInfo] = useState({
      dachaType: [],
      response: [],
    });
  
    const [cottageComforts, setcottageComforts] = useState({
      comforts: [],
      response: [],
    });
  
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
      },
      onError: (err) => {
        console.log(err, "err");
        if (err?.response?.status === 406) {
          authUtils.refreshAuth();
        }
        toast.error(AddNewPageLanguage.cottageError[language]);
      },
    });
  
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
        cottageType: cottageInfo.response,
        comforts: cottageComforts.response,
        description: e.target.description.value,
        lattitude: "" || undefined,
        longitude: "" || undefined,
      });
  
      childImagesWrapper.current.innerHTML = "";
      mainImage.current.setAttribute("src", Dacha3);
      e.target.reset();
    };
  
    const handleMainImage = async (e) => {
      const mainImgUrl = await getBase64Full(e.target.files[0]);
      mainImage.current.classList.remove("d-none");
      mainImage.current.setAttribute("src", mainImgUrl);
    };
  
    const handlmultipleImg = async (e) => {
      const images = [];
      for (let i = 0; i < e.target.files.length; i++) {
        images.push(await getBase64Full(e.target.files[i]));
      }
      for (const image of images) {
        childImagesWrapper.current.insertAdjacentHTML(
          "beforeend",
          `<img src=${image} width="100" height="100" alt="child image" className="overflow-hidden"/>`
        );
      }
    };
   
        return (
        <div className="max-w-6xl mx-auto px-3 md:px-1">
            <div className="min-h-[20vh] flex flex-col justify-end items-start">
                <BreacdCrambs data={[{slug: '', title:'Home'}]} page="Add New"/>
                <h2 className='text-2xl md:text-3xl font-createRound'>Add new Cottage</h2>
            </div>
            <div className="addnew">
          <h3 className="addnew-header">
            {AddNewPageLanguage.maintitle[language]}
          </h3>
          <form onSubmit={handlCottage}>
            <div className="addnew-imgs">
              <div className="addnew-box">
                <label className="addnew-img-bg label-input-file">
                  <Input
                    type="file"
                    accept="image/*"
                    name="mainImage"
                    className="input-file"
                    onChange={handleMainImage}
                  />
                  <p className="addnew-img-text">
                    {AddNewPageLanguage.mainPhoto[language]}
                  </p>
                </label>
                <Image
                  ref={mainImage}
                  className="addnew-img"
                  src={Dacha3}
                  alt="add"
                  
                />
              </div>
              <div className="addnew-add">
                <label className="label-input-file">
                  <Input
                    type="file"
                    name="childimg"
                    multiple
                    accept="image/*"
                    className="input-file"
                    onChange={handlmultipleImg}
                  />
                  <ImagePlus/>
                  <p className="addnew-add-text">
                    {AddNewPageLanguage.addPhoto[language]}
                  </p>
                </label>
              </div>
              <div ref={childImagesWrapper} className="image-child-wrap "></div>
            </div>

            <div>
              <h3 className="addnew-header">
                {AddNewPageLanguage.typeCottage[language]}
              </h3>
              <h5>{AddNewPageLanguage.cottageName[language]}</h5>
              <Input
                type="text"
                name="cottagename"
                className="add-new-title-main my-4 form-input"
                placeholder={AddNewPageLanguage.name[language]}
              />
              <div className="flex justify-between ">
                <div className="mini-wrap-select">
                  <h3 className="addnew-label mb-3">
                    {AddNewPageLanguage.region[language]}
                  </h3>
                  <select
                    name="region"
                    className="addnew-select form-select w-100"
                  >
                    {region.data?.length &&
                      region.data.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="mini-wrap-select">
                  <h3 className="addnew-label mb-3">
                    {AddNewPageLanguage.Place[language]}
                  </h3>
                  <select
                    name="place"
                    className="addnew-select  d-block form-select w-100"
                  >
                    {place.data?.length &&
                      place.data.map((e) => (
                        <option key={e.id} name="place" value={e.id}>
                          {e.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <h5>{AddNewPageLanguage.Price[language]}</h5>
              <div className="price-wrap  d-flex gap-2 mb-4">
                <input
                  type="number"
                  name="price"
                  className="form-control w-100"
                  placeholder={AddNewPageLanguage.Price[language]}
                />
                <input
                  type="number"
                  name="priceweekend"
                  className="form-control w-100"
                  placeholder={AddNewPageLanguage.weekendPrice[language]}
                />
              </div>

              <h3 className="addnew-label mb-3">
                {AddNewPageLanguage.dachaType[language]}
              </h3>
              <div className="addnew-inner">
                {cottageType.data?.length &&
                  cottageType.data.map((e) => (
                    <label key={e.id} className="addnew-inner-check">
                      <input
                        className="form-check-input checkboxComfort"
                        type="checkbox"
                        value={e.id}
                        name="cottagetype"
                        onChange={handlChoseCottageType}
                      />
                      <span>{e.name}</span>
                    </label>
                  ))}
              </div>
            </div>

            <h3 className="addnew-header">
              {AddNewPageLanguage.comforts[language]}
            </h3>

            <div className="addnew-objects">
              {comforts.data?.length &&
                comforts.data.map((e) => (
                  <label key={e.id} className="addnew-object">
                    <input
                      className="form-check-input checkboxComfort"
                      type="checkbox"
                      value={e.id}
                      onChange={handleCottageComforts}
                    />
                    <Image
                      className="bg-white rounded-1"
                      width={20}
                      height={20}
                      src={`${IMG_BASE_URL}${e.image}`}
                      alt="img"
                    />
                    <p className="addnew-object-text">{e.name}</p>
                  </label>
                ))}
            </div>

            <h3 className="addnew-header">
              {AddNewPageLanguage.description[language]}
            </h3>
            <textarea
              name="description"
              className="addnew-message"
              placeholder={AddNewPageLanguage.shortDescription[language]}
            />
            <button type="submit" className="soxranit">
              {AddNewPageLanguage.save[language]}
            </button>
          </form>
        </div>
        </div>
    );
};

export default AddNew;