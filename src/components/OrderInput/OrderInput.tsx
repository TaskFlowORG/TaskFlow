import { useContext, useEffect, useRef, useState } from "react";

import { OrderOption } from "./OrderOption";
import Image from "next/image";
import { MouseEvent } from "react";
import { OrderedPage, Page, Project, Property, TypeOfPage, TypeOfProperty } from "@/models";
import { pageService, projectService } from "@/services";
import { LocalModal } from "../Modal";
import { useClickAway } from "react-use";
import { ProjectContext } from "@/contexts";
import { useTranslation } from "next-i18next";
import test from "node:test";

interface Props {
  propertiesPage: Property[];
  orderingId: number | undefined;
  page: OrderedPage;
  isInCalendar?: boolean;
  setIsModalOpen: (boolean: boolean) => void;
}

export const OrderInput = ({
  propertiesPage,
  isInCalendar = false,
  orderingId,
  setIsModalOpen,
  page,
}: Props) => {
  const { project, setProject } = useContext(ProjectContext);
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    setProperties([...project?.properties!, ...propertiesPage]);
  }, []);

  async function updateOrderingProperty(
    e: MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    let property = properties.find(
      (property) => property.id.toString() == e.currentTarget.id
    );
    page.propertyOrdering = property!;
    await pageService.updatePropertiesOrdering(
      project?.id!,
      property!,
      page.id
    );
    setProject!({ ...await projectService.findOne(project!.id)! });
  }

  const ref = useRef(null);
  useClickAway(ref, () => setIsModalOpen(false));
  const {t}=  useTranslation()

  const testType = (property : Property) => {

    if(page.type == TypeOfPage.CALENDAR){
      return property.type == TypeOfProperty.DATE
    }else if(page.type == TypeOfPage.KANBAN){
      return [
        TypeOfProperty.SELECT,
        TypeOfProperty.TAG,
        TypeOfProperty.RADIO,
        TypeOfProperty.CHECKBOX,
      ].includes(property.type)
    }else if (page.type == TypeOfPage.TIMELINE){
      return property.type == TypeOfProperty.TIME
    }
    return false
  }

  return (
    <div
      ref={ref}
      className=" rounded-xl     dark:bg-modal-grey bg-white flex flex-col p-4  gap-6 min-w-[300px]"
    >
      <h5 className="text-h5 font-alata dark:text-white text-black">{t('sort-by')}</h5>
      <div className="flex flex-col gap-4">
        {properties.map((property) => {
          if (property.id == orderingId) {
            return (
              <OrderOption
                isOrderingProperty
                key={property.id}
                property={property}
              />
            );
          } else if (
            testType(property)
          ) {
            return (
              <OrderOption
                updateOrderingProperty={updateOrderingProperty}
                key={property.id}
                property={property}
              />
            );
          } else if (TypeOfProperty.DATE == property.type && isInCalendar) {
            return (
              <OrderOption
                updateOrderingProperty={updateOrderingProperty}
                key={property.id}
                property={property}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
