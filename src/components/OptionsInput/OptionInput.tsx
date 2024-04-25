import { useEffect, useState } from "react";
import { IconPlus } from "../icons/GeneralIcons/IconPlus";
import { Label } from "../Input/style";
import { Input } from "../Input";
import { Obj } from "../Obj";
import { ContentInput } from "./ContentInput";
import { Option } from "@/models";
import { NeedPermission } from "../NeedPermission";

type OptionsInputProps = {
  label: string;
  property: any;
  disabled?: boolean;
};

export const OptionsInput = ({ label, property, disabled }: OptionsInputProps) => {
  const [options, setOptions] = useState<Option[]>(property.options);

  useEffect(() => {
    property.options = options;
  }, [options]);
  return (
    <div className="w-full  h-full">
      <div className="h-[35%] w-full flex justify-between items-center">
        <p>{label}</p>
        <NeedPermission permission="update">
        <button
          className=" h-6 w-6 rotate-45 p-1.5 rounded-full shadow-blur-10 flex justify-center items-center"
          onClick={() => setOptions([...options, new Option("", "")])}
        >
          <IconPlus/>
        </button>
        </NeedPermission>
      </div>

      <div className="w-full h-[55%] overflow-y-scroll none-scrollbar flex-col gap-1 ">
        {options.map((options, index) => (
          <ContentInput disabled={disabled} key={index} index={index} option={options} />
        ))}
      </div>
    </div>
  );
};
