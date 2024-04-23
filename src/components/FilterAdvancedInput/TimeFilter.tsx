import { ProjectContext } from "@/contexts";
import { Task, TimeValued } from "@/models";
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

interface Props {
  id: number;
  name: string;
  value: Interval;
  isInModal?: boolean;
  task: Task;
}

type typeFunctionChrono = {
  setPrincipal: Dispatch<SetStateAction<number>>;
  valueTest: number;
  callback: () => void;
};

export const TimeFilter = ({ value, task, id }: Props) => {
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
      const date = new Date(value.starts[value.starts.length - 1]);
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
    } else {
      setHours(value?.time?.hours ?? 0);
      setMinutes(value?.time?.minutes ?? 0);
      setSeconds(Math.floor(value?.time?.seconds) ?? 0);
    }
  }, []);

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
    return new Date(Date.now()).toJSON().slice(0, -1);
  };

  const handleClickPause = () => {
    setPlay(false);
    value.ends.push(now());
    console.log(value.time);
    if (value.time) {
      value.time.hours = hours;
      value.time.minutes = minutes;
      value.time.seconds = seconds;
    } else {
      value.time = new Duration(seconds, minutes, hours, null);
    }

    let taskReturned = taskService.upDate(task, project!.id);
    console.log(taskReturned);
  };

  const handleClickRestart = () => {
    value.time.hours = 0;
    value.time.minutes = 0;
    value.time.seconds = 0;
    setHours(value.time.hours);
    setMinutes(value.time.minutes);
    setSeconds(value.time.seconds);
    let taskReturned = taskService.upDate(task, project!.id);
    console.log(taskReturned);
  };

  const handleClickPlay = () => {
    setPlay(true);
    if (value?.starts == null) {
      value.starts = [];
    }
    value.starts.push(now());
    let taskReturned = taskService.upDate(task, project!.id);
    console.log(taskReturned);
  };

  useEffect(() => {
    console.log("OASDAJSHDJKASD " + value);
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
            className="h-6 flex items-center justify-center aspect-square rounded-md bg-primary dark:bg-secondary"
          >
            P
          </div>
        )}

        {play && (
          <div
            onClick={handleClickPause}
            className="h-6 flex items-center justify-center aspect-square rounded-md bg-primary dark:bg-secondary"
          >
            Ps
          </div>
        )}

        {!play && (
          <div
            className="h-6 flex items-center justify-center aspect-square rounded-md bg-primary dark:bg-secondary"
            onClick={handleClickRestart}
          >
            R
          </div>
        )}
      </div>
    </div>
  );
};
