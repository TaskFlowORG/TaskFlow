import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFlip,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Unflipped } from "./Unflipped";
import { Flipped } from "./Flipped";
import "./style.css";
import { useEffect, useState } from "react";

interface Props {
  title: string;
  description: string;
  img: string;
  content: string;
}

export const FlippableCard = ({ title, img, content, description }: Props) => {
  const [page, setPage] = useState(1);
  return (
    <Swiper
      effect={"flip"}
      grabCursor={true}
      modules={[EffectFlip, Pagination, Navigation, A11y]}
      className=""
      navigation={{
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      }}
    >
      <SwiperSlide>
        <Unflipped img={img} title={title} />
      </SwiperSlide>

      <SwiperSlide>
        <Flipped title={description} content={content} />
      </SwiperSlide>
    </Swiper>
  );
};
