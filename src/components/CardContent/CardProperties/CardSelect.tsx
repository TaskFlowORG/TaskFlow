
import { SelectIcon } from "@/components/CardContentIcons/SelectIcon";
import { RadioIcon } from "@/components/CardContentIcons/RadioIcon";
import { CSSProperties } from "react";
import { useTheme } from "next-themes";

interface Props{
  property:any,
  value:string,
  color: string
}

export const CardSelect = ({ property, value, color }:Props) => {
  const {theme, setTheme} = useTheme()

  const styled_P:CSSProperties={
    color: color ?? (theme=="dark" ? "var(--secondary-color)" : "var(--primary-color)")

    
  }
  return (
    <div className="flex gap-2 w-max items-center">
      <p className="p w-max text-[#797979] dark:text-white">{property}:</p>
      <div className="flex gap-2">
        <p style={styled_P} className="p w-max">{value}</p>
        <SelectIcon style={color ?? (theme=="dark" ? "var(--secondary-color)" : "var(--primary-color)")} />
      </div>
    </div>
  );
};
