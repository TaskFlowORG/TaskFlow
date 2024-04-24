"use client";

import { Register } from "@/components/Register";
import Image from "next/image";
import { useContext, useEffect } from "react";

export default function Home() {
  return (
    <div className="w-screen h-screen flex fixed register" id="register">
      <div className="fixed -bottom-[2200px]  -left-[1900px]  h-[3500px] w-[3500px]">
        <Image src="/Assets/shapes/circleGradient.png" fill alt="Circle" />
      </div>
      <div className="fixed -top-[150px] rotate-180 right-1/3  h-[300px] w-[300px]">
        <Image src="/Assets/shapes/circleGradient.png" fill alt="Circle" />
      </div>
      <div className="flex fixed md:hidden" />
      <div className="fixed -bottom-[100px]  -right-[200px] h-[500px] w-[500px]">
        <Image src="/Assets/shapes/circleGradient.png" fill alt="Circle" />
      </div>
      <div className="flex">
        <Register />
      </div>
    </div>
  );
}
