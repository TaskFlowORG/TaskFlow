"use client"

import { RoundedCard } from '@/components/RoundedCard';
import { LandingPageCardContent } from '@/components/CardContent';
import { useState } from 'react';

export const Default = () => {


    const functions = [
        {
            img: "project.jpg",
            color: "#F04A94",
            text: "Lorem ipsum dolor sit amet consectetur. In quis molestie a at placerat morbi vitae aenean. Viverra mauris imperdiet ac at habitant ut diam. Id id adipiscing aenean facilisi et mi. Viverra tristique ac bibendum arcu.",
            title: "Projetos",
            dark: "#FF871A"
        },
        {
            img: "moon.svg",
            color: "#EA35BE",
            text: "Lorem ipsum dolor sit amet consectetur. In quis molestie a at placerat morbi vitae aenean. Viverra mauris imperdiet ac at habitant ut diam. Id id adipiscing aenean facilisi et mi. Viverra tristique ac bibendum arcu.",
            title: "Tarefas",
            dark: "#D7541C"
        },
        {
            img: "language.svg",
            color: "#E41CEF",
            text: "Lorem ipsum dolor sit amet consectetur. In quis molestie a at placerat morbi vitae aenean. Viverra mauris imperdiet ac at habitant ut diam. Id id adipiscing aenean facilisi et mi. Viverra tristique ac bibendum arcu.",
            title: "Propriedades",
            dark: "#F76858"
        },

    ]

    const [image, setImage] = useState<string>("project.jpg")

    return (
        <div className="flex gap-16 p-8">
            <div className="flex flex-col gap-12 xl:w-[550px]  1.5xl:w-[700px] ">
                {
                    functions.map((card, index) => {
                        return (
                            <RoundedCard key={index} dark={card.dark} changeImage={() => setImage(card.img)} color={card.color} >
                                <LandingPageCardContent color={card.color} dark={card.dark} title={card.title} text={card.text} />
                            </RoundedCard>
                        )
                    })
                }
            </div>
            <div className='w-full'>
                <img src={image} alt="" className='w-full' />
            </div>
        </div>
    )
}