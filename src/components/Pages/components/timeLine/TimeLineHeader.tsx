export const TimeLineHeader = ({
  listOfIntervals,
  widthOfInterval,
  interval
}: {
    interval: number;
  listOfIntervals: number[];
  widthOfInterval: number;
}) => {
  const formatInterval = (intervalToFormat: number) => {
    const initialTime = getInitialTimeOfInterval(intervalToFormat);
    const latestTime = getLatestTimeOfInterval(intervalToFormat);
    return `${initialTime} - ${latestTime}`;
  };
  const getInitialTimeOfInterval = (intervalToFormat: number) => {
    const hours = Math.floor(intervalToFormat / 3600);
    const minutes = Math.floor((intervalToFormat % 3600) / 60);
    const seconds = Math.floor(intervalToFormat % 60);
    const date = new Date(0);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
  };

  const getLatestTimeOfInterval = (intervalToFormat: number) => {
    const hours = Math.floor((intervalToFormat + interval) / 3600);
    const minutes = Math.floor(((intervalToFormat + interval) % 3600) / 60);
    const seconds = Math.floor(((intervalToFormat + interval) % 60) - 1);
    const date = new Date(0);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
  };

  return (
    <div className="w-min h-full min-w-full overflow-y-auto flex absolute top-0 left-0 p-4">
      {listOfIntervals.map((interval, index) => {
        return (
          <div
            key={index}
            className="h-full flex gap-0 relative"
            style={{ width: widthOfInterval }}
          >
            <div
              style={{ width: widthOfInterval }}
              className=" flex whitespace-nowrap justify-center border-b-2 h-9 border-primary"
            >
              {formatInterval(interval)}
            </div>
            <div className="absolute h-full border-r-2 w-0 border-dashed border-zinc-00 " />
          </div>
        );
      })}
    </div>
  );
};
