import { Tag } from "@/components/CardContent/CardProperties/Tag";
import { Option } from "@/models";

type Props = {
  options: Option[];
  value: string[];
};
export const TagProp = ({ options, value }: Props) => {
  return (
    <div className="flex flex-wrap gap-4">
      {options?.map((opt, index) => {
        if (value?.find((value) => opt?.name == value)) {
          return (
            <Tag

              value={opt.name}
              color={opt.color}
              key={index}
              className="p py-1 rounded-sm px-2 "
            />
          );
        }
        return (
          <Tag

            value={opt.name}
            color={opt.color}
            key={index}
            className="p py-1 rounded-sm px-2 opacity-[60%]"
          />
        );
      })}
    </div>
  );
};
