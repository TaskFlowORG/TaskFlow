import { Project, TaskOrdered } from "@/models";
import { pageService } from "@/services";
import { DropResult } from "react-beautiful-dnd";

export const updateIndexes = (
  result: DropResult,
  list: TaskOrdered[],
  setList: (value: TaskOrdered[]) => void,
  project?: Project
) => {
  if (!result.destination || !project) return;
  const newList = Array.from(list);
  const [removed] = newList.splice(result.source.index, 1);
  newList.splice(result.destination.index, 0, removed);

  newList.forEach(async (l, index) => {
    l.indexAtColumn = index;
    await pageService.updateTaskPage(project.id, l);
  });
  setList(newList);
};
