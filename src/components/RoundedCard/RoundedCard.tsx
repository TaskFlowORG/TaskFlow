import { TaskModalContext } from "@/utils/TaskModalContext";
import { useTheme } from "next-themes";
import { ReactNode, useContext } from "react";
interface Props {
  color?: string;
  dark?: string;
  children?: ReactNode;
  changeImage?: () => void;
  choose?: string;
  provider?: any;
}

export const RoundedCard = ({
  color,
  dark,
  children,
  changeImage,
  choose,
  provider,
}: Props) => {
  const { theme, setTheme } = useTheme();
  let style: Object = {};
  if (theme == "light") {
    style = {
      borderColor: color ?? "#F04A94",
    };
  } else {
    style = {
      borderColor: dark ? dark : color ?? "#f76858",
    };
  }
  const {setSelectedTask, setIsOpen} = useContext(TaskModalContext);

  const openModal = () => {
    if(!setIsOpen || !setSelectedTask) return
    setIsOpen(true)
    setSelectedTask(provider)
  }


  return (
    <div
      style={style}
      className={` border-l-8  dark:bg-modal-grey shadowww w-full min-w-[300px]  rounded-lg bg-white p-4 flex flex-col justify-between gap-4 max-w-[440px]`}
      onClick={() => {
        openModal();
        changeImage && changeImage();
      }}
    >
      {children}
    </div>
  );
};
