import { useTranslation } from "next-i18next";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"input"> {}

export const InputComments = (props: Props) => {

  const {t} = useTranslation()
  return (
    <input
      type="text"
      className="text-[14px] border-[#d7d7d7] border-[1px] shadow-comment bg-[#f2f2f2] dark:bg-modal-grey flex-1 font-montserrat px-3 py-[10px] rounded-lg"
      placeholder={t('write-comment')}
      {...props}
    />
  );
};
