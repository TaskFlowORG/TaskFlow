import { ProgressBar } from "@/components/ProgressBar";
interface Props {
  percent: string | number;
  property: string;
  showNameProperty: boolean;
}
export const CardProgress = ({
  percent,
  property,
  showNameProperty,
}: Props) => {
  return (
    <div className="flex gap-2 items-center w-max">
      {showNameProperty && (
        <p className="text-p14 text-[#797979] dark:text-white ">{property}:</p>
      )}

      <div className="w-10 h-10 mx-4 relative">
        <p className="absolute bottom-0 left-2 z-[5] font-montserrat text-xs font-semibold text-primary dark:text-secondary">
          {percent ?? "0"}%
        </p>
        <ProgressBar percent={percent as number}></ProgressBar>
      </div>
    </div>
  );
};
