import { IconCalendar } from "@/components/icons";

interface Props {
  date: string;
  property: string;
  showNameProperty: boolean;
}

export const CardDate = ({ date, property, showNameProperty }: Props) => {
  return (
    <>
      <div className="flex gap-1 items-center w-max">
        {showNameProperty && (
          <p className="text-p14 text-[#797979] dark:text-white ">
            {property}:
          </p>
        )}

        <p className=" mn text-[#797979] dark:text-white mt-0.5 ">
          {new Date(date).toLocaleDateString()}
        </p>
        <div className="w-4 aspect-square">
          <IconCalendar></IconCalendar>
        </div>

      </div>
    </>
  );
};
