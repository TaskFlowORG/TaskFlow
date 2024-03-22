import { Radio } from "./Radio";
import { RadioIcon } from "@/components/CardContentIcons/RadioIcon";

interface Props {
  property: any;
  value: string;
  showNameProperty: boolean;
}

export const CardRadio = ({ property, value, showNameProperty }: Props) => {
  return (
    <div className="flex gap-2 w-max items-center">
      {showNameProperty && (
        <p className="text-[14px] w-max text-[#797979] dark:text-white">
          {property}:
        </p>
      )}

      <div className="flex gap-2">
        <p className="text-[14px] w-max text-primary dark:text-secondary">
          {value}
        </p>

        <RadioIcon />
        {/* <img src="cardContentIcons/select.svg" className="dark:hidden" alt="" />
          <img src="cardContentIcons/select.svg" className="hidden dark:flex " alt="" /> */}
      </div>
    </div>
  );
};
