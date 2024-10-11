import BreacdCrambs from '@/components/shared/breacd-crambs';
import { ALL_DATA } from '@/Query/get_all';
import { cottageUtils } from '@/utils/cottage.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';


// Images transform getbase64Full
async function getBase64Full(file) {
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
    const mainImage = useRef(null);

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
        toastify.successMessage(
          AddNewPageLanguage.cottageSuccess[languageChange]
        );
      },
      onError: (err) => {
        console.log(err, "err");
        if (err?.response?.status === 406) {
          authUtils.refreshAuth();
        }
        toastify.errorMessage(AddNewPageLanguage.cottageError[languageChange]);
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
    };
  
    const handlCottage = async (e) => {
      e.preventDefault();
  
      let images = [];
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
  
    // get Language
    const { languageChange } = useContext(LanguageContext);
    return (
        <div className="max-w-6xl mx-auto px-3 md:px-1">
            <div className="min-h-[20vh] flex flex-col justify-end items-start">
                <BreacdCrambs data={[{slug: '', title:'Home'}]} page="Add New"/>
                <h2 className='text-2xl md:text-3xl font-createRound'>Add new Cottage</h2>
            </div>
            <div className="">

            </div>
        </div>
    );
};

export default AddNew;