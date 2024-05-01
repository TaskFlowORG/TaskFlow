import React, { useEffect, useState } from "react";

interface ProgressBarProps {
  step: number;
  color: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ step, color }) => {
    
      const [count, setCount] = useState(0);
      useEffect(() => {
        //that be the progressbar glow animation
        const interval: NodeJS.Timeout = setInterval(() => {
          if(count === (step + 1) * 33) return clearInterval(interval);
          setCount(prev => prev < (step + 1) * 33 ? prev + 1 : prev - 1);
        }, 5);
        return () => clearInterval(interval);
      }, [step, count]);


    const progressBarStyle = {
          width: `${count}%`,
          backgroundColor: color,
        };
    
      return (
        <div className=" w-4/5">
          <div className="bg-[#F04A94] w-full h-1 rounded-md" style={progressBarStyle}></div>
        </div>
      );
    };


