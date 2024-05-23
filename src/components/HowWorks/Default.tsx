"use client";

import { RoundedCard } from "@/components/RoundedCard";
import { LandingPageCardContent } from "@/components/CardContent";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useTheme } from "next-themes";


export const Default = () => {
    const {t} = useTranslation()
    const {theme} = useTheme()

    const functions = [
      {
        img: "projectsSide.svg",
        imgDark:"projectsSideDark.svg",
        color: "#F04A94",
        text: t('platform-focus'),
        title: t('projects'),
        dark: "#FF871A",
      },
      {
        img:"tasksSide.svg",
        imgDark:"tasksSideDark.svg" ,
        color: "#EA35BE",
        text: t('tasks-description'),
        title: t('tasks'),
        dark: "#D7541C",
      },
      {
        img: "propertiesSide.svg",
        imgDark:"propertiesSideDark.svg" ,
        color: "#E41CEF",
        text: t('properties-importance'),
        title: t('property'),
        dark: "#F76858",
      },
    ];


    const [image, setImage] = useState<string>("projectsSide.svg");
    const [imageDark, setImageDark] = useState<string>("projectsSideDark.svg");
  return (
    <div className="flex gap-16 p-8">
      <div className="flex flex-col items-end  gap-12 w-max  ">
        {functions.map((card, index) => {
          return (
            <RoundedCard
              key={index}
              dark={card.dark}
              changeImage={() => {setImage(card.img); setImageDark(card.imgDark)}}
              color={card.color}
            >
              <LandingPageCardContent
                color={card.color}
                dark={card.dark}
                title={card.title}
                text={card.text}
              />
            </RoundedCard>
          );
        })}
      </div>

      <div className='relative  w-[550px] 1.5xl:w-[700px] h-full shadowww'>
                    <Image src={theme == 'light' ? image : imageDark} fill alt="How Works" objectFit='cover' layout='fill' objectPosition='center' />
            </div>

    </div>
  );
};

