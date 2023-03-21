import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import "swiper/css/pagination";
import './swiper.scss';
import { FreeMode, Navigation, Thumbs, Pagination } from 'swiper';

type Props ={
  slide: [] | any,
  secondSlide: [] | any
}
export const Swipers = ({ slide, secondSlide }: Props) => {
  const [thumbsSwiper, setThumbsSwiper]: null | any = useState(null);

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={6}
        navigation={true}
        pagination={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Pagination, Navigation, Thumbs]}
        className='mySwiper2'
        data-test-id='slide-big'
      >
        {slide}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={5}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
        data-test-id='slide-mini'
      >
        {secondSlide}
      </Swiper>
    </>
  );
};
