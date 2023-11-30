import { Swiper, SwiperSlide, } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectFlip } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Unflipped } from './Unflipped';
import { Flipped } from './Flipped';
import './style.css'
import { useEffect, useState } from 'react';

export const FlippableCard = ({ title, img, content }) => {

    return (
        <Swiper
            effect={'flip'}
            grabCursor={true}
            modules={[EffectFlip, Pagination, Navigation]}
            className="mySwiper"
        >
            <SwiperSlide>
                <Unflipped img={img} title={title} />
            </SwiperSlide>
            <SwiperSlide>
                <Flipped content={content} />
            </SwiperSlide>

        </Swiper>
    )
}