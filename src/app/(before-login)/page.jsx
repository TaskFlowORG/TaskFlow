'use client'

import { RoundedCard } from "@/components/RoundedCard"
import { LandingPageCardContent } from "@/components/CardContent"
import { useState } from "react"
import { Function } from "@/components/Features/Function"

export default function Home() {

  const [image, setImage] = useState("project.jpg")

  return (
    <div className="flex flex-col items-center w-screen">
      <div className="w-full h-full flex flex-col gap-[6.125rem]">
        <div className="justify-center flex gap-10  w-full h-[38rem] 2xl:items-center items-start">
          <div className="flex flex-col md:w-full gap-16 lg:gap-8  xl:gap-10 2xl:w-1/4 lg:w-2/5 md:p-10  lg:pl-[6rem] 2xl:p-0  justify-center">
            <h1 className="text-primary h1 whitespace-nowrap">Headline Here</h1>
            <p className="p whitespace-normal">Lorem ipsum dolor sit amet consectetur. Quis purus ullamcorper facilisis molestie dignissim viverra elementum nunc eros. Fermentum neque justo ut elementum. Sit erat vulputate ac aliquet enim cras. Diam aliquam massa aliquam arcu suspendisse lorem odio velit suscipit. Velit nec habitant enim blandit nec vitae at convallis sed. Augue commodo etiam ultrices urna at urna. </p>
            <button className="p-12 py-2 bg-primary font-alata text-[20px] w-max text-white rounded-lg">Confirmar</button>
          </div>



          <div className="relative md:hidden lg:flex items-center justify-center gap-4 h-full w-[43rem]">

            <div className="z-50 shadowwwsecondary rounded-lg bg-secondary 2xl:block  h-[450px] hidden 2xl:h-[400px] 2xl:w-[220px] w-[270px]">

            </div>
            <div className="z-50 shadowwwsecondary rounded-lg bg-secondary 2xl:h-[400px]  h-1/2 w-1/2 2xl:w-[220px]">

            </div>
            <img src="landing.svg" className="z-[-1] absolute 2xl:w-[550px] w-[450px]" alt="" />
          </div>

        </div>
        <div className="flex flex-col w-full items-center gap-[4.5rem]">
          <h2 className="h2 text-primary self-center">Como o TaskFlow funciona?</h2>
          <div className="flex gap-16">
            <div className="flex flex-col gap-12 w-[26.375rem]">
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
            <img src={image} alt="" />
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