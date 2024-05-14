import { IconTrashBin } from "@/components/icons";
import { Buttons } from "../Buttons";
import { NeedPermission } from "@/components/NeedPermission";

type Props = {
  updateTask: () => void;
  deleteTask: () => void;
};

export const FooterTask = ({ deleteTask, updateTask }: Props) => {
  return (
    <div className="flex justify-between items-center w-full  pt-4 md:pt-6 lg:pt-0">
      <NeedPermission permission="delete">
        <div
          className="p-2 mr-1 self-end justify-center min-h-full items-center flex rounded-lg bg-primary dark:bg-secondary"
          onClick={deleteTask}
        >
          <div className=" w-3 md:w-[18px] aspect-square  stroke-white">
            <IconTrashBin></IconTrashBin>
          </div>
        </div>
      </NeedPermission>
      <NeedPermission permission="update">
        <Buttons updateTask={updateTask} />
      </NeedPermission>
    </div>
  );
};
