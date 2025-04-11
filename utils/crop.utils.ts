// cropUtils.ts
export async function getCroppedImg(
    imageSrc: string,
    pixelCrop: any,
    width: number,
    height: number
  ): Promise<Blob> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Berilgan width va height bo'yicha canvas o'lchamini belgilash
    canvas.width = width;
    canvas.height = height;
  
    // Rasmni qirqib olish va berilgan o'lchamga moslashtirish
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      width,
      height
    );
  
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('Canvas is empty');
        }
        resolve(blob);
      }, 'image/png');
    });
  }
  
  function createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.src = url;
    });
  }