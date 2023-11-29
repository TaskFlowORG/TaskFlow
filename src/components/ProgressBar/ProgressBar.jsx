'use client';

import { useEffect, useState } from "react";

export const ProgressBar = ({ percent }) => {
    const [percCount, setPercCount] = useState(0)
    let transform = {
        transform: "rotate(" + (percCount / 100) * 180 + "deg)"
    }
    let gradient = {
        border: "double 14px transparent",
        backgroundImage: "linear-gradient(white, white), radial-gradient(circle at left, #EF4996, #EF4996, #EF4996, #FF973D, #FF973D)",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box"
    }

    useEffect(() => {
        function animateBar() {
          if (percCount < percent) {
            setPercCount(prevPorc => prevPorc + 1);
          }
        }
        const interval = setInterval(animateBar, 16); // Aproximadamente 60 FPS
        return () => clearInterval(interval);
      }, [percCount, percent]);

    return (
        <div className="relative flex justify-center items-center h-full w-full">
            <div className="flex justify-center h-full items-center w-full">
                <div className="w-min h-20 flex overflow-clip absolute top-0 bottom-0">
                    <div className="h4 text-primary dark:text-secondary w-40 h-40 flex justify-center p-6 rounded-full" style={gradient}>
                        {percCount}%
                    </div>
                </div>
                <div className="w-min h-20 flex overflow-clip absolute top-0 bottom-0">
                    <div className="h-40" style={transform}>
                        <div className="h-20 overflow-clip flex justify-center ">
                            <div className="w-40 h-40 rounded-full border-[15px] border-zinc-200 dark:border-back-grey"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}