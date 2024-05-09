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

  const { project } = useContext(ProjectContext);

  function diferencaEntreDatas(
    data1: number,
    data2: number
  ): { horas: number; minutos: number; segundos: number } {
    const diferenca = data2 - data1;
    console.log(diferenca);
    console.log(new Date(diferenca));
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

  // Exemplo de uso:
  // Timestamp em segundos

  useEffect(() => {
    console.log(value);
    if (value?.starts?.length > value?.ends?.length) {
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

      // Exemplo de uso:
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
      setSeconds(Math.floor(tempoTotal.segundos));
      setPlay(true);
      let time = tempoTotal.horas * 60 + tempoTotal.minutos;
      if ((property as Limited).maximum <= time) {
        let propFinded = formProps.find(
          (prop) => prop.property.property.id == formProp.property.property.id
        )!;
        propFinded?.errors.push("O tempo acabou já fi, vai moscano");
        setFormProps([...formProps]);
        setErrors(true);
        let exceeded = time - (property as Limited).maximum;
        let date = new Date(now());
        date.setTime(date.getTime() - exceeded * 60 * 1000);
        value.ends.push(new DateTimelines(date.toJSON().slice(0, -1)));
      }
    } else {
      setHours(value?.time?.hours ?? 0);
      setMinutes(value?.time?.minutes ?? 0);
      setSeconds(Math.floor(value?.time?.seconds) ?? 0);
    }
  }, []);

  useEffect(() => {
    verifyEnd();
  }, [seconds]);

  interface Tempo {
    horas: number;
    minutos: number;
    segundos: number;
  }

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
    console.log(valueTest);
    if (!play) return;
    if (valueTest > 59) {
      callback();
      setPrincipal(0);
    } else {
      setPrincipal(valueTest);
    }
  }

  const now = () => {
    //  let date = new Date(Date.now()).toJSON().slice(0, -1);
    let date = new Date(Date.now());
    if (formProp?.errors.length > 0) {
      date.setSeconds(Math.floor(new Date(Date.now()).getSeconds() - 1));
    } else {
      date.setSeconds(Math.floor(new Date(Date.now()).getSeconds()));
    }
    return date.toJSON().slice(0, -1);
  };

  const handleClickPause = async () => {
    setPlay(false);
    value.ends.push(new DateTimelines(now()));

    // // const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // // const userLocale: string = navigator.language;
    // // console.log(userLocale);

    // const timestampUTC = new Date(now());
    // const dataLocal = new Date(timestampUTC).toLocaleString();
    // console.log(dataLocal);

    // console.log(userLocale); // Isso irá imprimir o código do idioma preferido do usuário

    // // Exemplo de uso para exibir uma data no formato do idioma do usuário
    // const agora: Date = new Date(Date.now());
    // const options: Intl.DateTimeFormatOptions = {
    //   weekday: "long",
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    // };

    // // const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // const dataFormatada: string = agora.toLocaleDateString(userLocale, {timeZone : userTimeZone});
    // console.log("Data sem settar nada, por vidência", dataFormatada);

    console.log(value.time);
    if (value.time) {
      value.time.hours = hours;
      value.time.minutes = minutes;
      value.time.seconds = seconds;
    } else {
      value.time = new Duration(seconds, minutes, hours, undefined);
    }

    console.log(value);

    let taskReturned = await taskService.upDate(task, project!.id);
    console.log(taskReturned);
  };

  const handleClickRestart = async () => {
    value.time.hours = 0;
    value.time.minutes = 0;
    value.time.seconds = 0;
    setHours(value.time.hours);
    setMinutes(value.time.minutes);
    setSeconds(Math.floor(value.time.seconds));
    let taskReturned = await taskService.upDate(task, project!.id);
    console.log(taskReturned);
  };

  const handleClickPlay = async () => {
    setPlay(true);
    if (value?.starts == null) {
      value.starts = [];
    }
    value.starts.push(new DateTimelines(now()));
    console.log(value);
    let taskReturned = await taskService.upDate(task, project!.id);
    console.log(taskReturned);
  };

  const verifyEnd = () => {
    let totalTime = hours * 60 + minutes;
    if ((property as Limited).maximum <= totalTime) {
      let propFinded = formProps.find(
        (prop) => prop.property.property.id == formProp.property.property.id
      )!;
      propFinded.errors.push("O tempo acabou já fi, vai moscano");
      setFormProps([...formProps]);
      setErrors(true);
      handleClickPause();
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
        <p className="pr-4">
          {hours < 10 ? "0" + hours : hours}:
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </p>

        {!play && (
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
      </div>
    </div>
  );
};
