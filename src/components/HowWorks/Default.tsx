"use client";

import { RoundedCard } from "@/components/RoundedCard";
import { LandingPageCardContent } from "@/components/CardContent";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Default = () => {
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

  const [image, setImage] = useState<string>("project.jpg");

  return (
    <div className="flex gap-16 p-8">
      <div className="flex flex-col gap-12 xl:w-[550px]  1.5xl:w-[700px] ">
        {functions.map((card, index) => {
          return (
            <RoundedCard
              key={index}
              dark={card.dark}
              changeImage={() => setImage(card.img)}
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
      <div className="w-full">
        <img src={image} alt="" className="w-full" />
      </div>
    </div>
  );
};
