"use client";

import { ComponentProps, useContext, useEffect, useState } from "react";
import { Option } from "@/models";
import { FilterContext } from "@/utils/FilterlistContext";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "next-i18next";
interface SelectProps extends ComponentProps<"select"> {
  options: string[] | Option[];
  name: string;
  ids: number;
  value: string;
  isInModal?: boolean;
}

export const Select = ({
  options,
  name,
  value,
  ids,
  isInModal = false,
}: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState("");
  const { filterProp, setFilterProp } = useContext(FilterContext);
  const { t } = useTranslation();

  useEffect(() => {
    const prop = filterProp.find((bah) => ids == bah.id);
    if (prop) {
      setSelectedOption(prop.value);
    } else {
      setSelectedOption(
        value?.toString() ?? "244a271c-ab15-4620-b4e2-a24c92fe4042"
      );
    }
  }, [value, setFilterProp, filterProp]);
  const handleOptionChange = (event: any) => {
    // setSelectedOption(event.target.value);
    const thisProperty = filterProp?.find((item) => item.id == ids);
    if (thisProperty) {
      setSelectedOption(event.target.value);
      if (
        event.target.value == "244a271c-ab15-4620-b4e2-a24c92fe4042" &&
        !isInModal
      ) {
        filterProp.splice(filterProp.indexOf(thisProperty), 1);
        setFilterProp!([...filterProp]);
      } else {
        thisProperty.value = event.target.value;
        setFilterProp!([...filterProp]);
      }
    } else {
      if (event.target.value != "244a271c-ab15-4620-b4e2-a24c92fe4042") {
        setSelectedOption(event.target.value);
        setFilterProp!([...filterProp, { id: ids, value: event.target.value }]);
      }
    }
    // const select = document.querySelector(`#prop${id}`)
    // // console.log(select.value)
  };

  // useState(() => {
  // }, [defaultValue, options])
  const styleWithBorder = twMerge(
    "flex justify-between  h-min relative items-center gap-4 w-full",
    isInModal ? "justify-end w-max" : "pb-2"
  );

  return (
    <div className={styleWithBorder}>
      {!isInModal && (
        <p className=" text-black dark:text-white whitespace-nowrap">{name}:</p>
      )}
      {/* aqui embaixo é w-fit */}
      <div className=" relative">
        <select
          className="appearance-none bg-transparent p-1 text-sm outline-none border-[2px] border-primary dark:border-secondary rounded-lg text-primary dark:text-secondary text-center w-full h-min pr-20"
          // {...props}
          value={selectedOption}
          onChange={handleOptionChange}
          // onChange={e => change(e.target.value)} defaultValue={defaultValue}
        >
          <option
            className="w-full text-center"
            value="244a271c-ab15-4620-b4e2-a24c92fe4042"
          >
            {t("select")}...
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
