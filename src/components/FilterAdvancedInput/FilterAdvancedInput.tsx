import { TypeOfProperty } from "@/model/enums/TypeOfProperty";
import { CommonPage } from "@/model/pages/CommonPage";
import { Property } from "@/model/Properties/Property";
import { getData } from "@/services/http/api";
import { Project } from "@/model/Project";
import { Select } from "@/model/Properties/Select";
import { useEffect, useState } from "react";
import { DateFilter } from "./DateFilter";
import { NumberFilter } from "./NumberFilter";
import { RadioFilter } from "./RadioFilter";
import { TagFilter } from "./TagFilter";
import { TextFilter } from "./TextFilter";
import { Button } from "../Button/Button";
import { FilteredProperty } from "@/types/FilteredProperty";
import { SelectFilter } from "./SelectFilter";

interface Props {
  properties: Property[] | undefined;
  orderingId: number | undefined;
  page: CommonPage | null;
  filterProps: (list:any)=>void
}

export const FilterAdvancedInput = ({ properties, orderingId, filterProps }: Props) => {
  const [allProperties, setAllProperties] = useState<Property[] | undefined>(
    []
  );
  let filterProp:FilteredProperty[] = []

  useEffect(() => {
    (async () => {
      const project: Project = await getData("project", 1);
      setAllProperties(project.properties);
    })();
  }, []);
  if (1 + 1 == 2) {
    return (
      <div className="flex flex-col p-4 w-96 shadowww gap-4">
        {properties?.map((property) => {
          if (property.type === TypeOfProperty.TEXT) {
            return <TextFilter name={property.name} id={property.id} />;
          } else if (property.type === TypeOfProperty.DATE) {
            return <DateFilter />;
          } else if (property.type === TypeOfProperty.NUMBER) {
            return <NumberFilter name={property.name} id={property.id} />;
          } else if (property.type === TypeOfProperty.TAG) {
            return <TagFilter />;
          } 
           else if (property.type === TypeOfProperty.SELECT) {
            return <SelectFilter id={property.id} name={property.name} options={(property as Select).options} />;
          } 
        })}
        <div className="flex w-full justify-end">
          <Button font="text-base" padding="p-4" fnButton={()=>{
            properties?.map((property)=>{
              const anInput:HTMLInputElement | null =  document.querySelector(`#prop${property.id}`)
              if (anInput?.value){
                filterProp.push({id:property.id, value:anInput.value})
              }
            })
            if (filterProp){
              console.log(filterProp)
              filterProps(filterProp)
            }
          }} />
        </div>
      </div>
    );
  }

  return (
    <div>
      {allProperties?.map((property) => {
        if (property.id != orderingId) {
          return (
            <div>
              <p>{property.name}</p>
            </div>
          );
        }
      })}
      {properties?.map((property) => {
        if (property.id != orderingId) {
          return (
            <div>
              <p>{property.name}</p>
            </div>
          );
        }
      })}

      <div
        onClick={() => {
          const input = document.querySelector("#BOLOLO") as HTMLInputElement;
          input.focus();
        }}
      >
        skjaslkdasjkljsldk
      </div>

      <input type="text" id="BOLOLO" />
    </div>
  );
};
