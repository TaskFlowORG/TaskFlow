import { t } from "i18next";
import { Button } from "../Button";
import { useContext } from "react";
import { FilterContext } from "@/utils/FilterlistContext";
import { ProjectContext } from "@/contexts";

type Props = {
  updateTask: () => void;
};
export const Buttons = ({ updateTask }: Props) => {
  const { setFilterProp, setList } = useContext(FilterContext);
  const {project, setProject} = useContext(ProjectContext)
  return (
    <div className="flex gap-4  w-full h-min justify-end items-center">
      <Button
        font="font-alata"
        textSize="text-base"
        text={t("cancel")}
        secondary={true}
        fnButton={() => {
          setList!(undefined);
          setFilterProp!([]);
          setProject!({...project!})
        }}
        paddingY="py-1"
        padding="p-4"
      />
      <Button
        font="font-alata"
        textSize="text-base"
        text={t("save-changes")}
        fnButton={() => updateTask()}
        paddingY="py-1"
        padding="p-4"
      />
    </div>
  );
};
