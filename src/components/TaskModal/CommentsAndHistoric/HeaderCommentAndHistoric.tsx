import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

type Props = {
  title: string;
  isSelected: boolean;
  setIsInComments: (bool: boolean) => void;
};
export const HeaderCommentAndHistoric = ({
  title,
  isSelected,
  setIsInComments,
}: Props) => {
  const { t } = useTranslation();
  const container = twMerge(
    "w-1/2  flex items-center gap-4  px-4 py-1 bg-primary dark:bg-secondary rounded-t-lg",
    !isSelected
      ? "bg-white dark:bg-modal-grey border-2 border-[#343434] text-black dark:text-white"
      : ""
  );
  const text = twMerge(
    "h4 text-white ",
    !isSelected ? "text-[#343434] dark:text-white " : ""
  );
  return (
    <button className={container} onClick={() => setIsInComments(!isSelected)}>
      <div className="w-4 h-4 rounded-full bg-white"></div>
      <p className={text}>{t(title)}</p>
    </button>
  );
};
