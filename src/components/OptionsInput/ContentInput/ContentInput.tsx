import { Input } from "@/components/Input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Option } from "@/models";
import { IconPlus } from "@/components/icons/GeneralIcons/IconPlus";
import { If } from "@/components/If";
import { NeedPermission } from "@/components/NeedPermission";
import { useTranslation } from "react-i18next";

type ContentInputProps = {
  index: number;
  option: Option;
  disabled?: boolean;
  remove: (option: Option) => void; 
};

export const ContentInput = ({
  index,
  option,
  disabled,
remove
}: ContentInputProps) => {
  const [color, setColor] = useState<string>(option.color);
  const [name, setName] = useState<string>(option.name);
  const [hovering, setIsHovering] = useState(false);
  const {t} = useTranslation();

  useEffect(() => {
    option.name = name;
    option.color = color;
  }, [name, color]);
  return (
    <div
      className="w-full h-7  flex items-center gap-[0.6rem]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <NeedPermission permission="update">
      <span onClick={() => remove(option)} className="rotate-35 w-5 h-4 p-px bg-primary rounded-full flex justify-center items-center dark:bg-secondary">
        <IconPlus classes="w-full h-full text-contrast" />
      </span>

      </NeedPermission>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="w-full h-min disabled:opacity-100 rounded-sm bg-transparent"
        placeholder={`${t("option")} ${index + 1}`}
        disabled={disabled}
      />
      <span className="w-8 h-min justify-end flex">
        <span
          className="h-4 w-4 rounded-full border-[1px] border-zinc-200 shadow-blur-10 dark:shadow-blur-20 "
          style={{ backgroundColor: color }}
        >
          <input
            type="color"
            value={color}
            disabled={disabled}
            onChange={(e) => setColor(e.target.value)}
            className="h-full w-full opacity-0 disabled:opacity-0"
          />
        </span>
      </span>
    </div>
  );
};
