'use client'

import { RoundedCard } from "@/components/RoundedCard"
import { LandingPageCardContent } from "@/components/CardContent"
import { useState } from "react"
import { Function } from "@/components/Function"
import { SlideBarProjects } from "@/components/SlideBarProjects/SlideBarProjects"
export default function Home() {

  const [image, setImage] = useState("project.jpg")

  return (
   <>
    <div className="h-[85%] w-full">
      
        <SlideBarProjects></SlideBarProjects>
    </div>

   </>
  )
}