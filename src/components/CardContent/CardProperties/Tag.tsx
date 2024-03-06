import { generateContrast } from "@/functions";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  value: string;
  color: string;
}

export const Tag = ({ value, color, ...props }: Props) => {
  return (
    <>
      <p
        style={{
          backgroundColor: color ? color : "#f04a94",
          color: generateContrast(color),
        }}
        className="mn py-1 rounded-md px-2 "
        {...props}
      >
        {value}
      </p>
    </>
  );
};
