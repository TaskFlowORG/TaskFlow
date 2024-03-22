import React from "react";

interface ProgressBarProps {
  step: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
    const progressBarStyle = {
        width: `${(step + 1) * 33}%`,
        backgroundColor: step === 0 ? "#F04A94" : "#XXXXXX", 
        
      };
    
      return (
        <div className="w-4/5">
          <div className="bg-[#F04A94] w-full h-1 rounded-md" style={progressBarStyle}></div>
        </div>
      );
    };


