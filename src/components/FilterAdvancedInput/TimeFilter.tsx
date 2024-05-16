import { ProjectContext } from "@/contexts";
import { Limited, Property, PropertyValue, Task, TimeValued } from "@/models";
import { Duration } from "@/models/values/Duration";
import { Interval } from "@/models/values/Interval";
import { taskService } from "@/services";
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

type PropsForm = {
  property: PropertyValue;
  errors: string[];
};

interface Props {
  id: number;
  name: string;
  value: Interval;
  isInModal?: boolean;
  task: Task;
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
    // console.log(valueTest);
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

  const handleClickRestart = async () => {
    value.time.hours = 0;
    value.time.minutes = 0;
    value.time.seconds = 0;
    setHours(value.time.hours);
    setMinutes(value.time.minutes);
    setSeconds(Math.floor(value.time.seconds));
    let taskReturned = await taskService.upDate(task, project!.id);
    const page = project?.pages.find((page) => page.id == pageId);
    const taskPage = page?.tasks.find((taskP) => taskP.task.id == task.id);
    if (taskPage) {
      taskPage.task = taskReturned;
      console.log(
        "EUTENTREI AJKDN SAJLKD FNZSCVD BHJ NC VJFGBGK HN VBJVMBHJMHBIV,SMDFJDNF.SD KFGÇ F;KLÇD FKJGKLVTJ ÇKCV CVB HJNM FDD V KD .,CBF"
      );
    }
    setProject!({ ...project! });
  };

  const now = () => {
    //  let date = new Date(Date.now()).toJSON().slice(0, -1);
    let date = new Date(Date.now());
    date.setSeconds(Math.floor(new Date(Date.now()).getSeconds()));
    return date.toJSON();
  };

  useEffect(() => {
    console.log(value);
    if (value?.starts?.length > value?.ends?.length) {
      console.log("Eu entrei e que se foda o mundo");
      const date = new Date(value.starts[value.starts.length - 1].date);
      date.setHours(date.getHours() - 3);
      const data1 = date.getTime();
      console.log("data 1", new Date(data1));
      // Timestamp em segundos
      const data2 = new Date().getTime();
      console.log("data 2", new Date(data2));
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
      console.log("SOU O SEU TEMPO ANIMAL");
      console.log(tempoTotal);
      setHours(tempoTotal.horas);
      setMinutes(tempoTotal.minutos);
      setSeconds(Math.floor(tempoTotal.segundos));
      setPlay(true);
      let time = tempoTotal.horas * 60 + tempoTotal.minutos;
      // if ((property as Limited).maximum <= time) {
      //   console.log("Aqui eu me fudi");
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

  const updateTask = async (value: Interval) => {
    let propertyFinded = task.properties.find(
      (prop) => prop.property.id == id
    )!;
    propertyFinded.value.value = value;
    let taskReturned = await taskService.upDate(task, project!.id);
    const page = project?.pages.find((page) => page.id == pageId);
    const taskPage = page?.tasks.find((taskP) => taskP.task.id == task.id);
    if (taskPage) {
      taskPage.task = taskReturned;
      console.log(
        "EUTENTREI AJKDN SAJLKD FNZSCVD BHJ NC VJFGBGK HN VBJVMBHJMHBIV,SMDFJDNF.SD KFGÇ F;KLÇD FKJGKLVTJ ÇKCV CVB HJNM FDD V KD .,CBF"
      );
    }
    setProject!({ ...project! });
  };
  const handleClickPause = async () => {
    setPlay(false);
    value.ends.push(new DateTimelines(now()));
    console.log(value.time);
    if (value.time) {
      value.time.hours = hours;
      value.time.minutes = minutes;
      value.time.seconds = seconds;
    } else {
      value.time = new Duration(seconds, minutes, hours, undefined);
    }
    let propertyFinded = task.properties.find(
      (prop) => prop.property.id == id
    )!;
    propertyFinded.value.value = value;
    let taskReturned = await taskService.upDate(task, project!.id);
    const page = project?.pages.find((page) => page.id == pageId);
    const taskPage = page?.tasks.find((taskP) => taskP.task.id == task.id);
    if (taskPage) {
      taskPage.task = taskReturned;
      console.log(
        "EUTENTREI AJKDN SAJLKD FNZSCVD BHJ NC VJFGBGK HN VBJVMBHJMHBIV,SMDFJDNF.SD KFGÇ F;KLÇD FKJGKLVTJ ÇKCV CVB HJNM FDD V KD .,CBF"
      );
    }
    setProject!({ ...project! });
  };

  const handleClickPlay = async () => {
    setPlay(true);
    if (value?.starts == null) {
      value.starts = [];
    }
    value.starts.push(new DateTimelines(now()));
    console.log(value);
    let propertyFinded = task.properties.find(
      (prop) => prop.property.id == id
    )!;
    propertyFinded.value.value = value;
    const taskReturned = await taskService.upDate(task, project!.id);
    const page = project?.pages.find((page) => page.id == pageId);
    const taskPage = page?.tasks.find((taskP) => taskP.task.id == task.id);
    if (taskPage) {
      taskPage.task = taskReturned;
      console.log(
        "EUTENTREI AJKDN SAJLKD FNZSCVD BHJ NC VJFGBGK HN VBJVMBHJMHBIV,SMDFJDNF.SD KFGÇ F;KLÇD FKJGKLVTJ ÇKCV CVB HJNM FDD V KD .,CBF"
      );
    }
    setProject!({ ...project! });
  };

  const verifyEnd = async () => {
    // let totalTimeInSeconds = hours * 60 * 60 + minutes * 60 + seconds;
    if ((property as Limited).maximum==undefined)return

    let totalTimeInMinutes = hours * 60 + minutes + seconds / 60;

    if ((property as Limited).maximum <= totalTimeInMinutes) {
      // console.log("Ended");
      let propFinded = formProps.find(
        (prop) => prop.property.property.id == formProp.property.property.id
      )!;
      propFinded?.errors.push("O valor chegou ao tempo máximo da propriedade!");
      setFormProps([...formProps]);
      setErrors(true);
      setPlay(false);
      console.log("EXECUTOU");
      const exceededTime = totalTimeInMinutes - (property as Limited).maximum;
      const currentDate = new Date();

      // currentDate.setTime(currentDate.getTime() - exceededTime  * 1000);

      // Minutes Mode

      currentDate.setTime(currentDate.getTime() - exceededTime * 60 * 1000);
      value.ends.push(new DateTimelines(currentDate.toJSON().slice(0, -1)));
      console.log(value);

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

      let propertyFinded = task.properties.find(
        (prop) => prop.property.id == id
      )!;
      propertyFinded.value.value = value;
      const taskReturned = await taskService.upDate(task, project!.id);
      const page = project?.pages.find((page) => page.id == pageId);
      const taskPage = page?.tasks.find((taskP) => taskP.task.id == task.id);
      if (taskPage) {
        taskPage.task = taskReturned;
        console.log(
          "EUTENTREI AJKDN SAJLKD FNZSCVD BHJ NC VJFGBGK HN VBJVMBHJMHBIV,SMDFJDNF.SD KFGÇ F;KLÇD FKJGKLVTJ ÇKCV CVB HJNM FDD V KD .,CBF"
        );
      }
      console.log(value);
      setProject!({ ...project! });
      // handleClickPause();
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
    <div className="flex gap-8">
      <div className="flex gap-1">
        <p className="pr-4 text-p14">
          {hours < 10 ? "0" + hours : hours}:
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </p>
        <NeedPermission permission="update">
          {!play && ((minutes < (property as Limited).maximum) || ((property as Limited).maximum == undefined))  && (
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
