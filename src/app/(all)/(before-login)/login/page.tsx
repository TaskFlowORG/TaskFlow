"use client";

import { Dictophone } from "@/components/Dictophone";
import { Login } from "@/components/Login";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useContext, useEffect } from "react";

export default function LoginPage() {
  const { theme } = useTheme();

  const imgLogin =
    theme === "light" ? (
      <img src="/img/themeLight/Login.png" />
    ) : (
      <img src="/img/themeDark/Login.png" />
    );

  return (
    <div className="w-screen h-screen flex overflow-visible fixed top-0" id="login">
      <div className="fixed -bottom-[2200px]   -right-[1900px]  h-[3500px] w-[3500px]">
        <Image src="/Assets/shapes/circleGradient.png" fill alt="Circle" />
      </div>
      <div className="fixed -top-[150px] rotate-180 left-1/3  h-[300px] w-[300px]">
        <Image src="/Assets/shapes/circleGradient.png" fill alt="Circle" />
      </div>
      <div className="fixed -top-[150px] rotate-180 -right-[calc(66.66%_+_300px)]  h-[300px] w-[300px]">
        <Image src="/Assets/shapes/circleGradient.png" fill alt="Circle" />
      </div>
      <div className="fixed -bottom-[100px]  -left-[200px] h-[500px] w-[500px]">
        <Image src="/Assets/shapes/circleGradient.png" fill alt="Circle" />
      </div>
      <div className="fixed -bottom-[100px]  -right-[calc(100%_+_500px)] h-[500px] w-[500px]">
        <Image src="/Assets/shapes/circleGradient.png" fill alt="Circle" />
      </div>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center">
        <Login />
      </div>
    </div>
  );
}
