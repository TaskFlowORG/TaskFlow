"use client";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { RoundedCard } from "@/components/RoundedCard";
import { LandingPageCardContent } from "@/components/CardContent";
import { useSwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowSVG } from "@/components/LandingPage";
import { Carousel } from "./Carousel";
import { Default } from "./Default";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useTranslation } from "react-i18next";

export const HowWorks = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
    setWindowWidth(window.innerWidth);
  }, []);

  const {t} = useTranslation()

  function changeView(): number {
    return windowWidth > 768 ? 2 : 1;
  }

  return (
    <>
      <div className="flex flex-col w-full  items-center gap-8 lg:gap-16 " id="howworks">
        <h2 className="text-h3 font-alata w-full text-primary lg:text-h2 dark:text-white  text-center ">
         {t('taskflow-functionality')}
        </h2>
        {windowWidth < 1024 ? <Carousel change={changeView} /> : <Default />}
      </div>
    </>
  );
};
