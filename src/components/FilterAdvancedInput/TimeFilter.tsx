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
      <div>
        <i>
          {hours < 10 ? "0" + hours : hours}:
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </i>
        <i onClick={handleClickPlay}>Play</i>
        <i onClick={handleClickPause}>Pause</i>
        <i>Restart</i>
      </div>
    </div>
  );
};
