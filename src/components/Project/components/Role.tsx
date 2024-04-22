import { If } from "@/components/If";
import { IconInvert } from "@/components/icons";
import { IconPlus } from "@/components/icons/GeneralIcons/IconPlus";
import { IconSave } from "@/components/icons/Slidebarprojects/IconSave";
import { Permission } from "@/models";
import { useTranslation } from "next-i18next";

export const Role = ({
  role,
  editing,
    updatePermission,
    selected,
}: {
  role: string;
    editing?: boolean;
    updatePermission: (hasPermission: boolean, role: string) => void;
    selected: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <div className="w-full h-min flex justify-between items-center">
      <span className="flex h-min text-contrast gap-2  items-center">
        <If
          condition={selected}
        >
          <span className="rounded-full h-4 w-4 p-1 bg-contrast">
            <IconSave />
          </span>
          <span className=" rotate-135 rounded-full p-px h-4 w-4 bg-contrast">
            <IconPlus />
          </span>
        </If>
        <p
          style={{
            opacity:selected? 1
              : 0.5,
          }}
        >
          {t(role)}
        </p>
      </span>
        <If condition={editing != undefined && editing}>
            <IconInvert onClick={e => updatePermission(!selected, role)} />
        </If>
    </div>
  );
};
