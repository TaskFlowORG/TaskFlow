import { Option } from "@/models";
import { useState, useEffect } from "react";

type Props = {
  options: Option[];
  id: number;
  value: string;
};

export const RadioProp = ({ options, id, value }: Props) => {
  const [selectedOption, setSelectedOption] = useState(value);
  useEffect(() => {
    setSelectedOption(value ?? "");
  }, [value]);
  return (
    <div className="flex flex-wrap gap-x-4">
      {options.map((option, index) => (
        <div key={index} className="flex gap-1 items-center">
          <input
            type="radio"
            id={`prop${id}_${index}`}
            value={option.name}
            className="custom-radio"
            name="radioGroup"
            checked={option.name == value}
            // onChange={handleOptionChange}
          />
          <label
            className="text-black dark:text-white "
            htmlFor={`prop${id}_${index}`}
          >
            {option.name}
          </label>
        </div>
      ))}
      <div className="flex gap-1 items-center">
        <input
          type="radio"
          id="oi"
          className="custom-radio"
          value={""}
          name="radioGroup"
          checked={"oi" == value}
          // onChange={handleOptionChange}
        />
        <label className="text-black dark:text-white" htmlFor="oi">
          {"Qualquer"}
        </label>
      </div>
    </div>
  );
};
