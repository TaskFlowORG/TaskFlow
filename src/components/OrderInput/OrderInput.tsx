
import { useEffect, useState } from "react";
import { getData, putData } from "@/services/http/api";
import { OrderOption } from "./OrderOption";
import Image from "next/image";
import { MouseEvent } from "react";
import { OrderedPage, Project, Property, TypeOfProperty } from "@/models";

interface Props {
  propertiesPage: Property[];
  orderingId: number | undefined;
  page: OrderedPage;
}

export const OrderInput = ({ propertiesPage, orderingId, page }: Props) => {
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
    putData("page", page);
  }

  return (
    <div className="rounded-2xl shadowww fixed  top-40 z-30 dark:bg-modal-grey bg-white flex flex-col p-4 gap-6 min-w-[300px]">
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
          ) {
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
