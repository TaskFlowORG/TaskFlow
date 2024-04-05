import { Option } from "@/models";
import { FilterContext } from "@/utils/FilterlistContext";
import { useState, useEffect, useContext } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  options: Option[];
  name: string;
  id: number;
  value: string[];
  isInModal?: boolean;
}

export const CheckboxFilter = ({
  options,
  name,
  id,
  value,
  isInModal = false,
}: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(value);
  const { filterProp, setFilterProp } = useContext(FilterContext);
  const style = twMerge(
    "flex w-full ",
    isInModal ? "flex-wrap gap-x-4" : "flex-col"
  );
  useEffect(() => {
    setSelectedOptions(value ?? []);
  }, [value, filterProp, setFilterProp]);

  function isChecked(optionName: string) {
    // console.log(selectedOptions.includes(optionName))
    return selectedOptions?.includes(optionName);
  }

  const handleOptionChange = (event: any) => {
    const optionName = event.target.value;
    // if (selectedOptions.includes(optionName)) {
    //   setSelectedOptions(
    //     selectedOptions.filter((option) => option !== optionName) ?? []
    //   );
    // } else {
    //   setSelectedOptions([...selectedOptions, optionName]);
    // }

    const thisProperty = filterProp?.find((item) => item.id == id);
    if (thisProperty) {
      if (selectedOptions.includes(optionName)) {
        setSelectedOptions(
          selectedOptions.filter((option) => option !== optionName) ?? []
        );
        console.log("Passaro a mão ni mim aqui ein");
        thisProperty.value = thisProperty.value.filter(
          (option: string) => option !== optionName
        );
        if (thisProperty.value.length == 0) {
          filterProp.splice(filterProp.indexOf(thisProperty), 1);
          setFilterProp!(filterProp);
        }
      } else {
        setSelectedOptions([...selectedOptions, optionName]);
        console.log("Passaro a mão ni mim");
        thisProperty.value = [...selectedOptions, optionName];
      }
    } else {
      console.log("Aqui não deveria vir")
      if (optionName) {
        setFilterProp!([
          ...filterProp,
          { id: id, value: [event.target.value] },
        ]);
      }
    }
  };

  return (
    <div className="text-black dark:text-white pb-2 border-b-[1px]  ">
      {!isInModal && (
        <p className=" text-black dark:text-white whitespace-nowrap font-montserrat">
          {name}:
        </p>
      )}
      <div className={style}>
        {options.map((option, index) => (
          <div key={index} className="flex gap-1 items-center">
            <input
              type="checkbox"
              id={`prop${id}_${index}`}
              value={option.name}
              className="custom-checkbox"
              checked={isChecked(option.name)}
              onChange={handleOptionChange}
            />
            <label
              className="text-black font-montserrat text-[14px] dark:text-white"
              htmlFor={`prop${id}_${index}`}
            >
              {option.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
