'use client'

import { RoundedCard } from "@/components/RoundedCard"
import { LandingPageCardContent } from "@/components/CardContent"
import { useState } from "react"
import { Function } from "@/components/Function"
import { Button } from "@/components/Button"
import { Headline } from "@/components/LandingPage"
import { HeadlineImage } from "@/components/LandingPage/Headline"
import { HowWorks } from "@/components/HowWorks"
import { ArrowSVG } from "@/components/LandingPage"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

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
        <HowWorks/>

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