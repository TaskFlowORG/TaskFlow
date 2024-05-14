import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { RoundedCard } from "@/components/RoundedCard";
import { LandingPageCardContent } from "@/components/CardContent";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

interface Props {
  change: () => number;
}

export const Carousel = ({ change }: Props) => {
    
  const [image, setImage] = useState<string>("project.jpg");
  const {t} = useTranslation()

  const functions = [
    {
      img: "project.jpg",
      color: "#F04A94",
      text: t('platform-focus'),
      title: "Projetos",
      dark: "#FF871A",
    },
    {
      img: "moon.svg",
      color: "#EA35BE",
      text: t('tasks-description'),
      title: "Tarefas",
      dark: "#D7541C",
    },
    {
      img: "language.svg",
      color: "#E41CEF",

      text: t('properties-importance'),
      title: "Propriedades",
      dark: "#F76858",
    },
  ];

  return (
    <>
      <Swiper
        className="flex  justify-center items-center w-full h-max"
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={change()}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={(swiper) => console.log(swiper.activeIndex)}
      >
        {functions.map((slide, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="p-4 flex justify-center w-full">
                <RoundedCard
                  changeImage={() => setImage(slide.img)}
                  dark={slide.dark}
                  color={slide.color}
                >
                  <LandingPageCardContent
                    color={slide.color}
                    dark={slide.dark}
                    title={slide.title}
                    text={slide.text}
                  />
                </RoundedCard>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="w-full p-8">
        <img src={image} alt="" className="w-full" />
      </div>
    </>
  );
};
