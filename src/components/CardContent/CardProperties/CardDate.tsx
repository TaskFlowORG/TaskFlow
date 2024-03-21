import { IconCalendar } from "@/components/icons";

interface Props {
  date: string;
  property: string;
  showNameProperty: boolean;
}

export const CardDate = ({ date, property, showNameProperty }: Props) => {
  return (
    <>
      <div className="flex gap-2 items-center">
        {showNameProperty && (
          <p className="text-[14px] text-[#797979] dark:text-white w-max">
            {property}:
          </p>
        )}

        <p className=" mn text-[#797979] dark:text-white mt-0.5  w-max">
          {date ?? "dd/mm/yy"}
        </p>
        <IconCalendar />
      </div>
    </>
  );
};
