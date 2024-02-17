import { Radio } from "./Radio";
import { RadioIcon } from "@/components/CardContentIcons/RadioIcon";

interface Props {
  property: any;
  value: string;
}

export const CardRadio = ({ property, value }: Props) => {
  return (
    <div className="flex gap-2 w-max items-center">
      <p className="p w-max text-[#797979] dark:text-white">{property}:</p>
      <div className="flex gap-2">
        <p className="p w-max text-primary dark:text-secondary">{value}</p>

        <RadioIcon />
        {/* <img src="cardContentIcons/select.svg" className="dark:hidden" alt="" />
          <img src="cardContentIcons/select.svg" className="hidden dark:flex " alt="" /> */}
      </div>
    </div>
  );
};
