"use client";

import { CardDate } from "./CardProperties/CardDate";

import { CardTag } from "./CardProperties/CardTags";
import { CardRadios } from "./CardProperties/CardRadios";
import { CardText } from "./CardProperties/CardText";
import { useEffect, useState } from "react";
import { CardSelect } from "./CardProperties/CardSelect";

interface Props {
  task: any
}
export const CardContent = ({ task }: Props) => {
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    setProperties(task.properties);
  });

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
        {task.uniProperties.map((property: any) => {
          if (property.property.type == "TEXT") {
            return <CardText key={property.propertyId} text={property.value} />;
          }
        })}
        {task.uniProperties.map((property: any) => {
          if (property.property.type == "DATE" && property.visible == true) {

            return <CardDate key={property.propertyId} date={property.value} />;
          }
        })}

        {task.uniProperties.map((property: any) => {
          if (property.property.type == "SELECT" && property.visible == true) {
            return (
              <CardSelect
                key={property.propertyId}
                value={property.value}
                property={property.property.name}
              />
            );
          }
        })}

        {task.multiProperties.map((property: any) => {
          if (property.property.type == "TAG") {

            return (
              <CardTag key={property.propertyId} tags={property.values} />
            );
          }
        })}
        {task.uniProperties.map((property: any) => {
          if (property.property.type == "RADIO") {

            return (
              <CardRadios key={property.propertyId} radios={property.values} />
            );
          }
        })}
        {/* <CardTag />
        <CardRadios /> */}
      </div>
    </>
  );
};
