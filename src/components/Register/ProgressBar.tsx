import React from "react";

interface ProgressBarProps {
  step: number;
  color: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ step, color }) => {
    const progressBarStyle = {
        width: `${(step + 1) * 33}%`,
        backgroundColor: color, 
        
      };
    
      return (
        <div className="w-64 md:w-72 lg:w-96 xl:w-3/4">
          <div className="bg-[#F04A94] w-full h-1 rounded-md" style={progressBarStyle}></div>
        </div>
      );
    };


