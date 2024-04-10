import { ProjectContext } from "@/contexts";
import {
  Option,
  Property,
  PropertyValue,
  Select,
  Task,
  TaskPage,
  TypeOfProperty,
} from "@/models";
import { useContext, useState } from "react";
import {
  Cell,
  DefaultLegendContent,
  DefaultLegendContentProps,
  Label,
  Legend,
  LegendProps,
  Pie,
  PieChart,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export const SelectPropertiesSection = () => {
  const { project } = useContext(ProjectContext);
  const properties =
    project?.properties.filter((p) =>
      [TypeOfProperty.SELECT, TypeOfProperty.RADIO].includes(p.type)
    ) ?? [];
  const [property, setProperty] = useState<Property>(properties[0]);
  const tasks = project?.pages.flatMap((p) => p.tasks) ?? [];
  const checkOption = (property: PropertyValue | undefined, option: Option) => {
    if (!property) return false;
    if (!property.value) return false;
    if (!property.value.value) return false;
    return property.value.value.id == option.id;
  };

  const getPropVl = (task: TaskPage) => {
    return task.task.properties.find((p) => p.property.id == property.id);
  };
  const data = [
    ...(property as Select).options.map((option) => {
      return {
        name: option.name,
        value: tasks.filter((t) => checkOption(getPropVl(t), option)).length,
        fill: option.color,
      };
    }),
    {
      name: "Not Selected",
      value:
        tasks.length == 0
          ? 1
          : tasks.filter((t) => {
              const propVl = getPropVl(t);
              return !propVl || !propVl.value || !propVl.value.value;
            }).length,
      fill: "#E0E0E0",
    },
  ];
  const renderLegend = (props: DefaultLegendContentProps) => {
    return (
      <div className="h-full w-full flex flex-col justify-between items-start">
        {data?.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center h-full w-full">
            <div
              className="w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: entry.fill }}
            ></div>
            <span className="text-xs flex  gap-4 justify-between w-full">
              <span className="truncate">{entry.name}</span>
              <span>{entry.value}</span>
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="shadow-blur-10 w-96 min-h-full rounded-md">
      <span className="flex justify-between">
        <h5 className=" h5 text-primary dark:text-secondary">Properties</h5>
        <span>
          <select className="w-32 flex text-center h-8 border-primary judtify-center border-2 ">
            {properties.map((option, index) => (
              <option
                key={index}
                value={option.id}
                selected={option.id == property.id}
              >
                {option.name}
              </option>
            ))}
          </select>
        </span>
      </span>
      <div className="pt-[5%] w-5/6 flex items-center">
        <ResponsiveContainer width="100%" height="100%" aspect={3}>
          <PieChart layout="vertical">
            <Legend
              verticalAlign="top"
              align="right"
              layout="vertical"
              fill="fill"
              iconType="circle"
              content={renderLegend}
              
              wrapperStyle={{
                maxHeight: "100%", // Defina a altura máxima aqui
                overflowY: "auto",
                height:"100%" // Adicione scroll quando necessário
              }}
              iconSize={6}
            />
            <Tooltip />
            <Pie
              data={data}
              fillRule="evenodd"
              className="w-min h-full"
              innerRadius="70%"
              outerRadius="100%"
              paddingAngle={0.5}
              dataKey="value"
              fill="fill"
            >
              <Label value={tasks.length} position="center" />
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
