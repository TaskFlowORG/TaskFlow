import { AddProp } from "@/components/icons/GeneralIcons/AddProp";
import { useTranslation } from "react-i18next";

type Props = {
  setModalProperty: (boolean: boolean) => void;
};
export const AddPropertyButton = ({ setModalProperty }: Props) => {
  const { t } = useTranslation();
  return (
    <div
      onClick={() => setModalProperty(true)}
      className="bg-[#f2f2f2] border-2 border-[#d7d7d7]  dark:bg-modal-grey gap-8 p-2 rounded-lg shadow-comment flex justify-center w-full max-w-[543px]"
    >
      <p className="font-montserrat text-base">{t("add-task-property")}</p>
      <div>
        <AddProp></AddProp>
      </div>
    </div>
  );
};
