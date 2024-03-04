import { getData } from "@/services/http/api";
import { useEffect, useState } from "react";
import { DateFilter } from "./DateFilter";
import { NumberFilter } from "./NumberFilter";
import { TextFilter } from "./TextFilter";
import { Button } from "../Button/Button";
import { FilteredProperty } from "@/types/FilteredProperty";
import { Page, Project, Property, Select, TypeOfProperty } from "@/models";
import { CheckboxFilter } from "./CheckboxFilter";
import { Select as Selectt } from "@/components/Select";
import { RadioFilter } from "./RadioFilter";
import { TagFilter } from "./TagFilter";

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

  const [list, setList] = useState<FilteredProperty[]>([]);

  return (
    <div className="flex flex-col p-4 fixed bg-white dark:bg-modal-grey  top-40 z-30 w-96 shadowww gap-4 rounded-lg">
      <div className="flex flex-col gap-4 max-h-[300px] overflow-auto">
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
            return (
              <DateFilter
                name={property.name}
                id={property.id}
                value={prop?.value}
                key={property.id}
              />
            );
          } else if (property.type === TypeOfProperty.NUMBER) {
            return (
              <NumberFilter
                value={prop.value ?? ""}
                key={property.id}
                name={property.name}
                id={property.id}
              />
            );
          } else if (property.type === TypeOfProperty.TAG) {
            return (
              <TagFilter
                name={property.name}
                options={(property as Select).options}
                id={property.id}
                key={property.id}
                value={list.find((f) => f.id == property.id)?.value}
                removeList={(value: string) => {
                  const listFind = list.find((f) => f.id == property.id)!;
                  listFind.value.splice(listFind.value.indexOf(value), 1);
                }}
                addList={(value: string) => {
                  const listFind = list.find((f) => f.id == property.id);
                  console.log(listFind, list);
                  if (listFind) {
                    listFind.value.push(value);
                  } else {
                    setList([...list, { id: property.id, value: [value] }]);
                    console.log(list);
                  }
                }}
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
          } else if (property.type === TypeOfProperty.RADIO) {
            return (
              <RadioFilter
                id={property.id}
                name={property.name}
                options={(property as Select).options}
                key={property.id}
                value={prop.value}
              />
            );
          } else if (property.type === TypeOfProperty.SELECT) {
            return (
              <div key={property.id} className="w-full flex border-b-[1px] ">
                <Selectt
                  name={property.name}
                  id={"prop" + property.id.toString()}
                  options={(property as Select).options.map(
                    (option) => option.name
                  )}
                  value={prop.value}
                />
              </div>
            );
          }
        })}
      </div>

      <div className="flex w-full items-center justify-between">
        <Button
          fnButton={() => {
            filterProps([]);
            filterProp = [];
            setList([]);
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
                [TypeOfProperty.CHECKBOX, TypeOfProperty.RADIO].includes(
                  property.type
                )
              ) {
                let values: string[] = [];
                (property as Select).options.map((opt, index) => {
                  const anInput: HTMLInputElement | null =
                    document.querySelector(`#prop${property.id}_${index}`);

                  if (anInput?.checked) {
                    // console.log(anInput.value);
                    // console.log("Em cima de mim são valores do input tá");
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
                // console.log(anInput?.value);
                if (anInput?.value) {
                  console.log("Soy lista caliente");
                  console.log(list);
                  filterProps([
                    ...filterProp,
                    ...list,
                    { id: property.id, value: anInput.value },
                  ]);
                  filterProp.push({ id: property.id, value: anInput.value });
                } else if (TypeOfProperty.TAG == property.type) {
                  filterProps([...filterProp, ...list]);
                }
              }
            });
          }}
        />
      </div>
    </div>
  );
};
