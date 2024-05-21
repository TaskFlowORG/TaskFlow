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
import Chart from "chart.js/auto";
import {
  CategoryScale,
  ChartData,
  ChartOptions,
  DoughnutDataPoint,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(CategoryScale);
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

  if (!property)
    return (
      <div
        className="shadow-blur-10 w-full font-montserrat text-alata h-64 md:h-1/2 text-center 
      rounded-md p-4 flex flex-col justify-center items-center"
      >
        <p>{t("no-properties-select")}</p>
      </div>
    );

  const data = [
    ...(property as Select).options.map((option) => {
      return {
        name: option.name,
        value: tasks.filter((t) => checkOption(getPropVl(t), option)).length,
        fill: option.color,
      };
    }),
    {
      name: t("not-selected"),
      value: tasks.filter((t) => {
        const propVl = getPropVl(t);
        return !propVl || !propVl.value || !propVl.value.value;
      }).length,
      fill: "#E0E0E0",
    },
  ];

  const dataFormatted: ChartData<"doughnut", number[], unknown> = {
    labels: data.map((data) => data.name),
    datasets: [
      {
        label: t("tasks"),
        data: data.map((data) => data.value),
        backgroundColor: data.map((data) => data.fill),
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
  };

  return (
    <div className="shadow-blur-10 w-full h-64 md:h-1/2 rounded-md p-4 flex flex-col justify-start items-center">
      <>
        <span className="flex justify-between w-full">
          <span>
            <select
              className="w-32 flex font-alata text-p text-start text-primary bg-transparent dark:text-secondary p-1 h-min   "
              onChange={(e) =>
                setProperty(properties.find((p) => p.id == +e.target.value))
              }
              defaultValue={property?.id}
            >
              {properties.map((option, index) => (
                <option key={index} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </span>
        </span>
        <div className=" w-full h-full flex justify-center  items-center">
          <div className="flex justify-center gap-12 w-full h-4/6 items-center ">
            <If condition={tasks.length == 0}>
              <p className="whitespace-normal w-40 text-center font-montserrat">
                {t("no-tasks-in-project")}
              </p>
              <Doughnut options={options} content="sd" data={dataFormatted} />
            </If>
            <div
              id="legend-container"
              className="overflow-y-auto none-scrollbar w-1/3 flex flex-col justify-between  h-full text-p font-montserrat"
            >
              {data.map((d, index) => (
                <div
                  key={index}
                  className="flex gap-2 h-min text-p w-full font-alata items-center  justify-between"
                >
                  <span className="flex gap-2 h-min  text-p font-montserrat items-center ">
                    <span
                      style={{
                        backgroundColor: d.fill,
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                      }}
                    ></span>
                    <p >{d.name}</p>
                  </span>
                  <span >{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};
