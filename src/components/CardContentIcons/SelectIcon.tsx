import { CSSProperties } from "react";

interface Props{
  style:string
}

export const SelectIcon = ({style}:Props) => {
  return (
    
    <svg
    style={{stroke:style, alignSelf:"center"}}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      // className="self-center stroke-primary dark:stroke-secondary"
    >
      <path
        d="M9 17C13.4184 17 17 13.4184 17 9C17 4.5816 13.4184 1 9 1C4.5816 1 1 4.5816 1 9C1 13.4184 4.5816 17 9 17Z"
        strokeWidth="0.96"
        strokeLinejoin="round"
      />
      <path
        d="M12.5166 7.40039L8.99656 10.9204L5.47656 7.40039"
        strokeWidth="0.96"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
