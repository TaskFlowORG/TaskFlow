import { useContext, useEffect, useRef, useState } from "react";
import { getData, putData } from "@/services/http/api";
import { OrderOption } from "./OrderOption";
import Image from "next/image";
import { MouseEvent } from "react";
import { OrderedPage, Page, Project, Property, TypeOfProperty } from "@/models";
import { pageService } from "@/services";
import { LocalModal } from "../Modal";
import { useClickAway } from "react-use";
import { ProjectContext } from "@/contexts";
import { useTranslation } from "next-i18next";

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
    const pageU = await pageService.updatePropertiesOrdering(
      project?.id!,
      property!,
      page.id
    );
    let pageD = project?.pages.find((pageK) => pageK.id == pageU.id);
    pageD = pageU
    setProject!({ ...project! });
  }

  const ref = useRef(null);
  useClickAway(ref, () => setIsModalOpen(false));
  const {t}=  useTranslation()

  return (
    <div
      ref={ref}
      className=" rounded-xl z-50 absolute top-16 shadowww  dark:bg-modal-grey bg-white flex flex-col p-4  gap-6 min-w-[300px]"
    >
      <h5 className="h5 dark:text-white text-black">{t('sort-by')}</h5>
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
            [
              TypeOfProperty.SELECT,
              TypeOfProperty.TAG,
              TypeOfProperty.RADIO,
              TypeOfProperty.CHECKBOX,
            ].includes(property.type) &&
            !isInCalendar
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
