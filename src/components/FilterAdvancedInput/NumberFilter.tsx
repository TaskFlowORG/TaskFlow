import { FilterContext } from "@/utils/FilterlistContext";
import { useState, useEffect, useContext } from "react";

interface Props {
  id: number;
  name: string;
  value: number;
}

export const NumberFilter = ({ id, value, name }: Props) => {
  const [valued, setValued] = useState<number>();
  const { filterProp, setFilterProp } = useContext(FilterContext);
  useEffect(() => {
    setValued(value);
  }, [value]);

  function change(valueInput: number) {
    const thisProperty = filterProp?.find((item) => item.id == id);
    if (thisProperty) {
      if (valueInput) {
        filterProp.splice(filterProp.indexOf(thisProperty), 1);
        setFilterProp!(filterProp);
      } else {
        thisProperty.value = valueInput;
      }
    } else {
      if (valueInput) {
        setFilterProp!([...filterProp, { id: id, value: valueInput }]);
      }
    }
  }

  return (
    <div className="flex gap-4 w-full h-min justify-between  items-center border-b-[1px] ">
      <p className=" text-black dark:text-white whitespace-nowrap">{name}:</p>
      <div className="flex py-2">
        <input
          className=" input-number  max-w-[100px] text-center py-1 px-3 text-black dark:text-white border-y-2  focus:dark:border-zinc-400 focus:border-zinc-500 border-zinc-200 outline-none dark:border-zinc-600 text-sm"
          placeholder="Insira o número esperado"
          type="number"
          name=""
          value={valued}
          onChange={(e) => {
            setValued(parseInt(e.target.value));
            change(parseInt(e.target.value));
          }}
          id={`prop${id}`}
        />
        <span
          onClick={() => {
            setValued(valued ? valued - 1 : -1);
            change(valued ? valued - 1 : -1);
          }}
          className="bg-primary dark:bg-secondary bah rounded-l-lg w-6 relative -order-1"
        >
          <p className="absolute  text-white left-1/2 top-[6px] leading-none -translate-x-1/2">
            -
          </p>
        </span>

        <span
          onClick={() => {
            setValued(valued ? valued + 1 : 1);
            change(valued ? valued + 1 : 1);
          }}
          className="bg-primary dark:bg-secondary bah rounded-r-lg w-6 relative right"
        >
          <p className="absolute  text-white leading-none left-1/2 top-[6px] -translate-x-1/2">
            +
          </p>
        </span>
      </div>
    </div>
  );
};
