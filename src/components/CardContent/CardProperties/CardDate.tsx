interface Props {
  date: string;
  property: string;
  showNameProperty: boolean;
}

export const CardDate = ({ date, property, showNameProperty }: Props) => {
  return (
    <>
      <div className="flex gap-2 items-center w-max">
        {showNameProperty && (
          <p className="text-[14px] text-[#797979] dark:text-white ">
            {property}:
          </p>
        )}

        <p className=" mn text-[#797979] dark:text-white mt-0.5 ">
          {date.split("T")[0] ?? "dd/mm/yy"}
        </p>
        <img src="/cardContentIcons/date.svg" alt="" />
      </div>
    </>
  );
};
