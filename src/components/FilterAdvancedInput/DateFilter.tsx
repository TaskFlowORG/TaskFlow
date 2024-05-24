import { useIsDisabled } from "@/functions/modalTaskFunctions/isDisabled";
import { useHasPermission } from "@/hooks/useHasPermission";
import { Date as DateP, Property } from "@/models";
import { FilterContext } from "@/utils/FilterlistContext";
import { useTranslation } from "next-i18next";
import { useState, useEffect, useContext, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface DateProps {
  id: number;
  name: string;
  value: string;
  isInModal?: boolean;
  property: Property;
}

export const DateFilter = ({
  name,
  value,
  id,
  property,
  isInModal = false,
}: DateProps) => {
  const [valued, setValued] = useState("");
  const { filterProp, setFilterProp } = useContext(FilterContext);
  const isDisabled = useIsDisabled(isInModal, "update");
  const { t } = useTranslation();

  const style = twMerge(
    "flex gap-4 w-full items-center border-b-[1px]  pb-2",
    isInModal
      ? (property as DateP).includesHours
        ? "p-0 border-none w-[200px]"
        : " p-0 border-none w-[124px]"
      : " "
  );
  const hasPermission = useHasPermission("update");

  const formatDateTime = (date: Date) => {
    return (
      String(date.getFullYear()).padStart(4, "0") +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0") +
      "T" +
      String(date.getHours()).padStart(2, "0") +
      ":" +
      String(date.getMinutes()).padStart(2, "0") +
      ":" +
      String(date.getSeconds()).padStart(2, "0")
    );
  };

  useEffect(() => {
    // const splitTimestamp: string[] = value?.split("T");
    const prop = filterProp!.find((bah) => id == bah.id);
    if (prop ) {
      // const splitTimestamp: string[] = prop.value?.split("T");
      console.log(prop.value, "Value bros");
      setValued(
        (property as DateP).includesHours
          ? formatDateTime(new Date(prop.value))
          : prop.value
      );
    } else {
      setValued(
        (property as DateP).includesHours
          ? formatDateTime(new Date(value))
          : value
      );
    }
    // } else if (value) {
    //   // const datePart: string = splitTimestamp[0];
    //   setValued(value ?? "");
    // }
  }, [value, setFilterProp, filterProp]);
  const [date, setDate] = useState("");
  useEffect(() => {
    console.log(valued);
    setDate((property as DateP).includesHours ? valued : valued?.split("T")[0]);
  }, [valued]);

  const refDate = useRef<HTMLInputElement>(null);

  return (
    <div className={style}>
      {!isInModal && (
        <p className=" text-black dark:text-white whitespace-nowrap text-p14 font-montserrat">{name}:</p>
      )}
      <input
        ref={refDate}
        step="1"
        disabled={isDisabled}
        className="flex-1 py-1 text-p14 font-montserrat px-3 relative text-black dark:text-white border-2 focus:dark:border-zinc-400 focus:border-zinc-500 border-zinc-200 outline-none dark:border-zinc-600 rounded-lg  "
        type={(property as DateP).includesHours ? "datetime-local" : "date"}
        value={(property as DateP).includesHours ? valued : valued?.split("T")[0]}
        // onChange={(e) => setDate(e.target.value)}
        pattern="/^\d{2}\/\d{2}\/\d{4}$/"
        placeholder={t("insert-expected-value")}
        // onChange={(e) => {

        //   setValued(e.target.value);
        //   const thisProperty = filterProp?.find((item) => item.id == id);
        //   if (thisProperty) {
        //     if (!e.target.value) {
        //       filterProp!.splice(filterProp!.indexOf(thisProperty), 1);
        //       setFilterProp!([...filterProp!]);
        //     } else {
        //       thisProperty.value = (property as DateP).includesHours
        //         ?
        //         e.target.value?.split("T")[0] + "T" + new Date(e.target.value).toLocaleTimeString()
        //         : e.target.value?.split("T")[0];
        //       setFilterProp!([...filterProp!]);
        //     }
        //   } else {
        //     if (e.target.value) {
        //       setFilterProp!([
        //         ...filterProp!,
        //         {
        //           id: id, value: (property as DateP).includesHours
        //             ?
        //             e.target.value?.split("T")[0] + "T" + new Date(e.target.value).toLocaleTimeString()
        //             : e.target.value?.split("T")[0]
        //         },
        //       ]);
        //     }
        //   }
        // }}

        onChange={(e) => {
          console.log(e.target.value)
          // if (!e.target.value.match("/^\d{2}\/\d{2}\/\d{4}$/"))return;
          // let e = { target: { value: date } };
          setValued(
            (property as DateP).includesHours
              ? formatDateTime(new Date(e.target.value))
              : e.target.value
          );
          const thisProperty = filterProp?.find((item) => item.id == id);
          if (thisProperty) {
            if (!e.target.value) {
              // thisProperty.value = '';
              if (!isInModal){
                filterProp!.splice(filterProp!.indexOf(thisProperty), 1);
                setFilterProp!([...filterProp!]);
              }

            } else {
              console.log("Amigo estou aqui!!!")
              thisProperty.value = (property as DateP).includesHours
                ? formatDateTime(new Date(e.target.value))
                : e.target.value + "T00:00:00";
              setFilterProp!([...filterProp!]);
            }
          } else {
            if (e.target.value) {
              console.log(formatDateTime(new Date(e.target.value)));
              setFilterProp!([
                ...filterProp!,
                {
                  id: id,
                  value: (property as DateP).includesHours
                    ? formatDateTime(new Date(e.target.value))
                    : e.target.value + "T00:00:00",
                },
              ]);
            }
          }
        }}
        name=""
        id={`prop${id}`}
      />
    </div>
  );
};
