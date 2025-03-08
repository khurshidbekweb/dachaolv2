import Image from 'next/image';
import React, { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import { FaUpload } from "react-icons/fa";

const CropperImage = ({onImageCropped}) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const fileInputRef = useRef(null);
    const [croppedImageUrl, setCroppedImageUrl] = useState(null); 

    // Fayl yuklash
    const onFileChange = async (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            const imageDataUrl = await readFile(file);
            setImageSrc(imageDataUrl);
        }
    };

    // Faylni o'qib, dataURL formatiga o‘girish
    const readFile = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });
    };

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    // Kesilgan rasmni yaratish
    const getCroppedImage = async () => {
        try {
            if (!imageSrc || !croppedAreaPixels) return;

            const croppedBlob = await cropImage(imageSrc, croppedAreaPixels);
            const croppedImageUrl = URL.createObjectURL(croppedBlob); 
            const croppedFile = new File([croppedBlob], "cropped-image.jpg", { type: "image/jpeg" });
            setCroppedImageUrl(croppedImageUrl);
            onImageCropped(croppedFile); 
        } catch (error) {
            console.error("Rasmni crop qilishda xatolik:", error);
        }
    };

    // Rasmni kesish va `Blob` formatida qaytarish
    const cropImage = (imageSrc, cropAreaPixels) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = imageSrc;
            image.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                canvas.width = cropAreaPixels.width;
                canvas.height = cropAreaPixels.height;

                ctx.drawImage(
                    image,
                    cropAreaPixels.x,
                    cropAreaPixels.y,
                    cropAreaPixels.width,
                    cropAreaPixels.height,
                    0,
                    0,
                    cropAreaPixels.width,
                    cropAreaPixels.height
                );

                canvas.toBlob((blob) => {
                    if (blob) resolve(blob);
                    else reject(new Error("Blob yaratib bo‘lmadi"));
                }, "image/jpeg");
            };
            image.onerror = (error) => reject(error);
        });
    };

    return (
        <div>
            {/* Fayl yuklash inputi */}
            <label className="file-input-label d-block w-25 text-center mb-2">
                <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    ref={fileInputRef}
                    className="file-input"
                />
                <FaUpload size={25} />
                <span>Main Image</span>
            </label>
            {imageSrc && !croppedImageUrl && (
                <div style={{ width: "100%", height: "300px", position: "relative" }}>
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={16 / 7} // Faqat 16:9 formatda crop qilish
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                        cropShape="rect"
                        showGrid={true}
                    />
                </div>
            )}

            {/* Kesilgan rasmni backendga yuborish */}
            {imageSrc && !croppedImageUrl && (
                <button type="button" onClick={getCroppedImage}>Rasmni saqlash</button>
            )}

            {/* Kesilgan rasm preview */}
            {croppedImageUrl && (
                    <Image src={croppedImageUrl} alt="Kesilgan rasm" style={{ width: "200px", height: "auto", border: "1px solid #ccc", borderRadius: "5px", marginTop: "10px" }} />                
            )}
        </div>
    );
};

export default CropperImage;