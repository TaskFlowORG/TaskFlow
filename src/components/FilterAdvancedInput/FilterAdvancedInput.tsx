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
  properties: Property[] | undefined;
  orderingId: number | undefined;
  page: Page | null;
  filterProps: (list: any) => void;
}

export const FilterAdvancedInput = ({
  properties,
  orderingId,
  filterProps,
}: Props) => {
  const [allProperties, setAllProperties] = useState<Property[] | undefined>(
    []
  );
  let filterProp: FilteredProperty[] = [];

  useEffect(() => {
    (async () => {
      const project: Project = await getData("project", 1);
      setAllProperties([...project.properties, ...(properties ?? [])]);
    })();
  }, []);

  return (
    <div className="flex flex-col p-4 fixed bg-white dark:bg-modal-grey  top-40 z-30 w-96 shadowww gap-4 rounded-lg">
      {allProperties?.map((property) => {
        if (property.type === TypeOfProperty.TEXT) {
          return (
            <TextFilter
              key={property.id}
              name={property.name}
              id={property.id}
            />
          );
        } else if (property.type === TypeOfProperty.DATE) {
          return <DateFilter key={property.id} />;
        } else if (property.type === TypeOfProperty.NUMBER) {
          return (
            <NumberFilter
              key={property.id}
              name={property.name}
              id={property.id}
            />
          );
        } else if (property.type === TypeOfProperty.TAG) {
          return <TagFilter key={property.id} />;
        } else if (property.type === TypeOfProperty.CHECKBOX) {
          return (
            <CheckboxFilter
              id={property.id}
              name={property.name}
              options={(property as Select).options}
              key={property.id}
            />
          );
        } else if (property.type === TypeOfProperty.SELECT) {
          return (
            <SelectFilter
              key={property.id}
              id={property.id}
              name={property.name}
              options={(property as Select).options}
            />
          );
        }
      })}
      <div className="flex w-full justify-end">
        <Button
          font="text-base"
          padding="p-4"
          fnButton={() => {
            allProperties?.map((property) => {
              if (
                [TypeOfProperty.CHECKBOX || TypeOfProperty.TAG].includes(
                  property.type
                )
              ) {
                (property as Select).options.map((opt, index) => {
                  const anInput: HTMLInputElement | null =
                    document.querySelector(`#prop${property.id}_${index}`);
                  if (anInput?.checked) {
                    filterProps([
                      ...filterProp,
                      { id: property.id, value: anInput.value },
                    ]);
                  }
                });
              } else {
                const anInput: HTMLInputElement | null = document.querySelector(
                  `#prop${property.id}`
                );
                console.log(anInput?.value);
                if (anInput?.value) {
                  filterProps([
                    ...filterProp,
                    { id: property.id, value: anInput.value },
                  ]);
                }
              }
            });
          }}
        />
      </div>
    </div>
  );
};
