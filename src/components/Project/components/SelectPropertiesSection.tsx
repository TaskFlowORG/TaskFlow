import { If } from "@/components/If";
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
import { useTranslation } from "next-i18next";
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
  const [property, setProperty] = useState<Property | undefined>(properties[0]);
  const tasks = project?.pages.flatMap((p) => p.tasks) ?? [];
  const checkOption = (property: PropertyValue | undefined, option: Option) => {
    if (!property) return false;
    if (!property.value) return false;
    if (!property.value.value) return false;
    return property.value.value.id == option.id;
  };

  const { t } = useTranslation();

  const getPropVl = (task: TaskPage) => {
    return task.task.properties.find((p) => p.property.id == property?.id);
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
      value: tasks.filter((t) => {
        const propVl = getPropVl(t);
        return !propVl || !propVl.value || !propVl.value.value;
      }).length,
      fill: "#E0E0E0",
    },
  ];
  const renderLegend = (props: DefaultLegendContentProps) => {
    return (
      <div className="h-full w-full pl-10 flex flex-col justify-between items-start">
        {data?.map((entry, index) => (
          <div
            key={`item-${index}`}
            className="flex items-center h-full w-full"
          >
            <div
              className="w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: entry.fill }}
            ></div>
            <span className="text-xs flex  gap-4 justify-between w-min">
              <span className="truncate w-32">{entry.name}</span>
              <span>{entry.value}</span>
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="shadow-blur-10 w-96 h-52  rounded-md p-4 flex flex-col justify-center items-center">
      <If condition={properties.length == 0}>
        <p>{t("no-properties")}</p>
        <>
          <span className="flex justify-between w-full">
            <h5 className=" h5 text-primary dark:text-secondary">
              {t("properties")}
            </h5>
            <span>
              <select className="w-32 flex text-center h-8 border-primary judtify-center border-2 " onChange={e => setProperty(properties.find(p => p.id == +e.target.value))} >
                {properties.map((option, index) => (
                  <option
                    key={index}
                    value={option.id}
                    selected={option.id == property?.id}
                  >
                    {option.name}
                  </option>
                ))}
              </select>
            </span>
          </span>
          <div className="pt-[5%] w-full flex relative items-center">
            <If condition={tasks.length == 0}>
              <p className="absolute left-8 ">{t("no-tasks")}</p>
            </If>
            <ResponsiveContainer width="100%" height="100%" aspect={2.5}>
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
                    height: "100%",
                    width: "min-content", // Adicione scroll quando necessário
                  }}
                  iconSize={6}
                />
                <Tooltip />

                <Pie
                  data={data}
                  fillRule="evenodd"
                  innerRadius="70%"
                  outerRadius="100%"
                  paddingAngle={0.5}
                  dataKey="value"
                  fill="fill"
                  style={{ width: "100%", height: "100%" }}
                >
                  <Label
                    value={tasks.length > 0 ? tasks.length : t("no-tasks")}
                    position="center"
                  />
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      </If>
    </div>
  );
};
