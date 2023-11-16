"use client";

import { CardDate } from "./CardProperties/CardDate";
import { CardProgress } from "@/components/CardContent/CardProperties/CardProgress";
import { CardTag } from "./CardProperties/CardTags";
import { CardRadios } from "./CardProperties/CardRadios";
import { CardText } from "./CardProperties/CardText";
import { useEffect, useState } from "react";
import { CardSelect } from "./CardProperties/CardSelect";

export const CardContent = ({ task }) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    setProperties(task.properties);
  });

  return (
    <>
      <div className="flex justify-between">
        <h4>{task.name}</h4>
        <div className="  flex items-center relative w-16">
          <span className="w-8 h-8 rounded-full bg-pink absolute shadowww  right-8"></span>
          <span className="w-8 h-8 rounded-full bg-[#EA35BE] shadowww absolute right-4"></span>
          <span className="w-8 h-8 rounded-full bg-[#E41CEF] shadowww absolute right-0"></span>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-between">
        {properties.map((property) => {
          if (property.property.type == "text") {
            return <CardText key={property.propertyId} text={property.value} />;
          }
        })}
        {properties.map((property) => {
          if (property.property.type == "date") {
            console.log(property);
            return <CardDate key={property.propertyId} date={property.value} />;
          }
        })}

        {properties.map((property) => {
          if (property.property.type == "select") {
            return (
              <CardSelect
                key={property.propertyId}
                value={property.value}
                property={property.property.name}
              />
            );
          }
        })}

        {properties.map((property) => {
          if (property.property.type == "tag") {
            console.log(property);
            return (
              <CardTag key={property.propertyId} values={property.values} />
            );
          }
        })}
        {properties.map((property) => {
          if (property.property.type == "radio") {
            console.log(property);
            return (
              <CardRadios key={property.propertyId} values={property.values} />
            );
          }
        })}
        {/* <CardTag />
        <CardRadios /> */}
      </div>
    </>
  );
};
