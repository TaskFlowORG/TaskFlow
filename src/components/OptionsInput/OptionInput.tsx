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

export const OptionsInput = ({
  label,
  property,
  disabled,
}: OptionsInputProps) => {
  const [options, setOptions] = useState<Option[]>(property.options);

  useEffect(() => {
    property.options = options;
  }, [options]);
  return (
    <div className="w-full flex max-h-40 h-min flex-col ">
      <div className="h-min w-full  flex justify-between items-center">
        <p>{label}</p>
        <NeedPermission permission="update">
          <button
            className=" h-4 w-4 rotate-45 p-px rounded-full shadow-blur-10 flex justify-center items-center"
            onClick={() => setOptions(options==null ? [new Option("", "")]: [...options, new Option("", "")])}
          >
            <IconPlus />
          </button>
        </NeedPermission>
      </div>

      <div className="w-full max-h-40 h-full justify-between overflow-y-scroll thin-scrollbar flex-col pr-2 gap-1 ">
        {options?.map((options, index) => (
          <ContentInput
          remove={(option) => {
            setOptions(prev => prev.filter((opt) => opt.id !== option.id));
          }}
            disabled={disabled}
            key={index}
            index={index}
            option={options}
          />
        ))}
      </div>
    </div>
  );
};
