import { Interval } from "./Interval";

export const TimeLineHeader = ({
  listOfIntervals,
  widthOfInterval,
  interval
}: {
    interval: number;
  listOfIntervals: number[];
  widthOfInterval: number;
}) => {
  
  return (
    <div className="w-min h-full min-w-full flex absolute pl-[0.4rem]">
      {listOfIntervals.map((specificInterval, index) => {
        return (
          <div
          key={index}
          className="h-full flex gap-0 relative"
          style={{ width: widthOfInterval }}
          >
            <div
              style={{ width: widthOfInterval }}
              className=" flex whitespace-nowrap justify-center py-2 text-p font-alata text-modal-grey dark:text-white
              bg-white dark:bg-modal-grey absolute z-30 border-b-2 h-12 border-primary dark:border-secondary"
              >
              {specificInterval/interval} - 
              <Interval interval={interval}  specificInterval={specificInterval} isEnd={index == listOfIntervals.length -1}/>
            </div>
            <div className="absolute h-full border-r-2 w-0 border-dashed border-zinc-300 dark:border-zinc-900 z-40" />
          </div>
        );
      })}
    </div>
  );
};
