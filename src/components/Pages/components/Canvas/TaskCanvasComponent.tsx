"use client";

import { RoundedCard } from "../../../RoundedCard";
import { CardContent } from "../../../CardContent";
import {
  useState,
  useRef,
  useEffect,
  MouseEvent as MouseEventReact,
  useContext,
} from "react";
import { CanvasPage, TaskCanvas } from "@/models";
import { pageService } from "@/services";
import { ProjectContext } from "@/contexts";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { If } from "@/components/If";
import { useTranslation } from "next-i18next";
import { UserContext } from "@/contexts/UserContext";
import { Loading } from "@/components/Loading";

interface Props {
  task: TaskCanvas;
  elementRef: React.RefObject<HTMLDivElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  page: CanvasPage | undefined;
  moving: boolean;
  idTaskDragged: number | undefined;
  setIdTaskDragged: (id: number | undefined) => void;
}

export const TaskCanvasComponent = ({
  task,
  elementRef,
  page,
  moving,
  idTaskDragged, 
  setIdTaskDragged
}: Props) => {
  const [x, setX] = useState(task.x);
  const [y, setY] = useState(task.y);
  const { project } = useContext(ProjectContext);
  const [dragging, setDragging] = useState<boolean>(false);
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const draggableRef = useRef<HTMLDivElement>(null);
  const style: Object = {
    top: y,
    left: x,
  };
  const mouseDown = (e: MouseEventReact) => {
    if (e.button == 1) return;
    setDragging(!moving);
    setIdTaskDragged(task.id);
  };

  useEffect(() => {
    task.x = x;
  }, [x, task]);
  useEffect(() => {
    task.y = y;
  }, [y, task]);
  useEffect(() => {
    const current = elementRef.current;
    if (!current) return;
    const changeXandY = (e: MouseEvent) => {
      if (!draggableRef.current || !elementRef.current || !dragging) return;
      const offsetX =
        elementRef.current.scrollLeft +
        e.pageX -
        draggableRef.current.clientWidth / 2;
      const offsetY =
        elementRef.current.scrollTop +
        e.pageY -
        draggableRef.current.clientHeight / 2;
      if (offsetX > 0 && offsetX < 3700) setX(offsetX);
      if (offsetY > 56 && offsetY < 2000) setY(offsetY);
    };
    const mouseUp = (e: Event) => {
      setDragging(false);
      if (!page || !project || task.id != idTaskDragged) return;
      pageService.updateTaskPage(project.id, task);
    };
    if (window.matchMedia("(any-pointer: coarse)").matches) {
      current.addEventListener("pointerup", mouseUp);
      current.addEventListener("pointermove", changeXandY);
    } else {
      current.addEventListener("mouseup", mouseUp);
      current.addEventListener("mousemove", changeXandY);
    }
    return () => {
      if (!current) return;
      if (window.matchMedia("(any-pointer: coarse)").matches) {
        current.removeEventListener("pointermove", changeXandY);
        current.removeEventListener("pointerup", mouseUp);
      } else {
        current.removeEventListener("mousemove", changeXandY);
        current.removeEventListener("mouseup", mouseUp);
      }
    };
  }, [dragging, elementRef, page, task]);

  const { setSelectedTask, setIsOpen } = useContext(TaskModalContext);
  const openModal = () => {
    if (!setIsOpen || !setSelectedTask) return;
    setIsOpen(true);
    setSelectedTask(task.task);
  };
  const { t } = useTranslation();

  const {user}= useContext(UserContext)
  if(!user)return <Loading/>
  return (
    <div
      className="w-min h-min p-2 absolute transition-none select-none cursor-[url('/img/grabLight.svg'),auto] dark:cursor-[url('/img/grabDark.svg'),auto] "
      style={style}
      onMouseDown={mouseDown}
      onPointerDown={mouseDown}
      ref={draggableRef}
      onDoubleClick={openModal}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <div className="w-min h-min pointer-events-none">
        <RoundedCard completed={task.task.completed} waiting={task.task.waitingRevision}>
          <CardContent task={task.task} user={user} />
        </RoundedCard>
      </div>
      <p className={"fixed left-10 bottom-5 duration-300 transition-opacity font-montserrat text-[14px] " + (mouseOver ? "" : "opacity-0")}>
        {t("double-click-open-task")}
      </p>
    </div>
  );
};
