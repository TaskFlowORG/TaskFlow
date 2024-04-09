import { Option } from "@/models";
type Props = {
  options: Option[];
  id: number;
  value: string[];
};

export const CheckboxProp = ({ options, id, value }: Props) => {
  function isChecked(optionName: string) {
    return value?.includes(optionName);
  }
  return (
    <div className="flex flex-wrap gap-x-8">
      {options.map((option, index) => (
        <div key={index} className="flex gap-1 items-center">
          <input
            type="checkbox"
            id={`prop${id}_${index}`}
            value={option.name}
            className="custom-checkbox"
            checked={isChecked(option.name)}
            // onChange={handleOptionChange}
          />
          <label
            className="text-black dark:text-white"
            htmlFor={`prop${id}_${index}`}
          >
            {option.name}
          </label>
        </div>
      ))}
      {/* {(prop.value.value as any[]).map(
      (value: any, index: any) => {
        return <div key={index}>{value}</div>;
      }
    )} */}
    </div>
  );
};
