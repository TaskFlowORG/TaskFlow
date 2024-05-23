import { Option } from "@/models";
import { Tag } from "./Tag";
import { useTheme } from "next-themes";
import { IconCheckbox } from "@/components/icons";

interface Props {
  tags: Option[];
  nameProperty: string;
  showNameProperty: boolean;
}

export const CardCheckbox = ({
  tags,
  nameProperty,
  showNameProperty,
}: Props) => {
  const { theme } = useTheme();
  return (
    <>
      <div
        className="flex flex-col gap-2 justify-center"
        style={{ width: showNameProperty ? "100%" : "max-content" }}
      >
        {showNameProperty && (
          <p className="text-p14 w-max text-[#797979] dark:text-white">
            {nameProperty}:
          </p>
        )}

        <div className="oi w-full  flex flex-wrap gap-2 relative">
          {/* Código svg do gradiente para "mostrar ao usuário que é scrollavel" */}
          {/* <img src="gradient.svg" className="absolute h-full left-[-0.1rem]" alt="" /> */}
          <div className="oi w-full flex-wrap gap-y-0  flex gap-2 relative">
            {tags.map((tag) => {
              return (
                <p
                  key={tag?.id}
                  style={{ color: tag?.color }}
                  className="text-mn whitespace-break-spaces rounded-md max-w-full"
                >
                  {tag?.name}
                </p>
              );
            })}
            <div className="w-3 aspect-square">
              <IconCheckbox ></IconCheckbox>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
