import { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { getCroppedImg } from "@/utils/crop.utils";
import { useTranslation } from "react-i18next";

interface ImageCropperProps {
  src: string;
  onCrop: (croppedImage: File) => void;
  onImageUrl: (url: string) => void;
}

const ImageCropper = ({ src, onCrop, onImageUrl }: ImageCropperProps) => {
    const {t} = useTranslation()
  const [open, setOpen] = useState(true);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  useEffect(() => {
    if (src) {
      setOpen(true);
      // Har safar yangi rasm uchun holatlarni tiklash
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    }
  }, [src]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(async () => {
    try {
      if (!croppedAreaPixels) return;
      
      const croppedImage = await getCroppedImg(
        src,
        croppedAreaPixels,
        800,
        400  
      );
      
      const croppedFile = new File([croppedImage], "cropped-image.png", { 
        type: "image/png" 
      });
      
      if(croppedFile){
        setOpen(false);
        const imgURL = URL.createObjectURL(croppedImage);
        onCrop(croppedFile);
        onImageUrl(imgURL);
      }

     
      
    } catch (e) {
      console.error("Error cropping image: ", e);
    }
  }, [croppedAreaPixels, src, onCrop, onImageUrl]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger></DialogTrigger>
      <DialogContent className="overflow-hidden p-2 text-start">
        <DialogTitle className="text-start">{t('crop_image')}</DialogTitle>
        <div className="relative w-full h-[300px]">
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={16 / 7}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            restrictPosition={true} // Drag qilishni cheklash
            showGrid={false}
          />
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={getCroppedImage}
        >
          {t('crop_image_btn')}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropper;