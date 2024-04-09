import { useEffect, useRef, useState } from "react";
import { getData, putData } from "@/services/http/api";
import { OrderOption } from "./OrderOption";
import Image from "next/image";
import { MouseEvent } from "react";
import { OrderedPage, Project, Property, TypeOfProperty } from "@/models";
import { pageService } from "@/services";
import { LocalModal } from "../Modal";
import { useClickAway } from "react-use";

interface Props {
  propertiesPage: Property[];
  orderingId: number | undefined;
  page: OrderedPage;
  isInCalendar?:boolean
  setIsModalOpen:(boolean:boolean ) => void
}

export const OrderInput = ({ propertiesPage, isInCalendar = false, orderingId, setIsModalOpen, page }: Props) => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    (async () => {
      const project: Project = await getData("project", 1);
      setProperties([...project.properties, ...propertiesPage]);
    })();
    // eslint-disable-next-line
  }, []);

  function updateOrderingProperty(e: MouseEvent<HTMLDivElement, MouseEvent>) {
    let property = properties.find(
      (property) => property.id.toString() == e.currentTarget.id
    );
    page.propertyOrdering = property as Property;
    pageService.updatePropertiesOrdering(property!, page.id);
  }

  const ref = useRef(null);
  useClickAway(ref, () => setIsModalOpen(false));

  return (
    <div ref={ref} className=" rounded-xl z-50 absolute top-16 shadowww  dark:bg-modal-grey bg-white flex flex-col p-4  gap-6 min-w-[300px]">
      <h5 className="h5 dark:text-white text-black">Ordenar por</h5>
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
            ].includes(property.type)
           && !isInCalendar) {
            return (
              <OrderOption
                updateOrderingProperty={updateOrderingProperty}
                key={property.id}
                property={property}
              />
            );
          } else if(TypeOfProperty.DATE == property.type && isInCalendar){
            return ( <OrderOption
            updateOrderingProperty={updateOrderingProperty}
            key={property.id}
            property={property}
          />)
          }
        })}
      </div>
    </div>
  );
};
