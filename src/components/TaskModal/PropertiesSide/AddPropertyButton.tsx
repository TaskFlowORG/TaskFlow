import { AddProp } from "@/components/icons/GeneralIcons/AddProp";
import { isProject } from "@/functions/modalTaskFunctions/isProject";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  setModalProperty: (boolean: boolean) => void;
  isInModal:boolean;
};
export const AddPropertyButton = ({ setModalProperty, isInModal }: Props) => {
  const { t } = useTranslation();
  return (
    <div
      onClick={() => setModalProperty(true)}
      className="bg-[#f2f2f2] border-2 border-[#d7d7d7]  dark:bg-modal-grey gap-8 p-2 rounded-lg shadow-comment flex justify-center w-full"
    >
      <p className="font-montserrat text-mn md:text-p14 xl:text-p truncate ">
        { isInModal ?  t("add-task-property") : t('add-property-to-project') }
      </p>
      <div>
        <AddProp></AddProp>
      </div>
    </div>
  );
};
