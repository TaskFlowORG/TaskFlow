import { getData } from "@/services/http/api";
import { useEffect, useState } from "react";
import { DateFilter } from "./DateFilter";
import { NumberFilter } from "./NumberFilter";
import { RadioFilter } from "./RadioFilter";
import { TagFilter } from "./TagFilter";
import { TextFilter } from "./TextFilter";
import { Button } from "../Button/Button";
import { FilteredProperty } from "@/types/FilteredProperty";
import { SelectFilter } from "./SelectFilter";
import { Page, Project, Property, Select, TypeOfProperty } from "@/models";
import { CheckboxFilter } from "./CheckboxFilter";

interface Props {
  properties: Property[];
  orderingId: number | undefined;
  page: Page | null;
  filterProps: (list: any) => void;
  propsFiltered: FilteredProperty[];
}

export const FilterAdvancedInput = ({
  properties,
  orderingId,
  filterProps,
  propsFiltered,
}: Props) => {
  const [allProperties, setAllProperties] = useState<Property[] | undefined>(
    []
  );
  let filterProp: FilteredProperty[] = [];

  useEffect(() => {
    (async () => {
      const project: Project = await getData("project", 1);
      setAllProperties([...project.properties, ...properties]);
    })();
  }, []);

  return (
    <div className="flex flex-col p-4 fixed bg-white dark:bg-modal-grey  top-40 z-30 w-96 shadowww gap-4 rounded-lg">
      {allProperties?.map((property) => {
        const prop = propsFiltered.find((prop) => prop.id == property.id) ?? {
          value: null,
        };


        if (property.type === TypeOfProperty.TEXT) {
          return (
            <TextFilter
              value={prop.value}
              key={property.id}
              name={property.name}
              id={property.id}
            />
          );
        } else if (property.type === TypeOfProperty.DATE) {
          return <DateFilter value={prop?.value} key={property.id} />;
        } else if (property.type === TypeOfProperty.NUMBER) {
          return (
            <NumberFilter
              value={prop.value}
              key={property.id}
              name={property.name}
              id={property.id}
            />
          );
        } else if (property.type === TypeOfProperty.TAG) {
          return (
            <CheckboxFilter
              name={property.name}
              options={(property as Select).options}
              id={property.id}
              key={property.id}
              value={prop.value}
            />
          );
        } else if (property.type === TypeOfProperty.CHECKBOX) {
          return (
            <CheckboxFilter
              id={property.id}
              name={property.name}
              options={(property as Select).options}
              key={property.id}
              value={prop.value}
            />
          );
        } else if (property.type === TypeOfProperty.SELECT) {
          return (
            <SelectFilter
              value={prop?.value}
              key={property.id}
              id={property.id}
              name={property.name}
              options={(property as Select).options}
            />
          );
        }
      })}
      <div className="flex w-full items-center justify-between">
        <Button
          fnButton={() => {
            filterProps([]);
            filterProp = [];
          }}
          font="text-sm"
          padding="p-4"
          text="Limpar filtros"
          textColor="text-primary dark:text-contrast hover:text-contrast"
          background="bg-transparent hover:bg-primary dark:hover:bg-secondary "
        />

        <Button
          font="text-base"
          padding="p-4"
          fnButton={() => {
            filterProps([]);
            allProperties?.map((property) => {
              if (
                [TypeOfProperty.CHECKBOX, TypeOfProperty.TAG].includes(
                  property.type
                )
              ) {
                let values: string[] = [];
                (property as Select).options.map((opt, index) => {
                  const anInput: HTMLInputElement | null =
                    document.querySelector(`#prop${property.id}_${index}`);

                  if (anInput?.checked) {
                    // // console.log(anInput.value);
                    // // console.log("Em cima de mim são valores do input tá");
                    values.push(anInput.value);
                  }
                });
                console.log(
                  "Em baixo de mim, ta a porra do values das multiplas"
                );
                console.log(values.length);
                if (values.length > 0) {
                  filterProps([
                    ...filterProp,
                    { id: property.id, value: values },
                  ]);
                  filterProp.push({ id: property.id, value: values });
                }
              } else {
                const anInput: HTMLInputElement | null = document.querySelector(
                  `#prop${property.id}`
                );
                // // console.log(anInput?.value);
                if (anInput?.value) {
                  filterProps([
                    ...filterProp,
                    { id: property.id, value: anInput.value },
                  ]);
                  filterProp.push({ id: property.id, value: anInput.value });
                }
              }
            });
          }}
        />
      </div>
    </div>
  );
};
