"use client"

import { useState } from "react"
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { RoundedCard } from '@/components/RoundedCard';
import { LandingPageCardContent } from '@/components/CardContent';

export const Carousel = ({ change }) => {

    const [image, setImage] = useState("project.jpg")

    const functions = [
        {
            img: "project.jpg",
            color: "#F04A94",
            text: "Lorem ipsum dolor sit amet consectetur. In quis molestie a at placerat morbi vitae aenean. Viverra mauris imperdiet ac at habitant ut diam. Id id adipiscing aenean facilisi et mi. Viverra tristique ac bibendum arcu.",
            title: "Projetos"
        },
        {
            img: "moon.svg",
            color: "#EA35BE",
            text: "Lorem ipsum dolor sit amet consectetur. In quis molestie a at placerat morbi vitae aenean. Viverra mauris imperdiet ac at habitant ut diam. Id id adipiscing aenean facilisi et mi. Viverra tristique ac bibendum arcu.",
            title: "Tarefas"
        },
        {
            img: "language.svg",
            color: "#E41CEF",
            text: "Lorem ipsum dolor sit amet consectetur. In quis molestie a at placerat morbi vitae aenean. Viverra mauris imperdiet ac at habitant ut diam. Id id adipiscing aenean facilisi et mi. Viverra tristique ac bibendum arcu.",
            title: "Propriedades"
        },

    ]


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
                {
                    functions.map((slide) => {
                        return (
                            <SwiperSlide>
                                <div className='p-4 flex justify-center w-full'>
                                    <RoundedCard changeImage={() => setImage(slide.img)} color={slide.color} >
                                        <LandingPageCardContent color={`text-[${slide.color}]`} title={slide.title}
                                            text={slide.text} />
                                    </RoundedCard>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }

            </Swiper>

            <div className='w-full p-8'>
                <img src={image} alt="" className='w-full' />
            </div>
        </>
    )
}