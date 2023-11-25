"use client"

import { RoundedCard } from '@/components/RoundedCard';
import { LandingPageCardContent } from '@/components/CardContent';
import { useState } from 'react';

export const Default = () => {

    const [image, setImage] = useState("project.jpg")

    return (
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
    )
}