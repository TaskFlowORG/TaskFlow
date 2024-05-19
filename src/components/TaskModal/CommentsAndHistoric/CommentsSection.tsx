import { Message, Project, Task, User } from "@/models";
import { SendComment } from "./SendComment";
import { Comment } from "./Comment";
import { useContext, useEffect, useState } from "react";
import { projectService, taskService } from "@/services";
import { ProjectContext } from "@/contexts";
import { isProject } from "@/functions/modalTaskFunctions/isProject";
import { valuesOfObjects } from "@/functions/modalTaskFunctions/valuesOfObjects";
import { PageContext } from "@/utils/pageContext";
import { useAsyncThrow } from "@/hooks/useAsyncThrow";

type Props = {
  task: Task | Project;
  user: User;
};

export const CommentsSection = ({ task, user }: Props) => {
  const [commentsTask, setCommentsTask] = useState<Message[]>([]);
  const { project } = useContext(ProjectContext);
  const [input, setInput] = useState("");
  const { pageId } = useContext(PageContext);
  const { setProject } = useContext(ProjectContext);

  useEffect(() => {
    setCommentsTask((prevComments) => {
      const newComments = task?.comments ?? [];
      if (!arraysAreEqual(prevComments, newComments)) {
        return newComments;
      }
      return prevComments;
    });
  }, [task?.comments, deleteComment, updateComment]);

  function arraysAreEqual(arr1: any, arr2: any) {
    if (arr1?.length !== arr2?.length) {
      return false;
    }
    for (let i = 0; i < arr1?.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }
  const asynThrow = useAsyncThrow();

  async function updateComment(commentId: number, updatedValue: string) {
    let comment = task.comments[commentId];
    if (comment) {
      comment.value = updatedValue;
      comment.dateUpdate = new Date();
      console.log(updatedValue);
      console.log(task);
      if (!isProject(task)) {
        let taskUpdated = await taskService.upDate(task as Task, project!.id);
        setCommentsTask(taskUpdated.comments);
      } else {
        let projectUpdated = await projectService.update(
          task as Project,
          project!.id
        );
        setCommentsTask(projectUpdated.comments);
      }
    }
  }

  async function deleteComment(commentId: number) {
    let comment = task.comments[commentId];
    if (comment) {
      task.comments.splice(task.comments.indexOf(comment), 1);
      if (!isProject(task)) {
        let taskUpdated = await taskService.upDate(task as Task, project!.id);
        setCommentsTask(taskUpdated.comments);
      } else {
        let projectUpdated = await projectService.update(
          task as Project,
          project!.id
        );
        setCommentsTask(projectUpdated.comments);
      }
    }
  }

  async function sendComment() {
    if (!input) return;
    let comment: Message = {
      sender: user,
      value: input,
      destinations: [],
      dateCreate: new Date(),
    };

    if (task.comments) {
      task.comments.push(comment);
    } else {
      task.comments = [comment];
    }
    if (!isProject(task)) {
      let taskUpdated = await taskService.upDate(task as Task, project!.id);
      setCommentsTask(taskUpdated.comments);
      let page = project?.pages.find((page) => page.id == pageId);
      let taskPage = page?.tasks.find((taskD) => taskD.task.id == task.id);
      taskPage!.task = task as Task;
      setProject!({ ...project! });
    } else {
      let projectUpdated = await projectService.update(
        task as Project,
        project!.id
      );
      setCommentsTask(projectUpdated.comments);
      setProject!({ ...projectUpdated! });
    }

    setInput("");
  }
  return (
    <div className=" flex flex-col gap-6">
      <div className="flex flex-col gap-6 h-[442px] overflow-auto pr-8 bah">
        {commentsTask?.map((comment, index) => {
          return (
            <Comment
              {...comment}
              updateComment={updateComment}
              commentId={index}
              deleteComment={deleteComment}
              user={user}
              updatedAt={comment.dateUpdate?.toString() ?? undefined}
              date={comment.dateCreate?.toString()}
              key={index}
            ></Comment>
          );
        })}
      </div>
      <SendComment
        input={input}
        sendComment={sendComment}
        setInput={setInput}
      ></SendComment>
    </div>
  );
};
