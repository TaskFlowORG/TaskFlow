
import { useContext, useEffect, useRef, useState } from "react";
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
import { FilterContext } from "@/utils/FilterlistContext";
import { LocalModal } from "../Modal";
import { useClickAway } from "react-use";
import { ProjectContext } from "@/contexts";
import { ProgressFilter } from "./ProgressFilter";
import { useTranslation } from "next-i18next";

interface Props {
  properties: Property[];
  setIsModalOpen: (boolean: boolean) => void;
}

export const FilterAdvancedInput = ({ properties, setIsModalOpen }: Props) => {
  const [allProperties, setAllProperties] = useState<Property[] | undefined>(
    []
  );

  const { project } = useContext(ProjectContext);

  const ref = useRef(null);
  useClickAway(ref, () => setIsModalOpen(false));
  const { t } = useTranslation();

  const { filterProp, setFilterProp, list, setList } =
    useContext(FilterContext);
  let filterProperty: FilteredProperty[] = [];

  useEffect(() => {
    setAllProperties([...properties, ...project?.properties!]);
  }, []);

  return (
    <div
      className="flex flex-col p-4 fixed bg-white dark:bg-modal-grey  top-40 z-30 w-96 shadowww gap-4 rounded-lg"
      ref={ref}
    >
      <div className="flex flex-col gap-4 pr-4 max-h-[300px] overflow-auto">
        {allProperties?.map((property) => {
          const prop = filterProp?.find((prop) => prop.id == property.id) ?? {
            value: null,
          };

          if (property.type === TypeOfProperty.TEXT) {
            return (
              <TextFilter
                value={prop.value ?? ""}
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
                value={prop?.value ?? ""}
                key={property.id}
              />
            );
          } else if (property.type === TypeOfProperty.PROGRESS) {
            return (
              <ProgressFilter
                key={property.id}
                id={property.id}
                name={property.name}
                value={prop.value ?? ""}
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
                key={property.id}
                name={property.name}
                options={(property as Select).options}
                id={property.id}
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
                  ids={property.id}
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
            setFilterProp!([]);
            filterProperty = [];
            setList!(undefined);
          }}
          font="text-sm"
          padding="p-4"
          text={t("clear-filters")}
          textColor="text-primary dark:text-contrast hover:text-contrast"
          background="bg-transparent hover:bg-primary dark:hover:bg-secondary "
        />
      </div>
    </div>
  );
};
