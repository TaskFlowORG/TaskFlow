import { Select } from "@/model/Properties/Select";
import { Property } from "@/model/Properties/Property";
import { useEffect, useState } from "react";
import { getData, putData } from "@/services/http/api";
import { Project } from "@/model/Project";
import { TypeOfProperty } from "@/model/enums/TypeOfProperty";
import { CommonPage } from "@/model/pages/CommonPage";

interface Props {
  properties: Property[];
  orderingId: number | undefined;
  page: CommonPage;
}

export const OrderInput = ({ properties, orderingId, page }: Props) => {
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
    <div className="rounded-2xl shadowww fixed right-0 top-8 bg-white flex flex-col p-4 gap-6 min-w-[300px]">
      <h5 className="h5">Ordenar por</h5>
      <div
        onClick={() => {
          console.log(projectProperties);
          console.log("olha agora");
          console.log(properties);
        }}
        className="flex flex-col gap-4"
      >
        {
          properties.map((property)=>{
            if (property.id == orderingId){
              return (
                <div className="flex w-full p-2 text-center rounded-lg bg-[#F2F2F2] justify-between">
                  <p>{property.name}</p>
                  <img src="ok.svg" alt="NaN" />
                </div>
              )
            }
          })
        }
        {
          projectProperties.map((property)=>{
            if (property.id == orderingId){
              return (
                <div className="flex w-full p-2 text-center rounded-lg bg-[#F2F2F2] justify-between">
                  <p>{property.name}</p>
                  <img src="ok.svg" alt="NaN" />
                </div>
              )
            }
          })
        }
        <div className="flex w-full p-2 text-center rounded-lg bg-[#F2F2F2] justify-center">
          {projectProperties.map((property) => {
            if (
              property.type == TypeOfProperty.SELECT &&
              property.id != orderingId
            ) {
              return (
                <p
                  onClick={(e) => {
                    console.log(e.currentTarget.id);
                    let property = properties.find(
                      (property) => property.id.toString() == e.currentTarget.id
                    );
                    if (!property) {
                      property = projectProperties.find(
                        (property) =>
                          property.id.toString() == e.currentTarget.id
                      );
                    }
                    page.propertyOrdering = property as Property;
                    console.log("page1", page);
                    putData("page", page);
                  }}
                  id={property.id.toString()}
                  key={property.id}
                >
                  {property.name}
                </p>
              );
            }
          })}
          {properties.map((property) => {
            if (
              property.type == TypeOfProperty.SELECT &&
              property.id != orderingId
            ) {
              return (
                <p
                  onClick={(e) => {
                    console.log(e.currentTarget.id);
                    let property = properties.find(
                      (property) => property.id.toString() == e.currentTarget.id
                    );
                    if (!property) {
                      property = projectProperties.find(
                        (property) =>
                          property.id.toString() == e.currentTarget.id
                      );
                    }
                    page.propertyOrdering = property as Property;
                    console.log("page2",page);
                    putData("page", page);
                  }}
                  id={property.id.toString()}
                  key={property.id}
                >
                  {property.name}
                </p>
              );
            }
          })}


        </div>
      </div>
    </div>
  );
};
