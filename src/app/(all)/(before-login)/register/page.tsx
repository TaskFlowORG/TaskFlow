"use client";

import { Register } from "@/components/Register";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useContext, useEffect } from "react";

export default function Home() {
  return (
    <div
      className="h-screen w-screen overflow-visible fixed top-0 flex"
      id="register"
    >
      <div className="fixed -bottom-[2200px]  rotate-[35deg]  -left-[1700px]  h-[3000px] w-[3000px]">
        <Image src="/Assets/shapes/circleGradient.png" fill alt="Circle" />
      </div>
      <div className="fixed -top-[150px] rotate-180 invisible xl:visible right-1/3  h-[300px] w-[300px]">
        <Image src="/Assets/shapes/circleGradient.png" fill alt="Circle" />
      </div>
      <div className="fixed -top-[150px] rotate-180 invisible xl:visible -left-[calc(66.66%_+_300px)]  h-[300px] w-[300px]">
        <Image src="/Assets/shapes/circleGradient.png" fill alt="Circle" />
      </div>
      <div className="fixed -bottom-[100px] invisible 1.5xl:visible -right-[200px] h-[500px] w-[500px]">
        <Image src="/Assets/shapes/circleGradient.png" fill alt="Circle" />
      </div>
      <div className="fixed -bottom-[100px] invisible 1.5xl:visible -left-[calc(100%_+_500px)] h-[500px] w-[500px]">
        <Image src="/Assets/shapes/circleGradient.png" fill alt="Circle" />
      </div>
      <div className="fixed top-0 px-6   w-screen bottom-0   justify-center flex items-center">
        <AnimatePresence initial={true}>
          <motion.div
            initial={{ transform: "scale(0)" }}
            className="w-[28rem] h-[24rem]  flex items-center justify-center"
            animate={{ transform: "scale(1)" }}
            exit={{ transform: "scale(0)" }}
          >
            <Register />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
