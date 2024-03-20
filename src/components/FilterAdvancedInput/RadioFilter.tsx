import { useContext, useEffect, useState } from "react";
import { Option } from "@/models";
import { FilterContext } from "@/utils/FilterlistContext";

interface Props {
  id: number;
  name: string;
  value?: string;
  options: Option[];
}

export const RadioFilter = ({ name, id, value, options }: Props) => {
  const [selectedOption, setSelectedOption] = useState(value);
  const { filterProp, setFilterProp } = useContext(FilterContext);
  useEffect(() => {
    setSelectedOption(value ?? "oi");
  }, [value]);
  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
    const thisProperty = filterProp?.find((item) => item.id == id);
    if (thisProperty) {
      if (!event.target.value) {
        filterProp.splice(filterProp.indexOf(thisProperty), 1);
        setFilterProp!(filterProp);
      } else {
        thisProperty.value = event.target.value;
      }
    } else {
      if (event.target.value) {
        setFilterProp!([...filterProp, { id: id, value: event.target.value }]);
      }
    }
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
            value={""}
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
