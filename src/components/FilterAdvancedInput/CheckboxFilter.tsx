import { Option } from "@/models";
import { FilterContext } from "@/utils/FilterlistContext";
import { useState, useEffect, useContext } from "react";

interface Props {
  options: Option[];
  name: string;
  id: number;
  value: string[];
}

export const CheckboxFilter = ({ options, name, id, value }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const { filterProp, setFilterProp } = useContext(FilterContext);
  useEffect(() => {
    setSelectedOptions(value ?? []);
  }, [value]);

  function isChecked(optionName: string) {
    return selectedOptions.includes(optionName);
  }

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const optionName = event.target.value;
    if (selectedOptions.includes(optionName)) {
      setSelectedOptions(
        selectedOptions.filter((option) => option !== optionName)
      );
    } else {
      setSelectedOptions([...selectedOptions, optionName]);
    }

    const thisProperty = filterProp?.find((item) => item.id == id);
    if (thisProperty) {
      if (selectedOptions.includes(optionName)) {
        thisProperty.value = thisProperty.value.filter(
          (option: string) => option !== optionName
        );
        if (thisProperty.value.length == 0) {
          filterProp.splice(filterProp.indexOf(thisProperty), 1);
          setFilterProp!(filterProp);
        }
      } else {
        thisProperty.value = [...selectedOptions, optionName];
      }
    } else {
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
      <p className=" text-black dark:text-white whitespace-nowrap">{name}:</p>
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
            className="text-black dark:text-white"
            htmlFor={`prop${id}_${index}`}
          >
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
};
