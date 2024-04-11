import { useEffect, useState } from "react";
import { IconPlus } from "../icons/GeneralIcons/IconPlus";
import { Label } from "../Input/style";
import { Input } from "../Input";
import { Obj } from "../Obj";
import { ContentInput } from "./ContentInput";
import { Option } from "@/models";

type OptionsInputProps = {
  label: string;
  property: any;
};

export const OptionsInput = ({ label, property }: OptionsInputProps) => {
  const [options, setOptions] = useState<Option[]>(property.options);

  useEffect(() => {
    property.options = options;
  }, [options]);
  return (
    <div className="w-full  h-full">
      <div className="h-[35%] w-full flex justify-between items-center">
        <p>{label}</p>
        <button
          className=" h-6 w-6 rounded-full shadow-blur-10 flex justify-center items-center"
          onClick={() => setOptions([...options, new Option("", "")])}
        >
          +
        </button>
      </div>

      <div className="w-full h-[55%] overflow-y-scroll none-scrollbar flex-col gap-2 ">
        {options.map((options, index) => (
          <ContentInput key={index} index={index} option={options} />
        ))}
      </div>
    </div>
  );
};
