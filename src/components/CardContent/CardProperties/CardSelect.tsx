
import { SelectIcon } from "@/components/CardContentIcons/SelectIcon";
import { RadioIcon } from "@/components/CardContentIcons/RadioIcon";

interface Props{
  property:any,
  value:string
}

export const CardSelect = ({ property, value }:Props) => {
  return (
    <div className="flex gap-2 w-max items-center">
      <p className="p w-max text-[#797979] dark:text-white">{property}:</p>
      <div className="flex gap-2">
        <p className="p w-max text-primary dark:text-secondary">{value}</p>
        <SelectIcon />
      </div>
    </div>
  );
};
