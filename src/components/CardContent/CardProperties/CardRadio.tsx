import { Radio } from "./Radio";
import { RadioIcon } from "@/components/CardContentIcons/RadioIcon";

interface Props {
  property: any;
  value: string;
  showNameProperty: boolean;
  color: string;
}

export const CardRadio = ({ property, value, showNameProperty, color }: Props) => {
  return (
    <div className="flex gap-2 w-max items-center">
      {showNameProperty && (
        <p className="text-p14 w-max text-[#797979] dark:text-white">
          {property}:
        </p>
      )}

      <div className="flex gap-1">
        <p className="text-p14 w-max" style={{color:color}}>
          {value}
        </p>

        <RadioIcon color={color} />
        {/* <img src="cardContentIcons/select.svg" className="dark:hidden" alt="" />
          <img src="cardContentIcons/select.svg" className="hidden dark:flex " alt="" /> */}
      </div>
    </div>
  );
};
