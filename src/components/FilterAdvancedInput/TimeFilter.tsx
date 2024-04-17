import { TimeValued } from "@/models";
import { useEffect } from "react";

interface Props {
  id: number;
  name: string;
  value: TimeValued;
  isInModal?: boolean;
}

export const TimeFilter = ({ value }: Props) => {
  useEffect(() => {
    console.log(value.value);
    if (value.value.starts == value.value.ends) {
      value.value.time;
    }

    value.value.starts.forEach((time) => {});
  }, [value]);
  return (
    <div className="flex w-full justify-between">
      <p
        onClick={() => {
          // startTime()
        }}
      >
        KKKKK
      </p>
      <div className="h-8 aspect-square"></div>
    </div>
  );
};
