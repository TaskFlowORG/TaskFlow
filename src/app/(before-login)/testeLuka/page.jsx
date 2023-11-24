'use client'

import { RoundedCard } from "@/components/RoundedCard"
import { LandingPageCardContent } from "@/components/CardContent"
import { useState } from "react"
import { Function } from "@/components/Function"
import { Button } from "@/components/Button"
import { Headline } from "@/components/LandingPage"
import { HeadlineImage } from "@/components/LandingPage/Headline"
import { ArrowSVG } from "@/components/LandingPage"
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Home() {

  const [image, setImage] = useState("project.jpg")

  return (
    <div className=" flex flex-col items-center w-screen" onClick={() => {
      console.log(document.querySelector("#bomdia").value)
    }}>
      <div id="bomdia" className="w-full h-full flex flex-col gap-[6.125rem]">
        <div className="flex flex-col 2xl:gap-16 lg:flex-row lg:items-center lg:justify-center">
          <Headline />
          <HeadlineImage />
        </div>
        <div className="flex flex-col w-full items-center gap-[4.5rem]">
          <h2 className="h2 text-primary self-center">Como o TaskFlow funciona?</h2>
          <div className="flex flex-col gap-2 w-full">





            <div className="flex gap-8 w-full justify-start p-4 py-4 overflow-auto">
              <RoundedCard changeImage={() => setImage("project.jpg")} color={"#F04A94"} >
                <LandingPageCardContent color={"text-[#F04A94]"} title={"Projetos"}
                  text={"Lorem ipsum dolor sit amet consectetur. In quis molestie a at placerat morbi vitae aenean. Viverra mauris imperdiet ac at habitant ut diam. Id id adipiscing aenean facilisi et mi. Viverra tristique ac bibendum arcu."} />
              </RoundedCard>
              <RoundedCard changeImage={() => setImage("moon.svg")} color={"#EA35BE"} >
                <LandingPageCardContent color={"text-[#EA35BE]"} title={"Tarefas"}
                  text={"Lorem ipsum dolor sit amet consectetur. In quis molestie a at placerat morbi vitae aenean. Viverra mauris imperdiet ac at habitant ut diam. Id id adipiscing aenean facilisi et mi. Viverra tristique ac bibendum arcu."} />
              </RoundedCard>
              <RoundedCard changeImage={() => setImage("language.svg")} color={"#E41CEF"} >
                <LandingPageCardContent color={"text-[#E41CEF]"} title={"Propriedades"}
                  text={"Lorem ipsum dolor sit amet consectetur. In quis molestie a at placerat morbi vitae aenean. Viverra mauris imperdiet ac at habitant ut diam. Id id adipiscing aenean facilisi et mi. Viverra tristique ac bibendum arcu."} />
              </RoundedCard>
            </div>
            <div className="flex gap-2 w-full justify-center">
              <ArrowSVG rotate={"rotate-180"}></ArrowSVG>
              <ArrowSVG></ArrowSVG>

            </div>
            {/* 
            <img src={image} className="w-[100%]" alt="" /> */}
          </div>
        </div>

        <div className="w-full flex flex-col gap-[4.5rem] ">
          <h2 className="h2 text-primary self-center">Nossas Funcionalidades</h2>
          <div className="flex flex-col gap-32 items-center">
            <Function text={"text-[#E41CEF]"} bg={"timeline__primaryToPurple"} size={"h-[400px]"} />
            <Function text={"text-primary"} bg={"timeline__purpleTosecondary"} size={"h-[600px]"} />
            <Function text={"text-secondary"} bg={"bg-secondary"} size={"h-[400px]"} />
          </div>
        </div>
        <div className="w-full flex flex-col">
          <h2 className="h2 text-primary self-center">Conheça nossos desenvolvedores!</h2>
          <div className="shadowww relative rounded-lg flex flex-col gap-4 p-6 pt-12 pb-8 max-w-[320px]  max-h-[254px] w-max">
            <h3 className="h3 text-primary self-center">Cleiton do pneu</h3>
            <p className="p h-full overflow-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero repellendus beatae aut dolore exercitationem. </p>
          </div>
        </div>
      </div>

    </div>
  )
}