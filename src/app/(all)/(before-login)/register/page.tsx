"use client";

import { Register } from "@/components/Register";
import Image from "next/image";
import { useContext, useEffect } from "react";

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-visible fixed top-0 flex" id="register">

      <div className="fixed -bottom-[2200px]   -left-[1900px]  h-[3500px] w-[3500px]">
        <Image src="/Assets/shapes/circleGradient.png" fill alt="Circle" />
      </div>
      <div className="fixed -top-[150px] rotate-180 right-1/3  h-[300px] w-[300px]">
        <Image src="/Assets/shapes/circleGradient.png" fill alt="Circle" />
      </div>
      <div className="fixed -top-[150px] rotate-180 -left-[calc(66.66%_+_300px)]  h-[300px] w-[300px]">
        <Image src="/Assets/shapes/circleGradient.png" fill alt="Circle" />
      </div>
      <div className="fixed -bottom-[100px]  -right-[200px] h-[500px] w-[500px]">
        <Image src="/Assets/shapes/circleGradient.png" fill alt="Circle" />
      </div>
      <div className="fixed -bottom-[100px]  -left-[calc(100%_+_500px)] h-[500px] w-[500px]">
        <Image src="/Assets/shapes/circleGradient.png" fill alt="Circle" />
      </div>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center">
        <Register />
      </div>
    </div>
  );
}
