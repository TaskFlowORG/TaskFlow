import { Option } from "@/models";
import { useEffect, useState } from "react";

type Props = {
  options: Option[];
  value: string;
};

export const SelectProp = ({ options, value }: Props) => {
  const [selectedOption, setSelectedOption] = useState(value);
  useEffect(() => {
    setSelectedOption(value ?? "");
  }, [value]);
  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };
  console.log(selectedOption)

  return (
    <div className="relative">
      <select
        className="appearance-none bg-transparent p-1 text-sm outline-none border-[2px] border-primary dark:border-secondary rounded-lg text-primary dark:text-secondary text-center w-full h-min pr-20"
        value={selectedOption}
        onChange={handleOptionChange}
        defaultValue={selectedOption}
        // onChange={e => change(e.target.value)} defaultValue={defaultValue}
      >
        <option className="w-full text-center" value="oi">
          Selecione...
        </option>
        {options.map((o: any, index) => {
          return (
            <option value={o.name} key={index} className="w-full text-center">
              {o.name ?? o}
            </option>
          );
        })}
      </select>
      <div className=" border-l-[2px] border-primary dark:border-secondary -z-[10] w-16 top-0 right-0 h-full absolute flex justify-center text-2xl items-center font-bold text-primary dark:text-secondary font-mono ">
        <span className=" rotate-90">{">"}</span>
      </div>
    </div>
  );
};
