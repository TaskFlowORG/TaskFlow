import { useState, useEffect } from "react";
import { Tag } from "../CardContent/CardProperties/Tag";
import { Option } from "@/models";

interface Props {
  options: Option[];
  name: string;
  id: number;
  value: string[];
  addList: (value: string) => void;
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
  useEffect(() => {
    setOption(value);
  }, [value]);
  return (
    <div>
      <p className=" text-black dark:text-white whitespace-nowrap">{name}:</p>
      <div className="flex gap-4 overflow-scroll">
        {options.map((opt, index) => {
          if (value?.find((value) => opt?.name == value)) {
            return (
              <Tag
                onClick={() => removeList(opt.name)}
                value={opt.name}
                color={opt.color}
                key={index}
              />
            );
          }
          return (
            <Tag
              onClick={() => addList(opt.name)}
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
