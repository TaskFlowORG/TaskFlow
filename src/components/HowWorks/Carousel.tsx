import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { RoundedCard } from "@/components/RoundedCard";
import { LandingPageCardContent } from "@/components/CardContent";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

import Image from "next/image";

interface Props {
  change: () => number;
}

export const Carousel = ({ change }: Props) => {
  const { theme } = useTheme();

  const [image, setImage] = useState<string>("projectsSide.svg");
  const [imageDark, setImageDark] = useState<string>("projectsSideDark.svg");
  const { t } = useTranslation();

  const functions = [
    {
      img: "projectsSide.svg",
      imgDark: "projectsSideDark.svg",
      color: "#F04A94",
      text: t("platform-focus"),
      title: t("projects"),
      dark: "#FF871A",
    },
    {
      img: "tasksSide.svg",
      imgDark: "tasksSideDark.svg",
      color: "#EA35BE",
      text: t("tasks-description"),
      title: t("tasks"),
      dark: "#D7541C",
    },
    {
      img: "propertiesSide.svg",
      imgDark: "propertiesSideDark.svg",
      color: "#E41CEF",
      text: t("properties-importance"),
      title: t("property"),
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
      >
        {functions.map((slide, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="p-4 flex justify-center w-full">
                <RoundedCard
                  changeImage={() => {
                    setImage(slide.img);
                    setImageDark(slide.imgDark);
                  }}
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
        <div className="w-full">
          <Image
            src={theme == "light" ? "/" + image : "/" + imageDark}
            alt=""
            fill
          />
        </div>
      </div>
    </>
  );
};
