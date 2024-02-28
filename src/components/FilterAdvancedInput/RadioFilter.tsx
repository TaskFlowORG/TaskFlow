import { useEffect, useState } from "react";
import { Option } from "@/models";

interface Props {
  id: number;
  name: string;
  value?: string;
  options: Option[];
}

export const RadioFilter = ({ name, id, value, options }: Props) => {
  const [selectedOption, setSelectedOption] = useState(value);

  useEffect(() => {
    setSelectedOption(value ?? "oi");
  }, [value]);
  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="text-black dark:text-white pb-2 border-b-[1px] ">
      <p className=" text-black dark:text-white whitespace-nowrap">{name}:</p>
      <div className="flex w-full flex-col">
        {options.map((option, index) => (
          <div key={index} className="flex gap-1 items-center">
            <input
              type="radio"
              id={`prop${id}_${index}`}
              value={option.name}
              className="custom-radio"
              name="radioGroup"
              checked={option.name == selectedOption}
              onChange={handleOptionChange}
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
            value={"oi"}
            name="radioGroup"
            checked={"oi" == selectedOption}
            onChange={handleOptionChange}
          />
          <label className="text-black dark:text-white" htmlFor="oi">
            {"Qualquer"}
          </label>
        </div>
      </div>
    </div>
  );
};
