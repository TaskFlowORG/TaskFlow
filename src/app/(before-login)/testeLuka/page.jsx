'use client'

import { Headline } from "@/components/LandingPage"
import { HeadlineImage } from "@/components/LandingPage/Headline"
import { HowWorks } from "@/components/HowWorks"

import { Features } from "@/components/Features"
import { useState } from "react"
import { Dev } from "@/components/Dev"
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectFlip } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


export default function Home() {

  const devs = [
    {
      name: "jackson",
      description: "Lorem ipsum dolor sit amet consectetur. Vel dignissim mauris elementum tellus a. Eu amet volutpat donec elementum magnis volutpat facilisi in pharetra"
    },
    {
      name: "carol",
      description: "Lorem ipsum dolor sit amet consectetur. Vel dignissim mauris elementum tellus a. Eu amet volutpat donec elementum magnis volutpat facilisi in pharetra"
    },
    {
      name: "robbin",
      description: "Lorem ipsum dolor sit amet consectetur. Vel dignissim mauris elementum tellus a. Eu amet volutpat donec elementum magnis volutpat facilisi in pharetra"
    },
    {
      name: "will",
      description: "Lorem ipsum dolor sit amet consectetur. Vel dignissim mauris elementum tellus a. Eu amet volutpat donec elementum magnis volutpat facilisi in pharetra"
    },
    {
      name: "thiago",
      description: "Lorem ipsum dolor sit amet consectetur. Vel dignissim mauris elementum tellus a. Eu amet volutpat donec elementum magnis volutpat facilisi in pharetra"
    },
  ]

  return (
    <div className=" flex flex-col items-center w-screen" >
      <div className="w-full h-full flex flex-col gap-[4rem] md:gap-[6.125rem]">
        <div className="flex flex-col 2xl:gap-16 lg:flex-row lg:items-center lg:justify-center">
          <Headline />
          <HeadlineImage />
        </div>
        <HowWorks />
        <Features />
        <div className="w-full flex flex-col items-center gap-[5rem] py-10">
          <h2 className="h3 md:text-[48px] text-primary self-center">Conheça nossos desenvolvedores!</h2>

          <div className="flex gap-3 P-8 h-max items-center">
            <Swiper className="flex  gap-8  max-w-[1018px]  h-max items-center  w-full justify-center"
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={3}
              navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }}
              pagination={{ clickable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={(swiper) => console.log(swiper.activeIndex)}

            >

              {
                devs.map((slide) => {
                  return (

                    <SwiperSlide className="">
                      <Dev name={slide.name} description={slide.description} />
                    </SwiperSlide>

                  )
                })
              }
              <div className="swiper-button-prev "></div>
              <div className="swiper-button-next"></div>
            </Swiper>
          </div>
        </div>
        <div className="flex flex-col items-center gap-[5rem]">
          <h2 className="h3 md:text-[48px] text-primary self-center">Princípios</h2>

          <div id="cocotinha" className="flex justify-between w-full relative max-w-[957px]">
            <img src="prank.svg" alt="" className="absolute z-[1] bottom-[-64px] left-[-74px]" />

            <Swiper
              effect={'flip'}
              grabCursor={true}

              modules={[EffectFlip, Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="p-2 border-2 shadowww z-[10] bg-white  border-primary rounded-md">
                  <div className=" px-16 pt-12 w-max z-[11] h-max min-h-[313px] bg-white rounded-md shadowww">
                    <div className="flex gap-6 flex-col justify-center">
                      <img src="missao.png" alt="" />
                      <p className="h4 text-primary text-center">Missão</p>
                    </div>

                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="p-2 border-2 shadowww z-[10] bg-white  border-primary rounded-md">
                  <div className=" max-w-[236px] w-max z-[11] h-max min-h-[313px] flex items-center p-4 bg-white rounded-md shadowww">
                    <div className="flex gap-6 flex-col justify-center items-center h-full">

                      <p className="h4  h-full text-primary text-center">Lorem ipsum dolor sit amet consectetur. Nunc nullam praesent posuere eu sed ullamcorper et.</p>
                    </div>

                  </div>
                </div>
              </SwiperSlide>

            </Swiper>
            <Swiper
              effect={'flip'}
              grabCursor={true}

              modules={[EffectFlip, Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="p-2 border-2 shadowww z-[10] bg-white  border-primary rounded-md">
                  <div className=" px-16 pt-12 w-max z-[11] h-max min-h-[313px] bg-white rounded-md shadowww">
                    <div className="flex gap-6 flex-col justify-center">
                      <img src="missao.png" alt="" />
                      <p className="h4 text-primary text-center">Missão</p>
                    </div>

                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="p-2 border-2 shadowww z-[10] bg-white  border-primary rounded-md">
                  <div className=" max-w-[236px] w-max z-[11] h-max min-h-[313px] flex items-center p-4 bg-white rounded-md shadowww">
                    <div className="flex gap-6 flex-col justify-center items-center h-full">

                      <p className="h4  h-full text-primary text-center">Lorem ipsum dolor sit amet consectetur. Nunc nullam praesent posuere eu sed ullamcorper et.</p>
                    </div>

                  </div>
                </div>
              </SwiperSlide>

            </Swiper>
            <Swiper
              effect={'flip'}
              grabCursor={true}

              modules={[EffectFlip, Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="p-2 border-2 shadowww z-[10] bg-white  border-primary rounded-md">
                  <div className=" px-16 pt-12 w-max z-[11] h-max min-h-[313px] bg-white rounded-md shadowww">
                    <div className="flex gap-6 flex-col justify-center">
                      <img src="missao.png" alt="" />
                      <p className="h4 text-primary text-center">Missão</p>
                    </div>

                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="p-2 border-2 shadowww z-[10] bg-white  border-primary rounded-md">
                  <div className=" max-w-[236px] w-max z-[11] h-max min-h-[313px] flex items-center p-4 bg-white rounded-md shadowww">
                    <div className="flex gap-6 flex-col justify-center items-center h-full">

                      <p className="h4  h-full text-primary text-center">Lorem ipsum dolor sit amet consectetur. Nunc nullam praesent posuere eu sed ullamcorper et.</p>
                    </div>

                  </div>
                </div>
              </SwiperSlide>

            </Swiper>




            <img src="prank.svg" alt="" className="absolute z-[1] top-[-50px] rotate-180 right-[-70px]" />
          </div>
        </div>
      </div>
    </div>
  )
}