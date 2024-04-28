import { IconTrashBin } from "@/components/icons";
import { Buttons } from "../Buttons";

type Props = {
  updateTask: () => void;
  deleteTask: () => void;
};

export const FooterTask = ({ deleteTask, updateTask }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div
        className="p-2 self-end justify-center items-center flex rounded-lg bg-primary dark:bg-secondary"
        onClick={deleteTask}
      >
        <div className="w-[18px] aspect-square  stroke-white">
          <IconTrashBin></IconTrashBin>
        </div>
      </div>
      <Buttons updateTask={updateTask} />
    </div>
  );
};
