import { RangeInput } from "../RangeInput";

interface SectionFilterProps {
  title: string;
  number: number | null;
  setNumber: (value: number|null) => void;
  step: number;
  percentage?: boolean;
  max: number;
}

export const SectionFilter: React.FC<SectionFilterProps> = ({
  title,
  number,
  setNumber,
  step,
  percentage,
  max
}) => {
  return (
    <>
      <span className="flex justify-between gap-2">
        <p title={title} className="w-full whitespace-nowrap truncate">{title}</p>
        <span className="flex gap-1">
          <input
            type="number"
            max={max}
            value={number ?? ""}
            onChange={(e) => setNumber(+e.target.value)}
            className="h-full text-end appearance-none min-w-[2rem] w-12 "
          />
          {percentage && <p>%</p>}
        </span>
      </span>
      <RangeInput range={number} step={step} setRange={setNumber} max={max} />
    </>
  );
};
