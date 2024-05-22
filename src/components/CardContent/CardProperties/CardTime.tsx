import { IconCalendar, IconClock } from "@/components/icons";
import { Limited } from "@/models";
import { Interval } from "@/models/values/Interval";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  time: Interval;
  property: Limited;
  showNameProperty: boolean;
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

export const CardTime = ({ time, property, showNameProperty }: Props) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [play, setPlay] = useState(false);

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

  useEffect(() => {
    if (time?.starts?.length > time?.ends?.length) {
      const date = new Date(time.starts[time.starts.length - 1].date);
      date.setHours(date.getHours());
      const data1 = date.getTime();
      // Timestamp em segundos
      const data2 = new Date().getTime();
      const { horas, minutos, segundos } = diferencaEntreDatas(
        data1 / 1000,
        data2 / 1000
      );

      const tempo1: Tempo = {
        horas: time?.time?.hours,
        minutos: time?.time?.minutes,
        segundos: time?.time?.seconds,
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
      let timeD = tempoTotal.horas * 60 + tempoTotal.minutos;
      // }
    } else {
      setHours(time?.time?.hours ?? 0);
      setMinutes(time?.time?.minutes ?? 0);
      setSeconds(Math.floor(time?.time?.seconds) ?? 0);
    }
  }, [time]);

  useEffect(() => {
    if (time.starts > time.ends) {
      setPlay(true);
    }
    // if ((property as Limited).maximum == undefined) return;

    let totalTimeInMinutes = hours * 60 + minutes + seconds / 60;

    if ((property as Limited).maximum != undefined && (property as Limited).maximum <= totalTimeInMinutes) {
      setPlay(false)
      setHours(Math.floor((property as Limited).maximum / 60));
      setMinutes(Math.floor((property as Limited).maximum % 60));
      setSeconds(0);
    }

    const intervalId = setInterval(() => {
      calcsTimes(1);
    }, 1000);

    // Retorna uma função de limpeza que é executada quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, [seconds, minutes, play]);

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

  return (
    <>
      <div className="flex gap-1 items-center w-max">
        {showNameProperty && (
          <p className="text-p14 text-[#797979] dark:text-white ">
            {property.name}:
          </p>
        )}

        <p className=" mn text-[#797979] dark:text-white mt-0.5 ">
          {hours < 10 ? "0" + hours : hours}:
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
          {/* {time.time.hours < 10 ? "0" + time.time.hours : time.time.hours}:
          {time.time.minutes < 10 ? "0" + time.time.minutes : time.time.minutes}
          :
          {time.time.seconds < 10 ? "0" + time.time.seconds : time.time.seconds} */}
        </p>
        <div className="w-4 aspect-square">
          <IconClock></IconClock>
        </div>
      </div>
    </>
  );
};
