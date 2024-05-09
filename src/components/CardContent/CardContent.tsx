"use client";
import { CardDate } from "./CardProperties/CardDate";

import { CardTag } from "./CardProperties/CardTags";
import { CardRadio } from "./CardProperties/CardRadio";
import { CardText } from "./CardProperties/CardText";
import { useEffect, useState } from "react";
import { CardSelect } from "./CardProperties/CardSelect";
import { ProgressBar } from "../ProgressBar";
import {
  MultiOptionValued,
  PropertyValue,
  Task,
  TextValued,
  TypeOfProperty,
  UniOptionValued,
} from "@/models";
import { useTranslation } from "next-i18next";

interface Props {
  task: Task;
  min?: boolean;
}
export const CardContent = ({ task }: Props) => {
  function is(property: PropertyValue, type: TypeOfProperty) {
    return property.property.type == type && property.property.visible == true;
  }
  const { t } = useTranslation();

  return (
    <>
      <div className="flex justify-between">
        <h4
          style={{ opacity: task.name ? 1 : 0.25 }}
          className="text-h5 font-alata w-max text-black dark:text-white"
        >
          { task.name!=null ? (task.name.length > 0 ? task.name : t("withoutname")): t("withoutname")}
        </h4>
        <div className="  flex items-center relative w-16">
          <span className="w-7 h-7 rounded-full bg-primary absolute shadowww  right-8"></span>
          <span className="w-7 h-7 rounded-full bg-[#EA35BE] shadowww absolute right-4"></span>
          <span className="w-7 h-7 rounded-full bg-[#E41CEF] shadowww absolute right-0"></span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 w-full [&_*]:font-montserrat justify-between">
        {task.properties?.map((property) => {
          if (
            is(property, TypeOfProperty.TEXT) &&
            (property.value as TextValued).value
          ) {
            return (
              <CardText
                showNameProperty={false}
                property={property.property.name}
                key={property.property.id.toString()}
                text={(property.value as TextValued).value}
              />
            );
          } else if (
            is(property, TypeOfProperty.DATE) &&
            property.value.value
          ) {
            return (
              <CardDate
                showNameProperty={false}
                key={property.property.id.toString()}
                date={property.value.value}
                property={property.property.name}
              />
            );
          } else if (
            is(property, TypeOfProperty.SELECT) &&
            (property.value as UniOptionValued).value?.name
          ) {
            return (
              <CardSelect
                showNameProperty={false}
                property={property.property.name}
                color={(property.value as UniOptionValued).value?.color}
                key={property.property.id.toString()}
                value={(property.value as UniOptionValued).value?.name}
              />
            );
          } else if (
            is(property, TypeOfProperty.CHECKBOX) &&
            (property.value as MultiOptionValued).value.length > 0
          ) {
            return (
              <CardTag
                showNameProperty={false}
                nameProperty={property.property.name}
                key={property.property.id.toString()}
                tags={(property.value as MultiOptionValued).value}
              />
            );
          } else if (
            is(property, TypeOfProperty.TAG) &&
            (property.value as MultiOptionValued).value.length > 0
          ) {
            return (
              <CardTag
                showNameProperty={false}
                nameProperty={property.property.name}
                key={property.property.id.toString()}
                tags={(property.value as MultiOptionValued).value}
              />
            );
          } else if (
            is(property, TypeOfProperty.RADIO) &&
            property.value.value
          ) {
            return (
              <CardRadio
                showNameProperty={false}
                key={property.property.id.toString()}
                property={property.property.name}
                value={(property.value as UniOptionValued).value?.name}
              />
            );
          } else if (is(property, TypeOfProperty.NUMBER)) {
            return (
              // <CardNumber
              //   showNameProperty={fafalse}
              // key={property.property.id.toString()}
              //   property={property.property.name}
              //   value={property.value.value}
              // />
              <></>
            );
          }
        })}
      </div>
    </>
  );
};
