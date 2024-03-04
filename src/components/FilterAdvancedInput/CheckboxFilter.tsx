import { Option } from "@/models";
import { useState, useEffect } from "react";

interface Props {
  options: Option[];
  name: string;
  id: number;
  value: string[];
}

export const CheckboxFilter = ({ options, name, id, value }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

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
