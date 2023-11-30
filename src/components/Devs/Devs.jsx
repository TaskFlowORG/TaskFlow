import { Dev } from "@/components/Dev"
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

export const Devs = () => {

    const devs = [
        {
          name: "Jonatas",
          description: "Lorem ipsum dolor sit amet consectetur. Vel dignissim mauris elementum tellus a. Eu amet volutpat donec elementum magnis volutpat facilisi in pharetra"
        },
        {
          name: "Luka",
          description: "Lorem ipsum dolor sit amet consectetur. Vel dignissim mauris elementum tellus a. Eu amet volutpat donec elementum magnis volutpat facilisi in pharetra"
        },
        {
          name: "Heloísa",
          description: "Lorem ipsum dolor sit amet consectetur. Vel dignissim mauris elementum tellus a. Eu amet volutpat donec elementum magnis volutpat facilisi in pharetra"
        },
        {
          name: "Becker",
          description: "Lorem ipsum dolor sit amet consectetur. Vel dignissim mauris elementum tellus a. Eu amet volutpat donec elementum magnis volutpat facilisi in pharetra"
        },
        {
          name: "Marquardt",
          description: "Lorem ipsum dolor sit amet consectetur. Vel dignissim mauris elementum tellus a. Eu amet volutpat donec elementum magnis volutpat facilisi in pharetra"
        },
      ]

    return (
        <div className="w-full flex flex-col items-center gap-[5rem] py-10">
            <h2 className="h3 md:text-[48px] text-primary self-center dark:text-white">Conheça nossos desenvolvedores!</h2>

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
                        devs.map((slide, index) => {
                            return (

                                <SwiperSlide key={index} className="">
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
    )
}