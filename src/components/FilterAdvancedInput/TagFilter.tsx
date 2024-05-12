import { Option } from "@/models";
import { FilterContext } from "@/utils/FilterlistContext";
import { useState, useEffect, useContext } from "react";
import { twMerge } from "tailwind-merge";
import { Tag } from "../CardContent/CardProperties/Tag";

interface Props {
  options: Option[];
  name: string;
  id: number;
  value: string[];
  isInModal?: boolean;
}

export const TagFilter = ({
  options,
  name,
  id,
  value,
  isInModal = false,
}: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(value);
  const { filterProp, setFilterProp } = useContext(FilterContext);

  const style = twMerge("", isInModal ? " items-center flex w-full" : "");

  useEffect(() => {
    const prop = filterProp!.find((bah) => id == bah.id);
    if (prop) {
      setSelectedOptions(prop.value);
    } else {
      setSelectedOptions(value ?? []);
    }
  }, [value, setFilterProp, filterProp!]);

  const handleOptionChange = (optionName: string) => {
    console.log("Me clicaro");
    const thisProperty = filterProp?.find((item) => item.id == id);
    if (thisProperty) {
      if (selectedOptions.includes(optionName)) {
        setSelectedOptions(
          selectedOptions.filter((option) => option !== optionName) ?? []
        );
        console.log(selectedOptions.filter((option) => option !== optionName));
        console.log("Passaro a mão ni mim aqui ein");
        thisProperty.value = thisProperty.value.filter(
          (option: string) => option !== optionName
        );
        if (thisProperty.value.length == 0) {
          thisProperty.value = [];
        }
        setFilterProp!([...filterProp!]);
      } else {
        setSelectedOptions([...selectedOptions, optionName]);
        console.log([...selectedOptions, optionName]);
        thisProperty.value = [...selectedOptions, optionName];
        setFilterProp!([...filterProp!]);
      }
    } else {
      if (optionName) {
        setSelectedOptions([...(value ?? []), optionName]);
        setFilterProp!([
          ...filterProp!,
          { id: id, value: [...(value ?? []), optionName] },
        ]);
      }
    }
  };

  return (
    <div className={style}>
      {!isInModal && (
        <p className=" text-black dark:text-white whitespace-nowrap font-montserrat">
          {name}:
        </p>
      )}
      <div className="oi w-full flex-wrap  flex gap-2 relative">
        {options.map((opt, index) => {
          return (
            <Tag
              onClick={() => {
                handleOptionChange(opt.name);
              }}
              value={opt.name}
              color={opt.color}
              key={index}
              className={`text-mn font-montserrat py-1 rounded-sm px-2 ${
                !selectedOptions?.includes(opt.name) && "opacity-[60%]"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
