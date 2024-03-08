import { useState, useEffect, useContext } from "react";
import { Tag } from "../CardContent/CardProperties/Tag";
import { Option } from "@/models";
import { FilterContext } from "@/utils/FilterlistContext";

interface Props {
  options: Option[];
  name: string;
  id: number;
  value: string[];
  addList?: (value: string) => void;
  removeList: (value: string) => void;
}

export const TagFilter = ({
  options,
  id,
  name,
  addList,
  removeList,
  value,
}: Props) => {
  const [option, setOption] = useState(value);
  const { filterProp, setFilterProp } = useContext(FilterContext);

  useEffect(() => {
    setOption(value);
    console.log(value);
  }, [value]);

  return (
    <div>
      <p className=" text-black dark:text-white whitespace-nowrap">{name}:</p>
      <div className="flex gap-4 overflow-scroll">
        {options.map((opt, index) => {
          if (value?.find((value) => opt?.name == value)) {
            return (
              <Tag
                onClick={(e) => {
                  removeList(opt.name);
                }}
                value={opt.name}
                color={opt.color}
                key={index}
                className="p py-1 rounded-sm px-2 "
              />
            );
          }
          return (
            <Tag
              onClick={() => {
                removeList(opt.name);
              }}
              value={opt.name}
              color={opt.color}
              key={index}
              className="p py-1 rounded-sm px-2 opacity-[60%]"
            />
          );
        })}
      </div>
    </div>
  );
};
