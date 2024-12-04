import React from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';

interface IImageSliderProps {
  images: { src: string; alt: string }[];
}

const ImageSlider: React.FC<IImageSliderProps> = ({ images }) => {
  const defaultWidth = 500;
  const defaultHeight = 500;
  return (
    <Carousel autoplay dots={false}>
      {images.map((image, index) => (
        <div key={index} className='h-screen pt-16'>
          <Image
            src={image.src}
            alt={image.alt}
            width={defaultWidth}
            height={defaultHeight}
            className='h-full w-full'
            priority={index === 0}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
