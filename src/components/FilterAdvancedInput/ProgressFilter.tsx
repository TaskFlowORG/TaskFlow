import { useHasPermission } from "@/hooks/useHasPermission";
import { FilterContext } from "@/utils/FilterlistContext";
import { useTheme } from "next-themes";
import { useContext, useEffect, useState } from "react";
import { RangeInput } from "../RangeInput";
import { useIsDisabled } from "@/functions/modalTaskFunctions/isDisabled";
import { Limited } from "@/models";

type Props = {
  isInModal?: boolean;
  id: number;
  name: string;
  value: number;
  property: Limited
};

export const ProgressFilter = ({
  isInModal = false,
  id,
  property,
  name,
  value,
}: Props) => {
  const [list, setList] = useState<number[]>([]);
  const { theme } = useTheme();
  const [valued, setValued] = useState<number | null>(null);
  const [drag, setDrag] = useState<boolean>();
  const isDisabled = useIsDisabled(isInModal, "update");
  const hasPermission = useHasPermission("update");
  const { filterProp, setFilterProp } = useContext(FilterContext);
  useEffect(() => {
    const lista = [];
    for (let i = 0; i <= 100; i++) {
      lista.push(i);
    }
    setList(lista);
    window.addEventListener("mouseup", () => setDrag(false));
    const prop = filterProp!.find((bah) => id == bah.id);
    if (prop) {
      setValued(prop.value ?? "");
    } else {
      setValued(value ?? "");
    }
  }, [value, filterProp, setFilterProp]);

  function change(valueInput: number) {
    const thisProperty = filterProp?.find((item) => item.id == id);
    if (thisProperty) {
      if (valueInput) {
        filterProp!.splice(filterProp!.indexOf(thisProperty), 1);
        setFilterProp!([...filterProp!]);
      } else {
        thisProperty.value = valueInput;
        setFilterProp!([...filterProp!]);
      }
    } else {
      if (valueInput) {
        setFilterProp!([...filterProp!, { id: id, value: valueInput }]);
      }
    }
  }

  return (
    <div className="flex justify-between">
      {!isInModal && (
        <p className=" text-black h-full self-center text-p14 dark:text-white whitespace-nowrap">
          {name}:
        </p>
      )}
      <div className="flex flex-col gap-1 items-end min-w-[100px]">
        <input
          type="number"
          disabled={isDisabled}
          step={0.01}
          name=""
          className="p-1 pb-0 pr-0 mr-2 text-end w-8 input-number outline-none cursor-pointer bg-white dark:bg-modal-grey"
          value={valued ?? undefined}
          id=""
          placeholder="%"
          onChange={(e) => {
            console.log(property?.maximum)
            if ((property?.maximum == undefined && parseFloat(e.target.value) > 100) ||  property?.maximum < parseFloat(e.target.value)){
              setValued(property?.maximum == undefined ? 0  : parseFloat(e.target.value));
            } else {
              setValued(parseFloat(e.target.value));
            }

            const thisProperty = filterProp?.find((item) => item.id == id);
            if (thisProperty) {
              if (!e.target.value) {
                filterProp!.splice(filterProp!.indexOf(thisProperty), 1);
                setFilterProp!([...filterProp!]);
                thisProperty.value = e.target.value;
              } else {
                thisProperty.value = e.target.value;
                setFilterProp!([...filterProp!]);
              }
            } else {
              if (e.target.value) {
                setFilterProp!([
                  ...filterProp!,
                  { id: id, value: e.target.value },
                ]);
              }
            }
          }}
        />
        <RangeInput
          bgColor="bg-zinc-200"
          step={1}
          range={valued}
          disable={isDisabled}
          setRange={(value) => {
            setValued(value);
            const thisProperty = filterProp?.find((item) => item.id == id);
            if (thisProperty) {
              if (value == null || value == undefined) {
                filterProp!.splice(filterProp!.indexOf(thisProperty), 1);
                setFilterProp!([...filterProp!]);
                thisProperty.value = value;
              } else {
                thisProperty.value = value;
                setFilterProp!([...filterProp!]);
              }
            } else {
              if (value) {
                setFilterProp!([...filterProp!, { id: id, value: value }]);
              }
            }
          }}
          max={100}
        ></RangeInput>
      </div>
    </div>
  );
};
