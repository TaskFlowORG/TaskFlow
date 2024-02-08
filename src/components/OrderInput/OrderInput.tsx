import { Select } from "@/model/Properties/Select";
import { Property } from "@/model/Properties/Property";
import { useEffect, useState } from "react";
import { getData, putData } from "@/services/http/api";
import { Project } from "@/model/Project";
import { TypeOfProperty } from "@/model/enums/TypeOfProperty";
import { CommonPage } from "@/model/pages/CommonPage";
import { OrderOption } from "./OrderOption";
import Image from "next/image";
import { MouseEvent } from "react";

interface Props {
  propertiesPage: Property[];
  orderingId: number | undefined;
  page: CommonPage;
}

export const OrderInput = ({ propertiesPage, orderingId, page }: Props) => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    (async () => {
      const project: Project = await getData("project", 1);
      setProperties([...project.properties, ...propertiesPage]);
    })();
  }, []);

  function updateOrderingProperty(e: MouseEvent<HTMLDivElement, MouseEvent>) {
    let property = properties.find(
      (property) => property.id.toString() == e.currentTarget.id
    );
    page.propertyOrdering = property as Property;
    putData("page", page);
  }

  return (
    <div className="rounded-2xl shadowww fixed  top-40 z-30 bg-white flex flex-col p-4 gap-6 min-w-[300px]">
      <h5 className="h5">Ordenar por</h5>
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
          } else if (property.type == TypeOfProperty.SELECT) {
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
