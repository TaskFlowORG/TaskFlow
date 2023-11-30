'use client'


import { Headline } from "@/components/LandingPage"
import { HeadlineImage } from "@/components/LandingPage/Headline"
import { HowWorks } from "@/components/HowWorks"
import { Features } from "@/components/Features"
import { Dev } from "@/components/Dev"
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Principles } from "@/components/Principles"
import { Devs } from "@/components/Devs"

import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Footer } from "@/components/Footer"


export default function Home() {



  return (

    <div className=" flex flex-col items-center w-screen" >
      <div className="w-full h-full flex flex-col gap-[4rem] md:gap-[6.125rem]">
        <div className="flex flex-col 1.5xl:gap-16 lg:flex-row lg:items-center lg:justify-center">
          <Headline />
          <HeadlineImage />
        </div>
        <HowWorks />
        <Features />
        <Devs />
        <Principles />
        <Footer/> 
      </div>

    </div>

  )
}