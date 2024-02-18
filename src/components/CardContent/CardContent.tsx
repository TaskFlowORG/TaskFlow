

import { CardDate } from "./CardProperties/CardDate";

import { CardTag } from "./CardProperties/CardTags";
import { CardRadio } from "./CardProperties/CardRadio";
import { CardText } from "./CardProperties/CardText";
import { useEffect, useState } from "react";
import { CardSelect } from "./CardProperties/CardSelect";
import { ProgressBar } from "../ProgressBar";
import { MultiOptionValued, Task, TaskValue, TextValued, TypeOfProperty, UniOptionValued } from "@/models";

interface Props {
  task: Task;
  min?: boolean;
}
export const CardContent = ({ task, min }: Props) => {
  const [properties, setProperties] = useState<TaskValue[]>([]);


  function is(property: TaskValue, type: TypeOfProperty) {
    return property.property.type == type && property.property.visible == true;
  }


  return (
    <>
      <div className="flex justify-between">
        <h4 style={{opacity: task.name ? 1 : 0.25}} className="h4 w-max text-black dark:text-white">{task.name ?? "Sem Nome"}</h4>
        <div className="  flex items-center relative w-16">
          <span className="w-8 h-8 rounded-full bg-primary absolute shadowww  right-8"></span>
          <span className="w-8 h-8 rounded-full bg-[#EA35BE] shadowww absolute right-4"></span>
          <span className="w-8 h-8 rounded-full bg-[#E41CEF] shadowww absolute right-0"></span>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-between">
        {task.properties?.map((property) => {
        
          if (is(property, TypeOfProperty.TEXT)) {
            return (
              <CardText
              property={property.property.name}
                key={property.property.id.toString()}
                text={(property.value as TextValued).value}
              />
            );
          } else if (is(property, TypeOfProperty.DATE)) {
            return (
              <CardDate
                key={property.property.id.toString()}
                date={property.value.getValue()}
              />
            );
          } else if (is(property, TypeOfProperty.SELECT)) {
            return (
              <CardSelect
                property={property.property.name}
                color={(property.value as UniOptionValued).value?.color}
                key={property.property.id.toString()}
                value={(property.value as UniOptionValued).value?.name ?? "Não marcada"}
              />
            );
          } else if (is(property, TypeOfProperty.TAG)) {
            return (
              <CardTag
                key={property.property.id.toString()}
                tags={(property.value as MultiOptionValued).value}
              />
            );
          } else if (is(property, TypeOfProperty.RADIO)) {
            return (
              <CardRadio
                key={property.property.id.toString()}
                property={property.property.name}
                value={property.value.getValue()}
              />
            );
          } else if (is(property, TypeOfProperty.NUMBER)) {
            return (
              // <CardNumber
              //   key={property.property.id.toString()}
              //   property={property.property.name}
              //   value={property.value.getValue()}
              // />
              <></>
            );
          }
        })}
      </div>
    </>
  );
};
