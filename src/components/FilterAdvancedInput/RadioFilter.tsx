import { useContext, useEffect, useState } from "react";
import { Option } from "@/models";
import { FilterContext } from "@/utils/FilterlistContext";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "next-i18next";

interface Props {
  id: number;
  name: string;
  value?: string;
  options: Option[];
  isInModal?: boolean;
}

export const RadioFilter = ({
  name,
  id,
  value,
  options,
  isInModal = false,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState(value);
  const { filterProp, setFilterProp } = useContext(FilterContext);
  const style = twMerge(
    "flex w-full ",
    isInModal ? "flex-wrap gap-x-4" : "flex-col"
  );
  const {t} = useTranslation()
  useEffect(() => {
    const prop = filterProp.find((bah) => id == bah.id);
    if (prop) {
      setSelectedOption(prop.value);
    } else {
      setSelectedOption(value?.toString() ?? "244a271c-ab15-4620-b4e2-a24c92fe4042");
    }
  }, [value, setFilterProp, filterProp]);
  const handleOptionChange = (event: any) => {
    const thisProperty = filterProp?.find((item) => item.id == id);
    if (event.target.value == "244a271c-ab15-4620-b4e2-a24c92fe4042" && thisProperty && !isInModal) {
      setSelectedOption(event.target.value);
      filterProp.splice(filterProp.indexOf(thisProperty), 1);
    } else if (thisProperty) {
      setSelectedOption(event.target.value);
      if (!event.target.value) {
        filterProp.splice(filterProp.indexOf(thisProperty), 1);
        setFilterProp!([...filterProp])
      } else {
        thisProperty.value = event.target.value;
        setFilterProp!([...filterProp])
      }
    } else {
      if (event.target.value) {
        setFilterProp!([...filterProp, { id: id, value: event.target.value }]);
      }
    }
  };

  return (
    <div className="text-black dark:text-white pb-2 border-b-[1px] ">
      {!isInModal && (
        <p className=" text-black dark:text-white whitespace-nowrap">{name}:</p>
      )}
      <div className={style}>
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
              className="text-black font-montserrat text-[14px] dark:text-white "
              htmlFor={`prop${id}_${index}`}
            >
              {option.name}
            </label>
          </div>
        ))}

        <div className="flex gap-1 items-center">
          <input
            type="radio"
            id="244a271c-ab15-4620-b4e2-a24c92fe4042"
            className="custom-radio"
            value={"244a271c-ab15-4620-b4e2-a24c92fe4042"}
            name="radioGroup"
            checked={"244a271c-ab15-4620-b4e2-a24c92fe4042" == selectedOption}
            onChange={handleOptionChange}
          />
          <label
            className="text-black font-montserrat text-[14px] dark:text-white"
            htmlFor="244a271c-ab15-4620-b4e2-a24c92fe4042"
          >
            {t('any')}
          </label>
        </div>
      </div>
    </div>
  );
};
