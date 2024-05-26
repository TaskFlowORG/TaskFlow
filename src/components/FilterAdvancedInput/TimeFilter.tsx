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
                  <Image src={"/play.svg"} alt="Play" fill></Image>
                </div>
              </div>
            )}

          {play && (
            <div
              onClick={handleClickPause}
              className="h-6 flex items-center justify-center aspect-square rounded-md bg-primary dark:bg-secondary"
            >
              <div className="h-[10px] aspect-square relative">
                <Image src={"/pause.svg"} alt="pause" fill></Image>
              </div>
            </div>
          )}

          {!play && (
            <div
              className="h-6 flex items-center justify-center aspect-square rounded-md bg-primary dark:bg-secondary"
              onClick={handleClickRestart}
            >
              <div className="h-[10px] aspect-square relative bg-white rounded-sm"></div>
            </div>
          )}
        </NeedPermission>
      </div>
    </div>
  );
};
