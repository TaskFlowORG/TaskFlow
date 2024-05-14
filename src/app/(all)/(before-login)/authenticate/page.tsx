"use client";

import { Login } from "@/components/Login";
import { TwoFactor } from "@/components/TwoFactor";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Home() {

  return (
    <div
      className="w-screen h-screen flex overflow-visible fixed top-0"
      id="login"
    >
      <div className="fixed -bottom-[2200px]  rotate-[35deg] -right-[1600px]  h-[3000px] w-[3000px]">
        <Image src="/Assets/shapes/circleGradient.png"   fill alt="Circle" />
      </div>
      <div className="fixed -top-[150px] rotate-180 invisible xl:visible left-1/3  h-[300px] w-[300px]">
        <Image src="/Assets/shapes/circleGradient.png" fill alt="Circle"  />
      </div>
      <div className="fixed -top-[150px] rotate-180 invisible xl:visible -right-[calc(66.66%_+_300px)]  h-[300px] w-[300px]">
        <Image src="/Assets/shapes/circleGradient.png" fill alt="Circle" />
      </div>
      <div className="fixed -bottom-[100px] invisible 1.5xl:visible  -left-[200px] h-[500px] w-[500px]">
        <Image src="/Assets/shapes/circleGradient.png" fill alt="Circle" />
      </div>
      <div className="fixed -bottom-[100px] invisible 1.5xl:visible  -right-[calc(100%_+_500px)] h-[500px] w-[500px]">
        <Image src="/Assets/shapes/circleGradient.png" fill alt="Circle" />
      </div>
      <div className="fixed top-0 px-6   h-full  w-screen bottom-0   justify-center flex items-center">
        <AnimatePresence initial={true}>
          <motion.div initial={{transform: "scale(0)"}} className="w-[28rem] h-[28rem] flex items-center justify-center" animate={{transform:"scale(1)"}} exit={{transform:"scale(0)"}}>
            <TwoFactor />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
