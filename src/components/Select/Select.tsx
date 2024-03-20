"use client";

import { ComponentProps, useContext, useEffect, useState } from "react";
import { Option } from "@/models";
import { FilterContext } from "@/utils/FilterlistContext";
interface SelectProps extends ComponentProps<"select"> {
  options: string[] | Option[];
  name: string;
  ids: number;
}

export const Select = ({ options, name, ids, ...props }: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState("");
  const { filterProp, setFilterProp } = useContext(FilterContext);

  useEffect(() => {
    setSelectedOption(props.value?.toString() ?? "");
  }, [props.value]);
  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
    const thisProperty = filterProp?.find((item) => item.id == ids);
    if (thisProperty) {
      if (!event.target.value) {
        filterProp.splice(filterProp.indexOf(thisProperty), 1);
        setFilterProp!(filterProp);
      } else {
        thisProperty.value = event.target.value;
      }
    } else {
      if (event.target.value) {
        setFilterProp!([...filterProp, { id: ids, value: event.target.value }]);
      }
    }
    // const select = document.querySelector(`#prop${id}`)
    // // console.log(select.value)
  };

  // useState(() => {
  // }, [defaultValue, options])

  return (
    <div className="flex justify-between pb-2 h-min relative items-center gap-4 w-full">
      <p>{name}</p>
      {/* aqui embaixo é w-fit */}
      <div className=" relative">
        <select
          className="appearance-none bg-transparent p-1 text-sm outline-none border-[2px] border-primary dark:border-secondary rounded-lg text-primary dark:text-secondary text-center w-full h-min pr-20"
          {...props}
          value={selectedOption}
          onChange={handleOptionChange}
          // onChange={e => change(e.target.value)} defaultValue={defaultValue}
        >
          <option className="w-full text-center" value="">
            Selecione...
          </option>
          {options.map((o: any, index) => {
            return (
              <option
                value={o.name ?? o}
                key={index}
                className="w-full text-center"
              >
                {o.name ?? o}
              </option>
            );
          })}
        </select>
        <div className=" border-l-[2px] border-primary dark:border-secondary -z-[10] w-16 top-0 right-0 h-full absolute flex justify-center text-2xl items-center font-bold text-primary dark:text-secondary font-mono ">
          <span className=" rotate-90">{">"}</span>
        </div>
      </div>
    </div>
  );
};
