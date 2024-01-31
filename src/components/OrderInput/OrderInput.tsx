import { Select } from "@/model/Properties/Select";
import { Property } from "@/model/Properties/Property";
import { useEffect, useState } from "react";
import { getData } from "@/services/http/api";
import { Project } from "@/model/Project";
import { TypeOfProperty } from "@/model/enums/TypeOfProperty";

interface Props {
  properties: Property[];
  orderingId: number;
}

export const OrderInput = ({ properties, orderingId }: Props) => {
  const [projectProperties, setProjectProperties] = useState<Property[]>([]);

  useEffect(() => {
    (async () => {
      const project: Project = await getData("project", 1);
      setProjectProperties(project.properties);
      console.log(project.properties);
      console.log(project.properties[0].type == TypeOfProperty.SELECT);
    })();
  }, []);

  return (
    <div className="rounded-2xl bg-white flex flex-col gap-6">
      <h5 className="h5">Ordenar por</h5>
      <div
        onClick={() => {
          console.log(projectProperties);
          console.log("olha agora");
          console.log(properties);
        }}
        className="flex flex-col gap-4"
      >
        <div className="flex w-full p-2 rounded-lg bg-[#F2F2F2]">
          {projectProperties.map((property) => {
            if (
              property.type == TypeOfProperty.SELECT &&
              property.id != orderingId
            ) {
              return <p className="">{property.name}</p>;
            }
          })}
          {properties.map((property) => {
            if (
              property.type == TypeOfProperty.SELECT &&
              property.id != orderingId
            ) {
              return <p>{property.name}</p>;
            }
          })}

          <img src="ok.svg" alt="NaN" />
        </div>
      </div>
    </div>
  );
};
