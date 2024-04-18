import { ProjectContext } from "@/contexts";
import { Task, TimeValued } from "@/models";
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

  useEffect(() => {
    if (!value) return;

    // if (value.starts.length > value.ends.length){
    //   let date = new Date()
    //   date.setDate(date.getDate() -1)
    //   let time = new Date().getMilliseconds() - date.getMilliseconds()
    //   console.log(time);
    // }

    setHours(value?.parseDuration()!.hours ?? 0);
    setMinutes(value?.parseDuration()!.minutes ?? 0);
    setSeconds(value?.parseDuration()!.seconds ?? 0);
  }, []);

  function updateMinutes({
    setPrincipal,
    valueTest,
    callback,
  }: typeFunctionChrono) {
    console.log(valueTest);
    if (!play) return;
    if (valueTest >= 59) {
      callback();
      setPrincipal(0);
    } else {
      setPrincipal((prevMinutes) => prevMinutes + 1);
    }
  }

  const now = () => {
    return new Date().toJSON().slice(0, -1);
  };

  const handleClickPause = () => {
    setPlay(false);
    value.ends.push(now());
    console.log(value.time);
    value.time = `PT${hours}H${minutes}M${seconds}S`;
    let taskReturned = taskService.upDate(task, project!.id);
    console.log(taskReturned);
  };
  const handleClickPlay = () => {
    setPlay(true);
    // value.starts.push();
    value.starts.push(now());
    let taskReturned = taskService.upDate(task, project!.id);
    console.log(taskReturned);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateMinutes({
        setPrincipal: setSeconds,
        valueTest: seconds,
        callback: () =>
          updateMinutes({
            setPrincipal: setMinutes,
            valueTest: minutes,
            callback: () => setHours((prev) => prev + 1),
          }),
      });
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
          <div className="h-6 flex items-center justify-center aspect-square rounded-md bg-primary dark:bg-secondary">
            R
          </div>
        )}
      </div>
    </div>
  );
};
