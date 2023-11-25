"use client"

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { RoundedCard } from '@/components/RoundedCard';
import { LandingPageCardContent } from '@/components/CardContent';
import { useSwiperSlide } from 'swiper/react';
import { useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowSVG } from '@/components/LandingPage';


import { Swiper, SwiperSlide, } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



export default function testeSwiper() {

    const [windowWidth, setWindowWidth] = useState(0);
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)

        })
        setWindowWidth(window.innerWidth)
    }, [])

    const [image, setImage] = useState("project.jpg")

    function changeView() {
        return windowWidth > 768 ? 2 : 1
    }

    // const swiper = useSwiperSlide()
    return (
        <>
            <div className="flex flex-col w-full items-center gap-8 lg:gap-16">
                <h2 className="h3 w-full text-primary lg:text-[48px]  text-center ">Como o TaskFlow funciona?</h2>
                {windowWidth < 1024 ?
                    <>
                        <Swiper className="flex  justify-center items-center w-full h-max"
                            // install Swiper modules
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            slidesPerView={changeView()}
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
                    :

                    <div className="flex gap-16 p-8">
                        <div className="flex flex-col gap-12 xl:w-[550px]  2xl:w-[700px] ">
                            <RoundedCard changeImage={() => setImage("project.jpg")} color={"#F04A94"} >
                                <LandingPageCardContent color={"text-[#F04A94]"} title={"Projetos"} text={"Lorem ipsum dolor sit amet consectetur. In quis molestie a at placerat morbi vitae aenean. Viverra mauris imperdiet ac at habitant ut diam. Id id adipiscing aenean facilisi et mi. Viverra tristique ac bibendum arcu."} />
                            </RoundedCard>
                            <RoundedCard changeImage={() => setImage("moon.svg")} color={"#EA35BE"} >
                                <LandingPageCardContent color={"text-[#EA35BE]"} title={"Tarefas"} text={"Lorem ipsum dolor sit amet consectetur. In quis molestie a at placerat morbi vitae aenean. Viverra mauris imperdiet ac at habitant ut diam. Id id adipiscing aenean facilisi et mi. Viverra tristique ac bibendum arcu."} />
                            </RoundedCard>
                            <RoundedCard changeImage={() => setImage("language.svg")} color={"#E41CEF"} >
                                <LandingPageCardContent color={"text-[#E41CEF]"} title={"Propriedades"} text={"Lorem ipsum dolor sit amet consectetur. In quis molestie a at placerat morbi vitae aenean. Viverra mauris imperdiet ac at habitant ut diam. Id id adipiscing aenean facilisi et mi. Viverra tristique ac bibendum arcu."} />
                            </RoundedCard>
                        </div>
                        <div className='w-full'>
                            <img src={image} alt="" className='w-full' />
                        </div>
                    </div>

                }

            </div>
        </>
    );
};