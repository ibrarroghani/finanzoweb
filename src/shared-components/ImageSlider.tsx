import React from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';

const ImageSlider: React.FC = () => {
  return (
    <Carousel autoplay>
      <div className='h-screen pt-16'>
        <Image
          src='/images/slide-image1.svg'
          alt='slider image'
          width={500}
          height={300}
          className='h-full w-full'
        />
      </div>
      <div className='h-screen pt-16'>
        <Image
          src='/images/slide-image1.svg'
          alt='slider image'
          width={500}
          height={500}
          className='h-full w-full'
        />
      </div>
      <div className='h-screen pt-16'>
        <Image
          src='/images/slide-image1.svg'
          alt='slider image'
          width={500}
          height={500}
          className='h-full w-full'
        />
      </div>
      <div className='h-screen pt-16'>
        <Image
          src='/images/slide-image1.svg'
          alt='slider image'
          width={500}
          height={500}
          className='h-full w-full'
        />
      </div>
    </Carousel>
  );
};

export default ImageSlider;
