import { SelectIcon } from "@/components/CardContentIcons/SelectIcon";
import { RadioIcon } from "@/components/CardContentIcons/RadioIcon";
import { CSSProperties } from "react";
import { useTheme } from "next-themes";
import { IconSelect } from "@/components/icons";

interface Props {
  property: any;
  value: string;
  color: string;
  showNameProperty: boolean;
}

export const CardSelect = ({
  property,
  value,
  showNameProperty,
  color,
}: Props) => {
  const { theme, setTheme } = useTheme();

  const styled_P: CSSProperties = {
    color:
      color ??
      (theme == "dark" ? "var(--secondary-color)" : "var(--primary-color)"),
  };
  return (
    <div className="flex gap-2 w-max items-center">
      {showNameProperty && (
        <p className="text-p14 w-max text-[#797979] dark:text-white">
          {property}:
        </p>
      )}

      <div className="flex gap-1">
        <p style={styled_P} className="text-p14 w-max">
          {value}
        </p>
        <div className="w-4 aspect-square">
<IconSelect color={color}></IconSelect>
        </div>

      </div>
    </div>
  );
};
