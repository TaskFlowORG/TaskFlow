"use client"

import { useState } from "react"
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { RoundedCard } from '@/components/RoundedCard';
import { LandingPageCardContent } from '@/components/CardContent';

export const Carousel = ({change}) => {

    const [image, setImage] = useState("project.jpg")


    return (
        <>
            <Swiper className="flex  justify-center items-center w-full h-max"
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={change()}
                pagination={{ clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={(swiper) => console.log(swiper.activeIndex)}
            >
                <SwiperSlide>
                    <div className='p-4 flex justify-center w-full'>
                        <RoundedCard changeImage={() => setImage("project.jpg")} color={"#F04A94"} >
                            <LandingPageCardContent color={"text-[#F04A94]"} title={"Projetos"}
                                text={"Lorem ipsum dolor sit amet consectetur. In quis molestie a at placerat morbi vitae aenean. Viverra mauris imperdiet ac at habitant ut diam. Id id adipiscing aenean facilisi et mi. Viverra tristique ac bibendum arcu."} />
                        </RoundedCard>
                    </div>

                </SwiperSlide>
                <SwiperSlide>
                    <div className='p-4 flex justify-center w-full'>
                        <RoundedCard changeImage={() => setImage("moon.svg")} color={"#EA35BE"} >
                            <LandingPageCardContent color={"text-[#EA35BE]"} title={"Tarefas"}
                                text={"Lorem ipsum dolor sit amet consectetur. In quis molestie a at placerat morbi vitae aenean. Viverra mauris imperdiet ac at habitant ut diam. Id id adipiscing aenean facilisi et mi. Viverra tristique ac bibendum arcu."} />
                        </RoundedCard>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='p-4 flex justify-center w-full'>
                        <RoundedCard changeImage={() => setImage("language.svg")} color={"#E41CEF"} >
                            <LandingPageCardContent color={"text-[#E41CEF]"} title={"Propriedades"}
                                text={"Lorem ipsum dolor sit amet consectetur. In quis molestie a at placerat morbi vitae aenean. Viverra mauris imperdiet ac at habitant ut diam. Id id adipiscing aenean facilisi et mi. Viverra tristique ac bibendum arcu."} />
                        </RoundedCard>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div className='w-full p-8'>
                <img src={image} alt="" className='w-full' />
            </div>
        </>
    )
}