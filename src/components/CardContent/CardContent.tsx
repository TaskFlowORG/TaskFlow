"use client";

import { CardDate } from "./CardProperties/CardDate";

import { CardTag } from "./CardProperties/CardTags";
import { CardRadio } from "./CardProperties/CardRadio";
import { CardText } from "./CardProperties/CardText";
import { useEffect, useState } from "react";
import { CardSelect } from "./CardProperties/CardSelect";
import { ProgressBar } from "../ProgressBar";
import { Task } from "@/model/tasks/Task";
import { Value } from "@/model/values/Value";
import { TaskValue } from "@/model/relations/TaskValue";
import { TypeOfProperty } from "@/model/enums/TypeOfProperty";
import { Property } from "@/model/Properties/Property";
import { TextValued } from "@/model/values/TextValued";
import { UniOptionValued } from "@/model/values/UniPotionValued";
import { MultiOptionValued } from "@/model/values/MultiOptionValued";

interface Props {
  task: Task;
  min?: boolean;
}
export const CardContent = ({ task, min }: Props) => {
  const [properties, setProperties] = useState<TaskValue[]>([]);
  console.log(task);

  function is(property: TaskValue, type: TypeOfProperty) {
    console.log(property.property.type, property.property.visible)
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    console.log(type)
    return property.property.type == type && property.property.visible == true;
  }

  return (
    <>
      <div className="flex justify-between">
        <h4 className="h4 w-max text-black dark:text-white">{task.name}</h4>
        <div className="  flex items-center relative w-16">
          <span className="w-8 h-8 rounded-full bg-primary absolute shadowww  right-8"></span>
          <span className="w-8 h-8 rounded-full bg-[#EA35BE] shadowww absolute right-4"></span>
          <span className="w-8 h-8 rounded-full bg-[#E41CEF] shadowww absolute right-0"></span>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-between">
        {task.properties?.map((property) => {
          console.log(property);
          if (is(property, TypeOfProperty.TEXT)) {
            return (
              <CardText
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
                key={property.property.id.toString()}
                value={(property.value as UniOptionValued).value.name}
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
          }
        })}
      </div>
    </>
  );
};
