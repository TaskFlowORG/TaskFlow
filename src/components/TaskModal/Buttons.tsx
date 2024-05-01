import { Button } from "../Button";
import { useContext } from "react";
import { FilterContext } from "@/utils/FilterlistContext";
import { ProjectContext } from "@/contexts";
import { useTranslation } from "react-i18next";

type Props = {
  updateTask: () => void;
};
export const Buttons = ({ updateTask }: Props) => {
  const { setFilterProp, setList } = useContext(FilterContext);
  const { project, setProject } = useContext(ProjectContext);
  const { t } = useTranslation();
  return (
    <div className="flex gap-4  w-full h-min justify-end items-center">
      <Button
        font="font-alata"
        textSize=" text-mn md:text-p14 lg:text-p"
        text={t("cancel")}
        secondary={true}
        fnButton={() => {
          setList!(undefined);
          setFilterProp!([]);
          setProject!({ ...project! });
        }}
        paddingY="py-1"
        padding="p-2"
      />
      <Button
        font="font-alata"
        textSize=" text-mn md:text-p14 lg:text-p max-w-[80px] sm:max-w-full"
        text={t("save-changes")}
        fnButton={() => updateTask()}
        paddingY="py-1"
        padding="p-4"
      />
    </div>
  );
};
