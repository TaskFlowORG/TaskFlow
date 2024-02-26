import { Option } from "@/models";
import { Tag } from "./Tag";
import { useTheme } from "next-themes";

interface Props {
  tags: Option[];
  nameProperty: string;
}

export const CardTag = ({ tags, nameProperty }: Props) => {
  const { theme } = useTheme();
  return (
    <>
      <div className="flex flex-col gap-2 w-full justify-center">
        <p className="p w-max text-[#797979] dark:text-white">
          {nameProperty}:
        </p>
        <div className="oi w-full overflow-clip  flex gap-2 relative">
          {/* Código svg do gradiente para "mostrar ao usuário que é scrollavel" */}
          {/* <img src="gradient.svg" className="absolute h-full left-[-0.1rem]" alt="" /> */}
          {tags.map((tag) => {
            return (
              <Tag
                color={tag?.color}
                value={tag?.name}
                key={tag?.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
