"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface Props {
  percent: number;
  sizeBorder?: string;
}

export const ProgressBar = ({ percent, sizeBorder }: Props) => {
  const [percCount, setPercCount] = useState<number>(0);
  const { theme } = useTheme();
  const [color, setColor] = useState<string>("");
  useEffect(() => {
    (async () => {
      setColor(theme === "dark" ? "rgb(51 51 51)" : "rgb(252 252 252)");
    })();
  }, [theme]);

  
  const gradient: Object = {
    backgroundImage: `linear-gradient(${color},${color} ), 
    linear-gradient(${percCount/100*180}deg, var(--primary-color) 25%, var(--secondary-color) 50%, ${theme == "dark"?"#3c3c3c":"rgb(242, 242, 242)"} 10%)`,
    backgroundClip: "padding-box, border-box",
  };
  useEffect(() => {
    function animateBar() {
      if (percCount < percent) {
        setPercCount((prevPorc) => prevPorc + 1);
      }
    }
    const interval: any = setInterval(animateBar, 16); // Aproximadamente 60 FPS
    return () => clearInterval(interval);
  }, [percCount, percent]);

  return (
    <div className="relative flex justify-center items-center h-full w-full">
      <div className="flex justify-center h-full items-center w-full">
        <div className=" aspect-square h-full flex absolute  overflow-y-clip top-0 bottom-0">
          <div className={`text-h4 font-alata text-primary dark:text-white   aspect-square h-[200%] flex justify-center p-6 rounded-full
          ${sizeBorder ?? "border-[14px]"} border-double border-transparent bg-origin-border `}
            style={gradient}
            >
            {percCount}%
          </div>
          <div className={`text-h4 font-alata text-primary dark:text-white aspect-square h-[200%] flex justify-center p-6 rounded-full
          ${sizeBorder ?? "border-[14px]"} border-double border-transparent bg-origin-border absolute`}/>
        </div>
      </div>
    </div>
  );
};
