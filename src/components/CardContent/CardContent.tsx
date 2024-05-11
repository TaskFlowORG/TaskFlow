"use client";
import { CardDate } from "./CardProperties/CardDate";

import { CardTag } from "./CardProperties/CardTags";
import { CardRadio } from "./CardProperties/CardRadio";
import { CardText } from "./CardProperties/CardText";
import { useEffect, useState } from "react";
import { CardSelect } from "./CardProperties/CardSelect";
import { ProgressBar } from "../ProgressBar";
import {
  ArchiveValued,
  MultiOptionValued,
  PropertyValue,
  Task,
  TextValued,
  TypeOfProperty,
  UniOptionValued,
  User,
} from "@/models";
import { useTranslation } from "next-i18next";
import { CardUser } from "./CardProperties/CardUser";
import { CardNumber } from "./CardProperties/CardNumber";
import { CardProgress } from "./CardProperties/CardProgress";
import { CardCheckbox } from "./CardProperties/CardCheckbox";
import { CardFile } from "./CardProperties/CardFile";

interface Props {
  task: Task;
  min?: boolean;
  user: User;
}
export const CardContent = ({ task, user }: Props) => {
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
          {task.name != null
            ? task.name.length > 0
              ? task.name
              : t("withoutname")
            : t("withoutname")}
        </h4>

        {task.properties.find(
          (prop) => prop.property.type == TypeOfProperty.USER
        ) && (
          <CardUser
            users={
              task.properties.find(
                (prop) => prop.property.type == TypeOfProperty.USER
              )?.value.value
            }
          />
        )}
      </div>
      <div className="flex flex-wrap gap-1 w-full [&_*]:font-montserrat justify-between">
        {task.properties?.map((property) => {
          if (
            is(property, TypeOfProperty.TEXT) &&
            (property.value as TextValued).value
          ) {
            return (
              <CardText
                showNameProperty={user.configuration.showPropertiesName}
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
                showNameProperty={user.configuration.showPropertiesName}
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
                showNameProperty={user.configuration.showPropertiesName}
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
              <CardCheckbox
                showNameProperty={user.configuration.showPropertiesName}
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
                showNameProperty={user.configuration.showPropertiesName}
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
                showNameProperty={user.configuration.showPropertiesName}
                key={property.property.id.toString()}
                property={property.property.name}
                value={(property.value as UniOptionValued).value?.name}
              />
            );
          } else if (is(property, TypeOfProperty.PROGRESS)) {
            return (
              <CardProgress
                showNameProperty={user.configuration.showPropertiesName}
                key={property.property.id.toString()}
                property={property.property.name}
                percent={property.value.value}
              />
            );
          } else if (is(property, TypeOfProperty.ARCHIVE)) {
            return (
              <CardFile
                showNameProperty={user.configuration.showPropertiesName}
                property={property.property.name}
                key={property.property.id.toString()}
                name={(property.value as ArchiveValued).value?.name as string}
              />
            );
          } else if (is(property, TypeOfProperty.NUMBER)) {
            return (
              <CardNumber
                showNameProperty={user.configuration.showPropertiesName}
                key={property.property.id.toString()}
                property={property.property.name}
                number={property.value.value}
              />
            );
          }
        })}
      </div>
    </>
  );
};
