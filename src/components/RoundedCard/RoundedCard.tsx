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
  completed?:boolean;
  waiting?:boolean;
}

export const RoundedCard = ({
  color,
  dark,
  children,
  changeImage,
  choose,
  provider,
  completed,
  waiting
}: Props) => {
  const { theme, setTheme } = useTheme();
  let style: Object = {};
  if (theme == "light") {
    style = {
      borderColor: color ?? "var(--primary-color)",
    };
  } else {
    style = {
      borderColor: dark ? dark : color ?? "var(--secondary-color)",
    };
  }
  const {setSelectedTask, setIsOpen} = useContext(TaskModalContext);

  const openModal = () => {
    if(!setIsOpen || !setSelectedTask) return
    setIsOpen(true)
    setSelectedTask(provider)
  }

  return (
    <span className={"flex overflow-clip  dark:bg-modal-grey shadowww max-w-[440px] w-full min-w-[300px]  rounded-lg bg-white "+
      (completed || waiting ? " border-green-500 border-2" : "") + (waiting ? " animation-delay-1000 animate-border-pulser " : "")
    }>
    <div
      style={style}
      className={` border-l-8 w-full flex flex-col p-4 justify-between gap-4 `}
      onMouseUp={() => {
        openModal();
        changeImage && changeImage();
      }}
    >
      {children}
    </div>
    </span>
  );
};
