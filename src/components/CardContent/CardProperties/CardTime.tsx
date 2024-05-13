import { IconCalendar, IconClock } from "@/components/icons";
import { Interval } from "@/models/values/Interval";

interface Props {
  time: Interval;
  property: string;
  showNameProperty: boolean;
}

export const CardTime = ({ time, property, showNameProperty }: Props) => {
  return (
    <>
      <div className="flex gap-1 items-center w-max">
        {showNameProperty && (
          <p className="text-p14 text-[#797979] dark:text-white ">
            {property}:
          </p>
        )}

        <p className=" mn text-[#797979] dark:text-white mt-0.5 ">
          {time.time.hours < 10 ? "0" + time.time.hours : time.time.hours}:
          {time.time.minutes < 10 ? "0" + time.time.minutes : time.time.minutes}
          :
          {time.time.seconds < 10 ? "0" + time.time.seconds : time.time.seconds}
        </p>
        <div className="w-4 aspect-square">
          <IconClock></IconClock>
        </div>
      </div>
    </>
  );
};
