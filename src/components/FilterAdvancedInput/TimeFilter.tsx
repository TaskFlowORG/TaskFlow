import { ProjectContext } from "@/contexts";
import {
  Limited,
  Project,
  Property,
  PropertyValue,
  Task,
  TimeValued,
} from "@/models";
import { Duration } from "@/models/values/Duration";
import { Interval } from "@/models/values/Interval";
import { projectService, taskService } from "@/services";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { DateTimelines } from "@/models/values/DateTimelines";
import { PageContext } from "@/utils/pageContext";
import { NeedPermission } from "../NeedPermission";
import { isProject } from "@/functions/modalTaskFunctions/isProject";
import { valuesOfObjects } from "@/functions/modalTaskFunctions/valuesOfObjects";
import { CardTime } from "../CardContent/CardProperties/CardTime";
import { UserContext } from "@/contexts/UserContext";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { useTranslation } from "react-i18next";
import { useIsDisabled } from "@/functions/modalTaskFunctions/isDisabled";

type PropsForm = {
  property: PropertyValue;
  errors: string[];
};

interface Props {
  id: number;
  name: string;
  value: Interval;
  isCardContent?: boolean;
  isInModal?: boolean;
  task: Task | Project;
  property: Property;
  formProp: PropsForm;
  formProps: PropsForm[];
  setFormProps: (prop: PropsForm[]) => void;
  setErrors: (boolean: boolean) => void;
}

type typeFunctionChrono = {
  setPrincipal: Dispatch<SetStateAction<number>>;
  valueTest: number;
  callback: () => void;
};

interface Tempo {
  horas: number;
  minutos: number;
  segundos: number;
}

export const TimeFilter = ({
  isCardContent = false,
  value,
  task,
  id,
  property,
  formProp,
  setFormProps,
  formProps,
  setErrors,
}: Props) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [play, setPlay] = useState(false);
  const { pageId } = useContext(PageContext);
  const { project, setProject } = useContext(ProjectContext);
  const { user } = useContext(UserContext);

  function somarTempos(tempo1: Tempo, tempo2: Tempo): Tempo {
    let totalSegundos = tempo1.segundos + tempo2.segundos;
    let totalMinutos = tempo1.minutos + tempo2.minutos;
    let totalHoras = tempo1.horas + tempo2.horas;

    // Ajustar os segundos se ultrapassar um minuto
    if (totalSegundos >= 60) {
      totalMinutos += Math.floor(totalSegundos / 60);
      totalSegundos %= 60;
    }

    // Ajustar os minutos se ultrapassar uma hora
    if (totalMinutos >= 60) {
      totalHoras += Math.floor(totalMinutos / 60);
      totalMinutos %= 60;
    }

    return {
      horas: totalHoras,
      minutos: totalMinutos,
      segundos: totalSegundos,
    };
  }

  function updateMinutes({
    setPrincipal,
    valueTest,
    callback,
  }: typeFunctionChrono) {
    if (!play) return;
    if (valueTest > 59) {
      callback();
      setPrincipal(0);
    } else {
      setPrincipal(valueTest);
    }
  }

  function diferencaEntreDatas(
    data1: number,
    data2: number
  ): { horas: number; minutos: number; segundos: number } {
    const diferenca = data2 - data1;
    const horas = Math.floor(diferenca / 3600);
    const minutos = Math.floor((diferenca % 3600) / 60);
    const segundos = diferenca % 60;
    return { horas, minutos, segundos };
  }

  const calcsTimes = (plus: number) => {
    updateMinutes({
      setPrincipal: setSeconds,
      valueTest: seconds + plus,
      callback: () =>
        updateMinutes({
          setPrincipal: setMinutes,
          valueTest: minutes + plus,
          callback: () => setHours((prev) => prev + plus),
        }),
    });
  };

  useEffect(() => {
    verifyEnd();
  }, [seconds]);

  const { setSelectedTask } = useContext(TaskModalContext);
  const handleClickRestart = async () => {
    value.time.hours = 0;
    value.time.minutes = 0;
    value.time.seconds = 0;
    setHours(value.time.hours);
    setMinutes(value.time.minutes);
    setSeconds(Math.floor(value.time.seconds));
    if (!isProject(task)) {
      let taskReturned = await taskService.upDate(task as Task, project!.id);
      const page = project?.pages.find((page) => page.id == pageId);
      const taskPage = page?.tasks.find((taskP) => taskP.task.id == task.id);
      if (taskPage) {
        taskPage.task = taskReturned;
      }
      setProject!({ ...project! });
    }
  };

  const now = () => {
    //  let date = new Date(Date.now()).toJSON().slice(0, -1);
    let date = new Date(Date.now());
    date.setSeconds(Math.floor(new Date(Date.now()).getSeconds()));
    return date.toJSON();
  };

  useEffect(() => {
    if (value?.starts?.length > value?.ends?.length) {
      const date = new Date(value.starts[value.starts.length - 1].date);
      date.setHours(date.getHours());
      const data1 = date.getTime();
      // Timestamp em segundos
      const data2 = new Date().getTime();
      const { horas, minutos, segundos } = diferencaEntreDatas(
        data1 / 1000,
        data2 / 1000
      );

      const tempo1: Tempo = {
        horas: value?.time?.hours,
        minutos: value?.time?.minutes,
        segundos: value?.time?.seconds,
      };
      const tempo2: Tempo = {
        horas: horas,
        minutos: minutos,
        segundos: Math.floor(segundos),
      };

      const tempoTotal = somarTempos(tempo1, tempo2);
      setHours(tempoTotal.horas);
      setMinutes(tempoTotal.minutos);
      setSeconds(Math.floor(tempoTotal.segundos) ?? 0);
      setPlay(true);
      let time = tempoTotal.horas * 60 + tempoTotal.minutos;
      // if ((property as Limited).maximum <= time) {
      //   let propFinded = formProps.find(
      //     (prop) => prop.property.property.id == formProp.property.property.id
      //   )!;
      //   propFinded?.errors.push("O tempo acabou já fi, vai moscano");
      //   setFormProps([...formProps]);
      //   setErrors(true);
      //   let exceeded = time - (property as Limited).maximum;
      //   let date = new Date(now());
      //   date.setTime(date.getTime() - exceeded * 60 * 1000);
      //   value.ends.push(new DateTimelines(date.toJSON().slice(0, -1)));
      //   updateTask(value);
      // }
    } else {
      setHours(value?.time?.hours ?? 0);
      setMinutes(value?.time?.minutes ?? 0);
      setSeconds(Math.floor(value?.time?.seconds) ?? 0);
    }
  }, [value]);

  const handleClickPause = async () => {
    setPlay(false);
    value.ends.push(new DateTimelines(now()));
    if (value.time) {
      value.time.hours = hours;
      value.time.minutes = minutes;
      value.time.seconds = seconds;
    } else {
      value.time = new Duration(seconds, minutes, hours, undefined);
    }
    let propertyFinded = valuesOfObjects(task).find(
      (prop) => prop.property.id == id
    )!;
    propertyFinded.value.value = value;

    if (!isProject(task)) {
      let taskReturned = await taskService.upDate(task as Task, project!.id);
      const page = project?.pages.find((page) => page.id == pageId);
      const taskPage = page?.tasks.find((taskP) => taskP.task.id == task.id);
      if (taskPage) {
        taskPage.task = taskReturned;
      }
      setSelectedTask!(taskReturned);
      setProject!({ ...project! });
    }
  };

  const { t } = useTranslation();

  const handleClickPlay = async () => {
    setPlay(true);
    if (value?.starts == null) {
      value.starts = [];
    }
    value.starts.push(new DateTimelines(now()));
    let propertyFinded = valuesOfObjects(task).find(
      (prop) => prop.property.id == id
    )!;
    propertyFinded.value.value = value;
    if (!isProject(task)) {
      const taskReturned = await taskService.upDate(task as Task, project!.id);
      const page = project?.pages.find((page) => page.id == pageId);
      const taskPage = page?.tasks.find((taskP) => taskP.task.id == task.id);
      if (taskPage) {
        taskPage.task = taskReturned;
      }
      setSelectedTask!(taskReturned);
      setProject!({ ...project! });
    }
  };

  const isDisabled = useIsDisabled(true, "update");

  const verifyEnd = async () => {
    // let totalTimeInSeconds = hours * 60 * 60 + minutes * 60 + seconds;
    if ((property as Limited).maximum == undefined) return;

    let totalTimeInMinutes = hours * 60 + minutes + seconds / 60;

    if ((property as Limited).maximum <= totalTimeInMinutes) {
      let propFinded = formProps.find(
        (prop) => prop.property.property.id == formProp.property.property.id
      )!;
      propFinded?.errors.push(t("value-max-time-property"));
      setFormProps([...formProps]);
      setErrors(true);
      setPlay(false);
      const exceededTime = totalTimeInMinutes - (property as Limited).maximum;
      const currentDate = new Date();

      // currentDate.setTime(currentDate.getTime() - exceededTime  * 1000);

      // Minutes Mode

      currentDate.setTime(currentDate.getTime() - exceededTime * 60 * 1000);
      value.ends.push(new DateTimelines(currentDate.toJSON()));

      // Seconds Mode

      // value.time.hours = Math.floor((property as Limited).maximum / 3600);
      // value.time.minutes = Math.floor(
      //   ((property as Limited).maximum % 3600) / 60
      // );
      // value.time.seconds = (property as Limited).maximum % 60;

      value.time.hours = Math.floor((property as Limited).maximum / 60); // Obtém as horas
      value.time.minutes = Math.floor((property as Limited).maximum % 60); // Obtém os minutos
      value.time.seconds = 0;
      setHours(value.time.hours);
      setMinutes(value.time.minutes);
      setSeconds(value.time.seconds);

      let propertyFinded = valuesOfObjects(task).find(
        (prop) => prop.property.id == id
      )!;
      propertyFinded.value.value = value;

      if (!isProject(task)) {
        const taskReturned = await taskService.upDate(
          task as Task,
          project!.id
        );
        const page = project?.pages.find((page) => page.id == pageId);
        const taskPage = page?.tasks.find((taskP) => taskP.task.id == task.id);
        if (taskPage) {
          taskPage.task = taskReturned;
        }
        setSelectedTask!(taskReturned);
        setProject!({ ...project! });
      }

      // handleClickPause();
    }
  };

  const handleUpdateColor = async (e: any) => {
    console.log(e.target.value);
    value.color = e.target.value;
    if (!isProject(task)) {
      const taskReturned = await taskService.upDate(task as Task, project!.id);
      const page = project?.pages.find((page) => page.id == pageId);
      const taskPage = page?.tasks.find((taskP) => taskP.task.id == task.id);
      if (taskPage) {
        taskPage.task = taskReturned;
      }
      setSelectedTask!(taskReturned);
      setProject!({ ...project! });
    } else {
      const projectReturned = await projectService.update(
        task as Project,
        project!.id
      );
      setProject!({ ...projectReturned! });

      // setProject!({ ...projectReturned! });
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      calcsTimes(1);
    }, 1000);

    // Retorna uma função de limpeza que é executada quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, [seconds, minutes, play]); // O segundo argumento é uma matriz de dependências vazia, o que significa que o efeito só é executado uma vez após a montagem do componente

  return (
    <div className="flex gap-4 items-center">
      <NeedPermission permission="update">
        <span
          className="h-4 w-4 rounded-full border-[1px] border-zinc-200 shadow-blur-10 dark:shadow-blur-20 "
          style={{ backgroundColor: value.color }}
        >
          <input
            type="color"
            value={value.color}
            disabled={isDisabled}
            onChange={handleUpdateColor}
            className="h-full w-full opacity-0 disabled:opacity-0"
          />
        </span>
      </NeedPermission>

      <div className="flex gap-1 items-center">
        <p className="pr-4 text-p14">
          {hours < 10 ? "0" + hours : hours}:
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </p>
        <NeedPermission permission="update">
          {!play &&
            (minutes < (property as Limited).maximum ||
              (property as Limited).maximum == undefined) && (
              <div
                onClick={handleClickPlay}
                className="h-6  flex items-center justify-center aspect-square rounded-md bg-primary dark:bg-secondary"
              >
                <div className="h-[10px] aspect-square relative">
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full text-contrast"
                  >
                    <path d="M7.37042 2.95786C7.55954 3.05843 7.71772 3.20856 7.82804 3.39217C7.93835 3.57577 7.99663 3.78593 7.99663 4.00012C7.99663 4.21431 7.93835 4.42447 7.82804 4.60808C7.71772 4.79168 7.55954 4.94181 7.37042 5.04238L2.32569 7.78563C1.51339 8.22781 0.515625 7.65294 0.515625 6.74377V1.25686C0.515625 0.347302 1.51339 -0.227179 2.32569 0.214215L7.37042 2.95786Z" />
                  </svg>
                </div>
              </div>
            )}

          {play && (
            <div
              onClick={handleClickPause}
              className="h-6 flex items-center justify-center aspect-square rounded-md bg-primary dark:bg-secondary"
            >
              <div className="h-[10px] aspect-square relative">
                <svg
                  width="8"
                  height="9"
                  viewBox="0 0 8 9"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full text-contrast"
                >
                  <path
                    d="M7.392 1.547V8.267C7.392 8.44523 7.3212 8.61615 7.19518 8.74218C7.06915 8.8682 6.89823 8.939 6.72 8.939H5.04C4.86177 8.939 4.69085 8.8682 4.56482 8.74218C4.4388 8.61615 4.368 8.44523 4.368 8.267V1.547C4.368 1.36877 4.4388 1.19785 4.56482 1.07182C4.69085 0.9458 4.86177 0.875 5.04 0.875H6.72C6.89823 0.875 7.06915 0.9458 7.19518 1.07182C7.3212 1.19785 7.392 1.36877 7.392 1.547ZM2.352 0.875H0.672C0.493775 0.875 0.322849 0.9458 0.196824 1.07182C0.0707998 1.19785 0 1.36877 0 1.547V8.267C0 8.44523 0.0707998 8.61615 0.196824 8.74218C0.322849 8.8682 0.493775 8.939 0.672 8.939H2.352C2.53023 8.939 2.70115 8.8682 2.82718 8.74218C2.9532 8.61615 3.024 8.44523 3.024 8.267V1.547C3.024 1.36877 2.9532 1.19785 2.82718 1.07182C2.70115 0.9458 2.53023 0.875 2.352 0.875Z"
                  />
                </svg>
              </div>
            </div>
          )}

          {!play && (
            <div
              className="h-6 flex items-center justify-center aspect-square rounded-md bg-primary dark:bg-secondary"
              onClick={handleClickRestart}
            >
              <div className="h-[10px] aspect-square relative bg-contrast rounded-sm"></div>
            </div>
          )}
        </NeedPermission>
      </div>
    </div>
  );
};
